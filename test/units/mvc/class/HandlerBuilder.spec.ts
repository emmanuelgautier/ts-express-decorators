import {inject} from "@tsed/testing";
import {BadRequest} from "ts-httpexceptions";
import "@tsed/ajv";
import {ProviderType, InjectorService} from "@tsed/di";
import {FakeRequest, FakeResponse} from "../../../helper";
import {$logStub, assert, expect, restore, Sinon} from "../../../tools";
import {EndpointMetadata, HandlerBuilder} from "../../../../packages/common/src/mvc";
import {FilterBuilder} from "../../../../packages/common/src/filters/class/FilterBuilder";

class Test {
  get() {}

  use() {}
}

describe("HandlerBuilder", () => {
  describe("from()", () => {
    describe("from Endpoint", () => {
      before(() => {
        this.builder = HandlerBuilder.from(new EndpointMetadata(Test, "get"));
      });

      it("should create builder", () => {
        expect(this.builder.handlerMetadata.target).to.eq(Test);
        expect(this.builder.handlerMetadata.methodClassName).to.eq("get");
      });
    });
    describe("from class", () => {
      before(() => {
        this.builder = HandlerBuilder.from(Test);
      });

      it("should create builder", () => {
        expect(this.builder.handlerMetadata.target).to.eq(Test);
      });
    });
    describe("from function", () => {
      before(() => {
        this.builder = HandlerBuilder.from(() => {});
      });

      it("should create builder", () => {
        expect(this.builder.handlerMetadata.target).to.be.a("function");
      });
    });
  });
  describe("build()", () => {
    before(() => {
      this.invokeStub = Sinon.stub(HandlerBuilder.prototype as any, "invoke");
    });

    after(() => {
      this.invokeStub.restore();
    });

    describe("when is a middleware", () => {
      before(
        inject([InjectorService], (injector: InjectorService) => {
          this.response = new FakeResponse();
          this.request = new FakeRequest();
          this.nextSpy = Sinon.spy();
          this.stub = Sinon.stub();

          this.metadata = {
            nextFunction: false,
            errorParam: false,
            target: (req: any, res: any) => {
              this.stub(req, res);
            },
            services: [{param: "param"}]
          };

          this.filterBuildStub = Sinon.stub(FilterBuilder.prototype, "build");

          this.middleware = new HandlerBuilder(this.metadata).build(injector as any);
          this.middleware({request: "request"}, {response: "response"}, "function");
        })
      );

      after(() => {
        this.filterBuildStub.restore();
      });

      it("should have called invoke method with the correct parameters", () => {
        this.invokeStub.should.have.been.calledWithExactly({request: "request"}, {response: "response"}, "function");
      });

      it("should have called FilterBuilder.build method", () => {
        this.filterBuildStub.should.have.been.calledWithExactly({param: "param"});
      });
    });

    describe("when is an error middleware", () => {
      before(
        inject([InjectorService], (injector: InjectorService) => {
          this.response = new FakeResponse();
          this.request = new FakeRequest();
          this.nextSpy = Sinon.spy();
          this.stub = Sinon.stub();

          this.metadata = {
            nextFunction: false,
            errorParam: true,
            target: (req: any, res: any) => {
              this.stub(req, res);
            },
            services: [{param: "param"}]
          };

          this.middleware = new HandlerBuilder(this.metadata).build(injector as any);
          this.middleware("error", {request: "request"}, {response: "response"}, "function");
        })
      );

      after(() => {
        this.filterBuildStub.restore();
      });

      it("should call invoke method with the correct parameters", () => {
        this.invokeStub.should.have.been.calledWithExactly({request: "request"}, {response: "response"}, "function", "error");
      });

      it("should have called FilterBuilder.build method", () => {
        this.filterBuildStub.should.have.been.calledWithExactly({param: "param"});
      });
    });
  });
  describe("buildNext()", () => {
    describe("when header is not sent", () => {
      before(() => {
        $logStub.reset();
        this.handlerMetadata = {};
        this.handlerBuilder = new HandlerBuilder(this.handlerMetadata);

        this.nextStub = Sinon.stub();
        this.infoStub = Sinon.stub(this.handlerBuilder, "log").returns("log");

        this.handlerBuilder.buildNext({tagId: "1"}, {}, this.nextStub)();
      });

      it("should change the nextCalled state", () => {
        expect(this.nextStub.isCalled).to.eq(true);
      });
      it("should have called the info method", () => {
        this.infoStub.should.have.been.calledWithExactly({tagId: "1"}, {error: undefined, event: "invoke.end"});
      });
    });

    describe("when header is sent", () => {
      before(() => {
        $logStub.reset();
        this.handlerMetadata = {};
        this.handlerBuilder = new HandlerBuilder(this.handlerMetadata);

        this.nextStub = Sinon.stub();
        this.infoStub = Sinon.stub(this.handlerBuilder, "log").returns("log");

        this.handlerBuilder.buildNext({tagId: "1"}, {headersSent: true}, this.nextStub)();
      });

      it("should change the nextCalled state", () => {
        expect(this.nextStub.isCalled).to.eq(true);
      });
      it("should have called the info method", () => {
        this.infoStub.should.not.have.been.called;
      });
      it("should have called the log.debug with the correct parameters", () => {
        $logStub.debug.should.not.have.been.called;
      });
    });
  });
  describe("log", () => {
    before(() => {
      this.metadata = {
        target: class Test {},
        type: "type",
        nextFunction: false,
        injectable: false,
        methodClassName: "methodName"
      };
      this.request = {
        id: "id",
        log: {
          debug: Sinon.stub()
        },
        getStoredData() {
          return "data";
        }
      };
      const handlerBuilder: any = new HandlerBuilder(this.metadata);
      (handlerBuilder as any).debug = true;
      handlerBuilder.log(this.request);
    });

    it("should create a log", () => {
      this.request.log.debug.should.be.calledWithExactly({
        data: "data",
        injectable: false,
        methodName: "methodName",
        target: "Test",
        type: "type"
      });
    });
  });
  describe("invoke()", () => {
    describe("when handler return data", () => {
      before(() => {
        this.response = new FakeResponse();
        this.request = {
          storeData: Sinon.stub(),
          getContainer: Sinon.stub()
        };
        this.nextSpy = Sinon.stub();
        this.getStub = Sinon.stub(Test.prototype, "get").returns({response: "body"} as any);

        this.metadata = {
          type: "controller",
          nextFunction: false
        };

        const handlerBuilder: any = new HandlerBuilder(this.metadata);
        this.buildNextStub = Sinon.stub(handlerBuilder, "buildNext").returns(this.nextSpy);
        this.runFiltersStub = Sinon.stub(handlerBuilder, "runFilters").returns(["parameters"]);
        this.handlerStub = Sinon.stub().returns("someData");
        this.getHandlerStub = Sinon.stub(handlerBuilder, "getHandler").returns(this.handlerStub);

        return handlerBuilder.invoke(this.request, this.response, this.nextSpy);
      });

      after(() => {
        restore(Test.prototype.get);
      });

      it("should have called the buildNext method", () => {
        this.buildNextStub.should.have.been.calledWithExactly(this.request, this.response, this.nextSpy);
      });

      it("should have called the locals method", () => {
        return this.runFiltersStub.should.have.been.calledOnce.and.calledWithExactly(this.request, this.response, this.nextSpy, undefined);
      });

      it("should have called the handler", () => {
        this.handlerStub.should.have.been.calledWithExactly("parameters");
      });

      it("should have called the next callback", () => this.nextSpy.should.have.been.calledWithExactly());

      it("should store data", () => {
        return this.request.storeData.should.have.been.calledWithExactly("someData");
      });

      it("should call getContainer", () => {
        return this.request.getContainer.should.have.been.calledWithExactly();
      });
    });
    describe("when handler return data (nextFunction && function type)", () => {
      before(() => {
        $logStub.reset();
        this.response = new FakeResponse();
        this.request = {
          tagId: "1",
          storeData: Sinon.stub(),
          getContainer: Sinon.stub()
        };
        this.nextSpy = Sinon.stub();
        this.getStub = Sinon.stub(Test.prototype, "get").returns({response: "body"} as any);

        this.metadata = {
          tagId: "1",
          type: "function",
          nextFunction: true
        };

        const handlerBuilder: any = new HandlerBuilder(this.metadata);
        this.logStub = Sinon.stub(handlerBuilder, "log").returns("log");
        this.buildNextStub = Sinon.stub(handlerBuilder, "buildNext").returns(this.nextSpy);
        this.runFiltersStub = Sinon.stub(handlerBuilder, "runFilters").returns(["parameters"]);
        this.handlerStub = Sinon.stub().returns("someData");
        this.getHandlerStub = Sinon.stub(handlerBuilder, "getHandler").returns(this.handlerStub);

        return handlerBuilder.invoke(this.request, this.response, this.nextSpy);
      });

      after(() => {
        restore(Test.prototype.get);
      });
      it("should have called the buildNext method", () => {
        this.buildNextStub.should.have.been.calledWithExactly(this.request, this.response, this.nextSpy);
      });

      it("should have called the locals method", () => {
        return this.runFiltersStub.should.have.been.calledOnce.and.calledWithExactly(this.request, this.response, this.nextSpy, undefined);
      });

      it("should have called the handler", () => {
        this.handlerStub.should.have.been.calledWithExactly("parameters");
      });

      it("should not have called the next callback", () => this.nextSpy.should.not.have.been.called);

      it("should not store data", () => {
        return this.request.storeData.should.not.have.been.called;
      });
    });
    describe("when next isCalled", () => {
      before(() => {
        $logStub.reset();
        this.response = new FakeResponse();
        this.request = {
          tagId: "1",
          storeData: Sinon.stub(),
          getContainer: Sinon.stub()
        };
        this.nextSpy = Sinon.stub();
        this.getStub = Sinon.stub(Test.prototype, "get").returns({response: "body"} as any);

        this.metadata = {
          tagId: "1",
          type: "controller",
          nextFunction: false
        };

        const handlerBuilder: any = new HandlerBuilder(this.metadata);
        this.logStub = Sinon.stub(handlerBuilder, "log").returns("log");
        this.buildNextStub = Sinon.stub(handlerBuilder, "buildNext").returns(this.nextSpy);
        this.runFiltersStub = Sinon.stub(handlerBuilder, "runFilters").returns(["parameters"]);
        this.handlerStub = Sinon.stub().returns("someData");

        this.getHandlerStub = Sinon.stub(handlerBuilder, "getHandler").returns((...args: any[]) => {
          this.nextSpy.isCalled = true;

          return this.handlerStub(...args);
        });

        return handlerBuilder.invoke(this.request, this.response, this.nextSpy);
      });

      after(() => {
        restore(Test.prototype.get);
      });
      it("should have called the buildNext method", () => {
        this.buildNextStub.should.have.been.calledWithExactly(this.request, this.response, this.nextSpy);
      });

      it("should have called the locals method", () => {
        return this.runFiltersStub.should.have.been.calledOnce.and.calledWithExactly(this.request, this.response, this.nextSpy, undefined);
      });

      it("should have called the handler", () => {
        this.handlerStub.should.have.been.calledWithExactly("parameters");
      });

      it("should not have called the next callback", () => this.nextSpy.should.not.have.been.called);

      it("should not store data", () => {
        return this.request.storeData.should.not.have.been.called;
      });
    });
    describe("when handler thrown an error", () => {
      before(() => {
        this.response = new FakeResponse();
        this.request = {
          storeData: Sinon.stub(),
          getContainer: Sinon.stub()
        };
        this.error = new Error("test");
        this.nextSpy = Sinon.stub();
        this.getStub = Sinon.stub(Test.prototype, "get").returns({response: "body"} as any);

        this.metadata = {
          type: "controller",
          nextFunction: false,
          target: Test,
          methodClassName: "get",
          services: []
        };

        const handlerBuilder: any = new HandlerBuilder(this.metadata);
        this.buildNextStub = Sinon.stub(handlerBuilder, "buildNext").returns(this.nextSpy);
        this.runFiltersStub = Sinon.stub(handlerBuilder, "runFilters").returns(["parameters"]);
        this.handlerStub = Sinon.stub().throws(this.error);
        this.getHandlerStub = Sinon.stub(handlerBuilder, "getHandler").returns(this.handlerStub);

        return handlerBuilder.invoke(this.request, this.response, this.nextSpy);
      });

      after(() => {
        restore(Test.prototype.get);
      });

      it("should have called the buildNext method", () => {
        this.buildNextStub.should.have.been.calledWithExactly(this.request, this.response, this.nextSpy);
      });

      it("shoudl have called the getHandler method", () => {
        return this.getHandlerStub.should.have.been.calledOnce;
      });

      it("should have called the locals method", () => {
        return this.runFiltersStub.should.have.been.calledOnce.and.calledWithExactly(this.request, this.response, this.nextSpy, undefined);
      });

      it("should have called the handler", () => {
        this.handlerStub.should.have.been.calledWithExactly("parameters");
      });

      it("should call next spy", () => this.nextSpy.should.have.been.calledWithExactly(this.error));

      it("should not store data", () => {
        return this.request.storeData.should.not.have.been.called;
      });
    });
  });
  describe("getHandler()", () => {
    describe("function", () => {
      before(() => {
        this.handlerMetadata = {
          type: "function",
          target: "target"
        };
        this.handlerBuilder = new HandlerBuilder(this.handlerMetadata);
      });

      it("should return the function handler", () => {
        this.handlerBuilder.getHandler().should.eq("target");
      });
      it("should return the function handler without rebuild", () => {
        this.handlerBuilder.getHandler().should.eq("target");
      });
    });
    describe("component (middleware)", () => {
      before(() => {
        this.handlerMetadata = {
          type: ProviderType.MIDDLEWARE,
          target: "target"
        };
        this.handlerBuilder = new HandlerBuilder(this.handlerMetadata);
        this.buildHandlerStub = Sinon.stub(this.handlerBuilder, "buildHandler");
        this.buildHandlerStub.returns("handlerMiddleware");
        this.result = this.handlerBuilder.getHandler();
      });

      it("should have called the middlewareHandler method", () => {
        return this.buildHandlerStub.should.have.been.called;
      });

      it("should return the function handler", () => {
        this.result.should.eq("handlerMiddleware");
      });
    });
    describe("component (controller)", () => {
      before(() => {
        this.handlerMetadata = {
          type: ProviderType.CONTROLLER,
          target: "target"
        };
        this.handlerBuilder = new HandlerBuilder(this.handlerMetadata);
        this.buildHandlerStub = Sinon.stub(this.handlerBuilder, "buildHandler");
        this.buildHandlerStub.returns("endpointHandler");
        this.result = this.handlerBuilder.getHandler();
      });
      it("should have called the middlewareHandler method", () => {
        return this.buildHandlerStub.should.have.been.called;
      });

      it("should return the function handler", () => {
        this.result.should.eq("endpointHandler");
      });
    });
  });
  describe("buildHandler()", () => {
    describe("when component is known", () => {
      before(
        inject([InjectorService], (injector: InjectorService) => {
          this.instance = {
            method: () => {}
          };
          this.invokeStub = Sinon.stub(injector, "invoke");
          this.invokeStub.returns(this.instance);

          this.injectorGetProvider = Sinon.stub(injector, "getProvider");
          this.injectorGetProvider.returns({
            useClass: "providerClass"
          });
          this.handlerMetadata = {
            target: "target",
            methodClassName: "method"
          };
          this.handlerBuilder = new HandlerBuilder(this.handlerMetadata);
          this.handlerBuilder.injector = injector;

          this.locals = new Map<string | Function, any>();
          this.result = this.handlerBuilder.buildHandler(this.locals);
        })
      );

      after(() => {
        this.injectorGetProvider.restore();
        this.invokeStub.restore();
      });

      it("should have called the ProviderRegistry.get method", () => {
        this.injectorGetProvider.should.have.been.calledWithExactly("target");
      });
      it("should have called the invoke method", () => {
        this.invokeStub.should.have.been.calledWithExactly("providerClass", this.locals, undefined, true);
      });
      it("should return the handler", () => {
        this.result.should.have.been.a("function");
      });
    });
    describe("when component is known and instance is already built", () => {
      before(
        inject([InjectorService], (injector: InjectorService) => {
          this.instance = {
            method: () => {}
          };
          this.invokeStub = Sinon.stub(injector, "invoke");
          this.injectorGetProvider = Sinon.stub(injector, "getProvider");
          this.injectorGetProvider.returns({
            useClass: "providerClass",
            instance: this.instance,
            scope: "singleton"
          });

          this.handlerMetadata = {
            target: "target",
            methodClassName: "method"
          };
          this.handlerBuilder = new HandlerBuilder(this.handlerMetadata);
          this.handlerBuilder.injector = injector;

          this.result = this.handlerBuilder.buildHandler();
        })
      );

      after(() => {
        this.injectorGetProvider.restore();
        this.invokeStub.restore();
      });

      it("should have called the ProviderRegistry.get method", () => {
        this.injectorGetProvider.should.have.been.calledWithExactly("target");
      });
      it("should not have called the invoke method", () => {
        this.invokeStub.should.not.be.called;
      });
      it("should return the handler", () => {
        this.result.should.have.been.a("function");
      });
    });
    describe("when component is unknown", () => {
      before(
        inject([InjectorService], (injector: InjectorService) => {
          this.invokeStub = Sinon.stub(injector, "invoke");

          this.injectorGetProvider = Sinon.stub(injector, "get");
          this.injectorGetProvider.returns(undefined);
          this.handlerMetadata = {
            target: "target",
            methodClassName: "method"
          };
          this.handlerBuilder = new HandlerBuilder(this.handlerMetadata);
          this.handlerBuilder.injector = injector;
        })
      );

      after(() => {
        this.injectorGetProvider.restore();
        this.invokeStub.restore();
      });

      it("should throw an exception", () => {
        assert.throws(() => this.handlerBuilder.buildHandler(), "target component not found in the injector");
      });
    });
  });

  describe("runFilters()", () => {
    describe("when success", () => {
      before(() => {
        this.handlerMetadata = {};
        this.handlerBuilder = new HandlerBuilder(this.handlerMetadata);
        this.handlerBuilder.filters = [Sinon.stub().returns("value1"), Sinon.stub().returns("value2")];

        this.result = this.handlerBuilder.runFilters("request", "response", "next", "err");
      });

      it("should call the filters", () => {
        this.handlerBuilder.filters[0].should.have.been.calledWithExactly({
          request: "request",
          response: "response",
          next: "next",
          err: "err"
        });
        this.handlerBuilder.filters[1].should.have.been.calledWithExactly({
          request: "request",
          response: "response",
          next: "next",
          err: "err"
        });
      });
      it("should return a list of values for each param", () => {
        expect(this.result).to.deep.eq(["value1", "value2"]);
      });
    });

    describe("when there is a bad request", () => {
      before(() => {
        this.handlerMetadata = {name: "name", expression: "expression"};
        this.handlerBuilder = new HandlerBuilder(this.handlerMetadata);
        this.handlerBuilder.filters = [Sinon.stub().throwsException(new BadRequest("BadRequest"))];
        this.handlerBuilder.filters[0].param = this.handlerMetadata;

        try {
          this.handlerBuilder.runFilters("request", "response", "next", "err");
        } catch (er) {
          this.error = er;
        }
      });

      it("should call the filters", () => {
        this.handlerBuilder.filters[0].should.have.been.calledWithExactly({
          request: "request",
          response: "response",
          next: "next",
          err: "err"
        });
      });
      it("should throw error", () => {
        expect(this.error.name).to.eq("BAD_REQUEST");
      });
    });

    describe("when an unknow error", () => {
      before(() => {
        this.handlerMetadata = {name: "name", expression: "expression"};
        this.handlerBuilder = new HandlerBuilder(this.handlerMetadata);
        this.handlerBuilder.filters = [Sinon.stub().throwsException(new Error("BadRequest"))];
        this.handlerBuilder.filters[0].param = this.handlerMetadata;

        try {
          this.handlerBuilder.runFilters("request", "response", "next", "err");
        } catch (er) {
          this.error = er;
        }
      });

      it("should call the filters", () => {
        this.handlerBuilder.filters[0].should.have.been.calledWithExactly({
          request: "request",
          response: "response",
          next: "next",
          err: "err"
        });
      });
      it("should throw error", () => {
        expect(this.error.name).to.deep.eq(new Error("BadRequest").name);
      });
    });
  });
});
