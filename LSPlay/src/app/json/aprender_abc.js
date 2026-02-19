// Base de datos del abecedario con información DETALLADA
const alphabetData = {
    'A': {
        image: '../images/abc/avatar_A.png',
        placeholder: 'fas fa-hand-fist',
        description: 'Forma un puño cerrado con todos los dedos. El pulgar debe estar colocado al costado del puño, no encima.',
        tip: 'Mantén el pulgar visible al costado del puño cerrado',
        difficulty: 'Fácil',
        videoUrl: 'https://www.youtube.com/embed/ejemplo_A' // Opcional
    },
    'B': {
        image: '../images/abc/avatar_B.png',
        placeholder: 'fas fa-hand-paper',
        description: 'Extiende los cuatro dedos (índice, medio, anular y meñique) juntos hacia arriba. El pulgar debe estar doblado sobre la palma.',
        tip: 'Los cuatro dedos deben estar completamente juntos y rectos',
        difficulty: 'Fácil',
        videoUrl: null
    },
    'C': {
        image: '../images/abc/avatar_C.png',
        placeholder: 'fas fa-c',
        description: 'Curva todos los dedos formando la letra C. La mano debe formar un semicírculo claro.',
        tip: 'La curva debe ser suave y bien definida, como si sostuvieras una pelota',
        difficulty: 'Fácil',
        videoUrl: null
    },
    'D': {
        image: '../images/abc/avatar_D.png',
        placeholder: 'fas fa-hand-point-up',
        description: 'Levanta solo el dedo índice apuntando hacia arriba. Los otros dedos (medio, anular y meñique) tocan la punta del pulgar formando un círculo.',
        tip: 'El índice debe estar completamente recto y los demás dedos forman un círculo perfecto',
        difficulty: 'Media',
        videoUrl: null
    },
    'E': {
        image: '../images/abc/avatar_E.png',
        placeholder: 'fas fa-hand-fist',
        description: 'Dobla todos los dedos sobre el pulgar, formando un puño muy cerrado.',
        tip: 'Todos los dedos deben estar curvados apretadamente sobre el pulgar',
        difficulty: 'Fácil',
        videoUrl: null
    },
    'F': {
        image: '../images/abc/avatar_F.png',
        placeholder: 'fas fa-circle-notch',
        description: 'Une la punta del índice con la punta del pulgar formando un círculo. Los otros tres dedos (medio, anular y meñique) se extienden hacia arriba.',
        tip: 'El círculo formado debe ser claro y visible',
        difficulty: 'Media',
        videoUrl: null
    },
    'G': {
        image: '../images/abc/avatar_G.png',
        placeholder: 'fas fa-hand-point-right',
        description: 'Forma un puño horizontal. Extiende el índice y el pulgar apuntando hacia adelante, como si hicieras una pistola.',
        tip: 'La mano debe estar en posición horizontal, no vertical',
        difficulty: 'Media',
        videoUrl: null
    },
    'H': {
        image: '../images/abc/avatar_H.png',
        placeholder: 'fas fa-hand-peace',
        description: 'Extiende el índice y el medio juntos horizontalmente. Los otros dedos permanecen cerrados.',
        tip: 'Los dos dedos deben estar muy juntos y en posición horizontal',
        difficulty: 'Fácil',
        videoUrl: null
    },
    'I': {
        image: '../images/abc/avatar_I.png',
        placeholder: 'fas fa-hand-point-up',
        description: 'Cierra todos los dedos excepto el meñique. Solo el meñique debe estar levantado.',
        tip: 'El meñique debe estar completamente recto apuntando hacia arriba',
        difficulty: 'Fácil',
        videoUrl: null
    },
    'J': {
        image: '../images/abc/avatar_J.png',
        placeholder: 'fas fa-j',
        description: 'Igual que la I, pero haz un movimiento hacia abajo y luego hacia la izquierda, trazando la letra J en el aire.',
        tip: 'El movimiento debe ser claro: traza una J completa en el aire',
        difficulty: 'Difícil',
        videoUrl: null
    },
    'K': {
        image: '../images/abc/avatar_K.png',
        placeholder: 'fas fa-hand-peace',
        description: 'Levanta el índice hacia arriba y el medio hacia afuera, formando una V abierta. El pulgar se coloca entre ellos.',
        tip: 'La V debe tener los dedos bien separados',
        difficulty: 'Media',
        videoUrl: null
    },
    'L': {
        image: '../images/abc/avatar_L.png',
        placeholder: 'fas fa-hand-point-right',
        description: 'Extiende el índice hacia arriba y el pulgar hacia afuera, formando un ángulo de 90 grados (una L).',
        tip: 'El ángulo debe ser claramente de 90 grados',
        difficulty: 'Fácil',
        videoUrl: null
    },
    'M': {
        image: '../images/abc/avatar_M.png',
        placeholder: 'fas fa-hand-fist',
        description: 'Coloca el pulgar debajo de los primeros tres dedos (índice, medio y anular). El meñique permanece cerrado.',
        tip: 'Tres dedos sobre el pulgar',
        difficulty: 'Media',
        videoUrl: null
    },
    'N': {
        image: '../images/abc/avatar_N.png',
        placeholder: 'fas fa-hand-fist',
        description: 'Coloca el pulgar debajo de los primeros dos dedos (índice y medio). Similar a M pero solo con dos dedos.',
        tip: 'Solo dos dedos sobre el pulgar (no tres como en M)',
        difficulty: 'Media',
        videoUrl: null
    },
    'Ñ': {
        image: '../images/abc/avatar_N.png',
        placeholder: 'fas fa-hand-fist',
        description: 'Igual que la N, pero agrega un pequeño movimiento ondulado lateral.',
        tip: 'Haz un movimiento suave de lado a lado',
        difficulty: 'Media',
        videoUrl: null
    },
    'O': {
        image: '../images/abc/avatar_O.png',
        placeholder: 'fas fa-circle',
        description: 'Une las puntas de todos los dedos formando un círculo completo.',
        tip: 'El círculo debe estar completamente cerrado',
        difficulty: 'Fácil',
        videoUrl: null
    },
    'P': {
        image: '../images/abc/avatar_P.png',
        placeholder: 'fas fa-hand-point-down',
        description: 'Igual que K pero apuntando hacia abajo.',
        tip: 'La orientación es hacia el suelo, no hacia arriba',
        difficulty: 'Media',
        videoUrl: null
    },
    'Q': {
        image: '../images/abc/avatar_Q.png',
        placeholder: 'fas fa-hand-point-down',
        description: 'Igual que G pero apuntando hacia abajo.',
        tip: 'Índice y pulgar apuntan hacia el suelo',
        difficulty: 'Media',
        videoUrl: null
    },
    'R': {
        image: '../images/abc/avatar_R.png',
        placeholder: 'fas fa-hand-peace',
        description: 'Cruza el dedo índice sobre el dedo medio.',
        tip: 'Los dedos deben cruzarse claramente',
        difficulty: 'Media',
        videoUrl: null
    },
    'S': {
        image: '../images/abc/avatar_S.png',
        placeholder: 'fas fa-hand-fist',
        description: 'Forma un puño cerrado con el pulgar sobre los otros dedos (por delante).',
        tip: 'El pulgar debe estar visible sobre los dedos cerrados',
        difficulty: 'Fácil',
        videoUrl: null
    },
    'T': {
        image: '../images/abc/avatar_T.png',
        placeholder: 'fas fa-hand-fist',
        description: 'Coloca el pulgar entre el índice y el medio (como si lo aprisionaran).',
        tip: 'El pulgar debe ser visible entre los dos dedos',
        difficulty: 'Media',
        videoUrl: null
    },
    'U': {
        image: '../images/abc/avatar_U.png',
        placeholder: 'fas fa-hand-peace',
        description: 'Extiende el índice y el medio juntos hacia arriba. Muy parecido a V pero con los dedos pegados.',
        tip: 'Los dedos deben estar completamente juntos, sin separación',
        difficulty: 'Fácil',
        videoUrl: null
    },
    'V': {
        image: '../images/abc/avatar_V.png',
        placeholder: 'fas fa-hand-peace',
        description: 'Extiende el índice y el medio separados formando una V (símbolo de victoria).',
        tip: 'Los dedos deben estar bien separados formando una V clara',
        difficulty: 'Fácil',
        videoUrl: null
    },
    'W': {
        image: '../images/abc/avatar_W.png',
        placeholder: 'fas fa-hand-spock',
        description: 'Extiende tres dedos (índice, medio y anular) separados hacia arriba.',
        tip: 'Los tres dedos forman una W con separación entre ellos',
        difficulty: 'Media',
        videoUrl: null
    },
    'X': {
        image: '../images/abc/avatar_X.png',
        placeholder: 'fas fa-hand-point-up',
        description: 'Dobla el dedo índice formando un gancho (como si llamaras a alguien).',
        tip: 'El índice debe formar un claro gancho',
        difficulty: 'Media',
        videoUrl: null
    },
    'Y': {
        image: '../images/abc/avatar_Y.png',
        placeholder: 'fas fa-hand-rock',
        description: 'Extiende el pulgar y el meñique (gesto de "hang loose" o "shaka").',
        tip: 'Solo pulgar y meñique extendidos, los demás cerrados',
        difficulty: 'Fácil',
        videoUrl: null
    },
    'Z': {
        image: '../images/abc/avatar_Z.png',
        placeholder: 'fas fa-hand-point-up',
        description: 'Con el dedo índice extendido, traza la letra Z en el aire.',
        tip: 'Dibuja una Z completa: línea horizontal, diagonal, horizontal',
        difficulty: 'Difícil',
        videoUrl: null
    }
};

// Actualizar la función showLetter para manejar placeholders
function showLetter(index) {
    currentIndex = index;
    const letter = alphabet[index];
    const data = alphabetData[letter];
    
    // Mostrar loading
    const loading = document.getElementById('loadingIndicator');
    const avatarWrapper = document.querySelector('.avatar-wrapper');
    
    loading.style.display = 'flex';
    
    // Actualizar UI
    document.getElementById('currentLetter').textContent = letter;
    document.getElementById('displayLetter').textContent = letter;
    document.getElementById('letterCount').textContent = `${index + 1} / 27`;
    document.getElementById('letterDescription').textContent = data.description;
    document.getElementById('letterTip').textContent = data.tip;
    
    // Agregar badge de dificultad
    updateDifficultyBadge(data.difficulty);
    
    // Intentar cargar imagen real, si no existe usar placeholder
    const avatarImg = document.getElementById('avatarImage');
    avatarImg.style.opacity = '0';
    
    const img = new Image();
    img.onload = function() {
        // Imagen real existe
        avatarImg.src = data.image;
        avatarImg.style.display = 'block';
        document.getElementById('placeholderIcon').style.display = 'none';
        loading.style.display = 'none';
        avatarImg.style.opacity = '1';
    };
    
    img.onerror = function() {
        // Imagen no existe, usar placeholder
        avatarImg.style.display = 'none';
        showPlaceholder(data.placeholder, letter);
        loading.style.display = 'none';
    };
    
    img.src = data.image;
    
    // Marcar como aprendida
    learnedLetters.add(letter);
    saveProgress();
    generateAlphabetGrid();
    
    // Scroll suave
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función para mostrar placeholder
function showPlaceholder(iconClass, letter) {
    let placeholderDiv = document.getElementById('placeholderIcon');
    
    if (!placeholderDiv) {
        placeholderDiv = document.createElement('div');
        placeholderDiv.id = 'placeholderIcon';
        placeholderDiv.className = 'placeholder-icon';
        document.querySelector('.avatar-wrapper').appendChild(placeholderDiv);
    }
    
    placeholderDiv.innerHTML = `
        <i class="${iconClass}"></i>
        <div class="letter-overlay">${letter}</div>
    `;
    placeholderDiv.style.display = 'flex';
    placeholderDiv.style.opacity = '1';
}

// Función para actualizar badge de dificultad
function updateDifficultyBadge(difficulty) {
    let badge = document.getElementById('difficultyBadge');
    
    if (!badge) {
        badge = document.createElement('div');
        badge.id = 'difficultyBadge';
        badge.className = 'difficulty-badge';
        document.querySelector('.letter-display').appendChild(badge);
    }
    
    const colors = {
        'Fácil': '#4caf50',
        'Media': '#ff9800',
        'Difícil': '#f44336'
    };
    
    badge.textContent = difficulty;
    badge.style.background = colors[difficulty];
}