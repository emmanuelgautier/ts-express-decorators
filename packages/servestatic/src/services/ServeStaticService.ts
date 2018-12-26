import * as Express from "express";
import {ServerSettingsService, Service, ExpressApplication} from "@tsed/common";

@Service()
export class ServeStaticService {
  constructor(@ExpressApplication private expressApp: Express.Application, private serverSettingsService: ServerSettingsService) {}

  $afterRoutesInit() {
    /* istanbul ignore else */
    Object.keys(this.serverSettingsService.serveStatic).forEach(path => {
      [].concat(this.serverSettingsService.serveStatic[path] as any).forEach((directory: string) => this.mount(path, directory));
    });
  }

  mount(path: string, directory: string) {
    const middleware = Express.static(directory);
    this.expressApp.use(path, (request: any, response: any, next: any) => {
      if (!response.headersSent) {
        middleware(request, response, next);
      } else {
        next();
      }
    });
  }
}
