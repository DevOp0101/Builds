self.importScripts("mathadvanced.js");
self.importScripts("synchronizeddata.js");

const foliageBottom = document.getElementById("foliagebottom");
const foliageMiddle = document.getElementById("foliagemiddle");
const foliageTop = document.getElementById("foliagetop");

var synchronizedPlayerData = new playerData();

var foliageTopInitialOffset = 1536;

var windPower = 10;
var windDirectionChangeMin = 10;
var windDirectionChangeMax = 30;

var windBottomSpeed = .021;
var windMiddleSpeed = .006;
var windTopSpeed = .09;

var windOffsetX = 0;
var windOffsetY = 0;

var foliageOffsetX = 0;
var foliageOffsetY = 0;

var windMiddleOffsetX = 0;
var windMiddleOffsetY = 0;

var foliageMiddleOffsetX = 0;
var foliageMiddleOffsetY = 0;

var windTopOffsetX = 0;
var windTopOffsetY = 0;

var foliageTopOffsetX = 0;
var foliageTopOffsetY = 0;

var foliagMovementCounter = 0;

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
    foliageTopOffsetX = initialData.playerOffsetX * -1.3;
    foliageTopOffsetY = initialData.playerOffsetY * -1.3;
    foliageTop.style.left = foliageTopOffsetX;
    foliageTop.style.top = foliageTopOffsetY;
}

/* Foliage Movement Lerp */
function update(){
    var startTime = new Date().getTime();
    foliagMovementCounter++;
    if(foliagMovementCounter >= Math.random() * windDirectionChangeMax + windDirectionChangeMin){
        windTopOffsetX = windOffsetX;
        windTopOffsetY = windOffsetY;
        windMiddleOffsetX = windTopOffsetX;
        windMiddleOffsetY = windTopOffsetY;
        foliagMovementCounter = 0;
        var windDirectionX = Math.cos(Math.PI * Math.round(Math.random()));;
        var windDirectionY = Math.cos(Math.PI * Math.round(Math.random()));;
        windOffsetX = windDirectionX * windPower;
        windOffsetY = windDirectionY * windPower;
        //console.log(windOffsetX + " && " + windOffsetY);
        //console.log(windDirectionX + " && " + windDirectionY);
    }
    var foliagetDifferenceX = foliageOffsetX - windOffsetX;
    var foliagetDifferenceY = foliageOffsetY - windOffsetY;
    foliageOffsetX = lerp(foliageOffsetX, windOffsetX, windBottomSpeed);
    foliageOffsetY = lerp(foliageOffsetY, windOffsetY, windBottomSpeed);
    //console.log(foliageOffsetX + " && " + foliageOffsetY);
    foliageBottom.style.left = foliageOffsetX + "px";
    foliageBottom.style.top = foliageOffsetY + "px";

    foliageMiddleOffsetX = lerp(foliageMiddleOffsetX, windMiddleOffsetX, windMiddleSpeed);
    foliageMiddleOffsetY = lerp(foliageMiddleOffsetY, windMiddleOffsetY, windMiddleSpeed);
    //console.log(foliageOffsetX + " && " + foliageOffsetY);
    foliageMiddle.style.left = foliageMiddleOffsetX + "px";
    foliageMiddle.style.top = foliageMiddleOffsetY + "px";

    var characterFoliageOffsetX = parseFloat(synchronizedPlayerData.levelOffsetX.toString().replace("px", "")) + (parseFloat(synchronizedPlayerData.characterOffsetX.toString().replace("px", "")) * -1.3);
    var characterFoliageOffsetY = parseFloat(synchronizedPlayerData.levelOffsetY.toString().replace("px", "")) + (parseFloat(synchronizedPlayerData.characterOffsetY.toString().replace("px", "")) * -1.3);
    foliageTopOffsetX = lerp(foliageTopOffsetX, characterFoliageOffsetX + windTopOffsetX - foliageTopInitialOffset, windTopSpeed);
    foliageTopOffsetY = lerp(foliageTopOffsetY, characterFoliageOffsetY + windTopOffsetY - foliageTopInitialOffset, windTopSpeed);
    //console.log(foliageOffsetX + " && " + foliageOffsetY);
    foliageTop.style.left = foliageTopOffsetX + "px";
    foliageTop.style.top = foliageTopOffsetY + "px";
    
    var endTime = new Date().getTime() - endTime;
    console.log("Start-Finish: " + endTime);
}