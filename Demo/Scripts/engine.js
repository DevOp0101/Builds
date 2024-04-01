var aIList = persistentList();

var currentTime;
var previousTime;
var fixedTime = 100;
var fixedUpdating = false;

var aITimer = 5;
var playerTimer = 5;
var renderTimer = 1;

var aITime = 0;
var playerTime = 0;
var renderTime = 0;

var player = new Worker('player.js');

var levelData = {
    playerOffsetX: 0,
    playerOffsetY: 0,
    lights: [],
    objects: [],
    avatars: []
}

    
var robotOneData = {
    aIPosition: {
        x: 0,
        y: 0
    },
    aiWaypoints: [
        new Vector(5355, 2503),
        new Vector(5355, 2605),
        new Vector(5655, 2605),
        new Vector(5655, 2503)
    ]
}
var ai = new Worker('ai.js');
ai.postMessage(robotOneData);
aIList.add(ai);


function fixedUpdate(){
    currentTime = new Date().getTime();
    if(currentTime - previousTime > fixedTime){
        previousTime = currentTime;
        fixedUpdating = true;
    }
    if(fixedUpdating){
        fixedUpdating = false;
        aITime++;
        playerTime++;
        renderTime++;
        
        if(aITime >= aITimer){
            for(var x = 0; x < aIList.count(); x++){
                aIList.contents(x).postMessage("Update");
            }
        }
        if(playerTime >= playerTimer){
            player.postMessage("Update");
        }
        if(renderTime >= renderTimer){
            //Render
        }

    }
    requestAnimationFrame(fixedUpdate);
}

fixedUpdate();