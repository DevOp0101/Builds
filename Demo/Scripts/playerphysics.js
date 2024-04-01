self.importScripts("synchronizeddata.js");
self.importScripts("lists.js");

const container = document.querySelector(".game-container");
const level = document.querySelector(".game-level");

var synchronizedPlayerData = new playerData();


var distance = 80;
var characterMovementSpeed = .19;

var mouseDownId = -1;

var mouseDown = false;
let mouseCurrentX = 0;
let mouseCurrentY = 0;
let mouseX = 0;
let mouseY = 0;
var centerX = 0;
var centerY = 0;
var angle = 0;
var mathCosAngle = 0;
var mathSinAngle = 0;

var destinationX = 0;
var destinationY = 0;
var halfDestinationX = 0;
var halfDestinationY = 0;

var minimumClickDistance = 50;

var previousDistance = 8;

var previousAngle = 0;
var previousDestinationX = 0;
var previousDestinationY = 0;

var collision = false;

var avatarOffsetX = -window.innerWidth/400;
var avatarOffsetY = window.innerHeight/18;

var physicsInitiated = false;

window.addEventListener("resize",function(){
    avatarOffsetX = -window.innerWidth/400;
    avatarOffsetY = window.innerHeight/18;
});

window.addEventListener("mousedown", function(e) {
    mouseDown = true;
});

window.addEventListener("mousemove", function(e) {
    mouseCurrentX = e.clientX;
    mouseCurrentY = e.clientY;
});

window.addEventListener("mouseup", function(e) {
    mouseDown = false;
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

    levelOffsetX = '-2205px';
    levelOffsetY = '-2645px';
    previousDestinationX = '-2205px';
    previousDestinationY = '-2645px';
    characterOffsetX = '2205';
    characterOffsetY = '2645';

function initialize(initialData) {
    synchronizedPlayerData.playerPhysics.levelOffsetX = -initialData.playerOffsetX;
    synchronizedPlayerData.playerPhysics.levelOffsetY = -initialData.playerOffsetY;
    previousDestinationX = -initialData.playerOffsetX;
    previousDestinationY = -initialData.playerOffsetY;
    synchronizedPlayerData.playerPhysics.characterOffsetX = initialData.playerOffsetX;
    synchronizedPlayerData.playerPhysics.characterOffsetY = initialData.playerOffsetY;
}

/* Movement - Collision - Animation */
function update(){
    var startTime = new Date().getTime();
    if(mouseDown || !physicsInitiated){
        physicsInitiated = true;
        mouseX = mouseCurrentX - container.offsetLeft;
        mouseY = mouseCurrentY - container.offsetTop;

        centerX = container.offsetWidth / 2 + avatarOffsetX;
        centerY = container.offsetHeight / 2 + avatarOffsetY;

        const mouseDistanceX = centerX - mouseX;
        const mouseDistanceY = centerY - mouseY;

        angle = Math.atan2(mouseY - centerY, mouseX - centerX);
        mathCosAngle = Math.cos(angle);
        mathSinAngle = Math.sin(angle);

        destinationX = synchronizedPlayerData.playerPhysics.levelOffsetX - mathCosAngle * distance;
        destinationY = synchronizedPlayerData.playerPhysics.levelOffsetY - mathSinAngle * distance;          

        collision = false;
        for(var x = 0; x < synchronizedPlayerData.playerPriority.objectPriorityList.count(); x++){ 
            if(!collision){
                var objectWidth = synchronizedPlayerData.playerPriority.objectPriorityList.contents(x).width/2;
                var objectHeight = synchronizedPlayerData.playerPriority.objectPriorityList.contents(x).height/2;

                var valueX = synchronizedPlayerData.playerPriority.objectPriorityList.contents(x).position.x + objectWidth;
                var valueY = synchronizedPlayerData.playerPriority.objectPriorityList.contents(x).position.y + objectHeight;

                var characterX = (characterOffsetX + avatarOffsetX) - mathCosAngle * -distance ;
                var characterY = (characterOffsetY + avatarOffsetY) - mathSinAngle * -distance;

                var borderPadding = 13;

                var distanceX = valueX - characterX;
                if(distanceX < objectWidth + borderPadding && distanceX > -objectWidth - borderPadding){
                    var distanceY = valueY - characterY;
                    if(distanceY < objectHeight + borderPadding && distanceY > -objectHeight - borderPadding){
                        collision = true;
                    }
                }
            }
        }
        if(!collision){
            if(destinationX < 730 && destinationY < 345 && destinationX > -5340 && destinationY > -5720){
                if(mouseDistanceX > minimumClickDistance || mouseDistanceX < -minimumClickDistance || mouseDistanceY > minimumClickDistance || mouseDistanceY < -minimumClickDistance){
                    halfDestinationX = synchronizedPlayerData.playerPhysics.levelOffsetX - mathCosAngle * (distance/2);
                    halfDestinationY = synchronizedPlayerData.playerPhysics.levelOffsetY - mathSinAngle * (distance/2);  
                    synchronizedPlayerData.playerPhysics.levelOffsetX = halfDestinationX;
                    synchronizedPlayerData.playerPhysics.levelOffsetY = halfDestinationY;
                    synchronizedPlayerData.playerPhysics.characterOffsetX = -halfDestinationX;
                    synchronizedPlayerData.playerPhysics.characterOffsetY = -halfDestinationY;
                    self.postMessage({type: "Player Physics Data", payload: { synchronizedPlayerData.playerPhysics }});
                }
            }
        }
    }

    let relativeX = mouseX - centerX;
    let relativeY = mouseY - centerY;

    /* Sprite Animation Angle */
    if(relativeX < 30 && relativeX > -30 && relativeY > 30){
        synchronizedPlayerData.playerAnimation.characterAnimationAngle = 0;
    }
    if(relativeX > 30 && relativeY > 30){
        synchronizedPlayerData.playerAnimation.characterAnimationAngle = 1;
    }
    if(relativeX > 30 && relativeY < 30 && relativeY > -30){
        synchronizedPlayerData.playerAnimation.characterAnimationAngle = 2;
    }
    if(relativeX > 30 && relativeY < -30){
        synchronizedPlayerData.playerAnimation.characterAnimationAngle = 3;
    }
    if(relativeX < 30 && relativeX > -30 && relativeY < -30){
        synchronizedPlayerData.playerAnimation.characterAnimationAngle = 4;
    }
    if(relativeX < -30 && relativeY < -30){
        synchronizedPlayerData.playerAnimation.characterAnimationAngle = 5;
    }
    if(relativeX < -30 && relativeY < 30 && relativeY > -30){
        synchronizedPlayerData.playerAnimation.characterAnimationAngle = 6;
    }
    if(relativeX < -30 && relativeY > 30){
        synchronizedPlayerData.playerAnimation.characterAnimationAngle = 7;
    }
    
    self.postMessage({type: "Player Animation Data", payload: { synchronizedPlayerData.playerAnimation }});

    var endTime = new Date().getTime() - startTime;
    //console.log("Physics Clock: " + endTime);
}