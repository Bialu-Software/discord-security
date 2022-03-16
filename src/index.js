"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antiraid_1 = __importDefault(require("./antiraid"));
const package_json_1 = require("../package.json");
const usersMap = new Map();
const LIMIT = 4;
const TIME = 4000;
const DIFF = 5000;
function antiraid(client, message, config) {
    if (config.active === true || !config.active === false || !config.active) {
        // CONFIGURATION
        let log_channel = "";
        let ban_message = ``;
        let no_ban_minutes = 30;
        if (message.author.bot) {
            if (config.react_to_bots === false) {
                return;
            }
        }
        if (!config.log_channel) {
            log_channel = false;
        }
        else {
            log_channel = config.log_channel;
        }
        if (!config.ban_message) {
            ban_message = `${message.author.tag} has been banned`;
        }
        else {
            ban_message = config.ban_message;
        }
        // ALGORITHM
        (0, antiraid_1.default)(client, message, usersMap, LIMIT, TIME, DIFF, log_channel, ban_message, no_ban_minutes);
    }
}
exports.default = { antiraid, version: package_json_1.version };
