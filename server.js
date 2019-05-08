const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pasw = process.env.SECRET2;

app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// database access:
const mongoose = require('mongoose'); 
const mongoDB = process.env.SECRET1; // admin
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
const Schema = mongoose.Schema;

const armyListSchema = new Schema( {
  armyList: {
    type: Array    
  } 
});

const armyListModel = mongoose.model('armyListModel', armyListSchema ); 

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// GET handlers.
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


// POST handlers: will be used for database access, to save and load armies.
app.post('/showAll', (request, response) => {
  
  const received = request.body.MSG;
  let armyList;
  let responding;
  
  console.log('Post with showAll received: ', received);
  switch (received){
    case ('show'):
      armyListModel.find((err, results) => {
      if (err) console.log(err);
      armyList = results;   
        console.log('result for sahalist search: ', results);
      });
      setTimeout(() => {  // timed so that there is time to add the data
        responding = armyList;  
        const sending = JSON.stringify(responding);
        console.log("responding with data ");
        console.log('army list now: ', responding);
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(sending);      
      }, 1000); //timer
    break;  
  }
  
  //console.log(request.headers);

});

app.post('/updateAll', (request, response) => {
  console.log('update army list request received');
  
  const received = JSON.parse(request.body.MSG); 
  console.log('received: ', received);
  const inTurnNow = received.armiesInDb.length -1;
  const armyQuery = { name:  'armies' };  
  
  if (received.armiesInDb[inTurnNow][2] == pasw) {
    const listEntry = [];
    
    // if this was deletation of army:
    if (received.armiesInDb[inTurnNow][0] == 'forDelete') {
    
      console.log('deletation detected, splicing: ', received.armiesInDb[inTurnNow]);
    // delete entry as it was just to bring password:
      received.armiesInDb.splice(inTurnNow, 1);    
    } else {
      
      console.log('add on received, adding: ', received.armiesInDb[inTurnNow]);
    // if it was update of new army    
    // delete password from entry:
      received.armiesInDb[inTurnNow].splice(2, 1);
    }
    // make a new armylist
    for (let i = 0; i < received.armiesInDb.length; i++) {
      const newEntry = [received.armiesInDb[i][0], received.armiesInDb[i][1]];
      
      listEntry.push(newEntry);
    }
      
      armyListModel.update(armyQuery, {
        armyList: listEntry
      }, (err, numberAffected, rawResponse) => {
        console.log("armyList updated"); 
      }); 

      const sending = JSON.stringify('Database updated successfully!');
      console.log("responding with data ");
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end(sending); 
    
  } else {
      const sending = JSON.stringify('Database update failed, due wrong password!');
      console.log("responding with data ");
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end(sending);
    console.log('update failed due wrong password');
  }
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
