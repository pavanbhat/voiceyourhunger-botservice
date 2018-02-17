var restify = require('restify');
var builder = require('botbuilder');

// Bot Setup

// Setup restify server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function(){
    console.log('%s (chat bot server) is listening to %s', server.name, server.url);
});

// create chat bot
var connector = new builder.ChatConnector({
    appId: '608927ae-ec4f-45ef-8c5f-3759f7033429',
    appPassword: 'moBF636#~:njeauYFWAQ70;'
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Bot Dialogs

bot.dialog('/', function(session){
    session.send('Hello World!');
})