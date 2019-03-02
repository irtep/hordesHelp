const cards = [
  // Cygnar
    // warcasters:
  {name: 'Commander Coleman Stryker', type: 'warcaster', bgPoints: 30, pointCost: 0, factions: ['cygnar']},
  {name: 'Captain Allister Caine', type: 'warcaster', bgPoints: 27, pointCost: 0, factions: ['cygnar']},
    // warjacks:
    // units:
    // solos:
  
  // Trollbloods
    // warlocks
  {name: 'Ironbra', type: 'warlock', bgPoints: 27, pointCost: 0, factions: ['trollbloods']},
  {name: 'Madrak Ironhide, Thornwood Chieftain', type: 'warcaster', bgPoints: 29, pointCost: 0, factions: ['trollbloods']},
    // warbeasts:
    // units:
    // solos:  
  
  // Circle
    // warlocks
  {name: 'Adri', type: 'warlock', bgPoints: 32, pointCost: 0, factions: ['circle']},
  {name: 'Mohsar the desertwalker', type: 'warcaster', bgPoints: 27, pointCost: 0, factions: ['circle']},
    // warbeasts:
    // units:
    // solos:  
  
  // Khador
    // warcasters:
  {name: 'Adri de invierno', type: 'warcaster', bgPoints: 29, pointCost: 0, factions: ['khador']},
  {name: 'Sergei Zoktavir', type: 'warcaster', bgPoints: 28, pointCost: 0, factions: ['khador']},
    // warjacks:
    // units:
    // solos:
  
  // Retribution
    // warcasters:
  {name: "Kaelyssa Night's Whisper", type: 'warcaster', bgPoints: 29, pointCost: 0, factions: ['retribution']},
    // warjacks:
    // units:
    // solos:  
  
    // Cryx
    // warcasters:
  {name: 'Warwitch Deneghra', type: 'warcaster', bgPoints: 26, pointCost: 0, factions: ['cryx']},
  {name: 'Goreshade the cursed', type: 'warcaster', bgPoints: 28, pointCost: 0, factions: ['cryx']},
  {name: 'Witch Coven of Garlghast', type: 'warcaster', bgPoints: 26, pointCost: 0, factions: ['cryx']}
    // warjacks:
    // units:
    // solos:
];
function submitSetup(){
  const factionSelect = document.getElementById('factionSelector');
  const selectedPointsLimit = document.getElementById('pointLimit');
  
  console.log('submited: ', factionSelect[factionSelect.selectedIndex].value, selectedPointsLimit.value);
}

window.onload = ()=> {
  const availC = document.getElementById('cardsHere');
  
  // make available cards buttons
  for (let i = 0; i < cards.length; i++){
    const currentName = cards[i].name;
    availC.innerHTML = availC.innerHTML + '<input type = "button" value='+currentName+ ' class= "troops" onclick="addToList(this.value)" >' + '</input>'
    + '<br>'; 
  }
};