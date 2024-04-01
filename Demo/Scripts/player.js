self.importScripts("synchronizeddata.js");
self.importScripts("lists.js");

const playerPhysics = new Worker('playerphysics.js');
const playerMovement = new Worker('playermovement.js');
const playerAnimation = new Worker('playeranimation.js');
const renderer = new Worker('render.js');

var synchronizedPlayerData = new playerData();

playerPriority.onmessage = function(event) {
    processMessage(event.data);
});

playerPhysics.onmessage = function(event) {
    processMessage(event.data);
});

playerMovement.onmessage = function(event) {
    processMessage(event.data);
});

self.addEventListener('message', function(event) {
    processMessage(event.data);
});

function processMessage(eventData){
    if(eventData.type == "Player Priority Data") {
        synchronizedPlayerData.playerPriority = eventData.payload.playerPriority;
        playerPriority.postMessage({type: "Player Priority Data", payload: { eventData.payload.playerPriority }});
        playerPhysics.postMessage({type: "Player Priority Data", payload: { eventData.payload.playerPriority }});
        playerMovement.postMessage({type: "Player Priority Data", payload: { eventData.payload.playerPriority }});
    }
    if(eventData.type == "Player Physics Data") {
        synchronizedPlayerData.playerPhysics = eventData.payload.playerPhysics;
        playerPriority.postMessage({type: "Player Priority Data", payload: { eventData.payload.playerPhysics }});
        playerPhysics.postMessage({type: "Player Priority Data", payload: { eventData.payload.playerPhysics }});
        renderer.postMessage({type: "Player Priority Data", payload: { eventData.payload.playerPhysics }});
    }
    if(eventData.type == "Player Animation Data") {
        synchronizedPlayerData.playerAnimation = eventData.payload.playerAnimation;
        playerPhysics.postMessage({type: "Player Priority Data", payload: { eventData.payload.playerAnimation }});
        playerAnimation.postMessage({type: "Player Priority Data", payload: { eventData.payload.playerAnimation }});
    }
    if(eventData.type == "Initialize") {
        initialize(eventData.payload);
    }
    if(eventData.type == "Update"){
        update();
    }
}

function initialize(initialData){
    playerPriority.postMessage({type: "Initialize", payload: { initialData.payload }});
    playerPhysics.postMessage({type: "Initialize", payload: { initialData.payload }});
    playerMovement.postMessage({type: "Initialize", payload: { initialData.payload }});
    playerAnimation.postMessage({type: "Initialize", payload: { initialData.payload }});
    renderer.postMessage({type: "Initialize", payload: { initialData.payload }});
}

function update(){
    playerPriority.postMessage({type: "Update", payload: { synchronizedPlayerData }});
    playerPhysics.postMessage({type: "Update", payload: { synchronizedPlayerData }});
    playerMovement.postMessage({type: "Update", payload: { synchronizedPlayerData }});
    playerAnimation.postMessage({type: "Update", payload: { synchronizedPlayerData }});
    renderer.postMessage({type: "Update", payload: { initialData.payload }});
}