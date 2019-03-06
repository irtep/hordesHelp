function updateListsFromDB(){
  
  //const armyList = JSON.stringify(armyList);
  const http = new XMLHttpRequest();
  const url = '/showAll';
  const params = 'MSG=show';
  console.log("updating from DB");
  
  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  http.onreadystatechange = () => {//Call a function when the state changes.
    
    if(http.readyState == 4 && http.status == 200) {
      const newList = JSON.parse(http.responseText);
      armyList = newList;
      //const forShow1 = sahaList.join('<br>');
      console.log("update ready!: ", armyList);
      armiesInDb = armyList[0].armyList;
    }
  }
  http.send(params); 
}

function updateListsInDB(updatedLists){
  const armyList = JSON.stringify({updatedLists}); console.log('sending: ', armyList);
  const http = new XMLHttpRequest();
  const url = '/updateAll';
  const params = 'MSG=' + armyList;
  
  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  http.onreadystatechange = () => {//Call a function when the state changes.
    
    if(http.readyState == 4 && http.status == 200) {
      
      console.log(http.responseText);
    }
  }
  http.send(params);
}