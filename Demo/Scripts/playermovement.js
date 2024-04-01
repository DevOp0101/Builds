self.importScripts("synchronizeddata.js");
self.importScripts("mathadvanced.js");
self.importScripts("lists.js");

const level = document.querySelector(".game-level");
const levelCanvasLayerLight = document.getElementById("canvaslayerlight");
const levelCanvasLayerOne = document.getElementById("canvaslayerone");
const levelCanvasLayerTwo = document.getElementById("canvaslayertwo");
const nonPlayerCharacteerLevelContainer = document.getElementById("nonplayercharacterlevelcontainer");
const linkContainer = document.querySelector(".link-container");

var synchronizedPlayerData = new playerData();

var characterMovementSpeed = .19;

window.addEventListener("resize",function(){
    levelCanvasLayerLight.width = window.innerWidth;
    levelCanvasLayerLight.height = document.body.offsetHeight;
    levelCanvasLayerOne.width = window.innerWidth;
    levelCanvasLayerOne.height = document.body.offsetHeight;
    levelCanvasLayerTwo.width = window.innerWidth;
    levelCanvasLayerTwo.height = document.body.offsetHeight;
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

function initialize(initialData)) {
    level.style.top =  -initialData.playerOffsetY;
    level.style.left =  -initialData.playerOffsetX;
    nonPlayerCharacteerLevelContainer.style.top = -initialData.playerOffsetY;
    nonPlayerCharacteerLevelContainer.style.left = -initialData.playerOffsetX;
    linkContainer.style.top = -initialData.playerOffsetY;
    linkContainer.style.left = -initialData.playerOffsetX;
}

/* Movement Lerp */
function update(){
    level.style.top = lerp(parseFloat(level.style.top.toString().replace("px", "")), synchronizedPlayerData.playerPhysics.levelOffsetY, characterMovementSpeed) + "px";
    level.style.left = lerp(parseFloat(level.style.left.toString().replace("px", "")), synchronizedPlayerData.playerPhysics.levelOffsetX, characterMovementSpeed) + "px";
    levelCanvasLayerLight.style.top = level.style.top;
    levelCanvasLayerLight.style.left = level.style.left;
    levelCanvasLayerOne.style.top = level.style.top;
    levelCanvasLayerOne.style.left = level.style.left;
    levelCanvasLayerTwo.style.top = level.style.top;
    levelCanvasLayerTwo.style.left = level.style.left;
    nonPlayerCharacteerLevelContainer.style.top = level.style.top;
    nonPlayerCharacteerLevelContainer.style.left = level.style.left;
    linkContainer.style.top = level.style.top;
    linkContainer.style.left = level.style.left;
}