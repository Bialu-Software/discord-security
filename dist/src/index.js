"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//ANTIRAID DEFAULT CONFIGURATION (DON'T CHANGE)
var usersMap = new Map();
var LIMIT = 4;
var TIME = 4000;
var DIFF = 5000;
function antiraid(client, message, config) {
    if (config.active === true || !config.active === false || !config.active) {
        // CONFIGURATION
        var log_channel = "";
        var ban_message = "";
        var no_ban_minutes = 30;
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
            ban_message = "".concat(message.author.tag, " has been banned");
        }
        else {
            ban_message = config.ban_message;
        }
        // ALGORITHM
        if (usersMap.has(message.author.id)) {
            var userData = usersMap.get(message.author.id);
            var lastMessage = userData.lastMessage, timer = userData.timer;
            var difference = message.createdTimestamp - lastMessage.createdTimestamp;
            if (difference > DIFF) {
                clearTimeout(timer);
                userData.msgCount = 1;
                userData.message = message;
                userData.timer = setTimeout(function () {
                    usersMap.delete(message.author.id);
                }, TIME);
                usersMap.set(message.author.id, userData);
            }
            else {
                var msgCount = userData.msgCount;
                msgCount++;
                if (parseInt(msgCount) === LIMIT) {
                    var message_1 = userData.lastMessage;
                    var banUser = message_1.guild.members.cache.get(userData.lastMessage.author.id);
                    var userJoinTimestamp = "".concat(String(message_1.member.joinedTimestamp).substring(0, String(message_1.member.joinedTimestamp).length - 3));
                    var timestamp = Math.floor(Date.now() / 1000);
                    var timeSecJoin = timestamp - userJoinTimestamp;
                    var timeMinJoin = timeSecJoin / 60;
                    if (message_1.member.kickable) {
                        if (timeMinJoin >= no_ban_minutes || userJoinTimestamp === "null") {
                            console.log("".concat(message_1.author.tag, " has been muted"));
                        }
                        else {
                            banUser.ban({ days: 7 });
                            if (!log_channel === false) {
                                log_channel = client.channels.cache.get(log_channel);
                                log_channel.send(ban_message);
                            }
                        }
                    }
                    else {
                        console.log("".concat(message_1.author.tag, " has not been banned or muted"));
                    }
                }
                else {
                    userData.msgCount = msgCount;
                    usersMap.set(message.author.id, userData);
                }
            }
        }
        else {
            var fn = setTimeout(function () {
                usersMap.delete(message.author.id);
            }, TIME);
            usersMap.set(message.author.id, {
                msgCount: 1,
                lastMessage: message,
                timer: fn,
            });
        }
    }
}
// const version = require("./package.json").version
var package_json_1 = require("../package.json");
module.exports = {
    antiraid: antiraid,
    version: package_json_1.version
};
//# sourceMappingURL=index.js.map