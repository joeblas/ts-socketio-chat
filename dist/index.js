"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const parcel_bundler_1 = __importDefault(require("parcel-bundler"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const socket_1 = __importDefault(require("./socket"));
const app = express_1.default();
const server = new http_1.default.Server(app);
const io = socket_io_1.default(server);
const port = 8080 || process.env.PORT;
socket_1.default(io);
const bundler = new parcel_bundler_1.default(path_1.default.join(__dirname, '../src/client/index.html'));
app.use(bundler.middleware());
server.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map