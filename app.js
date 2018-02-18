var restify = require('restify');
var builder = require('botbuilder');
var request = require('sync-request');
var geolocation = require('geolocation');
const publicIp = require('public-ip');
var geoip = require('geoip-lite');

var url = 'http://ec2-18-219-9-21.us-east-2.compute.amazonaws.com:9999/vyh/api/restaurants/search';
var locParameters = [];
// var lat = '', long = '';
var geo = {};
let dataOutput = [];

// Geolocation of the user
// geolocation.getCurrentPosition(function (error, pos) {
//     if (error) throw error
//     console.log(pos);
// });

publicIp.v4().then(ip => (callbackFunc) => {
    var val = ""+ip;
    global.geo = JSON.parse(JSON.stringify(geoip.lookup(val)));
    console.log(global.geo);

    var postData = JSON.stringify({
        "latitude": global.geo['ll'][0],
        "longitude": global.geo['ll'][0],
        "method" : "both"
      });
    
    var response = request('POST', url, { headers: {      
        'content-type': 'application/json'
      }, body: postData});
});

function callbackFunc(err, data){
        console.log(data); 
}

// Bot Setup

// Setup restify server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function(){
    console.log('%s (chat bot server) is listening to %s', server.name, server.url);
});

// create chat bot
var connector = new builder.ChatConnector({
    appId: '772b4c0a-4add-4f1d-8437-e2440d0afbd0',
    appPassword: 'nynhDKK445:*$ylnNGWM37['
});

// var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// // Bot Dialogs
var resultantOrder = {};
var inMemoryStorage = new builder.MemoryBotStorage();

// This is a dinner reservation bot that uses multiple dialogs to prompt users for input.
var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.send("Welcome to the online food delivery.");
        session.beginDialog('askForTypeOfFood');
    },
    function (session, results) {
        session.dialogData.reservationDate = builder.EntityRecognizer.resolveTime([results.response]);
        session.beginDialog('askForRestaurant');
    },
    function (session, results) {
        session.dialogData.categories = results.response;
        session.beginDialog('askForMenu');
    },
    function (session, results) {
        session.dialogData.reservationName = results.response;

        // Process request and display reservation details
        session.send(`Reservation confirmed. Reservation details: <br/>Date/Time: ${session.dialogData.reservationDate} <br/> Restaurant: ${session.dialogData.partySize} \
        <br/> Categories: ${session.dialogData.reservationName}`);
        session.endDialog();
    }
]).set('storage', inMemoryStorage); // Register in-memory storage 

var listOfRestaurants = new Map();
var listOfMenus = [];


// Dialog to ask for a date and time
bot.dialog('askForTypeOfFood', [
    function (session) {
        builder.Prompts.text(session, "What kind of food would you like to order?");
    },
    function (session, results) {
        console.log("TYPE:", );
        //POST
        var postData = JSON.stringify({
            "latitude": "37.761479",
            "longitude": "-122.449275",
            "method" : "both",
            "search" : session.message['text']
          });
        
        var response = request('POST', url, { headers: {      
            'content-type': 'application/json'
          }, body: postData});
        // var user = JSON.parse(response.getBody('utf8'));
        var resArr = JSON.parse(response.getBody('utf-8'));
        // console.log(dataOutput);
        dataOutput = [];
        dataOutput = resArr;
        session.endDialogWithResult(results);
    }
]);

// Dialog to ask for number of people in the party
bot.dialog('askForRestaurant', [
    function (session) {
        builder.Prompts.text(session, "Here are the list of restaurants for you: ");
        // console.log("WATCH OUT: ", dataOutput);
        
        for(let i = 0; i < dataOutput.length; i++){
            console.log(typeof dataOutput[i]["apiKey"]);
            listOfRestaurants.set(""+dataOutput[i]["name"], ""+dataOutput[i]["apiKey"]);
            session.send(dataOutput[i]["name"]);
        }        
    },
    function (session, results) {
        console.log(listOfRestaurants[""+session.message['text']]);
        console.log(results);
        var menuURL = 'http://ec2-18-219-9-21.us-east-2.compute.amazonaws.com:9999/vyh/api/restaurants/' + listOfRestaurants.get(""+session.message['text']) + '/menu'; 
        
        var response = request('GET', menuURL);
        // var user = JSON.parse(response.getBody('utf8'));
        var resArr = JSON.parse(response.getBody('utf-8'));
        // console.log(dataOutput);
        listOfMenus = [];
        listOfMenus = resArr;
        console.log(listOfMenus);
        session.endDialogWithResult(results);
    }
]);

// Dialog to ask for the reservation name.
bot.dialog('askForMenu', [
    function (session, results) {
        session.send("Here are the food options from the menu: "); 
        let flag = false;
        for(var i = 0; i < listOfMenus.length; i++){
            session.send(listOfMenus[i]["name"]);
        }
        builder.Prompts.text(session, "Please enter your choice:");
        console.log("Everything works well untill here!");
        console.log("Here is the text: " + results.response);
        // console.log(listOfMenus[temp]["name"]);
        // builder.Prompts.text(session, "The following are the options in " + listOfMenus[temp]["name"] + ":");
        // for(var j = 0; j < listOfMenus[temp]["items"].length; j++){
        //     session.send(listOfMenus[temp]["items"][j]["name"]);
        // }
        // builder.Prompts.text(session, "What would you like to have?");
        // var option = results.response;
        
        session.endDialogWithResult(results);
    }
]);





