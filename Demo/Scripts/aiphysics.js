self.importScripts("synchronizeddata.js");

const aIContainer = document.getElementById("aIcontainer");

var oldAIWaypointTime = 0;
var updateAIWaypointTime = 2001;

var aIRotation = 0;

var synchronizedAIData = new aIData();

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

function initialize(initialData) {
    synchronizedAIData.aIOffsetX = initialData.aIOffsetX;
    synchronizedAIData.aIOffsetY = initialData.aIOffsetY;
    synchronizedAIData.aIWaypoints = initialData.aIWaypoints;
    synchronizedAIData.aIInteractiveDistance = initialData.aIInteractiveDistance;
    aIContainer.style.top = synchronizedAIData.aIOffsetY;
    aIContainer.style.left = synchronizedAIData.aIOffsetX;
}

function update() {

    var aIDistanceX = aIContainer.offsetLeft - lights[0].position.x;
    var aIDistanceY = aIContainer.offsetTop - lights[0].position.y;
    aIDistanceX = Math.abs(aIDistanceX);
    aIDistanceY = Math.abs(aIDistanceY);
    if(synchronizedAIData.aIAnimationType == 0 || aIDistanceX < synchronizedAIData.aIInteractiveDistance && aIDistanceY < synchronizedAIData.aIInteractiveDistance){
        console.log("Standing");
        synchronizedAIData.aIOffsetX = aIContainer.offsetLeft;
        synchronizedAIData.aIOffsetY = aIContainer.offsetTop;
    }
    if(synchronizedAIData.aIAnimationType == 1){
        var currentAIWaypointTime = new Date().getTime();
        if(currentAIWaypointTime - oldAIWaypointTime > updateAIWaypointTime){
            oldAIWaypointTime = currentAIWaypointTime;
            synchronizedAIData.aIWaypointIndex = Math.floor(Math.random() * synchronizedAIData.aIWaypoints.length);
            console.log("Walking");
            synchronizedAIData.aIOffsetX = synchronizedAIData.aIWaypoints[synchronizedAIData.aIWaypointIndex].x;
            synchronizedAIData.aIOffsetY = synchronizedAIData.aIWaypoints[synchronizedAIData.aIWaypointIndex].y;  
        }
    }
    if(synchronizedAIData.aIAnimationType == 2){
        var currentAIWaypointTime = new Date().getTime();
        if(currentAIWaypointTime - oldAIWaypointTime > updateAIWaypointTime/2){
            oldAIWaypointTime = currentAIWaypointTime;
            console.log("Running");
            synchronizedAIData.aIWaypointIndex += 1;
            if(synchronizedAIData.aIWaypointIndex >= synchronizedAIData.aIWaypoints.length){
                sychronizedAIPhysicsData.aIAnimationType = 1;
            }
            synchronizedAIData.aIOffsetX = synchronizedAIData.aIWaypoints[synchronizedAIData.aIWaypointIndex].x;
            synchronizedAIData.aIOffsetY = synchronizedAIData.aIWaypoints[synchronizedAIData.aIWaypointIndex].y;
        }
    }
    if(synchronizedAIData.aIAnimationType == 3){
        console.log("Jumping");
        if(synchronizedAIData.aIJumpHeight > 0){
            synchronizedAIData.aIJumpHeight -= 200;
        }
        if(synchronizedAIData.aIJumpHeight < 0){
            sychronizedAIPhysicsData.aIAnimationType = 1;
        }
    }
    if(synchronizedAIData.aIAnimationType == 4){
        console.log("Flipping");
        aIRotation += 45;
        aIContainer.style.transform = 'rotate(' + "-" + aIRotation + 'deg)';

        if (aIRotation >= 360) {
            sychronizedAIPhysicsData.aIAnimationType = 1;
            aIRotation = 0;
            synchronizedAIData.aIAnimating = false;
        }

    }
    
    self.postMessage({type: "AI Data", payload: { synchronizedAIData }});
});