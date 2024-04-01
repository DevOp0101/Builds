self.importScripts("synchronizeddata.js");

const aIContainer = document.getElementById("aIcontainer");
const aIAvatar = document.getElementById("aIavatar");
const aIFresnel = document.getElementById("aIfresnel");

var synchronizedAIData = new aIData();

let aIAnimationFrame = 1;

var aIFresnelDestinationX = 0;
var aIFresnelDestinationY = 0;
var aIFresnelPower = 2;
var aILightAngle = 0;

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
    adjustAISprite();
    adjustAIFresnel();
}

function adjustAISprite(){    
    if(synchronizedAIData.aIAnimationType == 0){
        aIAnimationFrame = 0;
        synchronizedAIData.aIAnimationAngle = 2;
    }

    if(synchronizedAIData.aIAnimationType == 1){
        aIAnimationFrame += 1;
        if(aIAnimationFrame >= 7){
            aIAnimationFrame = 0;
        }
    }
    if(synchronizedAIData.aIAnimationType == 2){
        aIAnimationFrame += 1;
        if(aIAnimationFrame >= 7){
            aIAnimationFrame = 0;
        }
    }
    if(synchronizedAIData.aIAnimationType == 3){
        aIAnimationFrame = 0;
        synchronizedAIData.aIAnimationAngle = 0;
    }
    if(synchronizedAIData.aIAnimationType == 4){
        aIAnimationFrame = 0;
        synchronizedAIData.aIAnimationAngle = 2;
    }
    
    
    var posX = -111 * synchronizedAIData.aIAnimationAngle;
    var posY = -150 * aIAnimationFrame;
    aIAvatar.style.backgroundPosition = posX + "px " + posY + "px";        
    aIFresnel.style.backgroundPosition = posX + "px " + posY + "px";  
}
    
function adjustAIFresnel(){
    aILightAngle = Math.atan2(aIContainer.offsetTop - lights[0].position.y, aIContainer.offsetLeft - lights[0].position.x);

    aIFresnelDestinationX = - Math.cos(aILightAngle) * aIFresnelPower;
    aIFresnelDestinationY = - Math.sin(aILightAngle) * aIFresnelPower;          

    aIFresnel.style.left = aIFresnelDestinationX + "px";
    aIFresnel.style.top = aIFresnelDestinationY + "px";

}