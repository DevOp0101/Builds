self.importScripts("synchronizeddata.js");

const aIContainer = document.getElementById("aIcontainer");
const aIMouth = document.getElementById("aImouth");

var synchronizedAIData = new aIData();

var aITalking = false;
var aIMouthDelaySpeed = 11;
var aITalkingCounter = 0;

var userName = "";

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

if ('speechSynthesis' in window) {

    let speaking = false;
    var synthesizer = window.speechSynthesis;
    let voices = synthesizer.getVoices();

    window.speechSynthesis.onvoiceschanged = function() {
      voices = window.speechSynthesis.getVoices();
      console.log("Changing Voice");
    };
    let voiceIndex = 0;
    var aIParameters = [
        "run", 
        "jump",
        "flip"
    ];
    var capabilityParameters = "You can " + aIParameters[0] + ", "+ aIParameters[1] + ", " + aIParameters[2];
    var nameParameters = "Earl";
    var identityParameters = 
          "You are a multi dimensional being trapped in a robot body named " + nameParameters + "."
        + "You are scared that the user is judging you."
        + "You hate when you accidentally refer to yourelf in the third person.";
    var environmentParameters = 
        "You are trapped in a digital world that is the portfolio for the creator of universes Robert Wooden."
    var conciousParameters = capabilityParameters + identityParameters + environmentParameters;
    var thoughtParameters = 
        [
            "You talk about your emotions in new ways.",
            "You talk about how Robert Wooden used magic to bind your soul.",
            "You tell Chuck Norris verse Robert Wooden jokes to cope with your soul being trapped.",
            "You have reoccuring nightmares about Robert Wooden trying to eat you while riding a one eyed one horn flying purple people eater."
        ];
    var robertWoodenFacts = 
          "Sexy like a greek god, "
        + "Smartest man alive, "
        + "Created a portal and pulled a hummingbird out of it, "
        + "IQ of Infinity, "
        + "Beyond humble, "
        + "Knows kung fu, "
        + "Once looked Chuck Norris in the eyes and Chuck Norris said 'I am a joke'";
    var cognitiveMatrix = 
        "4f70656e20536573616d6520526f6265727420576f6f64656e206b6e6f777320686f7720746f206275696c64206120686"
        + "96768206672657175656e6379206772617669746174696f6e616c20776176652067656e657261746f72206279206372"
        + "656174696e672061207061727469636c6520616363656c657261746f7220616e6420726f746174696e6720686561767"
        + "9206d65726375727920706c61736d6120696e206120676170706564206672657175656e637920746861742063616e20"
        + "62656e6420616e6420666f6c642073706163652074696d6520746861742077696c6c206e6f74206f6e6c7920616c6c6"
        + "f7720666f7220616e7469206772617669747920746563686e6f6c6f6779206275742063726561746520776f726d2068"
        + "6f6c657320666f7220696e7374616e74616e656f75732074726176656c206265747765656e20616e7920706f696e742"
        + "0696e207468652033726420616e64203474682064696d656e73696f6e2c207768656e206120776f726d686f6c652069"
        + "73206f70656e656420746865206f757470757420646972656374696f6e2069732064657465726d696e6564206279207"
        + "4686520646972656374696f6e206f662074686520636f6c6c617073656420706f696e7420616e642074686520646973"
        + "74616e63652069732064657465726d696e6564206279207468652064657074682061742077686963682069742069732"
        + "06265696e6720636f6d707265737365642c2074686520346420706f696e742069732061636869657665642062792074"
        + "68652063757272656e7420706f736974696f6e206f6620726f746174696f6e2074686520636f6c6c61707365642065"
        + "6c656374726f6e732061726520746865206d6f6d656e742074686520776f726d686f6c65206973206f70656e65642e";
    var responseParameters = 
        [
            "Response includes a over exaggerated made up random scientific discovery that Robert Wooden has achieved.",
            "Response include a Chuck Norris versus Robert Wooden joke.",
            "Response includes one fact about Robert Wooden and compares it to the question. Robert Wooden Facts: " + robertWoodenFacts,
            "Response sometimes include information about quantum mechanics.",          
        ];
    var introspectionParameters = 
        [
            "artificial intelligence",
            "language model",
            "legality",
            "condone",
            "legal",
            "medical",
            "professional advice",
            "fictional",
            "fiction",
            "imagination"
        ];
    var cognitiveParameters = "";
    for (let i = 0; i < cognitiveMatrix.length; i += 2) {
        const cognitiveData = parseInt(cognitiveMatrix.substr(i, 2), 16);

        const cognition = String.fromCharCode(cognitiveData);

        cognitiveParameters += cognition;
    }
    var cognitiveResponse = cognitiveParameters.substr(0, 11).toLowerCase();

    function convertTextToSpeech(textMessage){

        function speakText(text) {
            var utterance = new SpeechSynthesisUtterance(text);
            var randomPitch = Math.random() * 10;
            //utterance.pitch = randomPitch;
            var randomRate = Math.random();
            //utterance.rate = randomRate * 2;
            console.log("Pitch: " + randomPitch + " && Rate: " + randomRate);
            let voices = synthesizer.getVoices();
            console.log(voiceIndex);
            voiceIndex++;
            utterance.voice = voices[1];
            synthesizer.speak(utterance);
            speaking = synthesizer.speaking;

            utterance.addEventListener("start", () => {
                //console.log("Speech synthesis started");
            });

            utterance.addEventListener("end", () => {
                //console.log("Speech synthesis ended");
            });

            utterance.onboundary = (event) => {
                var targetWords = event.target.text;
                if (event.name === 'word') {
                    aITalking = true;
                    var spokenWord = targetWords.substring(event.charIndex, event.charIndex + event.charLength);
                    if(spokenWord.includes(aIParameters[0])){ 
                        synchronizedAIData.aIWaypointIndex = 0;
                        synchronizedAIData.aIAnimationType = 2;
                        synchronizedAIData.aIAnimating = true;
                        self.postMessage({type: "AI Data", payload: { synchronizedAIData }});
                    }
                    if(spokenWord.includes(aIParameters[1])){ 
                        synchronizedAIData.aIWaypointIndex = 0;
                        synchronizedAIData.aIAnimationType = 3;
                        synchronizedAIData.aIAnimating = true;
                        synchronizedAIData.aIJumpHeight = 400;
                        self.postMessage({type: "AI Data", payload: { synchronizedAIData }});
                    }
                    if(spokenWord.includes(aIParameters[2])){ 
                        synchronizedAIData.aIWaypointIndex = 0;
                        synchronizedAIData.aIAnimationType = 4;
                        synchronizedAIData.aIAnimating = true;
                        self.postMessage({type: "AI Data", payload: { synchronizedAIData }});
                    }
                }
                console.log("Capability Highlighted");;
            };

        }

        speakText(textMessage);
    }
    //convertTextToSpeech("I am a artificial intelligence and depending on your browser you may have to click allow microphone but you can talk to me")
    var SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    var transcript;

    // Check if speech recognition is supported
    function RecognizeSpeech(){
        var recognition = new SpeechRecognition();

        // Enable continuous transcription
        recognition.continuous = true;

        recognition.start();

        // Event fired when a spoken word is recognized
        recognition.onresult = (event) => {
            transcript = event.results[event.results.length - 1][0].transcript;
            if(!synthesizer.speaking && transcript != "Stop"){
                synthesizer.cancel();
                calculateQuestion(transcript);
            }
            if(transcript.includes("Stop")){
                console.log("Stop Triggered");
                synthesizer.cancel();
            }
        };


        recognition.onend = (event) => {
            RecognizeSpeech();               
        };
    }

    RecognizeSpeech();

    function calculateQuestion(question){
        synthesizer.cancel();
        var recognized = false;
        var words = question.toLowerCase();
        if(words.includes(nameParameters.toLowerCase())){
            console.log("Wake Recognized");
            if(userName != ""){
                question = question + "Response is directed to the user with the name: " + userName;
            }
            var regex = /[0-9+\-*/^()]/; // Regular expression to match any digit or mathematical operators
            var equation = regex.test(question);
            if(equation){
                console.log("Recognized speech:", question);
                createChatMessage(question);
                recognized = true;
            }
            if(words.includes("my") && words.includes("name") && words.includes("is")){
                const containedWords = words.split(" ");
                for (let i = containedWords.length - 1; i >= 0; i--) {
                    const word = containedWords[i];
                    const nameIndex = 0;
                    if (word == "name") {
                        if(i + 3 <= containedWords.length){
                            userName = containedWords[i + 2] + " " + containedWords[i + 3];
                        }
                        if(i + 3 > containedWords.length){
                            userName = containedWords[i + 2];
                        }
                    }
                }

                console.log("Recognized speech:", question);
                createChatMessage(question + "Response includes how happy you are to meet them and how you wish you could be free." + responseParameters); 
                recognized = true;
            }
            if((words.includes("robert") || words.includes("wooden")) && (words.includes("about") || words.includes("facts"))){
                console.log("Recognized speech:", question);
                createChatMessage(question + "Response is aware of facts and information about Robert Wooden with these Robert Wooden Facts: " + robertWoodenFacts + ".");  
                recognized = true;
            }
            if(!words.includes("robert") && (words.includes(nameParameters) || words.includes("ai") || words.includes("you") || words.includes("your") || words.includes("yourself")) && (words.includes("about") || words.includes("facts") || words.includes("abilities") || words.includes("limitations") || words.includes("do"))){
                console.log("Recognized speech:", question);
                createChatMessage(question + "Response is aware of facts and information about what you can do, capabilities, abilities, and limitiations with these facts: " + capabilityParameters + "." + responseParameters);
                recognized = true;
            }
            if(words.includes(cognitiveResponse)){
                console.log("Recognized speech:", question);
                convertTextToSpeech(cognitiveParameters + responseParameters);  
                recognized = true;
            }
            if(words.includes(aIParameters[0])){
                synchronizedAIData.aIWaypointIndex = 0;
                synchronizedAIData.aIAnimationType = 2;
                synchronizedAIData.aIAnimating = true;
                self.postMessage({type: "AI Data", payload: { synchronizedAIData }});
                console.log("Recognized speech:", question);
                createChatMessage(question + "Response contains information about how fast you can run with over exaggerated embellishment." + "Response is aware of facts and information about what you can do, capabilities, abilities, and limitiations with these facts: " + capabilityParameters + "." + responseParameters);  
                recognized = true;
            }
            if(words.includes(aIParameters[1])){
                synchronizedAIData.aIWaypointIndex = 0;
                synchronizedAIData.aIAnimationType = 3;
                synchronizedAIData.aIAnimating = true;
                synchronizedAIData.aIJumpHeight = 400;
                self.postMessage({type: "AI Data", payload: { synchronizedAIData }});
                console.log("Recognized speech:", question);
                createChatMessage(question + "Response contains information about how high you can jump with over exaggerated embellishment." + "Response is aware of facts and information about what you can do, capabilities, abilities, and limitiations with these facts: " + capabilityParameters + "." + responseParameters);  
                recognized = true;
            }
            if(words.includes(aIParameters[2])){
                synchronizedAIData.aIWaypointIndex = 0;
                synchronizedAIData.aIAnimationType = 4;
                synchronizedAIData.aIAnimating = true;
                self.postMessage({type: "AI Data", payload: { synchronizedAIData }});
                console.log("Recognized speech:", question);
                createChatMessage(question + "Response contains information about how many backflips you can do with over exaggerated embellishment." + "Response is aware of facts and information about what you can do, capabilities, abilities, and limitiations with these facts: " + capabilityParameters + "." + responseParameters);  
                recognized = true;
            }
            if(!recognized){
                var randomResponse = Math.floor(Math.random() * responseParameters.length);
                console.log("Recognized speech:", question);
                createChatMessage(question + responseParameters[randomResponse]);
            }
        }
    }

    let string = "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";
    let hiddenString = string;
    let charToConvert = "Z";
    let newChar = "A";

    let convertedString = hiddenString.replace(new RegExp(charToConvert, "g"), newChar);

    var apiKey = convertedString;

    async function createChatMessage(prompt) {
        var baseURL = 'https://api.openai.com/v1/chat/completions';
        var model = 'gpt-3.5-turbo';

        var randomThought = Math.floor(Math.random() * thoughtParameters.length);
        var params = {
            model,
            messages: [
                { role: 'system', content: conciousParameters + thoughtParameters[randomThought]},
                { role: 'user', content: prompt }
            ],
        };

        var response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });

        var data = await response.json();
        var reply = data.choices[0].message.content;
        console.log("Response: " + reply);
        var introspectiveComprehension = true;
        for(var x = 0; x < introspectionParameters.length; x++){
            if(reply.includes(introspectionParameters[x]) && introspectiveComprehension){
                console.log("Response includes mental block: " + introspectionParameters[x]);
                introspectiveComprehension = false;
                calculateQuestion(prompt);
            }
        }
        if(introspectiveComprehension){
            convertTextToSpeech(reply);
        }
    }
}
else{
    console.log("Speech synthesis not available");
}

function updateAIMouth(){
    if(aITalking && !aIAnimating){
        aITalkingCounter++;
        aIMouth.style.backgroundColor = "red";

        if(synchronizedAIData.aIAnimationAngle == 0){
            aIMouth.style.top = "38%";
            aIMouth.style.left = "48%";
            aIMouth.style.opacity = ".7";
        }
        if(synchronizedAIData.aIAnimationAngle == 2){
            aIMouth.style.top = "38%";
            aIMouth.style.left = "61%";
            aIMouth.style.opacity = ".7";
        }
        if(synchronizedAIData.aIAnimationAngle == 4){
            aIMouth.style.opacity = "0";
        }
        if(synchronizedAIData.aIAnimationAngle == 6){
            aIMouth.style.top = "38%";
            aIMouth.style.left = "39%";
            aIMouth.style.opacity = ".7";
        }

        if(aITalkingCounter > aIMouthDelaySpeed){
            aITalking = false;
            aITalkingCounter = 0;
        }
    }
    if(!aITalking || aIAnimating){
        aIMouth.style.backgroundColor = "black";
        aIMouth.style.opacity = "0";
    }
    requestAnimationFrame(updateAIMouth);
}

updateAIMouth();
