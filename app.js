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
    appPassword: 'vneRHJAIM86967{}?rkxhG?'
});

// var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// // Bot Dialogs

var inMemoryStorage = new builder.MemoryBotStorage();

// This is a dinner reservation bot that uses multiple dialogs to prompt users for input.
var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.send("Welcome to the online food delivery.");
        session.beginDialog('askForTypeOfFood');
    },
    function (session, results) {
        session.dialogData.reservationDate = builder.([results.response]);

        session.beginDialog('askForPartySize');
    },
    function (session, results) {
        session.dialogData.partySize = results.response;
        session.beginDialog('askForReserverName');
    },
    function (session, results) {
        session.dialogData.reservationName = results.response;

        // Process request and display reservation details
        session.send(`Reservation confirmed. Reservation details: <br/>Date/Time: ${session.dialogData.reservationDate} <br/>Party size: ${session.dialogData.partySize} <br/>Reservation name: ${session.dialogData.reservationName}`);
        session.endDialog();
    }
]).set('storage', inMemoryStorage); // Register in-memory storage 




// Dialog to ask for a date and time
bot.dialog('askForTypeOfFood', [
    function (session) {
        builder.Prompts.text(session, "What kind of food would you like to order?");
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);

// Dialog to ask for number of people in the party
bot.dialog('askForPartySize', [
    function (session) {
        builder.Prompts.text(session, "How many people are in your party?");
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
])

// Dialog to ask for the reservation name.
bot.dialog('askForReserverName', [
    function (session) {
        builder.Prompts.text(session, "Who's name will this reservation be under?");
    },
    function (session, results) {
        session.endDialogWithResult(results);
    }
]);