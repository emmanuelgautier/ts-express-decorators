(window.webpackJsonp=window.webpackJsonp||[]).push([[454],{663:function(t,e,s){"use strict";s.r(e);var a=s(0),r=Object(a.a)({},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content"},[t._m(0),t._v(" "),t._m(1),t._v(" "),s("p",[t._v("All middlewares decorated by "),s("code",[t._v("@Middleware")]),t._v(" or "),s("code",[t._v("@MiddlewareError")]),t._v(" have one method named "),s("code",[t._v("use()")]),t._v(".\nThis method can use all parameters decorators as you could see with the "),s("router-link",{attrs:{to:"/docs/controllers.html"}},[t._v("Controllers")]),t._v(" and return promise.")],1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),t._m(5),t._v(" "),s("p",[t._v("You have different use cases to declare and use a middleware. Theses use cases are following:")]),t._v(" "),s("ul",[s("li",[s("router-link",{attrs:{to:"/docs/middlewares/global-middleware.html"}},[t._v("Global Middleware")]),t._v(", this middleware can be used on "),s("router-link",{attrs:{to:"/api/common/server/components/ServerLoader.html"}},[t._v("ServerLoader")]),t._v(",")],1),t._v(" "),s("li",[s("router-link",{attrs:{to:"/docs/middlewares/global-error-middleware.html"}},[t._v("Global MiddlewareError")]),t._v(", this middleware error can be used on "),s("router-link",{attrs:{to:"/api/common/server/components/ServerLoader.html"}},[t._v("ServerLoader")]),t._v(",")],1),t._v(" "),s("li",[s("router-link",{attrs:{to:"/docs/middlewares/endpoint-middleware.html"}},[t._v("Endpoint Middleware")]),t._v(", this middleware can be used on a controller method,")],1),t._v(" "),s("li",[s("router-link",{attrs:{to:"/docs/middlewares/endpoint-error-middleware.html"}},[t._v("Endpoint Middleware Error")]),t._v(", this middleware can be used on a controller method.")],1)]),t._v(" "),t._m(6),t._v(" "),s("p",[t._v("In addition, you have this specifics parameters decorators for the middlewares:")]),t._v(" "),t._m(7),t._v(" "),t._m(8),t._v(" "),s("p",[t._v("The decorator "),s("router-link",{attrs:{to:"/api/common/mvc/decorators/class/OverrideMiddleware.html"}},[t._v("@OverrideMiddleware")]),t._v(" gives you the ability to\noverride some internal Ts.ED middlewares like:")],1),t._v(" "),s("ul",[s("li",[s("router-link",{attrs:{to:"/docs/middlewares/override/send-response.html"}},[t._v("Send response")])],1),t._v(" "),s("li",[s("router-link",{attrs:{to:"/docs/middlewares/override/authentication.html"}},[t._v("Authentication")])],1),t._v(" "),s("li",[s("router-link",{attrs:{to:"/docs/middlewares/override/response-view.html"}},[t._v("Response view")])],1),t._v(" "),s("li",[s("router-link",{attrs:{to:"/docs/middlewares/override/global-error-handler.html"}},[t._v("Global error handler")])],1)]),t._v(" "),s("blockquote",[s("p",[t._v("All middlewares provided by Ts.ED can be overridden. You can find the complete list "),s("router-link",{attrs:{to:"/api.html"}},[t._v("here")]),t._v(".")],1)]),t._v(" "),t._m(9),t._v(" "),t._m(10),s("div",{staticClass:"tip custom-block"},[s("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),s("p",[t._v("By default, the server import automatically you middlewares matching with this rules "),s("code",[t._v("${rootDir}/middlewares/**/*.ts")]),t._v(" (See "),s("router-link",{attrs:{to:"/configuration.html"}},[t._v("componentScan configuration")]),t._v(").")],1),t._v(" "),t._m(11),s("p",[t._v("If not, just import your middleware in your server or edit the "),s("router-link",{attrs:{to:"/configuration.html"}},[t._v("componentScan configuration")]),t._v(".")],1),t._v(" "),t._m(12)])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"middlewares"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#middlewares","aria-hidden":"true"}},[this._v("#")]),this._v(" Middlewares")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("code",[this._v("@Middleware()")]),this._v(" is similar to the Express middleware with the difference that it's a class and you can use the IoC\nto inject other services on his constructor.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"installation"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#installation","aria-hidden":"true"}},[this._v("#")]),this._v(" Installation")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("To begin, you must adding the "),e("code",[this._v("middlewares")]),this._v(" folder on "),e("code",[this._v("componentsScan")]),this._v(" attribute in your server settings as follow :")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-typescript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-typescript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("ServerLoader"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@tsed/common"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Path "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("require")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"path"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" rootDir "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Path"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__dirname"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n@"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ServerSettings")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   rootDir"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n   mount"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/rest'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("rootDir"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("/controllers/**/**.js`")])]),t._v("\n   "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n   componentsScan"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n       "),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("rootDir"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("/services/**/**.js`")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n       "),s("span",{pre:!0,attrs:{class:"token template-string"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v("`")]),s("span",{pre:!0,attrs:{class:"token interpolation"}},[s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("rootDir"),s("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("/middlewares/**/**.js`")])]),t._v("\n   "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Server")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ServerLoader")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Then, create a new file in your middlewares folder. Create a new Class definition then add the "),e("code",[this._v("@Middleware()")]),this._v("\nor "),e("code",[this._v("@MiddlewareError()")]),this._v(" annotations on your class.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"specifics-parameters-decorators"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#specifics-parameters-decorators","aria-hidden":"true"}},[this._v("#")]),this._v(" Specifics parameters decorators")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("table",[s("thead",[s("tr",[s("th",[t._v("Signature")]),t._v(" "),s("th",[t._v("Example")]),t._v(" "),s("th",[t._v("Description")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[s("code",[t._v("@Err()")])]),t._v(" "),s("td",[s("code",[t._v("useMethod(@Err() err: any) {}")])]),t._v(" "),s("td",[t._v("Inject the "),s("code",[t._v("Express.Err")]),t._v(" service. (Decorator for middleware).")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("@ResponseData()")])]),t._v(" "),s("td",[s("code",[t._v("useMethod(@ResponseData() data: any)")])]),t._v(" "),s("td",[t._v("Provide the data returned by the previous middlewares.")])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("@EndpointInfo()")])]),t._v(" "),s("td",[s("code",[t._v("useMethod(@EndpointInfo() endpoint: Endpoint)")])]),t._v(" "),s("td",[t._v("Provide the endpoint settings.")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"override-existing-middlewares"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#override-existing-middlewares","aria-hidden":"true"}},[this._v("#")]),this._v(" Override existing middlewares")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"usage"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#usage","aria-hidden":"true"}},[this._v("#")]),this._v(" Usage")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-typescript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-typescript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("OriginalMiddlware"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" OverrideMiddleware"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@tsed/common"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n@"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("OverrideMiddleware")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("OriginalMiddlware"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("CustomMiddleware")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("OriginalMiddlware")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        \n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v(".\n├── src\n│   ├── controllers\n│   ├── services\n│   ├── middlewares\n│   └── Server.ts\n└── package.json\n")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-typescript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-typescript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("ServerLoader"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" ServerSettings"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@tsed/common"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./src/other/directory/CustomMiddleware"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n@"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ServerSettings")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Server")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ServerLoader")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n \n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])}],!1,null,null,null);r.options.__file="middlewares.md";e.default=r.exports}}]);