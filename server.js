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
  
  //let oldList;
  const received = JSON.parse(request.body.MSG); 
  const inTurnNow = received.armiesInDb.length -1; /*
  console.log('inTurnNow', inTurnNow);
  console.log('received 0, 1: ', received.armiesInDb, received.armiesInDb[0], received.armiesInDb[1]);
  console.log('received.psw , .name: ', received.armiesInDb[inTurnNow].updatedLists.psw, received.armiesInDb[inTurnNow].updatedLists.name); */
  const armyQuery = { name:  'armies' };  /*
  console.log('received.armiesInDb[inTurnNow].updatedLists.length: ', received.armiesInDb[inTurnNow].updatedLists.length);
  console.log('aQ: ', armyQuery); */
  
  if (received.armiesInDb[inTurnNow].updatedLists.psw == pasw) {
    
    // delete password from entry:
    delete received.armiesInDb[inTurnNow].updatedLists.psw;
    /*
    // get old list of armies from db:
    armyListModel.find((err, results) => {
    if (err) console.log(err);
      oldList = results;   
      console.log('result for search: ', results);
    });
    */
    setTimeout(() => { 
      //oldList.push(received);
      
      armyListModel.update(armyQuery, {
        armyList: received
      }, (err, numberAffected, rawResponse) => {
        console.log("armyList updated"); 
      }); 

      const sending = JSON.stringify('Database update successfully!');
      console.log("responding with data ");
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end(sending); 
      
      //console.log('result for search: ', oldList);
    }, 1000); //timer 
    
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
