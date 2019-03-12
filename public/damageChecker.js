/*   DAMAGE CHECKER  */
/*    
    <p>
      How many hits: <input id= "hitCalcu" type= "number" onchange= "hitNumberChange()"><br>
      <span id = "hits"></span><br>
      <span id = "results"></span><br>
    </p>
 */   

/*
How many hits: <input id= "hitCalcu" type= "number" onchange= "hitNumberChange()" max= "10">
Your Mat/Rat: <input id= "matRat" type= "number"> targets def: <input id= "def" type= "number"> and armour: <input id= "arm" type= "number">

*/

const hitCalcu = document.getElementById('hitCalcu');
const hits = document.getElementById('hits');
const results = document.getElementById('results'); 
const dMatRat = document.getElementById('matRat'); 
const dDef = document.getElementById('def'); 
const dArm = document.getElementById('arm');


function hitNumberChange(){
  
  hits.innerHTML = '';
  const howMany = hitCalcu.value;
  console.log('hnc', howMany);
  
  for (let i = 0; i < howMany; i++) {
    
    hits.innerHTML = hits.innerHTML + 'power: <input type= "number" id= "power'+i+
      '"> boost to hit: <input type= "checkbox" id= "boostToHit'+i+'"> boost damage: <input type= "checkbox" id= "boostDamage'+i+
      '"> extra dice: <input type= "checkbox" id= "extraDice"><br>';
  }
}

function callDice(max){
    const result =  1 + Math.floor(Math.random() * max);
    return result;
}  

function makeAttack(pow, boostAttack, boostDam, extraDam, starsCros, matRat, def, arm){
  const aPow = parseInt(pow);
  const aMatRat = parseInt(matRat);
  const aDef = parseInt(def);
  const aArm = parseInt(arm);
  
  const attackDice1 = callDice(6);
  const attackDice2 = callDice(6);
  let attackDice3 = callDice(6);
  const starsCrossed = callDice(6);
  let attackRoll;
  
  const damageDice1 = callDice(6);
  const damageDice2 = callDice(6);
  let damageDice3 = callDice(6);
  let damageDice4 = callDice(6);
  let damageRoll;
  
  if (boostAttack === false) {attackDice3 = 0}
  if (boostDam === false) {damageDice3 = 0}
  if (extraDam === false) {damageDice4 = 0}
  
  let damageMade;
  
  // attack roll:
    // without stars crossed:
  if (starsCros === false) {attackRoll = attackDice1 + attackDice2 + attackDice3;} 
  
    // with stars crossed:
  else {
    
    const attacks = [attackDice1, attackDice2, attackDice3, starsCrossed];    
      attacks.sort;
      attackRoll = attacks[0] + attacks[1] + attacks[2];
  }
  
  console.log('mat,def+ attackDices: ', aMatRat, aDef, attackDice1, attackDice2, attackDice3);
  // if misses:
  if (aDef > (attackRoll + aMatRat)){return 'miss';} 
  
  // if hits:
  else {
  
    console.log('pow+arm+damagedices: ', aPow, aArm, damageDice1,damageDice2,damageDice3,damageDice4);
    damageRoll = aPow + damageDice1 + damageDice2 + damageDice3 + damageDice4; console.log('total: ', damageRoll);
    damageMade = damageRoll - aArm;
    
    if (damageMade < 0) {damageMade = 0}
    return damageMade;
  }
}

function calculateDamage() {
  const attacks = hitCalcu.value;
  const matRat = dMatRat.value;
  const def = dDef.value;
  const arm = dArm.value;
  const attackDamages = [];
  const starsC = document.getElementById('starsCrossed').checked;
  
  for (let i = 0; i < attacks; i++) {
    const currentAttackId = 'power' + i;
    const currentBoostId = 'boostToHit' + i;
    const currentBoostDamageId = 'boostDamage' + i;
    const currentExtraDiceId = 'extraDice' + i;
    
    const currentAttackPower = document.getElementById(currentAttackId).value;
    const currentBoostAttack = document.getElementById(currentBoostId).checked;
    const currentBoostDamage = document.getElementById(currentBoostDamageId).checked;
    const currentExtraDice = document.getElementById(currentBoostId).checked;
 
    const hitIt = makeAttack(currentAttackPower, currentBoostAttack, currentBoostDamage, currentExtraDice, starsC, matRat, def, arm);
    attackDamages.push(hitIt);
  }
  
  console.log(attackDamages);
  
}