// Configuración de los niveles
const levelsConfig = {
    1: {
        name: 'Abecedario Básico',
        description: 'Aprende las primeras 10 letras (A-J)',
        icon: 'fa-hand-pointer',
        questions: 15,
        time: 5,
        unlockRequirement: null,
        gameUrl: 'nivel1.html'
    },
   
    3: {
        name: 'Verbos Comunes',
        description: 'Aprende verbos en señas',
        icon: 'fa-hands',
        questions: 20,
        time: 10,
        unlockRequirement: { level: 3, stars: 2 },
        gameUrl: 'nivel2.html'
    },
    
    bonus: {
        name: 'Desafío Final',
        description: 'Demuestra todo lo aprendido',
        icon: 'fa-crown',
        questions: 30,
        time: 15,
        unlockRequirement: { level: 5, stars: 3 },
        gameUrl: 'nivel3.html'
    }
};

// Estado del jugador (se guarda en localStorage)
let playerProgress = {
    levels: {},
    totalStars: 0,
    totalScore: 0,
    currentStreak: 0,
    achievements: []
};

// Cargar progreso del jugador
function loadPlayerProgress() {
    const saved = localStorage.getItem('lsplay_game_progress');
    if (saved) {
        playerProgress = JSON.parse(saved);
    } else {
        // Progreso inicial
        playerProgress.levels = {
            1: { unlocked: true, stars: 0, bestScore: 0, completed: false, progress: 0 },
            2: { unlocked: false, stars: 0, bestScore: 0, completed: false, progress: 0 },
            3: { unlocked: false, stars: 0, bestScore: 0, completed: false, progress: 0 },
            4: { unlocked: false, stars: 0, bestScore: 0, completed: false, progress: 0 },
            5: { unlocked: false, stars: 0, bestScore: 0, completed: false, progress: 0 },
            bonus: { unlocked: false, stars: 0, bestScore: 0, completed: false, progress: 0 }
        };
    }
    updateUI();
}

// Guardar progreso
function savePlayerProgress() {
    localStorage.setItem('lsplay_game_progress', JSON.stringify(playerProgress));
}

// Actualizar UI con el progreso del jugador
function updateUI() {
    // Actualizar estadísticas del header
    document.getElementById('totalStars').textContent = playerProgress.totalStars;
    document.getElementById('totalScore').textContent = playerProgress.totalScore;
    document.getElementById('currentStreak').textContent = playerProgress.currentStreak;
    
    // Actualizar estado de cada nivel
    Object.keys(levelsConfig).forEach(levelId => {
        const levelNode = document.querySelector(`[data-level="${levelId}"]`);
        if (!levelNode) return;
        
        const levelData = playerProgress.levels[levelId];
        const config = levelsConfig[levelId];
        
        // Verificar si debe desbloquearse
        if (!levelData.unlocked && config.unlockRequirement) {
            const reqLevel = config.unlockRequirement.level;
            const reqStars = config.unlockRequirement.stars;
            
            if (playerProgress.levels[reqLevel] && 
                playerProgress.levels[reqLevel].stars >= reqStars) {
                levelData.unlocked = true;
                savePlayerProgress();
            }
        }
        
        // Actualizar clases
        if (levelData.unlocked) {
            levelNode.classList.remove('locked');
            levelNode.classList.add('unlocked');
            
            // Actualizar estrellas
            const starsDisplay = levelNode.querySelectorAll('.stars-display i');
            starsDisplay.forEach((star, index) => {
                if (index < levelData.stars) {
                    star.classList.add('earned');
                } else {
                    star.classList.remove('earned');
                }
            });
            
            // Actualizar progreso
            const progressFill = levelNode.querySelector('.progress-fill-small');
            if (progressFill) {
                progressFill.style.width = levelData.progress + '%';
            }
            
            // Cambiar icono de bloqueado a desbloqueado
            const iconElement = levelNode.querySelector('.level-icon i');
            if (iconElement && iconElement.classList.contains('fa-lock')) {
                iconElement.className = `fas ${config.icon}`;
            }
            
        } else {
            levelNode.classList.add('locked');
            levelNode.classList.remove('unlocked');
        }
    });
}

// Mostrar modal de información del nivel
let selectedLevel = null;

function playLevel(levelId) {
    selectedLevel = levelId;
    const levelData = playerProgress.levels[levelId];
    const config = levelsConfig[levelId];
    
    if (!levelData.unlocked) {
        showLockedMessage(levelId);
        return;
    }
    
    // Llenar modal con información
    document.getElementById('modalLevelName').textContent = `Nivel ${levelId}: ${config.name}`;
    document.getElementById('modalLevelDescription').textContent = config.description;
    document.getElementById('modalBestScore').innerHTML = `
        <i class="fas fa-trophy"></i>
        <span>Mejor puntuación: ${levelData.bestScore} puntos | ${levelData.stars}★</span>
    `;
    
    // Actualizar detalles
    const detailsHTML = `
        <div class="detail-item">
            <i class="fas fa-puzzle-piece"></i>
            <span>${config.questions} Preguntas</span>
        </div>
        <div class="detail-item">
            <i class="fas fa-clock"></i>
            <span>${config.time} minutos</span>
        </div>
        <div class="detail-item">
            <i class="fas fa-star"></i>
            <span>Hasta 3 estrellas</span>
        </div>
    `;
    document.querySelector('.level-details').innerHTML = detailsHTML;
    
    // Mostrar modal
    document.getElementById('levelModal').style.display = 'flex';
}

function closeLevelModal() {
    document.getElementById('levelModal').style.display = 'none';
    selectedLevel = null;
}

function startGame() {
    if (selectedLevel) {
        const config = levelsConfig[selectedLevel];
        window.location.href = config.gameUrl;
    }
}

// Mensaje de nivel bloqueado
function showLockedMessage(levelId) {
    const config = levelsConfig[levelId];
    const req = config.unlockRequirement;
    
    alert(`🔒 Este nivel está bloqueado.\n\n` +
          `Para desbloquearlo necesitas:\n` +
          `✅ Completar el Nivel ${req.level}\n` +
          `⭐ Conseguir al menos ${req.stars} estrella(s)`);
}

// Filtros de niveles
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover active de todos
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            filterLevels(filter);
        });
    });
}

function filterLevels(filter) {
    const levelNodes = document.querySelectorAll('.level-node');
    
    levelNodes.forEach(node => {
        const levelId = node.dataset.level;
        const levelData = playerProgress.levels[levelId];
        
        let show = true;
        
        if (filter === 'completed') {
            show = levelData.completed;
        } else if (filter === 'locked') {
            show = !levelData.unlocked;
        }
        
        if (show) {
            node.style.display = 'block';
            node.classList.add('animate__fadeIn');
        } else {
            node.style.display = 'none';
        }
    });
}

// Animación del camino
function animatePath() {
    const path = document.getElementById('gamePath');
    if (path) {
        let length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        
        setTimeout(() => {
            path.style.transition = 'stroke-dashoffset 2s ease-in-out';
            path.style.strokeDashoffset = 0;
        }, 500);
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadPlayerProgress();
    initFilters();
    animatePath();
    
    // Cerrar modal al hacer click fuera
    window.onclick = function(event) {
        const modal = document.getElementById('levelModal');
        if (event.target === modal) {
            closeLevelModal();
        }
    }
});

// Función para actualizar progreso después de jugar (llamar desde nivel1.html, etc.)
function updateLevelProgress(levelId, score, accuracy) {
    const levelData = playerProgress.levels[levelId];
    
    // Calcular estrellas basado en precisión
    let stars = 0;
    if (accuracy >= 90) stars = 3;
    else if (accuracy >= 75) stars = 2;
    else if (accuracy >= 50) stars = 1;
    
    // Actualizar datos
    if (score > levelData.bestScore) {
        levelData.bestScore = score;
    }
    if (stars > levelData.stars) {
        levelData.stars = stars;
    }
    levelData.completed = true;
    levelData.progress = 100;
    
    // Recalcular estrellas totales
    playerProgress.totalStars = Object.values(playerProgress.levels)
        .reduce((sum, level) => sum + level.stars, 0);
    
    playerProgress.totalScore += score;
    
    savePlayerProgress();
    updateUI();
    
    // Mostrar animación de recompensa
    showRewardAnimation(stars, score);
}

// Animación de recompensa
function showRewardAnimation(stars, score) {
    // Aquí puedes agregar una animación bonita
    const message = `
        ¡Felicitaciones!\n
        Ganaste ${stars}★\n
        +${score} puntos
    `;
    
    // Por ahora un simple alert, pero puedes hacerlo más fancy
    setTimeout(() => {
        alert(message);
    }, 500);
}