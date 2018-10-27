window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.interimResults = true;
// DOM
const input = document.querySelector("#search-input");
const btn = document.querySelector("#btn-input");

let arr = [];
let isListening = false;

btn.addEventListener("click", function() {
    if (isListening === false) {
        recognition.start();
        recognition.onend = () => {
            recognition.start();
        };

        isListening = true;
        btn.classList.add("bg-danger");

        recognition.addEventListener("result", e => {
            const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join("");

            let text = `${arr.join(" ")} ${transcript}`;
            input.value = text;
            input.focus();

            if (e.results[0].isFinal) {
                arr.push(transcript);
            }
        });
    } else if (isListening === true) {
        recognition.stop();
        recognition.onend = () => {};
        isListening = false;
        btn.classList.remove("bg-danger");
    }
});
