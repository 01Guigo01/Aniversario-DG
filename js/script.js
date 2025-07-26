let attempts = 0;
let hintIndex = -1; // Começa com -1 para que a dica inicial seja vazia
const maxAttempts = 6; // Este valor ainda é usado para a contagem total de tentativas antes de esgotar
const correctPassword = '030125'; // Sua senha secreta
const hints = ['Posso', 'te', 'dar', 'um', 'beijinho?'];
let currentHintPhrase = ''; // Para armazenar a frase acumulada das dicas (começa vazia)

// --- Variáveis para a data de aniversário ---
const aniversario = new Date('2025-07-27T00:00:00-03:00'); // Data e hora do aniversário

// Função para carregar as dicas da sessão (usada em password.html)
function loadHint() {
    const storedHintIndex = sessionStorage.getItem('hintIndex');
    if (storedHintIndex !== null) {
        hintIndex = parseInt(storedHintIndex, 10);
        currentHintPhrase = hints.slice(0, hintIndex + 1).join(' '); 
    } else {
        hintIndex = -1; 
        currentHintPhrase = ''; // A frase começa vazia
    }
    document.getElementById('hint').innerText = `Dica: ${currentHintPhrase}`;

    // Limpa o campo da senha ao carregar/recarregar a página
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.value = '';
    }
}

// Função para verificar a senha (usada em password.html)
function checkPassword() {
    const password = document.getElementById('password-input').value;
    
    if (password === correctPassword) {
        sessionStorage.removeItem('hintIndex'); // Resetar as dicas
        location.href = 'birthday.html'; 
    } else {
        attempts++;
        // Dica agora aparece em CADA erro
        if (hintIndex < hints.length - 1) { 
            hintIndex++;
        }
        sessionStorage.setItem('hintIndex', hintIndex);

        currentHintPhrase = hints.slice(0, hintIndex + 1).join(' '); 
        document.getElementById('hint').innerText = `Dica: ${currentHintPhrase}`; 
        
        // --- MUDANÇA AQUI: Mensagem de alerta com chances restantes ---
        const remainingAttempts = maxAttempts - attempts;
        if (remainingAttempts > 0) {
            alert(`Senha incorreta! Você tem mais ${remainingAttempts} chance(s).`);
        } else {
            alert('Senha incorreta!'); // Mensagem final antes de redirecionar se 0 chances restantes
        }
        // --- FIM DA MUDANÇA ---
        
        // Redireciona para 'curious.html' se atingir o limite de tentativas
        if (attempts >= maxAttempts) { 
            alert('Você tentou demais! Esta página não é para você.'); // Esta mensagem será a última antes do redirecionamento
            sessionStorage.setItem('hintIndex', hintIndex);
            location.href = 'curious.html';
        }
    }
}

// --- Nova função para selecionar a pessoa (usada em choose_person.html) ---
function selectPerson(personType) {
    if (personType === 'DG') {
        location.href = 'password.html';
    } else {
        location.href = 'curious.html';
    }
}

// Função para verificar o horário e redirecionar (usada em index.html)
function verificarHorario() {
    const agora = new Date();
    if (agora >= aniversario) {
        location.href = 'choose_person.html';
    } else {
        setTimeout(verificarHorario, 60000); // Verifica a cada minuto
    }
}

// Inicia a lógica correta dependendo da página carregada
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.id === 'password-page') {
        loadHint();
    } else if (document.body.id === 'index-page') {
        verificarHorario();
    } else if (document.body.id === 'choose-person-page') {
        // A função selectPerson() é chamada pelos botões diretamente no HTML
    }
});

// No seu script.js, adicione esta lógica:

document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    const backgroundMusic = document.getElementById('backgroundMusic');

    if (playButton && backgroundMusic) {
        playButton.addEventListener('click', () => {
            backgroundMusic.play()
                .then(() => {
                    // Música começou a tocar, agora esconda o botão
                    playButton.style.display = 'none';
                    backgroundMusic.volume = 0.5; // Ajuste o volume, se quiser (0.0 a 1.0)
                })
                .catch(error => {
                    console.log("Erro ao tentar reproduzir a música:", error);
                    alert("Não foi possível iniciar a música automaticamente. Por favor, verifique as configurações de mídia do seu navegador.");
                    // Se houver erro (ex: autoplay bloqueado), você pode decidir não esconder o botão
                    // ou dar uma opção manual
                });
        });
    }
});

// Mantenha o resto do seu script.js (funções de senha, etc.)
// let attempts = 0;
// let hintIndex = 0;
// ...