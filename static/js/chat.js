// Função para buscar a resposta do bot
async function fetchBotResponse(messageText) {
    try {
        const response = await fetch(`${window.location.href}search?prompt=${messageText}`);
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return 'Desculpe, não consegui buscar uma resposta agora.';
    }
}

// Função para enviar mensagem
async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatWindow = document.getElementById('chatWindow');
    const messageText = userInput.value.trim();

    if (messageText !== '') {
        // Criar e estilizar a mensagem do usuário
        const userMessage = document.createElement('div');
        userMessage.className = 'message user user-message';
        userMessage.innerHTML = `<span>${messageText}</span>`;
        chatWindow.appendChild(userMessage);

        // Limpar o campo de entrada
        userInput.value = '';

        // Exibir a mensagem de "Carregando..."
        const loadingMessage = document.createElement('div');
        loadingMessage.className = 'message bot loading bot-message';
        loadingMessage.innerHTML = `<span>Carregando...</span>`;
        chatWindow.appendChild(loadingMessage);

        // Scroll automático para a última mensagem
        chatWindow.scrollTop = chatWindow.scrollHeight;

        // Obter a resposta do bot
        const botResponse = await fetchBotResponse(messageText);

        // Remover a mensagem de carregando
        chatWindow.removeChild(loadingMessage);

        // Criar e estilizar a mensagem do bot
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot bot-message';
        botMessage.innerHTML = `<span class="formata-texto">${botResponse}</span>`;
        chatWindow.appendChild(botMessage);

        // Scroll automático para a última mensagem
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
}

// Função para enviar mensagem ao pressionar Enter
function checkEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault();  // Evita que o Enter insira uma nova linha
        sendMessage();
    }
}

// Adiciona o evento de tecla ao campo de entrada
const userInput = document.getElementById('userInput');
userInput.addEventListener('keypress', checkEnter);

// Adiciona o evento de clique ao botão de enviar
const sendButton = document.getElementById('sendButton');
sendButton.addEventListener('click', sendMessage);
