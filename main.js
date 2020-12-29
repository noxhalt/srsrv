"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Srsrv = void 0;
var http_1 = require("http");
var fs = __importStar(require("fs"));
var Srsrv = /** @class */ (function () {
    function Srsrv() {
        var _this = this;
        this.start = function (port) { return http_1.createServer(_this.serve).listen(port); };
        this.route = function (path, file, header) {
            return _this.routes.push(new Route(path, file, header));
        };
        this.routes = [];
        this.serve = function (req, res) {
            var route = _this.routes.find(function (route) { return route.url == req.url; });
            // return 404
            if (route == null) {
                res.writeHead(404, "404 Not Found");
                res.write("404 Not Found");
                res.end();
                return;
            }
            // init header
            if (route.header == null)
                route.header = {};
            // add content-length
            var stat = fs.statSync(route.file);
            route.header["Content-Length"] = stat.size;
            // set header
            res.writeHead(200, route.header);
            // pipe file stream
            var stream = fs.createReadStream(route.file);
            stream.pipe(res);
        };
    }
    return Srsrv;
}());
exports.Srsrv = Srsrv;
var Route = /** @class */ (function () {
    function Route(path, file, header) {
        this.url = path;
        this.file = file;
        this.header = header;
    }
    return Route;
}());
