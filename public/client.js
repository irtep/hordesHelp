let pointsLeft;
let bgPointsLeft;

let chosenArmy = [];

function submitSetup(){
  const factionSelect = document.getElementById('factionSelector');
  const selectedPointsLimit = document.getElementById('pointLimit');
  
  updateCards();
  resetPoints();
  
  // reset army
  chosenArmy = [];
  
  console.log('submited: ', factionSelect[factionSelect.selectedIndex].value, selectedPointsLimit.value);
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
      showArmy.innerHTML = showArmy.innerHTML + chosenArmy[i].type + ': ' + chosenArmy[i].name + '(+'+chosenArmy[i].bgPoints+' battlegroup points)'+
      '<input type= "button" id= "'+chosenArmy[i].name+'" value= "remove" onclick= "removeFromArmy(this.id)"/><br> ' 
    } else {
      showArmy.innerHTML = showArmy.innerHTML + chosenArmy[i].type + ': ' + chosenArmy[i].name + '(+'+chosenArmy[i].pointCost+' points)'+
      '<input type= "button" id= "'+chosenArmy[i].name+'" value= "remove" onclick= "removeFromArmy(this.id)"/><br> ' 
    }  
  }
  
}

function updatePoints(){
  console.log('update points chosenArmy: ', chosenArmy);
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
};