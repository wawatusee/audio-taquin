/*DEBUG*/
const modeDebug=true
/*END OF DEBUG*/
function playThere(time) { 
    var audio=document.getElementById("soundWithControl");
    audio.currentTime=time;
    audio.play();
  }
  function setCurrentTime(time) { 
    var audio=document.getElementById("soundWithControl");
    audio.currentTime=time;
  }
  function playTheMusic() { 
    var audio=document.getElementById("soundWithControl");
    audio.play();
  }
  function stopLeSon() { 
    var audio=document.getElementById("soundWithControl");
    audio.pause();
  }
  function getTrackDuration(iDTrack){
    var trackDuration = document.getElementById(iDTrack).duration;
    return trackDuration;
  }
  function feedATextField(idTextField,content){
    var content=content;
    var fieldText=document.getElementById(idTextField);
    fieldText.value=content;
  }
  function getCurrentTime(){
    let audio=document.getElementById("soundWithControl");
    let leTempsActuel=audio.currentTime
    return leTempsActuel
  }
  
//const orderArray=[9,10,11,2,14,15,1,3,8,16,7,4,12,5,13,6];
const orderArray=[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,1];

var nextElementInOrderArray=0
var trackDuration
var pieceDuration
var firstRangeOfTheTrack

function setIntervall(whatOrder){
  if(firstRangeOfTheTrack!=undefined){clearInterval(myInterval);}
  let indexOfPieceClicked=nextElementInOrderArray=orderArray.indexOf(Number(whatOrder));
  trackDuration=getTrackDuration("soundWithControl")
  pieceDuration=Math.round(trackDuration/16)
  firstRangeOfTheTrack=Math.round(pieceDuration*whatOrder)
  playTheMusic()
  setCurrentTime(firstRangeOfTheTrack)
  if(nextElementInOrderArray<15){
    nextElementInOrderArray+=1
  }
  else nextElementInOrderArray=0

  myInterval=setInterval(onTimeNextPiece,pieceDuration*1000)
  /* */
    //DEBUG
    let debug="Debug :<br>"
    debug+="L'ordre de la pièce cliquée est "+whatOrder
    debug+='Dans le tableau des ordres, index de la pièce cliquée(indexOfPieceClicked): '+indexOfPieceClicked+"<br>"
    debug+="Durée du morceau(trackDuration): "+trackDuration+"<br>"
    debug+="durée d'une piece(pieceDuration):"+pieceDuration+"sec<br>"
    debug+="Plage à jouer en premier(whatOrder*pieceDuration):"+firstRangeOfTheTrack+"sec<br>"
    debug+="Le prochain élèment du tableau à jouer est :"+nextElementInOrderArray
    console.log(firstRangeOfTheTrack)
    let thisDebug=document.getElementById("setintervallDebug");
    thisDebug.innerHTML=debug
    if(modeDebug){thisDebug.style.visibility= "visible";}
    else {textDebug.style.visibility= "hidden";
    }
}
function onTimeNextPiece(){
 
  let ouOnEnEst=getCurrentTime()
  console.log("Qu'est ce qu'on joue pour de vrai :"+ouOnEnEst+"<br>")
  let thisTimeToPlay=orderArray[nextElementInOrderArray]*pieceDuration
  setCurrentTime(thisTimeToPlay)
  console.log(", Le temps à jouer :"+thisTimeToPlay)
  if(nextElementInOrderArray<15){
    nextElementInOrderArray+=1
  }else nextElementInOrderArray=0
  console.log(". Prochain élèment Dans le tableau:"+nextElementInOrderArray)

console.log("onTimeNextPiece")
}
function stopOnTimeNextPiece(){
  clearInterval(myInterval);
  stopLeSon()
}