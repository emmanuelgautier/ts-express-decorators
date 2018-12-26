import * as Express from "express";
import * as Fs from "fs";
import * as PathUtils from "path";
import {AfterRoutesInit, ExpressApplication, OnServerReady, ServerSettingsService, Service} from "@tsed/common";
import {$log} from "ts-log-debug";
import {ISwaggerSettings} from "./interfaces";
import {SwaggerService} from "./services/SwaggerService";

const swaggerUiPath = require("swagger-ui-dist").absolutePath();
const ejs = require("ejs");

@Service()
export class SwaggerModule implements AfterRoutesInit, OnServerReady {
  constructor(
    private swaggerService: SwaggerService,
    private serverSettingsService: ServerSettingsService,
    @ExpressApplication private expressApplication: Express.Application
  ) {}

  /**
   *
   */
  $afterRoutesInit() {
    const swagger: ISwaggerSettings[] = [].concat(this.serverSettingsService.get("swagger")).filter(o => !!o);

    const urls: any[] = swagger.reduce((acc: any[], conf) => {
      const {path = "/", doc, hidden} = conf;
      if (!hidden) {
        acc.push({url: `${path}/swagger.json`, name: doc || path});
      }

      return acc;
    }, []);

    swagger.forEach((conf: ISwaggerSettings) => {
      const {path = "/", options = {}, outFile, showExplorer, cssPath, jsPath} = conf;
      const spec = this.swaggerService.getOpenAPISpec(conf);
      const scope = {
        spec,
        url: `${path}/swagger.json`,
        urls,
        showExplorer,
        cssPath,
        jsPath,
        swaggerOptions: options
      };

      this.expressApplication.get(path, this.middlewareRedirect(path));
      this.expressApplication.use(path, this.createRouter(conf, scope));
      if (outFile) {
        Fs.writeFileSync(outFile, JSON.stringify(spec, null, 2));
      }
    });
  }

  $onServerReady() {
    const host = this.serverSettingsService.getHttpPort();
    const swagger: ISwaggerSettings[] = [].concat(this.serverSettingsService.get("swagger")).filter(o => !!o);
    swagger.forEach((conf: ISwaggerSettings) => {
      const {path = "/", doc} = conf;
      $log.info(`[${doc || "default"}] Swagger JSON is available on http://${host.address}:${host.port}${path}/swagger.json`);
      $log.info(`[${doc || "default"}] Swagger UI is available on http://${host.address}:${host.port}${path}/`);
    });
  }

  /**
   *
   * @param {ISwaggerSettings} conf
   * @param scope
   */
  private createRouter(conf: ISwaggerSettings, scope: any) {
    const {cssPath, jsPath} = conf;
    const router = Express.Router();

    router.get("/", this.middlewareIndex(scope));
    router.get("/swagger.json", (req: any, res: any) => res.status(200).json(scope.spec));
    router.use(Express.static(swaggerUiPath));

    if (cssPath) {
      router.get("/main.css", this.middlewareCss(cssPath));
    }

    if (jsPath) {
      router.get("/main.js", this.middlewareJs(jsPath));
    }

    return router;
  }

  private middlewareRedirect(path: string) {
    /* istanbul ignore next */
    return (req: any, res: any, next: any) => {
      if (req.url === path && !req.url.match(/\/$/)) {
        res.redirect(path + "/");
      } else {
        next();
      }
    };
  }

  /**
   *
   * @param scope
   * @returns {(req: any, res: any) => any}
   */
  private middlewareIndex(scope: any) {
    /* istanbul ignore next */
    return (req: any, res: any) =>
      ejs.renderFile(__dirname + "/../views/index.ejs", scope, {}, (err: any, str: string) => {
        if (err) {
          $log.error(err);
          res.status(500).send(err.message);
        } else {
          res.send(str);
        }
      });
  }

  /**
   *
   * @param {e.Router} router
   * @param {string} path
   */
  private middlewareCss(path: string) {
    /* istanbul ignore next */
    return (req: any, res: any) => {
      const content = Fs.readFileSync(PathUtils.resolve(this.serverSettingsService.resolve(path)), {encoding: "utf8"});
      res.set("Content-Type", "text/css");
      res.status(200).send(content);
    };
  }

  /**
   *
   * @param {e.Router} router
   * @param {string} path
   */
  private middlewareJs(path: string) {
    /* istanbul ignore next */
    return (req: any, res: any) => {
      const content = Fs.readFileSync(PathUtils.resolve(this.serverSettingsService.resolve(path)), {encoding: "utf8"});
      res.set("Content-Type", "application/javascript");
      res.status(200).send(content);
    };
  }
}
