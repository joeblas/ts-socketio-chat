"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v4_1 = __importDefault(require("uuid/v4"));
const messageExpirationTimeMS = 10 * 1000;
const defaultUser = {
    id: 'anon',
    name: 'Anonymous'
};
const sendMessage = (socket) => (message) => socket.emit('message', message);
exports.default = (io) => {
    const messages = new Set();
    io.on('connection', socket => {
        socket.on('getMessages', () => {
            messages.forEach(sendMessage(socket));
        });
        socket.on('message', (value) => {
            const message = {
                id: v4_1.default(),
                time: new Date(),
                user: defaultUser,
                value
            };
            messages.add(message);
            sendMessage(io)(message);
            setTimeout(() => {
                messages.delete(message);
                io.emit('deleteMessage', message.id);
            }, messageExpirationTimeMS);
        });
    });
};
//# sourceMappingURL=socket.js.map