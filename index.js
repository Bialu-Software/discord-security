//testing only
const usersMap = new Map();
const LIMIT = 10;
const TIME = 4000;
const DIFF = 4000;

function antiraid(message, config) {
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
                    return console.log("ban " + userData)
                }
                if (message.guild.id === "863345794672492544") {
                    //moonlight
                    const role = message.guild.roles.cache.get("863398499776200724");
                    message.member.roles.add(role);
                }
                message.channel.messages
                    .fetch({
                        limit: 30,
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

module.exports = {
    antiraid
}



