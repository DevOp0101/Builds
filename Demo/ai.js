import dotenv from 'dotenv';
dotenv.config();

function convertTextToSpeeh(textMessage){
    if ('speechSynthesis' in window) {

        const synthesizer = window.speechSynthesis;

        function speakText(text) {
            const utterance = new SpeechSynthesisUtterance(text);

            synthesizer.speak(utterance);
        }

        speakText(textMessage);

    } else {
        console.log('Speech synthesis not supported');
    }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var transcript;

// Check if speech recognition is supported
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();

    // Enable continuous transcription
    recognition.continuous = true;

    recognition.start();

    // Event fired when a spoken word is recognized
    recognition.onresult = (event) => {
        transcript = event.results[event.results.length - 1][0].transcript;
        console.log("Recognized speech:", transcript);
        createChatMessage(transcript);                
    };
} else {
    console.log("Speech recognition is not supported");
}


console.log(process.env);
const apiKey = process.env.CHAT_GPT_API_KEY;

async function createChatMessage(prompt) {
    const baseURL = 'https://api.openai.com/v1/chat/completions';
    const model = 'gpt-3.5-turbo';

    const params = {
        model,
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: prompt }
        ]
    };

    const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    convertTextToSpeeh(reply);
}