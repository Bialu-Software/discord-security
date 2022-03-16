//ANTIRAID DEFAULT CONFIGURATION (DON'T CHANGE)
const usersMap = new Map();
const LIMIT = 4;
const TIME = 4000;
const DIFF = 5000;

function antiraid(client, message, config) {
    if(config.active === true || !config.active === false || !config.active){
    // CONFIGURATION
    let log_channel: any = ""
    let ban_message = ``
    let no_ban_minutes = 30

    if(message.author.bot){
        if(config.react_to_bots === false){
            return
        }
    }

    if(!config.log_channel){
        log_channel = false
    }
    else{
        log_channel = config.log_channel
    }

    if(!config.ban_message){
        ban_message = `${message.author.tag} has been banned`
    }
    else{
        ban_message = config.ban_message
    }

        // ALGORITHM
        if (usersMap.has(message.author.id)) {
            const userData = usersMap.get(message.author.id);
            const { lastMessage, timer } = userData;
            const difference = message.createdTimestamp - lastMessage.createdTimestamp;
            if (difference > DIFF) {
                clearTimeout(timer);
                userData.msgCount = 1;
                userData.message = message;
                userData.timer = setTimeout(() => {
                    usersMap.delete(message.author.id);
                }, TIME);
                usersMap.set(message.author.id, userData);
            } else {
                let msgCount = userData.msgCount;
                msgCount++;
                if (parseInt(msgCount) === LIMIT) {
                        const message  = userData.lastMessage;
                        let banUser = message.guild.members.cache.get(userData.lastMessage.author.id);

                        const userJoinTimestamp: any = `${String(message.member.joinedTimestamp).substring(0, String(message.member.joinedTimestamp).length - 3)}`;
                        const timestamp = Math.floor(Date.now() / 1000);
                        const timeSecJoin = timestamp - userJoinTimestamp;
                        const timeMinJoin = timeSecJoin / 60;

                        if(message.member.kickable) {
                            if(timeMinJoin >= no_ban_minutes || userJoinTimestamp === "null") {
                                console.log(`${message.author.tag} has been muted`);
                            } else {
                                banUser.ban({ days: 7 });
                                if (!log_channel === false){
                                    log_channel = client.channels.cache.get(log_channel);
                                    log_channel.send(ban_message)
                                }  
                            }
                        } else {
                            console.log(`${message.author.tag} has not been banned or muted`);
                        }

                } else {
                    userData.msgCount = msgCount;
                    usersMap.set(message.author.id, userData);
                }
            }
        } else {
            let fn = setTimeout(() => {
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
import { version } from "../package.json"

module.exports = {
    antiraid,
    version
}
