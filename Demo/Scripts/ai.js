self.importScripts("synchronizeddata.js");

const aiphysics = new Worker('aiphysics.js');
const aimovement = new Worker('aimovement.js');
const aianimation = new Worker('aianimation.js');
const aispeech = new Worker('aispeech.js');

var synchronizedAIData = new aIData();

aiphysics.onmessage = function(event) {
    processMessage(event.data);
};

aimovement.onmessage = function(event) {
    processMessage(event.data);
};

aispeech.onmessage = function(event) {
    processMessage(event.data);
};

self.addEventListener('message', function(event) {
    processMessage(event.data);
});

function processMessage(eventData){
    if(eventData.type == "AI Data") {
        synchronizedAIData = eventData.payload;
        aiphysics.postMessage({type: "AI Data", payload: { synchronizedAIData }});
        aimovement.postMessage({type: "AI Data", payload: { synchronizedAIData }});
        aianimation.postMessage({type: "AI Data", payload: { synchronizedAIData }});
    }
    if(eventData.type == "Initialize") {
        initialize(eventData.payload);
    }
    if(eventData.type == "Update"){
        update();
    }
}

function initialize(initialData){
    aiphysics.postMessage({type: "Initialize", payload: { synchronizedAIData }});
    aimovement.postMessage({type: "Initialize", payload: { synchronizedAIData }});
    aianimation.postMessage({type: "Initialize", payload: { synchronizedAIData }});
    aispeech.postMessage({type: "Initialize", payload: { synchronizedAIData }});
}

function update(){
    aiphysics.postMessage({type: "Update", payload: { synchronizedAIData }});
    aimovement.postMessage({type: "Update", payload: { synchronizedAIData }});
    aianimation.postMessage({type: "Update", payload: { synchronizedAIData }});
}