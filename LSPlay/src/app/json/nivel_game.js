// Configuración del juego
const gameConfig = {
    totalQuestions: 15,
    timePerQuestion: 10, // segundos
    pointsPerCorrect: 100,
    pointsPerSpeed: 50, // bonus por responder rápido
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
};

// Base de datos de letras (mismo que aprender_abc.js)
const lettersData = {
    'A': { image: '../images/abc/avatar_A.png', placeholder: 'fas fa-hand-fist' },
    'B': { image: '../images/abc/avatar_B.png', placeholder: 'fas fa-hand-paper' },
    'C': { image: '../images/abc/avatar_C.png', placeholder: 'fas fa-c' },
    'D': { image: '../images/abc/avatar_D.png', placeholder: 'fas fa-hand-point-up' },
    'E': { image: '../images/abc/avatar_E.png', placeholder: 'fas fa-hand-fist' },
    'F': { image: '../images/abc/avatar_F.png', placeholder: 'fas fa-circle-notch' },
    'G': { image: '../images/abc/avatar_G.png', placeholder: 'fas fa-hand-point-right' },
    'H': { image: '../images/abc/avatar_H.png', placeholder: 'fas fa-hand-peace' },
    'I': { image: '../images/abc/avatar_I.png', placeholder: 'fas fa-hand-point-up' },
    'J': { image: '../images/abc/avatar_J.png', placeholder: 'fas fa-j' }
};

// Estado del juego
let gameState = {
    currentQuestion: 0,
    score: 0,
    lives: 3,
    correctAnswers: 0,
    wrongAnswers: 0,
    questions: [],
    currentAnswer: null,
    timer: null,
    timeLeft: gameConfig.timePerQuestion,
    isPaused: false
};

// Generar preguntas
function generateQuestions() {
    const questions = [];
    const usedLetters = new Set();
    
    for (let i = 0; i < gameConfig.totalQuestions; i++) {
        // Seleccionar letra que no se haya usado (o permitir repetición si es necesario)
        let letter;
        if (usedLetters.size < gameConfig.letters.length) {
            do {
                letter = gameConfig.letters[Math.floor(Math.random() * gameConfig.letters.length)];
            } while (usedLetters.has(letter) && usedLetters.size < gameConfig.letters.length);
        } else {
            // Si ya usamos todas, permitir repetición
            letter = gameConfig.letters[Math.floor(Math.random() * gameConfig.letters.length)];
        }
        
        usedLetters.add(letter);
        
        // Generar opciones incorrectas
        const wrongOptions = [];
        while (wrongOptions.length < 3) {
            const wrongLetter = gameConfig.letters[Math.floor(Math.random() * gameConfig.letters.length)];
            if (wrongLetter !== letter && !wrongOptions.includes(wrongLetter)) {
                wrongOptions.push(wrongLetter);
            }
        }
        
        // Mezclar opciones
        const allOptions = [letter, ...wrongOptions];
        shuffleArray(allOptions);
        
        questions.push({
            correctAnswer: letter,
            options: allOptions,
            image: lettersData[letter].image,
            placeholder: lettersData[letter].placeholder
        });
    }
    
    return questions;
}

// Mezclar array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Inicializar juego
function initGame() {
    gameState.questions = generateQuestions();
    gameState.currentQuestion = 0;
    gameState.score = 0;
    gameState.lives = 3;
    gameState.correctAnswers = 0;
    gameState.wrongAnswers = 0;
    
    updateUI();
    loadQuestion();
}

// Cargar pregunta
function loadQuestion() {
    if (gameState.currentQuestion >= gameConfig.totalQuestions) {
        endGame();
        return;
    }
    
    const question = gameState.questions[gameState.currentQuestion];
    
    // Actualizar número de pregunta
    document.getElementById('currentQuestion').textContent = gameState.currentQuestion + 1;
    document.getElementById('progressText').textContent = `Pregunta ${gameState.currentQuestion + 1}/${gameConfig.totalQuestions}`;
    
    // Actualizar barra de progreso
    const progress = ((gameState.currentQuestion + 1) / gameConfig.totalQuestions) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    // Cargar imagen
    loadSignImage(question);
    
    // Generar opciones
    generateOptions(question.options);
    
    // Limpiar feedback
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('feedback').className = 'answer-feedback';
    
    // Iniciar timer
    startTimer();
    
    // Animar entrada
    document.getElementById('questionCard').classList.remove('animate__fadeIn');
    setTimeout(() => {
        document.getElementById('questionCard').classList.add('animate__fadeIn');
    }, 10);
}

// Cargar imagen de la seña
function loadSignImage(question) {
    const imgElement = document.getElementById('signImage');
    const placeholder = document.getElementById('signPlaceholder');
    
    imgElement.style.display = 'none';
    placeholder.style.display = 'flex';
    
    const img = new Image();
    img.onload = function() {
        imgElement.src = question.image;
        imgElement.style.display = 'block';
        placeholder.style.display = 'none';
    };
    
    img.onerror = function() {
        // Si falla, mostrar placeholder con icono
        placeholder.innerHTML = `
            <i class="${question.placeholder}"></i>
            <p>Observa la seña</p>
        `;
        placeholder.style.display = 'flex';
    };
    
    img.src = question.image;
}

// Generar opciones de respuesta
function generateOptions(options) {
    const container = document.getElementById('answerOptions');
    container.innerHTML = '';
    
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = option;
        btn.onclick = () => selectAnswer(option, btn);
        container.appendChild(btn);
    });
}

// Timer
function startTimer() {
    gameState.timeLeft = gameConfig.timePerQuestion;
    updateTimerDisplay();
    
    clearInterval(gameState.timer);
    gameState.timer = setInterval(() => {
        if (!gameState.isPaused) {
            gameState.timeLeft--;
            updateTimerDisplay();
            
            if (gameState.timeLeft <= 0) {
                clearInterval(gameState.timer);
                timeOut();
            }
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = gameState.timeLeft;
    
    // Cambiar color cuando quedan pocos segundos
    if (gameState.timeLeft <= 3) {
        timerElement.style.color = '#f44336';
    } else {
        timerElement.style.color = '#2e7d32';
    }
}

// Seleccionar respuesta
function selectAnswer(selected, btnElement) {
    clearInterval(gameState.timer);
    
    const question = gameState.questions[gameState.currentQuestion];
    const isCorrect = selected === question.correctAnswer;
    
    // Deshabilitar todos los botones
    const allBtns = document.querySelectorAll('.answer-btn');
    allBtns.forEach(btn => btn.disabled = true);
    
    if (isCorrect) {
        handleCorrectAnswer(btnElement);
    } else {
        handleWrongAnswer(btnElement, question.correctAnswer);
    }
}

// Respuesta correcta
function handleCorrectAnswer(btnElement) {
    btnElement.classList.add('correct');
    
    // Calcular puntos (bonus por tiempo restante)
    const timeBonus = Math.floor((gameState.timeLeft / gameConfig.timePerQuestion) * gameConfig.pointsPerSpeed);
    const points = gameConfig.pointsPerCorrect + timeBonus;
    
    gameState.score += points;
    gameState.correctAnswers++;
    
    // Mostrar feedback
    showFeedback(true, points);
    
    // Siguiente pregunta después de 2 segundos
    setTimeout(() => {
        gameState.currentQuestion++;
        updateUI();
        loadQuestion();
    }, 2000);
}

// Respuesta incorrecta
function handleWrongAnswer(btnElement, correctAnswer) {
    btnElement.classList.add('wrong');
    
    // Resaltar respuesta correcta
    const allBtns = document.querySelectorAll('.answer-btn');
    allBtns.forEach(btn => {
        if (btn.textContent === correctAnswer) {
            btn.classList.add('correct');
        }
    });
    
    gameState.lives--;
    gameState.wrongAnswers++;
    
    // Mostrar feedback
    showFeedback(false, 0, correctAnswer);
    
    // Verificar si perdió todas las vidas
    if (gameState.lives <= 0) {
        setTimeout(() => {
            endGame();
        }, 2000);
    } else {
        // Siguiente pregunta
        setTimeout(() => {
            gameState.currentQuestion++;
            updateUI();
            loadQuestion();
        }, 2500);
    }
}

// Tiempo agotado
function timeOut() {
    const question = gameState.questions[gameState.currentQuestion];
    
    gameState.lives--;
    gameState.wrongAnswers++;
    
    // Resaltar respuesta correcta
    const allBtns = document.querySelectorAll('.answer-btn');
    allBtns.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === question.correctAnswer) {
            btn.classList.add('correct');
        }
    });
    
    showFeedback(false, 0, question.correctAnswer, true);
    
    if (gameState.lives <= 0) {
        setTimeout(() => {
            endGame();
        }, 2000);
    } else {
        setTimeout(() => {
            gameState.currentQuestion++;
            updateUI();
            loadQuestion();
        }, 2500);
    }
}

// Mostrar feedback
function showFeedback(isCorrect, points, correctAnswer = '', isTimeout = false) {
    const feedback = document.getElementById('feedback');
    
    if (isCorrect) {
        feedback.className = 'answer-feedback show correct';
        feedback.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>¡Correcto! +${points} puntos</span>
        `;
    } else {
        feedback.className = 'answer-feedback show wrong';
        const message = isTimeout ? '¡Se acabó el tiempo!' : '¡Incorrecto!';
        feedback.innerHTML = `
            <i class="fas fa-times-circle"></i>
            <span>${message} La respuesta era: ${correctAnswer}</span>
        `;
    }
}

// Actualizar UI
function updateUI() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('lives').textContent = gameState.lives;
}

// Pausar juego
function pauseGame() {
    gameState.isPaused = true;
    
    document.getElementById('pauseScore').textContent = `${gameState.score} puntos`;
    document.getElementById('pauseCorrect').textContent = `${gameState.correctAnswers} correctas`;
    document.getElementById('pauseWrong').textContent = `${gameState.wrongAnswers} incorrectas`;
    
    document.getElementById('pauseModal').style.display = 'flex';
}

function resumeGame() {
    gameState.isPaused = false;
    document.getElementById('pauseModal').style.display = 'none';
}

// Terminar juego
function endGame() {
    clearInterval(gameState.timer);
    
    const accuracy = Math.round((gameState.correctAnswers / gameConfig.totalQuestions) * 100);
    
    // Calcular estrellas
    let stars = 0;
    if (accuracy >= 90) stars = 3;
    else if (accuracy >= 75) stars = 2;
    else if (accuracy >= 50) stars = 1;
    
    // Actualizar progreso (llamar a función de game_levels.js)
    if (typeof updateLevelProgress === 'function') {
        updateLevelProgress(1, gameState.score, accuracy);
    }
    
    // Mostrar resultados
    showResults(stars, accuracy);
}

// Mostrar resultados
function showResults(stars, accuracy) {
    const modal = document.getElementById('resultsModal');
    
    // Título según estrellas
    const titles = {
        0: '¡Sigue practicando!',
        1: '¡Buen intento!',
        2: '¡Muy bien!',
        3: '¡Excelente!'
    };
    document.getElementById('resultsTitle').textContent = titles[stars];
    
    // Animar estrellas
    const starElements = document.querySelectorAll('.star-result');
    starElements.forEach((star, index) => {
        if (index < stars) {
            setTimeout(() => {
                star.classList.add('earned');
            }, 500 + (index * 300));
        }
    });
    
    // Estadísticas
    document.getElementById('finalAccuracy').textContent = accuracy + '%';
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('finalCorrect').textContent = `${gameState.correctAnswers}/${gameConfig.totalQuestions}`;
    
    // Mensaje motivacional
    const messages = {
        0: 'No te rindas, la práctica hace al maestro 💪',
        1: 'Vas por buen camino, sigue así 👍',
        2: 'Excelente trabajo, casi perfecto 🌟',
        3: '¡Increíble! Eres un maestro de las señas 🏆'
    };
    document.getElementById('motivationMessage').textContent = messages[stars];
    
    // Mostrar modal
    modal.style.display = 'flex';
}

// Funciones de navegación
function exitGame() {
    if (confirm('¿Seguro que quieres salir? Perderás tu progreso.')) {
        window.location.href = 'inicio_jugar.html';
    }
}

function goToLevels() {
    window.location.href = 'inicio_jugar.html';
}

function retryLevel() {
    window.location.reload();
}

// Teclas de acceso rápido
document.addEventListener('keydown', (e) => {
    // ESC para pausar
    if (e.key === 'Escape' && !document.getElementById('pauseModal').style.display) {
        pauseGame();
    }
    
    // Números 1-4 para seleccionar respuestas
    if (e.key >= '1' && e.key <= '4') {
        const btns = document.querySelectorAll('.answer-btn');
        const index = parseInt(e.key) - 1;
        if (btns[index] && !btns[index].disabled) {
            selectAnswer(btns[index].textContent, btns[index]);
        }
    }
});

// Iniciar al cargar
document.addEventListener('DOMContentLoaded', initGame);