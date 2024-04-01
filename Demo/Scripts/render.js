self.importScripts("synchronizeddata.js");
self.importScripts("mathadvanced.js");
self.importScripts("vectoroperations.js");
self.importScripts("lists.js");

const container = document.querySelector(".game-container");
const level = document.querySelector(".game-level");
const characterContainer = document.querySelector(".game-character-container");

var width = 6144;
var height = 6144;

var renderLayerLightCanvas = document.getElementById("canvaslayerlight");
var layerLight = renderLayerLightCanvas.getContext("2d");
renderLayerLightCanvas.width = width;
renderLayerLightCanvas.height = height;

var renderLayerOneCanvas = document.getElementById("canvaslayerone");
var layerOne = renderLayerOneCanvas.getContext("2d");
renderLayerOneCanvas.width = width;
renderLayerOneCanvas.height = height;

var renderLayerTwoCanvas = document.getElementById("canvaslayertwo");
var layerTwo = renderLayerTwoCanvas.getContext("2d");
renderLayerTwoCanvas.width = width;
renderLayerTwoCanvas.height = height;

/* Load Images */
const cageBottomImage = new Image();
cageBottomImage.src = '../Images/Cagebottom.png';
cageBottomImage.className = "game-lighting";

const cageBottomDimImage = new Image();
cageBottomDimImage.src = '../Images/Cagebottomdim.png';
cageBottomDimImage.className = "game-lighting";

const cageTopImage = new Image();
cageTopImage.src = '../Images/Cagetop.png';
cageTopImage.className = "game-lighting";

const portalBottomImage = new Image();
portalBottomImage.src = '../Images/Portalbottom.png';
portalBottomImage.className = "game-lighting";

const portalBottomDimImage = new Image();
portalBottomDimImage.src = '../Images/Portalbottomdim.png';
portalBottomDimImage.className = "game-lighting";

const portalTopImage = new Image();
portalTopImage.src = '../Images/Portaltop.png';
portalTopImage.className = "game-lighting";

const altarBottomImage = new Image();
altarBottomImage.src = '../Images/Altarbottom.png';
altarBottomImage.className = "game-lighting";

const altarBottomDimImage = new Image();
altarBottomDimImage.src = '../Images/Altarbottomdim.png';
altarBottomDimImage.className = "game-lighting";

const altarTopImage = new Image();
altarTopImage.src = '../Images/Altartop.png';
altarTopImage.className = "game-lighting";

const wallBottomImage = new Image();
wallBottomImage.src = '../Images/Wallbottom.png';
wallBottomImage.className = "game-lighting";

const wallBottomDimImage = new Image();
wallBottomDimImage.src = '../Images/Wallbottomdim.png';
wallBottomDimImage.className = "game-lighting";

const wallTopImage = new Image();
wallTopImage.src = '../Images/Walltop.png';
wallTopImage.className = "game-lighting";

const pillarBottomImage = new Image();
pillarBottomImage.src = '../Images/Pillarbottom.png';
pillarBottomImage.className = "game-lighting";

const pillarBottomDimImage = new Image();
pillarBottomDimImage.src = '../Images/Pillarbottomdim.png';
pillarBottomDimImage.className = "game-lighting";

const pillarTopImage = new Image();
pillarTopImage.src = '../Images/Pillartop.png';
pillarTopImage.className = "game-lighting";

var synchronizedPlayerData = new playerData();

var topDistanceRatioX = 23;
var topDistanceRatioY = 13;

var avatarOffsetX = -window.innerWidth/400;
var avatarOffsetY = window.innerHeight/18;

var characterLightOffsetX = 0;
var characterLightOffsetY = 10;

var lightAngle = 0;

var maximumRenderDistance = 1000;

var containerOffsetHalfWidth = 0;
var containerOffsetHalfHeight = 0;

var renderOffsetX = 0;
var renderOffsetY = 0;

var objectsInitialized = false;

var renderInitialized = false;
var renderCount = 0;

var topX = 0;
var topY = 0;

var angle = 0;

var lights = [];
var objects = [];
var avatars = [];
var renderContainers = [];

window.addEventListener("resize",function(){
    avatarOffsetX = -window.innerWidth/400;
    avatarOffsetY = window.innerHeight/18;
    containerOffsetHalfWidth = container.offsetWidth/2;
    containerOffsetHalfHeight = container.offsetHeight/2;
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

function initialize(initialData) {
    synchronizedPlayerData.playerPhysics.characterOffsetX = initialData.playerOffsetX;
    synchronizedPlayerData.playerPhysics.characterOffsetY = initialData.playerOffsetY;

    for(var x = 0; x < initialData.lights.length; x++){
        lights.push(initialData.lights[x]);
    }
    
    for(var x = 0; x < initialData.objects.length; x++){
        objects.push(initialData.objects[x]);
    }
    
    for(var x = 0; x < initialData.avatars.length; x++){
        avatars.push(initialData.avatars[x]);
    }
    
    /* Character Light */
    lights.push(new light(new vector(window.innerWidth/2,window.innerHeight/2), 380, 360, 'rgba(255,137,47,0.035)', "Point"));
    
    /* Character Block */
    avatars.push(new object(new vector(2205, 2645), 15, 15, "Avatar"));

    /* Landscape #4 */

    /* Altars #4 */
    objects.push(new object(new  vector(825, 3110), 150, 150, "Altar"));
    objects.push(new object(new  vector(1075, 3310), 150, 150, "Altar"));
    objects.push(new object(new  vector(575, 3310), 150, 150, "Altar"));

    /* School Walls #4 */
    /* School Right Walls #4 */
    objects.push(new object(new  vector(1406, 2410), 100, 100, "Wall"));
    objects.push(new object(new  vector(1406, 2460), 100, 240, "Wall"));
    objects.push(new object(new  vector(1406, 2680), 100, 240, "Wall"));
    objects.push(new object(new  vector(1406, 2850), 100, 100, "Wall"));

    objects.push(new object(new  vector(1406, 3200), 100, 100, "Wall"));
    objects.push(new object(new  vector(1406, 3280), 100, 240, "Wall"));
    objects.push(new object(new  vector(1406, 3480), 100, 240, "Wall"));
    objects.push(new object(new  vector(1406, 3640), 100, 100, "Wall"));

    /* School Top Walls #4 */
    objects.push(new object(new  vector(1176, 2410), 240, 100, "Wall"));
    objects.push(new object(new  vector(946, 2410), 240, 100, "Wall"));
    objects.push(new object(new  vector(846, 2410), 240, 100, "Wall"));
    objects.push(new object(new  vector(646, 2410), 240, 100, "Wall"));
    objects.push(new object(new  vector(446, 2410), 240, 100, "Wall"));
    objects.push(new object(new  vector(326, 2410), 240, 100, "Wall"));

    /* School Left Walls #4 */
    objects.push(new object(new  vector(266, 2410), 100, 100, "Wall"));
    objects.push(new object(new  vector(266, 2460), 100, 240, "Wall"));
    objects.push(new object(new  vector(266, 2680), 100, 240, "Wall"));
    objects.push(new object(new  vector(266, 2880), 100, 240, "Wall"));
    objects.push(new object(new  vector(266, 3080), 100, 240, "Wall"));
    objects.push(new object(new  vector(266, 3280), 100, 240, "Wall"));
    objects.push(new object(new  vector(266, 3480), 100, 240, "Wall"));
    objects.push(new object(new  vector(266, 3640), 100, 100, "Wall"));

    /* School Bottom Walls #4 */
    objects.push(new object(new  vector(1176, 3640), 240, 100, "Wall"));
    objects.push(new object(new  vector(946, 3640), 240, 100, "Wall"));
    objects.push(new object(new  vector(846, 3640), 240, 100, "Wall"));
    objects.push(new object(new  vector(646, 3640), 240, 100, "Wall"));
    objects.push(new object(new  vector(446, 3640), 240, 100, "Wall"));
    objects.push(new object(new  vector(326, 3640), 240, 100, "Wall"));


    /* Path Pillars #4 */
    objects.push(new object(new  vector(1844, 2908), 60, 60, "Pillar"));
    objects.push(new object(new  vector(1844, 3180), 60, 60, "Pillar"));
    objects.push(new object(new  vector(1514, 2908), 60, 60, "Pillar"));
    objects.push(new object(new  vector(1514, 3180), 60, 60, "Pillar"));


    /* Landscape #5 */
    /* Path Pillars Top */    
    objects.push(new object(new  vector(2908, 2569), 60, 60, "Pillar"));
    objects.push(new object(new  vector(3173, 2569), 60, 60, "Pillar"));
    objects.push(new object(new  vector(2908, 2226), 60, 60, "Pillar"));
    objects.push(new object(new  vector(3173, 2226), 60, 60, "Pillar"));

    /* Path Pillars Bottom */
    objects.push(new object(new  vector(2908, 3559), 60, 60, "Pillar"));
    objects.push(new object(new  vector(3173, 3559), 60, 60, "Pillar"));
    objects.push(new object(new  vector(2908, 3901), 60, 60, "Pillar"));
    objects.push(new object(new  vector(3173, 3901), 60, 60, "Pillar"));

    /* Path Pillars Left */
    objects.push(new object(new  vector(2188, 2908), 60, 60, "Pillar"));
    objects.push(new object(new  vector(2188, 3180), 60, 60, "Pillar"));
    objects.push(new object(new  vector(2529, 2908), 60, 60, "Pillar"));
    objects.push(new object(new  vector(2529, 3180), 60, 60, "Pillar"));

    /* Path Pillars Right */
    objects.push(new object(new  vector(3531, 2908), 60, 60, "Pillar"));
    objects.push(new object(new  vector(3531, 3180), 60, 60, "Pillar"));
    objects.push(new object(new  vector(3871, 2908), 60, 60, "Pillar"));
    objects.push(new object(new  vector(3871, 3180), 60, 60, "Pillar"));

    /* Path Pillars Center */
    objects.push(new object(new  vector(2908, 2908), 60, 60, "Pillar"));
    objects.push(new object(new  vector(3173, 2908), 60, 60, "Pillar"));
    objects.push(new object(new  vector(2908, 3180), 60, 60, "Pillar"));
    objects.push(new object(new  vector(3173, 3180), 60, 60, "Pillar"));


    /* Landscape #6 */

    /* Path Pillars #6 */
    objects.push(new object(new  vector(4215, 2908), 60, 60, "Pillar"));
    objects.push(new object(new  vector(4215, 3180), 60, 60, "Pillar"));
    objects.push(new object(new  vector(4577, 2908), 60, 60, "Pillar"));
    objects.push(new object(new  vector(4577, 3180), 60, 60, "Pillar"));

    /* Labratory Top Wall #6 */ 
    objects.push(new object(new  vector(5547, 2410), 240, 100, "Wall"));
    objects.push(new object(new  vector(5347, 2410), 240, 100, "Wall"));
    objects.push(new object(new  vector(5247, 2410), 240, 100, "Wall"));
    objects.push(new object(new  vector(5047, 2410), 240, 100, "Wall"));
    objects.push(new object(new  vector(4847, 2410), 240, 100, "Wall"));
    objects.push(new object(new  vector(4747, 2410), 240, 100, "Wall"));

    /* Labratory Right Walls #6 */
    objects.push(new object(new  vector(5763, 2410), 100, 100, "Wall"));
    objects.push(new object(new  vector(5763, 2460), 100, 240, "Wall"));
    objects.push(new object(new  vector(5763, 2680), 100, 240, "Wall"));
    objects.push(new object(new  vector(5763, 2880), 100, 240, "Wall"));
    objects.push(new object(new  vector(5763, 3080), 100, 240, "Wall"));
    objects.push(new object(new  vector(5763, 3280), 100, 240, "Wall"));
    objects.push(new object(new  vector(5763, 3480), 100, 240, "Wall"));
    objects.push(new object(new  vector(5763, 3640), 100, 100, "Wall"));

    /* Labratory Bottom Wall #6 */ 
    objects.push(new object(new  vector(5547, 3640), 240, 100, "Wall"));
    objects.push(new object(new  vector(5347, 3640), 240, 100, "Wall"));
    objects.push(new object(new  vector(5247, 3640), 240, 100, "Wall"));
    objects.push(new object(new  vector(5047, 3640), 240, 100, "Wall"));
    objects.push(new object(new  vector(4847, 3640), 240, 100, "Wall"));
    objects.push(new object(new  vector(4747, 3640), 240, 100, "Wall"));

    /* Labratory Left Walls #6 */
    objects.push(new object(new  vector(4645, 2410), 100, 100, "Wall"));
    objects.push(new object(new  vector(4645, 2460), 100, 240, "Wall"));
    objects.push(new object(new  vector(4645, 2680), 100, 240, "Wall"));
    objects.push(new object(new  vector(4645, 2850), 100, 100, "Wall"));

    objects.push(new object(new  vector(4645, 3200), 100, 100, "Wall"));
    objects.push(new object(new  vector(4645, 3280), 100, 240, "Wall"));
    objects.push(new object(new  vector(4645, 3480), 100, 240, "Wall"));
    objects.push(new object(new  vector(4645, 3640), 100, 100, "Wall"));

    /* Cage #6 */
    objects.push(new object(new vector(5280, 2505), 500, 300, "Cage"));

    /* Portal #6 */
    objects.push(new object(new  vector(5148, 3153), 250, 250, "Invisible"));

    /* Level Lights #6*/
    lights.push(new light(new vector(5248, 3253), 700, 360, 'rgba(127,200,255,0.02)', "Static"));
    lights.push(new light(new vector(5248, 3253), 600, 360, 'rgba(127,200,255,0.02)', "Static"));
    lights.push(new light(new vector(5248, 3253), 500, 360, 'rgba(127,200,255,0.02)', "Static"));
    lights.push(new light(new vector(5248, 3253), 400, 360, 'rgba(127,200,255,0.02)', "Static"));

    objectsInitialized = true;

    for(var r = 0; r < objects.Length; r++){
        renderContainers.push(new object(new  vector(0, 0), 0, 0, "Null"));
        renderContainers.push(new object(new  vector(0, 0), 0, 0, "Null"));
    }
}

/* Find Distance */
function findDistance(light, object, angle, rLen, start, shortest, closestBlock){
    var y = (object.position.y + object.height/2) - light.position.y,
        x = (object.position.x + object.width/2) - light.position.x,
        dist = Math.sqrt((y * y) + (x * x));

    if(light.radius >= dist)
    {
        var rads = angle * (Math.PI / 180),
            pointPos = new vector(light.position.x, light.position.y);

        pointPos.x += Math.cos(rads) * dist;
        pointPos.y += Math.sin(rads) * dist;

        if(pointPos.x > object.position.x && pointPos.x < object.position.x + object.width && pointPos.y > object.position.y && pointPos.y < object.position.y + object.height)
        {
            if(start || dist < shortest){
                start = false;
                shortest = dist;
                rLen= dist;
                closestBlock = object;
            }
            return {'start' : start, 'shortest' : shortest, 'rLen' : rLen, 'object' : closestBlock};
        }
    }
    return {'start' : start, 'shortest' : shortest, 'rLen' : rLen, 'object' : closestBlock};
}

/* Shine Light */
function shineLight(light, index){
    var curAngle = light.angle - (light.angleSpread/2),
        dynLen = light.radius,
        addTo = 1/light.radius;

    for(curAngle; curAngle < light.angle + (light.angleSpread/2); curAngle += (addTo * (180/Math.PI))*2){
        dynLen = light.radius;

        var findDistRes = {};

        findDistRes.start = true;
        findDistRes.shortest = 0;
        findDistRes.rLen = dynLen;
        findDistRes.object = {};

        if(light.type == "Point"){
            for(var i = 0; i < objects.length; i++)
            {
                var objectLightDistanceX = objects[i].position.x - light.position.x;
                if(objectLightDistanceX < maximumRenderDistance && objectLightDistanceX > -maximumRenderDistance && objects[i].type != "Invisible"){
                    var objectLightDistanceY = objects[i].position.y - light.position.y;
                    if(objectLightDistanceY < maximumRenderDistance && objectLightDistanceY > -maximumRenderDistance){
                        findDistRes = findDistance(light, objects[i], curAngle, findDistRes.rLen, findDistRes.start, findDistRes.shortest, findDistRes.object);
                    }
                }
            }
            for(var i = 0; i < avatars.length; i++)
            {
                if(i != 0){
                    var objectLightDistanceX = avatars[i].position.x - light.position.x;
                    if(objectLightDistanceX < maximumRenderDistance && objectLightDistanceX > -maximumRenderDistance){
                        var objectLightDistanceY = avatars[i].position.y - light.position.y;
                        if(objectLightDistanceY < maximumRenderDistance && objectLightDistanceY > -maximumRenderDistance){
                            findDistRes = findDistance(light, avatars[i], curAngle, findDistRes.rLen, findDistRes.start, findDistRes.shortest, findDistRes.object);
                        }
                    }
                }
            }
        }
        if(light.type == "Static"){
            var objectLightDistanceX = objects[0].position.x - light.position.x;
            if(objectLightDistanceX < maximumRenderDistance && objectLightDistanceX > -maximumRenderDistance && objects[0].type != "Invisible"){
                var objectLightDistanceY = objects[0].position.y - light.position.y;
                if(objectLightDistanceY < maximumRenderDistance && objectLightDistanceY > -maximumRenderDistance){
                    findDistRes = findDistance(light, objects[0], curAngle, findDistRes.rLen, findDistRes.start, findDistRes.shortest, findDistRes.object);
                }
            }
            for(var i = 0; i < avatars.length; i++)
            {
                var objectLightDistanceX = avatars[i].position.x - light.position.x;
                if(objectLightDistanceX < maximumRenderDistance && objectLightDistanceX > -maximumRenderDistance){
                    var objectLightDistanceY = avatars[i].position.y - light.position.y;
                    if(objectLightDistanceY < maximumRenderDistance && objectLightDistanceY > -maximumRenderDistance){
                        findDistRes = findDistance(light, avatars[i], curAngle, findDistRes.rLen, findDistRes.start, findDistRes.shortest, findDistRes.object);
                    }
                }
            }
        }

        /* Check if character light */
        if(index == 0){
            var rads = curAngle * (Math.PI / 180),
                end = new vector(light.position.x, light.position.y);

            findDistRes.object.visible = true;
            end.x += Math.cos(rads) * findDistRes.rLen;
            end.y += Math.sin(rads) * findDistRes.rLen;

            layerLight.beginPath();
            layerLight.moveTo(light.position.x, light.position.y);
            layerLight.lineTo(end.x, end.y);
            layerLight.closePath();
            layerLight.stroke();
        }
        /* Check if not character light */
        if(index != 0){
            var rads = curAngle * (Math.PI / 180),
                end = new vector(light.position.x, light.position.y);

            findDistRes.object.visible = true;
            end.x += Math.cos(rads) * findDistRes.rLen;
            end.y += Math.sin(rads) * findDistRes.rLen;

            layerLight.beginPath();
            layerLight.moveTo(light.position.x, light.position.y);
            layerLight.lineTo(end.x, end.y);
            layerLight.closePath();
            layerLight.stroke();
        }
    }
}

function prerender(){
    layerTwo.clearRect(0, 0, width, height);
    for(var i = 0; i < objects.length; i++){
        var object = objects[i];
        if(object.type == "Altar"){
            //Do Nothing
        }
        if(object.type == "Cage"){
            layerTwo.drawImage(cageBottomImage, object.position.x, object.position.y, object.width, object.height);
        }
        if(object.type == "Pillar"){
            layerTwo.drawImage(pillarBottomImage, object.position.x, object.position.y, object.width, object.height);
        }
        if(object.type == "Wall"){
            layerTwo.drawImage(wallBottomImage, object.position.x, object.position.y, object.width, object.height);
        }
    }  
}

function update(){
    var startTime = new Date().getTime();
    //Possible use
    renderOffsetX = synchronizedPlayerData.playerPhysics.characterOffsetX - containerOffsetHalfWidth;
    renderOffsetY = synchronizedPlayerData.playerPhysics.characterOffsetY - containerOffsetHalfHeight;
    if(renderOffsetX < 0){
        renderOffsetX = 0;
    }
    if(renderOffsetX > width - containerOffsetHalfWidth){
        renderOffsetX = width - containerOffsetHalfWidth;
    }
    if(renderOffsetY < 0){
        renderOffsetY = 0;
    }
    if(renderOffsetY > height - containerOffsetHalfHeight){
        renderOffsetY = height - containerOffsetHalfHeight;
    }
    layerLight.clearRect(0, 0, width, height);
    layerOne.clearRect(0, 0, width, height);

    for(var i = 0; i < objects.length; i++){
        var object = objects[i];
        var objectDistanceX = object.position.x - lights[0].position.x;
        if(objectDistanceX < maximumRenderDistance && objectDistanceX > -maximumRenderDistance){
            var objectDistanceY = object.position.y - lights[0].position.y;
            if(objectDistanceY < maximumRenderDistance && objectDistanceY > -maximumRenderDistance){
                lightAngle = Math.atan2(object.position.y - (lights[0].position.y + avatarOffsetY), object.position.x - (lights[0].position.x +  + avatarOffsetX));

                if(object.visible){
                    if(object.type == "Altar"){
                        var topDistanceX = Math.abs((lights[0].position.x - object.position.x) / topDistanceRatioX) + 2;
                        var topDistanceY = Math.abs((lights[0].position.y - object.position.y) / topDistanceRatioY) + (topDistanceX/2);
                        topX = object.position.x - Math.cos(lightAngle) * topDistanceX/1.5;
                        topY = object.position.y - Math.sin(lightAngle) * topDistanceY/1.5;
                        layerOne.drawImage(altarBottomImage, topX, topY, object.width, object.height);
                        layerOne.drawImage(altarTopImage, object.position.x, object.position.y, object.width, object.height);
                    }
                    if(object.type == "Cage"){
                        var topDistanceX = Math.abs((lights[0].position.x - (object.position.x + (object.width/2))) / topDistanceRatioX) + 2;
                        var topDistanceY = Math.abs((lights[0].position.y - (object.position.y + object.height/2)) / topDistanceRatioY) + (topDistanceX/2);
                        if(topDistanceY < 50){
                            topDistanceY = 50;
                        }
                        topX = object.position.x - Math.cos(lightAngle) * -topDistanceX * 1.9;
                        topY = object.position.y - Math.sin(lightAngle) * -topDistanceY * 1.7;
                        layerOne.drawImage(cageTopImage, topX, topY, object.width, object.height);
                    }
                    if(object.type == "Pillar"){
                        var topDistanceX = Math.abs((lights[0].position.x - object.position.x) / topDistanceRatioX) + 2;
                        var topDistanceY = Math.abs((lights[0].position.y - object.position.y) / topDistanceRatioY) + (topDistanceX/2);
                        topX = object.position.x - Math.cos(lightAngle) * -topDistanceX;
                        topY = object.position.y - Math.sin(lightAngle) * -topDistanceY;
                        layerOne.drawImage(pillarTopImage, topX, topY, object.width, object.height);
                    }
                    if(object.type == "Wall"){
                        var topDistanceX = Math.abs((lights[0].position.x - object.position.x) / topDistanceRatioX) + 2;
                        var topDistanceY = Math.abs((lights[0].position.y - object.position.y) / topDistanceRatioY) + (topDistanceX/2);
                        topX = object.position.x - Math.cos(lightAngle) * -topDistanceX;
                        topY = object.position.y - Math.sin(lightAngle) * -topDistanceY;
                        layerOne.drawImage(wallTopImage, topX, topY, object.width, object.height);
                    }


                    object.visible = false;
                }else{
                    if(object.type == "Altar"){
                        var topDistanceX = Math.abs((lights[0].position.x - object.position.x) / topDistanceRatioX) + 2;
                        var topDistanceY = Math.abs((lights[0].position.y - object.position.y) / topDistanceRatioY) + (topDistanceX/2);
                        topX = object.position.x - Math.cos(lightAngle) * topDistanceX/1.5;
                        topY = object.position.y - Math.sin(lightAngle) * topDistanceY/1.5;
                        layerOne.drawImage(altarBottomDimImage, topX, topY, object.width, object.height);
                        layerOne.drawImage(altarTopImage, object.position.x, object.position.y, object.width, object.height);
                    }
                    if(object.type == "Cage"){
                        var topDistanceX = Math.abs((lights[0].position.x - (object.position.x + (object.width/2))) / topDistanceRatioX) + 2;
                        var topDistanceY = Math.abs((lights[0].position.y - (object.position.y + object.height/2)) / topDistanceRatioY) + (topDistanceX/2);
                        if(topDistanceY < 50){
                            topDistanceY = 50;
                        }
                        topX = object.position.x - Math.cos(lightAngle) * -topDistanceX * 1.9;
                        topY = object.position.y - Math.sin(lightAngle) * -topDistanceY * 1.7;
                        layerOne.drawImage(cageTopImage, topX, topY, object.width, object.height);
                    }
                    if(object.type == "Pillar"){
                        var topDistanceX = Math.abs((lights[0].position.x - object.position.x) / topDistanceRatioX) + 2;
                        var topDistanceY = Math.abs((lights[0].position.y - object.position.y) / topDistanceRatioY) + (topDistanceX/2);
                        topX = object.position.x - Math.cos(lightAngle) * -topDistanceX;
                        topY = object.position.y - Math.sin(lightAngle) * -topDistanceY;
                        layerOne.drawImage(pillarTopImage, topX, topY, object.width, object.height);
                    }
                    if(object.type == "Wall"){
                        var topDistanceX = Math.abs((lights[0].position.x - object.position.x) / topDistanceRatioX) + 2;
                        var topDistanceY = Math.abs((lights[0].position.y - object.position.y) / topDistanceRatioY) + (topDistanceX/2);
                        topX = object.position.x - Math.cos(lightAngle) * -topDistanceX;
                        topY = object.position.y - Math.sin(lightAngle) * -topDistanceY;
                        layerOne.drawImage(wallTopImage, topX, topY, object.width, object.height);
                    }                           
                }
            }
        }
    }    

    lightAngle+=0.01;
    for(var i = 0; i < lights.length; i++){
        layerLight.strokeStyle = lights[i].color;
        lights[i].angle+=46;
        /* Adjust character light && object */
        if(i == 0){
            lights[i].position.x = synchronizedPlayerData.playerPhysics.characterOffsetX + window.innerWidth/2 + characterLightOffsetX;
            lights[i].position.y = synchronizedPlayerData.playerPhysics.characterOffsetY + window.innerHeight/2 + characterLightOffsetY;
            avatars[i].position.x = lerp(avatars[i].position.x, lights[i].position.x - 2, .5);
            avatars[i].position.y = lerp(avatars[i].position.y, lights[i].position.y + 30, .5);
        }
        var lightToLightDistanceX = lights[i].position.x - lights[0].position.x;
        var lightToLightDistanceY = lights[i].position.y - lights[0].position.y;
        if(Math.abs(lightToLightDistanceX) < maximumRenderDistance && Math.abs(lightToLightDistanceY) < maximumRenderDistance){
            shineLight(lights[i], i);  
        }
    }
    if(renderCount < 10){
        renderCount++;
    }
    if(renderCount >= 10){
        if(!renderInitialized){
            renderInitialized = true;
            prerender();
        }

    }
    var endTime = new Date().getTime() - startTime;
    console.log("Start-Finish: " + endTime);
}

(height < 500)?height = 500:height=height;