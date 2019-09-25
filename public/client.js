/*  ARMY PLANNER */

let pointsLeft;
let bgPointsLeft;
var armiesInDb;

let chosenArmy = [];

function clearFeedback(){
        
  setTimeout(() => { 
    feedback.innerHTML = '';  
  }, 1000); //timer
}

// function when user has selected army he wants to load or delete
function chooseArmy(nameOfArmy, action){
  const nameSpace = document.getElementById('nameOfArmy');
  const passField = document.getElementById('passwordField');
  const factionSelect = document.getElementById('factionSelector');
  /*
  factionSelect[factionSelect.selectedIndex].value === cards[i].factions[i2]
  */
  console.log('chosen: ', nameOfArmy, action);
  
  if (action === 'take') {
    
    console.log('take: ', chosenArmy, factionSelect.value);
    // set chosenArmy and faction
    for (let i = 0; i < armiesInDb.length; i++) {
      
      if (nameOfArmy == armiesInDb[i][0]) {
        
        chosenArmy = armiesInDb[i][1];    
        
        // check warcaster and its faction for selected faction:
        for (let i2 = 0; i2 < chosenArmy.length; i2++){
          
          if  (chosenArmy[i2].type === 'warlock' || chosenArmy[i2].type === 'warcaster') {
            // set faction
            factionSelect.value = chosenArmy[i2].factions[0];
            console.log('setting faction: ', chosenArmy[i2].factions[0]);
          }
        }
      }
    }
    console.log('take: ', chosenArmy, factionSelect.value);  
    updateCards();
    resetPoints();
    updateArmyList();
    updatePoints()
    
    nameSpace.innerHTML = nameOfArmy;
    passField.innderHTML = '';
    
  } // take ends.
  
  if (action === 'delete') {
    
    // find array and delete it.
    for (let i3 = 0; i3 < armiesInDb.length; i3++){
          
      if  (nameOfArmy === armiesInDb[i3][0]) {
        
        armiesInDb.splice(i3, 1);
      }
    }    
    
    // databaseCommand to update armiesInDb
      if (passField.value.length > 2) {
        // need to make entry to pass password.
        const armyListToBeUpdated = ['forDelete', 'forDelete', passField.value];
       
        updateListsInDB(armyListToBeUpdated);  
        
        setTimeout( () => {
          updateListsFromDB();
          document.getElementById('fetchedFromDB').innerHTML = '';
        }, 1000);
      } else {
        
        feedback.innerHTML = 'ERROR: password incorrect!';
        clearFeedback();
      }
    
  }
}

// function for save, load and delete buttons:
function saveLoad(whatButton){
  const nameSpace = document.getElementById('nameOfArmy');
  const passField = document.getElementById('passwordField');
  const feedback = document.getElementById('feedback');
  const fetchedFromDB = document.getElementById('fetchedFromDB');
  
  /*
  
  */

  fetchedFromDB.innerHTML = '';

  switch (whatButton) {
    
    // save army to database:
    case 'save army':
      if (passField.value.length > 2) {
        
        if (nameSpace.value.length > 1 && chosenArmy.length > 1) {  
          const armyListToBeUpdated = [nameSpace.value, chosenArmy, passField.value];
          updateListsInDB(armyListToBeUpdated); 
          
        } else { feedback.innerHTML = 'ERROR: army need to have a name, that has atleast 2 characters. And atleast two selected units.';
          console.log('r', nameSpace.value.length, chosenArmy.length);       
        }
        
      } else {
        
        feedback.innerHTML = 'ERROR: password incorrect!';
        clearFeedback();
      }
    break;
    
    // load army from database
    case 'load army':
      
      const mapped = armiesInDb.map((army) => {
        
        fetchedFromDB.innerHTML = fetchedFromDB.innerHTML + '<input type= "button" value= "'+army[0]+'" class= "armies"  id= "take" onclick= "chooseArmy(this.value, this.id)">';
      });
      
      feedback.innerHTML = 'select army to load: ';
      clearFeedback();
      
    break;
    
    // delete army from database
    case 'delete saved army':
      
      const mappedForDelete = armiesInDb.map((army) => {
        
        fetchedFromDB.innerHTML = fetchedFromDB.innerHTML + '<input type= "button" value= "'+army[0]+'" class= "forDelete" id= "delete" onclick= "chooseArmy(this.value, this.id)">';
      });
      
      feedback.innerHTML = 'select army to DELETE (deleted are deleted permanently. Password required.): ';
    break;
      
    default: console.log('not found button at saveLoad function');  
  }
}

function submitSetup(){
  const factionSelect = document.getElementById('factionSelector');
  const selectedPointsLimit = document.getElementById('pointLimit');
  
  updateCards();
  resetPoints();
  
  // reset army
  chosenArmy = [];
  updateArmyList();
  
}

function removeFromArmy(who){
  let chosenGuy;
  // find chosen trooper from cards:
  for (let i = 0; i < chosenArmy.length; i++) {
  
    if (who === chosenArmy[i].name) {
      chosenGuy = i;    
    }
  }
  
  chosenArmy.splice(chosenGuy, 1);
  updatePoints();
  updateArmyList();
}

function addToArmy(idOfButton) {
  let chosenTrooper;
  const showArmy = document.getElementById('showArmy');
  
  // find chosen trooper from cards:
  for (let i = 0; i < cards.length; i++) {
  
    if (idOfButton === cards[i].name) {
      chosenTrooper = cards[i]     
    }
  }
  
  chosenArmy.push(chosenTrooper);
  updatePoints();
  
  // add to index.html:
  // if lock or caster
  if (chosenTrooper.type === 'warlock' || chosenTrooper.type === 'warcaster'){
    showArmy.innerHTML = showArmy.innerHTML + chosenTrooper.type + ': ' + chosenTrooper.name + '(+'+chosenTrooper.bgPoints+' battlegroup points)'+
    '<input type= "button" id= "'+chosenTrooper.name+'" value= "remove" onclick= "removeFromArmy(this.id)"/><br> ' 
  } else {
    showArmy.innerHTML = showArmy.innerHTML + chosenTrooper.type + ': ' + chosenTrooper.name + '(+'+chosenTrooper.pointCost+' points)'+
    '<input type= "button" id= "'+chosenTrooper.name+'" value= "remove" onclick= "removeFromArmy(this.id)"/><br> ' 
  }
}

// updates showArmy place
function updateArmyList(){
  const showArmy = document.getElementById('showArmy');
  
  showArmy.innerHTML = '';
  
  for (let i = 0; i < chosenArmy.length; i++) {

    if (chosenArmy[i].type === 'warlock' || chosenArmy[i].type === 'warcaster'){
      showArmy.innerHTML = showArmy.innerHTML + chosenArmy[i].type + ': ' + chosenArmy[i].name + ' (+'+chosenArmy[i].bgPoints+' battlegroup points)'+
      '<input type= "button" id= "'+chosenArmy[i].name+'" value= "remove" onclick= "removeFromArmy(this.id)"/><br> ' 
    } else {
      showArmy.innerHTML = showArmy.innerHTML + chosenArmy[i].type + ': ' + chosenArmy[i].name + ' (+'+chosenArmy[i].pointCost+' points)'+
      '<input type= "button" id= "'+chosenArmy[i].name+'" value= "remove" onclick= "removeFromArmy(this.id)"/><br> ' 
    }  
  }
  
}

function updatePoints(){
  pointsLeft = document.getElementById('pointLimit').value;
  bgPointsLeft = 0;
  let unitPoints = 0;
  let jackAndBeastPoints = 0;
  let exceedingPoints = 0;
  
  // gather points from chosen units.
  if (chosenArmy.length > 0) {
    for (let i = 0; i < chosenArmy.length; i++) {
      // if warcaster or warlock found:
      if (chosenArmy[i].type === 'warlock' || chosenArmy[i].type === 'warcaster'){
        bgPointsLeft = chosenArmy[i].bgPoints;
      }
      // if beast or jack
      if (chosenArmy[i].type === 'warjack' || chosenArmy[i].type === 'warbeast'){
        jackAndBeastPoints = jackAndBeastPoints + chosenArmy[i].pointCost;
      }
      // if solo or unit
      if (chosenArmy[i].type === 'solo' || chosenArmy[i].type === 'unit'){
        unitPoints = unitPoints + chosenArmy[i].pointCost;
      }
    }
  }
  
  // deal with warjack/beast points:
  exceedingPoints = jackAndBeastPoints - bgPointsLeft;
  
  if (exceedingPoints < 0) { exceedingPoints = 0; }
  
  unitPoints = unitPoints + exceedingPoints;
  //update:
  pointsLeft = pointsLeft - unitPoints;
  document.getElementById('pointsLeft').innerHTML = pointsLeft;
  document.getElementById('bgPointsLeft').innerHTML = bgPointsLeft - jackAndBeastPoints;
}

function updateCards(){
  const availC = document.getElementById('cardsHere');
  availC.innerHTML = '<br>';
  
  // make available cards buttons
  for (let i = 0; i < cards.length; i++){
    const currentName = cards[i].name;
    const currentType = cards[i].type;
    const currentPoints = cards[i].pointCost;
    const factionSelect = document.getElementById('factionSelector');
    
    for (let i2 = 0; i2 < cards[i].factions.length; i2++) {
      
      if (factionSelect[factionSelect.selectedIndex].value === cards[i].factions[i2]) {
        let unitsClass;
        
        availC.innerHTML = availC.innerHTML + '<span class="' + currentType + '"> '+
        currentName+ ' ' + currentType + '. Point cost: ' + currentPoints + ' </span>' + 
        '<input type = "button" id="'+currentName+ '" class= "troopButtons" onclick="addToArmy(this.id)" value= "add this" ><br>';
      }
    }
  }
}

function resetPoints() {
  pointsLeft = document.getElementById('pointLimit').value;
  bgPointsLeft = 0;
  
  document.getElementById('pointsLeft').innerHTML = pointsLeft;
  document.getElementById('bgPointsLeft').innerHTML = bgPointsLeft;

}

window.onload = ()=> {
  
  resetPoints();
  updateCards();
  
  // get list of saved armies:
  
  updateListsFromDB();
  setTimeout( () => {
   console.log('in db: ', armiesInDb);
  }, 10000);
  // update them to their place.
  
};