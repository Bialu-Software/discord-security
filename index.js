//ANTIRAID DEFAULT CONFIGURATION (DON'T CHANGE)
const usersMap = new Map();
const LIMIT = 4;
const TIME = 4000;
const DIFF = 5000;

function antiraid(client, message, config) {
    if(config.active === true || !config.active === false || !config.active){
    // CONFIGURATION
    let log_channel = ""
    let ban_message = ``

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
                    if (message.guild.id === "907984959229288468") {
                        const message  = userData.lastMessage;
                        message.guild.members(userData.lastMessage.author).kick({ days: 7 });
                        if (!log_channel === false){
                            log_channel = client.channels.cache.get(log_channel);
                            log_channel.send(ban_message)
                        }
                        
                    }
                        message.channel.messages
                        .fetch({
                            limit: 50,
                        })
                        .then((messages) => {
                            const botMessages = [];
                            messages
                                .filter((m) => m.author.id === message.author.id)
                                .forEach((msg) => botMessages.push(msg));
                            message.channel.bulkDelete(botMessages);
                        });
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

module.exports = {
    antiraid,
}



