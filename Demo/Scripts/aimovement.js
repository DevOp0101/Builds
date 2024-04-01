self.importScripts("synchronizeddata.js");
self.importScripts("mathadvanced.js");

const aIContainer = document.getElementById("aIcontainer");

var synchronizedAIData = new aIData();

var oldAIOffsetY = 0;
var oldAIOffsetX = 0;
var aIDifferenceY = 0;
var aIDifferenceX = 0;

self.addEventListener('message', function(event) {
    processMessage(event.data);
});

function processMessage(eventData){
    if(eventData.type == "AI Data") {
        synchronizedAIData = eventData.payload;
    }
    if(eventData.type == "Initialize") {
        initialize(eventData.payload);
    }
    if(eventData.type == "Update"){
        update();
    }
}

function initialize(initialData){
    
}

function update(){
    oldAIOffsetY = parseFloat(aIContainer.style.top.toString().replace("px", ""));
    oldAIOffsetX = parseFloat(aIContainer.style.left.toString().replace("px", ""));

    aIContainer.style.top = lerp(oldAIOffsetY, synchronizedAIData.aIOffsetY - synchronizedAIData.aIJumpHeight, synchronizedAIData.aIMovementLerp) + "px";
    aIContainer.style.left = lerp(oldAIOffsetX, synchronizedAIData.aIOffsetX, synchronizedAIData.aIMovementLerp) + "px";

    aIDifferenceY = Math.abs(oldAIOffsetY - synchronizedAIData.aIOffsetY);
    aIDifferenceX = Math.abs(oldAIOffsetX - synchronizedAIData.aIOffsetX);
    if(aIDifferenceY < aIDifferenceX){
        if(oldAIOffsetX > synchronizedAIData.aIOffsetX){
            synchronizedAIData.aIAnimationAngle = 6;
        }
        if(oldAIOffsetX < synchronizedAIData.aIOffsetX){
            synchronizedAIData.aIAnimationAngle = 2;
        }
    }
    if(aIDifferenceY > aIDifferenceX){
        if(oldAIOffsetY > synchronizedAIData.aIOffsetY){
            synchronizedAIData.aIAnimationAngle = 4;
        }
        if(oldAIOffsetY < synchronizedAIData.aIOffsetY){
            synchronizedAIData.aIAnimationAngle = 0;
        }
    }
    self.postMessage({type: "AI Data", payload: { synchronizedAIData }});
}