import {Env, getValue, Metadata, setValue} from "@tsed/core";
import * as Https from "https";
import {$log} from "ts-log-debug";
import {ProviderScope, registerFactory, Injectable, IDISettings} from "@tsed/di";
import {SERVER_SETTINGS} from "../constants/index";
import {IErrorsSettings, ILoggerSettings, IRouterSettings, IServerMountDirectories, IServerSettings} from "../interfaces/IServerSettings";

const rootDir = process.cwd();
/**
 * @deprecated
 */
export let globalServerSettings: ServerSettingsService;
/**
 * @deprecated
 */
// tslint:disable-next-line: variable-name
export let GlobalServerSettings: ServerSettingsService;

/**
 * `ServerSettingsService` contains all information about [ServerLoader](/api/common/server/components/ServerLoader.md) configuration.
 */
export class ServerSettingsService implements IServerSettings, IDISettings {
  protected map = new Map<string, any>();

  constructor() {
    this.rootDir = rootDir;
    this.env = (process.env.NODE_ENV as Env) || Env.DEV;
    this.port = 8080;
    this.httpsPort = 8000;
    this.version = "1.0.0";
    this.uploadDir = "${rootDir}/uploads";
    this.debug = false;
    this.controllerScope = ProviderScope.SINGLETON;
    this.logger = {
      debug: false,
      logRequest: true,
      jsonIndentation: this.env === Env.PROD ? 0 : 2
    };
    this.errors = {
      headerName: "errors"
    };

    this.mount = {
      "/rest": "${rootDir}/controllers/**/*.ts"
    };

    this.exclude = ["**/*.spec.ts", "**/*.spec.js"];

    this.componentsScan = ["${rootDir}/mvc/**/*.ts", "${rootDir}/services/**/*.ts", "${rootDir}/converters/**/*.ts"];

    GlobalServerSettings = globalServerSettings = this;
  }

  /**
   *
   * @returns {any}
   */
  get version() {
    return this.map.get("version");
  }

  set version(v: string) {
    this.map.set("version", v);
  }

  /**
   *
   * @returns {any}
   */
  get rootDir() {
    return this.map.get("rootDir");
  }

  /**
   *
   * @param value
   */
  set rootDir(value: string) {
    this.map.set("rootDir", value);
  }

  /**
   *
   * @param value
   */
  set port(value: string | number) {
    this.httpPort = value;
  }

  /**
   *
   * @param value
   */
  get httpsOptions(): Https.ServerOptions {
    return this.map.get("httpsOptions");
  }

  /**
   *
   * @param value
   */
  set httpsOptions(value: Https.ServerOptions) {
    this.map.set("httpsOptions", value);
  }

  /**
   *
   * @returns {undefined|any}
   */
  get httpPort(): string | number {
    return this.map.get("httpPort");
  }

  /**
   *
   * @param value
   */
  set httpPort(value: string | number) {
    this.map.set("httpPort", value);
  }

  /**
   *
   * @returns {undefined|any}
   */
  get httpsPort(): string | number {
    return this.map.get("httpsPort");
  }

  /**
   *
   * @param value
   */
  set httpsPort(value: string | number) {
    this.map.set("httpsPort", value);
  }

  /**
   *
   * @returns {string}
   */
  get uploadDir(): string {
    return this.map.get("uploadDir");
  }

  /**
   *
   * @param value
   */
  set uploadDir(value: string) {
    this.map.set("uploadDir", value);
  }

  /**
   *
   * @returns {Map<string, any>}
   */
  get env(): Env {
    return this.map.get("env");
  }

  /**
   *
   * @param value
   */
  set env(value: Env) {
    this.map.set("env", value);
  }

  /**
   *
   * @returns {undefined|any}
   */
  get mount(): IServerMountDirectories {
    return this.map.get("mount") || {};
  }

  /**
   *
   * @param value
   */
  set mount(value: IServerMountDirectories) {
    this.map.set("mount", value);
  }

  /**
   *
   * @returns {undefined|any}
   */
  get componentsScan(): string[] {
    return this.map.get("componentsScan") || [];
  }

  /**
   *
   * @param value
   */
  set componentsScan(value: string[]) {
    this.map.set("componentsScan", value);
  }

  /**
   *
   * @returns {undefined|any}
   */
  get serveStatic(): IServerMountDirectories {
    return this.map.get("serveStatic") || {};
  }

  /**
   *
   * @param value
   */
  set serveStatic(value: IServerMountDirectories) {
    this.map.set("serveStatic", value);
  }

  /**
   *
   * @returns {undefined|any}
   */
  get acceptMimes(): string[] {
    return this.map.get("acceptMimes") || ["application/json"];
  }

  /**
   *
   * @param value
   */
  set acceptMimes(value: string[]) {
    this.map.set("acceptMimes", value || []);
  }

  /**
   *
   * @returns {boolean}
   */
  get debug(): boolean {
    return !!this.logger.debug;
  }

  /**
   *
   * @param {boolean} debug
   */
  set debug(debug: boolean) {
    this.logger = {...this.logger, debug};
  }

  /**
   *
   * @returns {IRouterSettings}
   */
  get routers(): IRouterSettings {
    return this.map.get("routers") || {};
  }

  /**
   *
   * @param {IRouterSettings} options
   */
  set routers(options: IRouterSettings) {
    this.map.set("routers", options);
  }

  /**
   *
   * @returns {boolean}
   */
  get validationModelStrict(): boolean {
    const value = this.map.get("validationModelStrict");

    return value === undefined ? true : value;
  }

  /**
   *
   * @param {boolean} value
   */
  set validationModelStrict(value: boolean) {
    this.map.set("validationModelStrict", value);
  }

  get logger(): Partial<ILoggerSettings> {
    const requestFields = this.get("logRequestFields");

    return Object.assign(
      {
        requestFields
      },
      this.map.get("logger")
    );
  }

  set logger(value: Partial<ILoggerSettings>) {
    this.map.set("logger", value);

    if (value.format) {
      $log.appenders.set("stdout", {
        type: "stdout",
        levels: ["info", "debug"],
        layout: {
          type: "pattern",
          pattern: value.format
        }
      });

      $log.appenders.set("stderr", {
        levels: ["trace", "fatal", "error", "warn"],
        type: "stderr",
        layout: {
          type: "pattern",
          pattern: value.format
        }
      });
    }
  }

  set exclude(exclude: string[]) {
    this.map.set("exclude", exclude);
  }

  get exclude() {
    return this.map.get("exclude") || [];
  }

  set controllerScope(scope: ProviderScope) {
    this.map.set("scope", scope);
  }

  get controllerScope(): ProviderScope {
    return this.map.get("scope");
  }

  /**
   *
   * @returns {IRouterSettings}
   */
  get errors(): IErrorsSettings {
    return this.map.get("errors") || {};
  }

  /**
   *
   * @param {IRouterSettings} options
   */
  set errors(options: IErrorsSettings) {
    this.map.set("errors", options);
  }

  /**
   *
   * @param target
   * @returns {any}
   */
  static getMetadata(target: any) {
    return Metadata.getOwn(SERVER_SETTINGS, target);
  }

  /**
   *
   * @param addressPort
   * @returns {{address: string, port: number}}
   */
  private static buildAddressAndPort(addressPort: string | number): {address: string; port: number} {
    let address = "0.0.0.0";
    let port = addressPort;

    if (typeof addressPort === "string" && addressPort.indexOf(":") > -1) {
      [address, port] = addressPort.split(":");
      port = +port;
    }

    return {address, port: port as number};
  }

  /**
   *
   * @param callbackfn
   * @param thisArg
   */
  forEach(callbackfn: (value: any, index: string, map: Map<string, any>) => void, thisArg?: any) {
    return this.map.forEach(callbackfn, thisArg);
  }

  /**
   *
   * @param propertyKey
   * @param value
   */
  set(propertyKey: string | IServerSettings, value?: any): this {
    if (typeof propertyKey === "string") {
      setValue(propertyKey, value, this.map);
    } else {
      const self: any = this;

      Object.keys(propertyKey).forEach(key => {
        const descriptor = Object.getOwnPropertyDescriptor(ServerSettingsService.prototype, key);

        if (descriptor && ["set", "map"].indexOf(key) === -1) {
          self[key] = propertyKey[key];
        } else {
          this.set(key, propertyKey[key]);
        }
      });

      this.forEach((value, key) => {
        this.map.set(key, this.resolve(value));
      });
    }

    return this;
  }

  /**
   *
   * @param propertyKey
   * @returns {undefined|any}
   */
  get<T>(propertyKey: string): T {
    return this.resolve(getValue(propertyKey, this.map));
  }

  /**
   *
   * @param value
   * @returns {any}
   */
  resolve(value: any) {
    if (typeof value === "object") {
      Object.keys(value).forEach((k: string, i: number, m: any) => {
        value[k] = this.resolve(value[k]);
      });

      return value;
    }

    if (typeof value === "string") {
      return value.replace(/\${rootDir}/, this.rootDir);
    }

    return value;
  }

  /**
   *
   * @returns {string|number}
   */
  getHttpPort(): {address: string; port: number} {
    return ServerSettingsService.buildAddressAndPort(this.map.get("httpPort"));
  }

  /**
   *
   * @param settings
   */
  setHttpPort(settings: {address: string; port: number}) {
    this.map.set("httpPort", `${settings.address}:${settings.port}`);
  }

  /**
   *
   * @returns {string|number}
   */
  getHttpsPort(): {address: string; port: number} {
    return ServerSettingsService.buildAddressAndPort(this.map.get("httpsPort"));
  }

  /**
   *
   * @param settings
   */
  setHttpsPort(settings: {address: string; port: number}) {
    this.map.set("httpsPort", `${settings.address}:${settings.port}`);
  }
}

registerFactory(ServerSettingsService);
