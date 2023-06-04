const API_URL = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
const API_KEY = <API_KEY_HERE>;

const selectedText = decodeURIComponent(
    new URL(window.location.href).searchParams.get("selectedText")
);

async function fetchResponse(text) {
    const response = await fetch(
        `${API_URL}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                prompt: text,
                temperature: 0,
                max_tokens: selectedText.length + 50,
                top_p: 1,
                frequency_penalty: 0.5,
                presence_penalty: 0,
            }),
        }
    );
    const json = await response.json();
    return json.choices[0].text;
}

async function handleOptionClick(option) {
    if (!localStorage.getItem("userName")) {
        let nameInfo = window.prompt("Enter your name:");
        localStorage.setItem("userName", nameInfo);
    } else {
        let userName = localStorage.getItem("userName");
        const loadingText = document.getElementById("loading-text");
        loadingText.style.display = "block";
        if (selectedText) {
            const prompt = `Please understand the text (in any language) and Write a ${option} Reply for the following text/email:\n"${selectedText}",\nPlease write from my side. Make sure to include greetings at the beginning and ending with this name signature ${userName}. It's my name.`;
            const responseText = await fetchResponse(prompt);

            loadingText.style.display = "none";

            const responseSection = document.getElementById("response");
            responseSection.style.display = "block";

            const promptElement = document.getElementById("prompt");
            promptElement.innerText = option;

            const responseTextElement = document.getElementById("response-text");
            responseTextElement.innerText = responseText;

            const copyButton = document.getElementById("copy");
            copyButton.addEventListener("click", () => {
                navigator.clipboard.writeText(responseText).then(
                    () => {
                        console.log("Copied to clipboard");
                        alert("Copied to clipboard");
                    },
                    (err) => {
                        console.error("Could not copy to clipboard: ", err);
                        alert("Could not copy to clipboard: ", err);
                    }
                );
            });

            const closeButton = document.getElementById("close");
            closeButton.addEventListener("click", () => {
                window.close();
            });
        } else {
            window.alert("Please select text!");
        }
    }
}

const veryPositiveButton = document.getElementById("very-positive");
if (veryPositiveButton) {
    veryPositiveButton.addEventListener("click", () => {
        handleOptionClick("Very Positive");
    });
}

const slightlyPositiveButton = document.getElementById("slightly-positive");
if (slightlyPositiveButton) {
    slightlyPositiveButton.addEventListener("click", () => {
        handleOptionClick("Slightly Positive");
    });
}

const slightlyNegativeButton = document.getElementById("slightly-negative");
if (slightlyNegativeButton) {
    slightlyNegativeButton.addEventListener("click", () => {
        handleOptionClick("Slightly Negative");
    });
}

const veryNegativeButton = document.getElementById("very-negative");
if (veryNegativeButton) {
    veryNegativeButton.addEventListener("click", () => {
        handleOptionClick("Very Negative");
    });
}

const defaultButton = document.getElementById("default");
if (defaultButton) {
    defaultButton.addEventListener("click", () => {
        handleOptionClick("Default");
    });
}

const logoutButton = document.getElementById("logout");
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("userName");
        window.location.reload();
    });
}

const closeWindow = document.getElementById("close");
if(closeWindow) {
    closeWindow.addEventListener("click", () => {
        window.close();
    });
}