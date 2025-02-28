document.getElementById('sendMessage').addEventListener('click', function() {
    const message = document.getElementById('userMessage').value;
    if (message.trim() !== "") {
        addMessage(message, 'user');
        document.getElementById('userMessage').value = ''; // Clear input field
        simulateBotResponse(message); // Simulate bot response
    }
});

function addMessage(message, sender) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message');
    messageContainer.classList.add(sender);

    const messageText = document.createElement('p');
    messageText.textContent = message;

    messageContainer.appendChild(messageText);
    document.getElementById('chatBox').appendChild(messageContainer);

    // Scroll to the bottom of the chat box
    document.getElementById('chatBox').scrollTop = document.getElementById('chatBox').scrollHeight;
}

function simulateBotResponse(userMessage) {
    setTimeout(() => {
        const botResponse = "Bot: I received your message: " + userMessage;
        addMessage(botResponse, 'bot');
    }, 1000); // Simulating a bot response with 1 second delay
}

