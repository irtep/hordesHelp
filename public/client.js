let pointsLeft;
let bgPointsLeft;

let chosenArmy = [];

const cards = [
  // Cygnar
    // warcasters:
  {name: 'Stryker1', type: 'warcaster', bgPoints: 30, pointCost: 0, factions: ['cygnar']},
  {name: 'Caine2', type: 'warcaster', bgPoints: 27, pointCost: 0, factions: ['cygnar']},
    // warjacks:
  {name: 'Defender', type: 'warjack', bgPoints: 0, pointCost: 16, factions: ['cygnar']},
  {name: 'Avenger', type: 'warjack', bgPoints: 0, pointCost: 17, factions: ['cygnar']},
  {name: 'Charger', type: 'warjack', bgPoints: 0, pointCost: 9, factions: ['cygnar']},
  {name: 'Lancer', type: 'warjack', bgPoints: 0, pointCost: 10, factions: ['cygnar']},
  {name: 'Cyclone', type: 'warjack', bgPoints: 0, pointCost: 13, factions: ['cygnar']},
    // units:,
  {name: 'Rangers', type: 'unit', bgPoints: 0, pointCost: 9, factions: ['cygnar']},
    // solos:,
  {name: 'Jr_warcaster', type: 'solo', bgPoints: 0, pointCost: 4, factions: ['cygnar']},
  
  // Trollbloods
    // warlocks
  {name: 'Ironbra', type: 'warlock', bgPoints: 27, pointCost: 0, factions: ['trollbloods']},
  {name: 'Madrak1', type: 'warlock', bgPoints: 29, pointCost: 0, factions: ['trollbloods']},
    // warbeasts:
    // units:
    // solos:  
  
  // Circle
    // warlocks
  {name: 'Adri', type: 'warlock', bgPoints: 32, pointCost: 0, factions: ['circle']},
  {name: 'Mohsar', type: 'warlock', bgPoints: 27, pointCost: 0, factions: ['circle']},
    // warbeasts:
    // units:
    // solos:  
  
  // Khador
    // warcasters:
  {name: 'Adri_invierno', type: 'warcaster', bgPoints: 29, pointCost: 0, factions: ['khador']},
  {name: 'Sergei', type: 'warcaster', bgPoints: 28, pointCost: 0, factions: ['khador']},
    // warjacks:
    // units:
    // solos:
  
  // Retribution
    // warcasters:
  {name: "Kaelyssa", type: 'warcaster', bgPoints: 29, pointCost: 0, factions: ['retribution']},
    // warjacks:
    // units:
    // solos:  
  
    // Cryx
    // warcasters:
  {name: 'Deneghra1', type: 'warcaster', bgPoints: 26, pointCost: 0, factions: ['cryx']},
  {name: 'Goreshade2', type: 'warcaster', bgPoints: 28, pointCost: 0, factions: ['cryx']},
  {name: 'Witch_Coven', type: 'warcaster', bgPoints: 26, pointCost: 0, factions: ['cryx']},
    // warjacks:
    // units:
    // solos:
  /* or Crucible Guard, Cryx, Cygnar, Khador, or Protectorate. */
  // Mercenaries and Minion
  
  {name: '6x_steelh_rifleman', type: 'unit', bgPoints: 0, pointCost: 8, factions: ['crucible', 'cryx', 'cygnar', 'khador', 'protectorate']},
  {name: '10x_steelh_rifleman', type: 'unit', bgPoints: 0, pointCost: 14, factions: ['crucible', 'cryx', 'cygnar', 'khador', 'protectorate']}
];
function submitSetup(){
  const factionSelect = document.getElementById('factionSelector');
  const selectedPointsLimit = document.getElementById('pointLimit');
  
  updateCards();
  resetPoints();
  
  // reset army
  chosenArmy = [];
  
  console.log('submited: ', factionSelect[factionSelect.selectedIndex].value, selectedPointsLimit.value);
}

function addToArmy(idOfButton) {
  let chosenTrooper;
  
  // find chosen trooper from cards:
  for (let i = 0; i < cards.length; i++) {
  
    if (idOfButton === cards[i].name) {
      chosenTrooper = cards[i]     
    }
  }
  
  chosenArmy.push(chosenTrooper);
  updatePoints();
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