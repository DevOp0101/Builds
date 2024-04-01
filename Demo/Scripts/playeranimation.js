self.importScripts("synchronizeddata.js");
self.importScripts("lists.js");

const container = document.querySelector(".game-container");
const characterContainer = document.querySelector(".game-character-container");
const characterAvatar = document.querySelector(".game-character-avatar");
const characterFresnel = document.querySelector(".game-character-fresnel");
const characterShadowmap = document.querySelector(".game-character-shadowmap");
const characterinnerbloom = document.querySelector(".game-character-inner-bloom");
const charactermiddlebloom = document.querySelector(".game-character-middle-bloom");
const characteroutterbloom = document.querySelector(".game-character-outter-bloom");

var synchronizedPlayerData = new playerData();

let oldCharacterAnimationAngle = 0;
let oldCharacterAnimationFrame = 0;

var stringsList = persistentList();
var stringsInitialized = false;
var bloomInitialized = false;

var bloomAngleZeroOffsetX = 0;
var bloomAngleZeroOffsetY = 0;
var bloomAngleOneOffsetX = 0;
var bloomAngleOneOffsetY = 0;
var bloomAngleTwoOffsetX = 0;
var bloomAngleTwoOffsetY = 0;
var bloomAngleThreeOffsetX = 0;
var bloomAngleThreeOffsetY = 0;
var bloomAngleFourOffsetX = 0;
var bloomAngleFourOffsetY = 0;
var bloomAngleFiveOffsetX = 0;
var bloomAngleFiveOffsetY = 0;
var bloomAngleSixOffsetX = 0;
var bloomAngleSixOffsetY = 0;
var bloomAngleSevenOffsetX = 0;
var bloomAngleSevenOffsetY = 0;

var characterShadowmapZeroOffsetX = 0;
var characterShadowmapZeroOffsetY = 0;
var characterShadowmapOneOffsetX = 0;
var characterShadowmapOneOffsetY = 0;
var characterShadowmapTwoOffsetX = 0;
var characterShadowmapTwoOffsetY = 0;
var characterShadowmapThreeOffsetX = 0;
var characterShadowmapThreeOffsetY = 0;
var characterShadowmapFourOffsetX = 0;
var characterShadowmapFourOffsetY = 0;
var characterShadowmapFiveOffsetX = 0;
var characterShadowmapFiveOffsetY = 0;
var characterShadowmapSixOffsetX = 0;
var characterShadowmapSixOffsetY = 0;
var characterShadowmapSevenOffsetX = 0;
var characterShadowmapSevenOffsetY = 0;

window.addEventListener("resize",function(){
    adjustCharacterFresnel();
    bloomInitialized = false;
    adjustCharacterBloom();
    stringsInitialized = false;
    adjustCharacterStrings();
});

self.addEventListener('message', function(event) {
    processMessage(event.data);
});

function processMessage(eventData){
    if(eventData.type == "Player Priority Data") {
        synchronizedPlayerData.playerPriority = eventData.payload.playerPriority;
    }
    if(eventData.type == "Player Physics Data") {
        synchronizedPlayerData.playerPhysics = eventData.payload.playerPhysics;
    }
    if(eventData.type == "Player Animation Data") {
        synchronizedPlayerData.playerAnimation = eventData.payload.playerAnimation;
    }
    if(eventData.type == "Initialize") {
        initialize(eventData.payload);
    }
    if(eventData.type == "Update"){
        update();
    }
}

function initialize(initialData) {
    characterinnerbloom.style.top = characterContainer.offsetTop  + characterContainer.offsetHeight/2 - characterinnerbloom.offsetHeight/2 - ((characterContainer.offsetHeight/20) * 4.75);
    characterinnerbloom.style.left = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - characterinnerbloom.offsetWidth/2 + ((characterContainer.offsetWidth/20) * 5.75);
    charactermiddlebloom.style.top = characterContainer.offsetTop  + characterContainer.offsetHeight/2 - characterinnerbloom.offsetHeight/2 - ((characterContainer.offsetHeight/20) * 4.75);
    charactermiddlebloom.style.left = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - characterinnerbloom.offsetWidth/2 + ((characterContainer.offsetWidth/20) * 5.75);
    characteroutterbloom.style.top = characterContainer.offsetTop  + characterContainer.offsetHeight/2 - characterinnerbloom.offsetHeight/2 - ((characterContainer.offsetHeight/20) * 4.75);
    characteroutterbloom.style.left = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - characterinnerbloom.offsetWidth/2 + ((characterContainer.offsetWidth/20) * 5.75);
    characterShadowmap.style.top = characterContainer.offsetTop  + characterContainer.offsetHeight/2 - characterShadowmap.offsetHeight/2 - ((characterContainer.offsetHeight/20) * 4.75) + characterContainer.offsetHeight;
    characterShadowmap.style.left = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - characterShadowmap.offsetWidth/2 + ((characterContainer.offsetWidth/20) * 5.75);
    var stringContainers = document.getElementsByClassName('game-character-strings');
    var stringList = Array.from(stringContainers);
    for (var object of stringList) {
        stringsList.add(object);
        object.style.top = characterContainer.offsetTop + characterContainer.offsetHeight/2 - object.offsetHeight/2 - 130;
        object.style.left = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - object.offsetWidth/2 + 10;
    }
    stringsList.contents(0).style.opacity = 0.21;
    stringsList.contents(1).style.opacity = 0;
    stringsList.contents(2).style.opacity = 0;
    adjustCharacterSprite();
    adjustCharacterStrings();
    adjustCharacterFresnel();
    adjustCharacterBloom();
}

function update(){
    if(oldCharacterAnimationAngle != synchronizedPlayerData.playerAnimation.characterAnimationAngle){
        oldCharacterAnimationAngle = synchronizedPlayerData.playerAnimation.characterAnimationAngle;
        adjustCharacterSprite();
        adjustCharacterStrings();
        adjustCharacterFresnel();
        adjustCharacterBloom();
    }
    if(oldCharacterAnimationFrame != synchronizedPlayerData.playerAnimation.characterAnimationFrame){
        oldCharacterAnimationFrame = synchronizedPlayerData.playerAnimation.characterAnimationFrame;
        adjustCharacterSprite();
    }
}

function adjustCharacterSprite(){
    var posX = -111 * synchronizedPlayerData.playerAnimation.characterAnimationAngle;
    var posY = -150 * synchronizedPlayerData.playerAnimation.characterAnimationFrame;
    characterAvatar.style.backgroundPosition = posX + "px " + posY + "px";        
    characterFresnel.style.backgroundPosition = posX + "px " + posY + "px";        
}

/* Animate Strings */
function adjustCharacterStrings(){
    if(!stringsInitialized){
        stringsInitialized = true;
        for(var x = 0; x < stringsList.count(); x++) {
            stringsList.contents(x).style.top = characterContainer.offsetTop + characterContainer.offsetHeight/2 - stringsList.contents(x).offsetHeight/2 - 130;
            stringsList.contents(x).style.left = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - stringsList.contents(x).offsetWidth/2 + 10;
        }
    }
    if(synchronizedPlayerData.playerAnimation.characterAnimationAngle == 0 || synchronizedPlayerData.playerAnimation.characterAnimationAngle == 4){
        stringsList.contents(0).style.opacity = 0.21;
        stringsList.contents(1).style.opacity = 0;
        stringsList.contents(2).style.opacity = 0;
    }
    if(synchronizedPlayerData.playerAnimation.characterAnimationAngle == 1 || synchronizedPlayerData.playerAnimation.characterAnimationAngle == 3 || synchronizedPlayerData.playerAnimation.characterAnimationAngle == 5 || synchronizedPlayerData.playerAnimation.characterAnimationAngle == 7){
        stringsList.contents(0).style.opacity = 0;
        stringsList.contents(1).style.opacity = 0.21;
        stringsList.contents(2).style.opacity = 0;
    }
    if(synchronizedPlayerData.playerAnimation.characterAnimationAngle == 2 || synchronizedPlayerData.playerAnimation.characterAnimationAngle == 6){
        stringsList.contents(0).style.opacity = 0;
        stringsList.contents(1).style.opacity = 0;
        stringsList.contents(2).style.opacity = 0.21;
    }
}

function adjustCharacterFresnel(){
    if(synchronizedPlayerData.playerAnimation.characterAnimationAngle == 0){
        characterFresnel.style.left = 2 + "px";
        characterFresnel.style.top = -2 + "px";
    }
    if(synchronizedPlayerData.playerAnimation.characterAnimationAngle == 1){
        characterFresnel.style.left = 2 + "px";
        characterFresnel.style.top = -1 + "px";
    }
    if(synchronizedPlayerData.playerAnimation.characterAnimationAngle == 2){
        characterFresnel.style.left = 2 + "px";
        characterFresnel.style.top = -4 + "px";
    }
    if(synchronizedPlayerData.playerAnimation.characterAnimationAngle == 3){
        characterFresnel.style.left = -4 + "px";
        characterFresnel.style.top = -3 + "px";
    }
    if(synchronizedPlayerData.playerAnimation.characterAnimationAngle == 4){
        characterFresnel.style.left = -3 + "px";
        characterFresnel.style.top = -1 + "px";
    }
    if(synchronizedPlayerData.playerAnimation.characterAnimationAngle == 5){
        characterFresnel.style.left = -2 + "px";
        characterFresnel.style.top = -4 + "px";
    }
    if(synchronizedPlayerData.playerAnimation.characterAnimationAngle == 6){
        characterFresnel.style.left = 2 + "px";
        characterFresnel.style.top = -2 + "px";
    }
    if(synchronizedPlayerData.playerAnimation.characterAnimationAngle == 7){
        characterFresnel.style.left = 3 + "px";
        characterFresnel.style.top = -1 + "px";
    }
}

function adjustCharacterBloom(){
    if(!bloomInitialized){
        bloomInitialized = true;
        bloomAngleZeroOffsetY = characterContainer.offsetTop  + characterContainer.offsetHeight/2 - characterinnerbloom.offsetHeight/2 - ((characterContainer.offsetHeight/20) * 4.50);
        bloomAngleZeroOffsetX = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - characterinnerbloom.offsetWidth/2 + ((characterContainer.offsetWidth/20) * 7.75);
        bloomAngleOneOffsetY = characterContainer.offsetTop  + characterContainer.offsetHeight/2 - characterinnerbloom.offsetHeight/2 - ((characterContainer.offsetHeight/20) * 4.75);
        bloomAngleOneOffsetX = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - characterinnerbloom.offsetWidth/2 + ((characterContainer.offsetWidth/20) * 5.75);
        bloomAngleTwoOffsetY = characterContainer.offsetTop  + characterContainer.offsetHeight/2 - characterinnerbloom.offsetHeight/2 - ((characterContainer.offsetHeight/20) * 4.75);
        bloomAngleTwoOffsetX = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - characterinnerbloom.offsetWidth/2 + ((characterContainer.offsetWidth/20) * 3.00);
        bloomAngleThreeOffsetY = characterContainer.offsetTop  + characterContainer.offsetHeight/2 - characterinnerbloom.offsetHeight/2 - ((characterContainer.offsetHeight/20) * 4.75);
        bloomAngleThreeOffsetX = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - characterinnerbloom.offsetWidth/2 + ((characterContainer.offsetWidth/20) * -3.00);
        bloomAngleFourOffsetY = characterContainer.offsetTop  + characterContainer.offsetHeight/2 - characterinnerbloom.offsetHeight/2 - ((characterContainer.offsetHeight/20) * 4.50);
        bloomAngleFourOffsetX = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - characterinnerbloom.offsetWidth/2 + ((characterContainer.offsetWidth/20) * -5.00);
        bloomAngleFiveOffsetY = characterContainer.offsetTop  + characterContainer.offsetHeight/2 - characterinnerbloom.offsetHeight/2 - ((characterContainer.offsetHeight/20) * 4.50);
        bloomAngleFiveOffsetX = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - characterinnerbloom.offsetWidth/2 + ((characterContainer.offsetWidth/20) * -1.50);
        bloomAngleSixOffsetY = characterContainer.offsetTop  + characterContainer.offsetHeight/2 - characterinnerbloom.offsetHeight/2 - ((characterContainer.offsetHeight/20) * 5.00);
        bloomAngleSixOffsetX = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - characterinnerbloom.offsetWidth/2 + ((characterContainer.offsetWidth/20) * 4.25);
        bloomAngleSevenOffsetY = characterContainer.offsetTop  + characterContainer.offsetHeight/2 - characterinnerbloom.offsetHeight/2 - ((characterContainer.offsetHeight/20) * 4.75);
        bloomAngleSevenOffsetX = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - characterinnerbloom.offsetWidth/2 + ((characterContainer.offsetWidth/20) * 6.75);

        characterShadowmapZeroOffsetY = characterContainer.offsetTop  + characterContainer.offsetHeight/2 - characterShadowmap.offsetHeight/2 - ((characterContainer.offsetHeight/20) * 4.50) + characterContainer.offsetHeight;
        characterShadowmapZeroOffsetX = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - characterShadowmap.offsetWidth/2 + ((characterContainer.offsetWidth/20) * 7.75);
        characterShadowmapOneOffsetY = characterContainer.offsetTop  + characterContainer.offsetHeight/2 - characterShadowmap.offsetHeight/2 - ((characterContainer.offsetHeight/20) * 4.75) + characterContainer.offsetHeight;
        characterShadowmapOneOffsetX = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - characterShadowmap.offsetWidth/2 + ((characterContainer.offsetWidth/20) * 5.75);
        characterShadowmapTwoOffsetY = characterContainer.offsetTop  + characterContainer.offsetHeight/2 - characterShadowmap.offsetHeight/2 - ((characterContainer.offsetHeight/20) * 4.75) + characterContainer.offsetHeight;
        characterShadowmapTwoOffsetX = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - characterShadowmap.offsetWidth/2 + ((characterContainer.offsetWidth/20) * 3.00);
        characterShadowmapThreeOffsetY = characterContainer.offsetTop  + characterContainer.offsetHeight/2 - characterShadowmap.offsetHeight/2 - ((characterContainer.offsetHeight/20) * 4.75) + characterContainer.offsetHeight;
        characterShadowmapThreeOffsetX = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - characterShadowmap.offsetWidth/2 + ((characterContainer.offsetWidth/20) * -3.00);
        characterShadowmapFourOffsetY = characterContainer.offsetTop  + characterContainer.offsetHeight/2 - characterShadowmap.offsetHeight/2 - ((characterContainer.offsetHeight/20) * 4.50) + characterContainer.offsetHeight;
        characterShadowmapFourOffsetX = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - characterShadowmap.offsetWidth/2 + ((characterContainer.offsetWidth/20) * -5.00);
        characterShadowmapFiveOffsetY = characterContainer.offsetTop  + characterContainer.offsetHeight/2 - characterShadowmap.offsetHeight/2 - ((characterContainer.offsetHeight/20) * 4.50) + characterContainer.offsetHeight;
        characterShadowmapFiveOffsetX = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - characterShadowmap.offsetWidth/2 + ((characterContainer.offsetWidth/20) * -1.50);
        characterShadowmapSixOffsetY = characterContainer.offsetTop  + characterContainer.offsetHeight/2 - characterShadowmap.offsetHeight/2 - ((characterContainer.offsetHeight/20) * 5.00) + characterContainer.offsetHeight;
        characterShadowmapSixOffsetX = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - characterShadowmap.offsetWidth/2 + ((characterContainer.offsetWidth/20) * 4.25);
        characterShadowmapSevenOffsetY = characterContainer.offsetTop  + characterContainer.offsetHeight/2 - characterShadowmap.offsetHeight/2 - ((characterContainer.offsetHeight/20) * 4.75) + characterContainer.offsetHeight;
        characterShadowmapSevenOffsetX = characterContainer.offsetLeft + characterContainer.offsetWidth/2 - characterShadowmap.offsetWidth/2 + ((characterContainer.offsetWidth/20) * 6.75);
    }
    if(synchronizedPlayerData.playerAnimation.characterAnimationAngle == 0){
        characterinnerbloom.style.top = bloomAngleZeroOffsetY;
        characterinnerbloom.style.left = bloomAngleZeroOffsetX;
        charactermiddlebloom.style.top = bloomAngleZeroOffsetY;
        charactermiddlebloom.style.left = bloomAngleZeroOffsetX;
        characteroutterbloom.style.top = bloomAngleZeroOffsetY;
        characteroutterbloom.style.left = bloomAngleZeroOffsetX;
        characterShadowmap.style.top = characterShadowmapZeroOffsetY;
        characterShadowmap.style.left = characterShadowmapZeroOffsetX;         
    }
    if(synchronizedPlayerData.playerAnimation.characterAnimationAngle == 1){
        characterinnerbloom.style.top = bloomAngleOneOffsetY;
        characterinnerbloom.style.left = bloomAngleOneOffsetX;
        charactermiddlebloom.style.top = bloomAngleOneOffsetY;
        charactermiddlebloom.style.left = bloomAngleOneOffsetX;
        characteroutterbloom.style.top = bloomAngleOneOffsetY;
        characteroutterbloom.style.left = bloomAngleOneOffsetX;
        characterShadowmap.style.top = characterShadowmapOneOffsetY;
        characterShadowmap.style.left = characterShadowmapOneOffsetX; 
    }
    if(synchronizedPlayerData.playerAnimation.characterAnimationAngle == 2){
        characterinnerbloom.style.top = bloomAngleTwoOffsetY;
        characterinnerbloom.style.left = bloomAngleTwoOffsetX;
        charactermiddlebloom.style.top = bloomAngleTwoOffsetY;
        charactermiddlebloom.style.left = bloomAngleTwoOffsetX;
        characteroutterbloom.style.top = bloomAngleTwoOffsetY;
        characteroutterbloom.style.left = bloomAngleTwoOffsetX;
        characterShadowmap.style.top = characterShadowmapTwoOffsetY;
        characterShadowmap.style.left = characterShadowmapTwoOffsetX; 
    }
    if(synchronizedPlayerData.playerAnimation.characterAnimationAngle == 3){
        characterinnerbloom.style.top = bloomAngleThreeOffsetY;
        characterinnerbloom.style.left = bloomAngleThreeOffsetX;
        charactermiddlebloom.style.top = bloomAngleThreeOffsetY;
        charactermiddlebloom.style.left = bloomAngleThreeOffsetX;
        characteroutterbloom.style.top = bloomAngleThreeOffsetY;
        characteroutterbloom.style.left = bloomAngleThreeOffsetX;
        characterShadowmap.style.top = characterShadowmapThreeOffsetY;
        characterShadowmap.style.left = characterShadowmapThreeOffsetX; 
    }
    if(synchronizedPlayerData.playerAnimation.characterAnimationAngle == 4){
        characterinnerbloom.style.top = bloomAngleFourOffsetY;
        characterinnerbloom.style.left = bloomAngleFourOffsetX;
        charactermiddlebloom.style.top = bloomAngleFourOffsetY;
        charactermiddlebloom.style.left = bloomAngleFourOffsetX;
        characteroutterbloom.style.top = bloomAngleFourOffsetY;
        characteroutterbloom.style.left = bloomAngleFourOffsetX;
        characterShadowmap.style.top = characterShadowmapFourOffsetY;
        characterShadowmap.style.left = characterShadowmapFourOffsetX; 
    }
    if(synchronizedPlayerData.playerAnimation.characterAnimationAngle == 5){
        characterinnerbloom.style.top = bloomAngleFiveOffsetY;
        characterinnerbloom.style.left = bloomAngleFiveOffsetX;
        charactermiddlebloom.style.top = bloomAngleFiveOffsetY;
        charactermiddlebloom.style.left = bloomAngleFiveOffsetX;
        characteroutterbloom.style.top = bloomAngleFiveOffsetY;
        characteroutterbloom.style.left = bloomAngleFiveOffsetX;
        characterShadowmap.style.top = characterShadowmapFiveOffsetY;
        characterShadowmap.style.left = characterShadowmapFiveOffsetX; 
    }
    if(synchronizedPlayerData.playerAnimation.characterAnimationAngle == 6){
        characterinnerbloom.style.top = bloomAngleSixOffsetY;
        characterinnerbloom.style.left = bloomAngleSixOffsetX;
        charactermiddlebloom.style.top = bloomAngleSixOffsetY;
        charactermiddlebloom.style.left = bloomAngleSixOffsetX;
        characteroutterbloom.style.top = bloomAngleSixOffsetY;
        characteroutterbloom.style.left = bloomAngleSixOffsetX;
        characterShadowmap.style.top = characterShadowmapSixOffsetY;
        characterShadowmap.style.left = characterShadowmapSixOffsetX; 
    }
    if(synchronizedPlayerData.playerAnimation.characterAnimationAngle == 7){
        characterinnerbloom.style.top = bloomAngleSevenOffsetY;
        characterinnerbloom.style.left = bloomAngleSevenOffsetX;
        charactermiddlebloom.style.top = bloomAngleSevenOffsetY;
        charactermiddlebloom.style.left = bloomAngleSevenOffsetX;
        characteroutterbloom.style.top = bloomAngleSevenOffsetY;
        characteroutterbloom.style.left = bloomAngleSevenOffsetX;
        characterShadowmap.style.top = characterShadowmapSevenOffsetY;
        characterShadowmap.style.left = characterShadowmapSevenOffsetX; 
    }
}