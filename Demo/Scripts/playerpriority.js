self.importScripts("synchronizeddata.js");
self.importScripts("lists.js");

var priorityDistance = 800;

var objects = [];

var synchronizedPlayerData = new playerData();

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
    objects = initialData.objects;
}

/* Collision Priority Manager */
function update(){
    synchronizedPlayerData.playerPriority.objectPriorityList.clear();
    for(var object of objects){
        var distanceX = object.position.x - synchronizedPlayerData.playerPhysics.characterOffsetX;
        var distanceY = object.position.y - synchronizedPlayerData.playerPhysics.characterOffsetY;

        if(distanceX < priorityDistance && distanceX > -priorityDistance && distanceY < priorityDistance && distanceY > -priorityDistance){
            synchronizedPlayerData.playerPriority.objectPriorityList.add(object);
        }
    }
    console.log("Prioritizing" + synchronizedPlayerData.playerPriority.objectPriorityList.count());
    
    self.postMessage({type: "Player Priority Data", payload: { synchronizedPlayerData.playerPriority }});

    var newCurrentTime = new Date().getTime();
    //console.log(newCurrentTime - beginningTime + " Start-Finish");
}