import {JsonSchemesRegistry, PropertyRegistry} from "@tsed/common";
import {expect} from "chai";
import * as Sinon from "sinon";
import {MONGOOSE_SCHEMA} from "../../src/constants";
import {buildMongooseSchema, mapProps} from "../../src/utils/buildMongooseSchema";

describe("buildMongooseSchema", () => {
  describe("mapProps()", () => {
    it("should map a jsonSchema to mongoose schema", () => {
      expect(
        mapProps({
          pattern: "pattern",
          minimum: "minimum",
          maximum: "maximum",
          minLength: "minLength",
          maxLength: "maxLength",
          enum: ["value1", "value2"],
          default: "defaultValue"
        })
      ).to.deep.equal({
        match: new RegExp("pattern"),
        min: "minimum",
        max: "maximum",
        minlength: "minLength",
        maxlength: "maxLength",
        enum: ["value1", "value2"],
        default: "defaultValue"
      });
    });
  });

  describe("buildMongooseSchema()", () => {
    describe("when property is not a class", () => {
      class Test {
      }

      before(() => {
        this.propertyMetadata = {
          type: String,
          required: true,
          isClass: false,
          store: {
            get: Sinon.stub().returns({minLength: 1})
          }
        };

        const map = new Map();
        map.set("test", this.propertyMetadata);

        this.getPropertiesStub = Sinon.stub(PropertyRegistry, "getProperties").returns(map);

        this.getSchemaDefinitionStub = Sinon.stub(JsonSchemesRegistry, "getSchemaDefinition").returns({
          properties: {
            test: {
              maxLength: 9
            }
          }
        });

        this.result = buildMongooseSchema(Test);
      });
      after(() => {
        this.getPropertiesStub.restore();
        this.getSchemaDefinitionStub.restore();
      });

      it("should call getProperties and returns a list of properties", () => {
        this.getPropertiesStub.should.have.been.calledWithExactly(Test);
      });

      it("should call store.get", () => {
        this.propertyMetadata.store.get.should.have.been.calledWithExactly(MONGOOSE_SCHEMA);
      });

      it("should return a schema", () => {
        expect(this.result.test.maxlength).to.eq(9);
        expect(this.result.test.minLength).to.eq(1);
        expect(this.result.test.required).to.be.a("function");
        expect(this.result.test.type).to.eq(String);
      });
    });
    describe("when property is a class", () => {
      class Test {
      }

      class Children {
      }

      before(() => {
        this.propertyMetadata = {
          type: Children,
          required: true,
          isClass: true,
          store: {
            get: Sinon.stub().returns(undefined)
          }
        };

        const map = new Map();
        map.set("test", this.propertyMetadata);
        map.set("_id", {});

        const map2 = new Map();
        map2.set("test2", {
          type: String,
          required: false,
          isClass: false,
          isArray: true,
          store: {
            get: Sinon.stub().returns(undefined)
          }
        });

        this.getPropertiesStub = Sinon.stub(PropertyRegistry, "getProperties")
          .onFirstCall()
          .returns(map)
          .onSecondCall()
          .returns(map2);

        this.getSchemaDefinitionStub = Sinon.stub(JsonSchemesRegistry, "getSchemaDefinition")
          .onFirstCall()
          .returns({
            properties: {
              test: {}
            }
          });

        this.result = buildMongooseSchema(Test);
      });
      after(() => {
        this.getPropertiesStub.restore();
        this.getSchemaDefinitionStub.restore();
      });

      it("should call getProperties and returns a list of properties", () => {
        this.getPropertiesStub.should.have.been.calledWithExactly(Test);
      });

      it("should call store.get", () => {
        this.propertyMetadata.store.get.should.have.been.calledWithExactly(MONGOOSE_SCHEMA);
      });

      it("should return a schema", () => {
        expect(this.result.test.required).to.be.a("function");
        expect(this.result.test.required).to.be.a("function");
        expect(this.result.test.test2).deep.eq([
          {
            required: false,
            type: String
          }
        ]);
      });

      it("should not have an _id", () => {
        expect(this.result._id).to.eq(undefined);
      });
    });
  });
});
