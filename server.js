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

const armyListModel = mongoose.model('armyListModel', armyListSchema ); // for sahalist

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
  const inTurnNow = received.updatedLists.length -1;
  console.log('received: ', received);
  console.log('received.psw , .name: ', received.updatedLists[0].psw, received.updatedLists[0].name);
  const armyQuery = { name:  'armies' }; 
  console.log('received.updatedLists.length: ', received.updatedLists.length);
  console.log('aQ: ', armyQuery);
  
  if (received.updatedLists[inTurnNow].psw == pasw) {
    
    // delete password from entry:
    delete received.updatedLists[inTurnNow].psw;
     
    setTimeout(() => { 
      armyListModel.update(armyQuery, {
        armyList: received.updatedLists[inTurnNow]
      }, (err, numberAffected, rawResponse) => {
        console.log("armyList updated");
      }); 
    }, 1000); //timer 
    
  } else {
    console.log('update failed due wrong password');
  }
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
