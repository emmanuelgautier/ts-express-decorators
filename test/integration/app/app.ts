import "@tsed/ajv";
import {ProviderScope, ProviderType, ServerLoader, ServerSettings} from "@tsed/common";
import "@tsed/mongoose";
import "@tsed/multipartfiles";
import "@tsed/socketio";
import "@tsed/swagger";
import * as Path from "path";
import {$log} from "ts-log-debug";
import {ErrorsCtrl} from "./controllers/errors/ErrorsCtrl";
import {SocketPageCtrl} from "./controllers/pages/SocketPageCtrl";
import {ProductsCtrl} from "./controllers/products/ProductsCtrl";

import {RestCtrl} from "./controllers/RestCtrl";
import TestAcceptMimeMiddleware from "./middlewares/acceptmime";
import "./middlewares/authentication";
import {NotFoundMiddleware} from "./middlewares/NotFoundMiddleware";
import {InitSessionMiddleware} from "./middlewares/InitSessionMiddleware";

const rootDir = Path.resolve(__dirname);
const spec = require(`${rootDir}/spec/swagger.default.json`);

@ServerSettings({
  rootDir,
  port: 8001,
  httpsPort: false,
  logger: {
    debug: true
  },
  mount: {
    "/": [SocketPageCtrl],
    "/rest": ["${rootDir}/controllers/Base/**.js", "${rootDir}/controllers/calendars/**.ts", ErrorsCtrl, RestCtrl, ProductsCtrl],
    "/rest/v1": "${rootDir}/controllers/{calendars,users}/**.ts"
  },

  componentsScan: ["${rootDir}/services/**/*.ts"],

  uploadDir: "${rootDir}/uploads",

  serveStatic: {
    "/": "${rootDir}/views"
  },

  swagger: [
    {
      path: "/api-doc",
      cssPath: "${rootDir}/spec/style.css",
      showExplorer: true,
      spec
    },
    {
      path: "/errors-doc",
      doc: "errors",
      showExplorer: true,
      spec
    },
    {
      path: "/hidden-doc",
      doc: "hidden",
      showExplorer: true,
      spec
    }
  ],
  scopes: {
    [ProviderType.CONTROLLER]: ProviderScope.REQUEST
  }
})
export class ExampleServer extends ServerLoader {
  /**
   * This method let you configure the middleware required by your application to works.
   * @returns {Server}
   */
  public $onMountingMiddlewares(): void {
    const cookieParser = require("cookie-parser"),
      bodyParser = require("body-parser"),
      compress = require("compression"),
      methodOverride = require("method-override"),
      expressSession = require("express-session");

    this.use(TestAcceptMimeMiddleware)
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        })
      )
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride());

    console.log("`${rootDir}/views`", `${rootDir}/views`);

    this.engine(".html", require("ejs").__express)
      .set("views", `${rootDir}/views`)
      .set("view engine", "html");

    this.set("trust proxy", 1);
    this.use(
      expressSession({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: {}
      })
    );

    this.use(InitSessionMiddleware);
  }

  public $afterRoutesInit() {
    this.use(NotFoundMiddleware);
  }

  /**
   *
   */
  public $onReady() {
    $log.info("Server started...");
  }
}

if (process.env.NODE_ENV !== "test")
  new ExampleServer().start().catch(er => {
    console.error(er);
  });
