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

function calculateDamage() {
  const attacks = [];
  const matRat = dMatRat.value;
  const def = dDef.value;
  const arm = dArm.value;
  
}