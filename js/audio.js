/*DEBUG*/
const modeDebug=false
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
var orderArray=[9,10,11,2,14,15,1,3,8,16,7,4,12,5,13,6];

var nextElementInOrderArray=0
var trackDuration
var pieceDuration
var firstRangeOfTheTrack

function setIntervall(whatOrder){
	orderArray=aGetPiecesOrder()
	console.log(orderArray)
  if(firstRangeOfTheTrack!=undefined){clearInterval(myInterval);}
  let indexOfPieceClicked=nextElementInOrderArray=orderArray.indexOf(Number(whatOrder));
  trackDuration=getTrackDuration("soundWithControl")
  pieceDuration=Math.round(trackDuration/16)
  firstRangeOfTheTrack=Math.round(pieceDuration*(indexOfPieceClicked+1))
  playTheMusic()
  setCurrentTime(firstRangeOfTheTrack)
  if(nextElementInOrderArray<15){
    nextElementInOrderArray+=1
  }
  else nextElementInOrderArray=0
  myInterval=setInterval(onTimeNextPiece,pieceDuration*1000)
}
function onTimeNextPiece(){
  let ouOnEnEst=getCurrentTime()
  let thisTimeToPlay=orderArray[nextElementInOrderArray]*pieceDuration
  setCurrentTime(thisTimeToPlay)
  if(nextElementInOrderArray<15){
    nextElementInOrderArray+=1
  }else nextElementInOrderArray=0
}
function stopOnTimeNextPiece(){
  clearInterval(myInterval);
  stopLeSon()
}