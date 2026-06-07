/* ============================================================
   OSI DUNGEONS — Game logic v2.0
   ============================================================ */

// Códigos maestros disponibles (se elige uno random por partida)
const masterCodesDB = [
    ["WEB", "SEC", "DIA", "TCP", "RUT", "MAC", "BIT"],
    ["APP", "CRY", "SES", "UDP", "NET", "ETH", "VOL"],
    ["WWW", "PGP", "API", "SEG", "IPX", "LAN", "PUL"],
    ["URL", "SSL", "RPC", "FLU", "ICM", "ARP", "UTP"],
    ["API", "SSH", "SQL", "DAT", "BGP", "LLC", "FIB"]
];

// Niveles del juego: 7 jefes uno por capa OSI
const gameLevels = [
    {
        capa: "Capa 7: Aplicación",
        capaCorta: "Aplicación",
        numero: 7,
        jefe: "Mago Eléctrico",
        imagen: "images/boss-7-application.svg",
        fallback: "🧙",
        lore: "Sentado sobre un trono de cables corruptos, envía ordenes mediante su rayos.",
        pregunta: "¿Qué protocolo usaría para enviar estas órdenes visuales a través de una aplicación web?",
        opciones: ["FTP", "HTTP", "HTPS", "DNS"],
        correcta: 1,
        pista: "Son las iniciales de Hypertext Transfer Protocol.",
        explicacionRespuesta: "HTTP (O HTTPS) es el protocolo con el que se transfiere contenido entre aplicaciones y servidores.",
        temaFragmento: "Protocolo Web"
    },
    {
        capa: "Capa 6: Presentación",
        capaCorta: "Presentación",
        numero: 6,
        jefe: "El Sin Nombre",
        imagen: "images/boss-6-presentation.svg",
        fallback: "🪄",
        lore: "Un hombre encapuchado sin rostro se para frente tuyo. Su capa impide el reconocimiento.",
        pregunta: "¿Cómo podría evitar que su información sea vulnerada por agentes externos?",
        opciones: ["Enrutamiento", "Control de Flujo", "Cifrado", "Compresión MAC"],
        correcta: 2,
        pista: "WhatsApp lo llama 'extremo a extremo' y lo usa para que nadie intercepte tus conversaciones.",
        explicacionRespuesta: "El cifrado convierte los datos en ilegibles sin la clave correcta. Es función principal de la Capa de Presentación.",
        temaFragmento: "Seguridad"
    },
    {
        capa: "Capa 5: Sesión",
        capaCorta: "Sesión",
        numero: 5,
        jefe: "Corazón del Océano",
        imagen: "images/boss-5-session.svg",
        fallback: "🌀",
        lore: "El corazón mantiene el ritmo de las aguas constante, incluso al apagarse y encenderse de nuevo retoma el curso de forma secilla.",
        pregunta: "¿Cómo mantiene la información de ritmo guardada?",
        opciones: ["Topología", "Sesión", "Subred", "VLAN"],
        correcta: 1,
        pista: "Cuando te logueas en una página web, el servidor inicia una a tu nombre.",
        explicacionRespuesta: "Una sesión es el diálogo temporal abierto entre dos puntos. El servidor la crea, mantiene y cierra y permite guardar tu cuenta incluso si cerras la página.",
        temaFragmento: "Diálogo"
    },
    {
        capa: "Capa 4: Transporte",
        capaCorta: "Transporte",
        numero: 4,
        jefe: "Monstruosidad de Metal",
        imagen: "images/boss-4-transport.svg",
        fallback: "🔥",
        lore: "Un golem mecánico hecho de metal fundido proveniente de computadoras antiguas. Para moverse, el núcleo envía ordenes en pequeños paquetes a las diferentes partes de su cuerpo.",
        pregunta: "¿Qué protocolo de transporte verifica que los paquetes de orden lleguen completos (Seguridad) y pide el reenvío de los perdidos?",
        opciones: ["TCP", "IP", "UDP", "Ethernet"],
        correcta: 0,
        pista: "Los datos deben llegar sí o sí, no importa la velocidad sino la seguridad.",
        explicacionRespuesta: "TCP garantiza la entrega, el orden y la integridad de los paquetes (A diferencia de UDP que prioriza la velocidad). Si uno se pierde, lo reenvía automáticamente.",
        temaFragmento: "Transferencia"
    },
    {
        capa: "Capa 3: Red",
        capaCorta: "Red",
        numero: 3,
        jefe: "Caldero Venenoso",
        imagen: "images/boss-3-network.svg",
        fallback: "🧪",
        lore: "Un caldero burbujeante del que salen slimes verdes y probablemente venenosos. El caladero se comuníca con ellos y designa las rutas que seguiran los paquetes de órdenes enviados.",
        pregunta: "¿Qué apararato tecnológico imita este comportamiento (Designación de rutas)?",
        opciones: ["Switch", "Access Point", "Modem", "Router"],
        correcta: 3,
        pista: "Dirige por la mejor ruta, no recibe la señal de internet.",
        explicacionRespuesta: "El Router lee direcciones IP y decide el mejor camino para que un paquete llegue al destino (Entre otras cosas).",
        temaFragmento: "Ruteo IP"
    },
    {
        capa: "Capa 2: Enlace de Datos",
        capaCorta: "Enlace",
        numero: 2,
        jefe: "Criatura de la Jungla",
        imagen: "images/boss-2-datalink.svg",
        fallback: "🌿",
        lore: "Una planta carnívora gigante con raíces que se extienden bajo tierra y conectan físicamente con las otras plantas de la zona.",
        pregunta: "¿Qué dirección permite a las demás plantas reconocer a su jefe?",
        opciones: ["Dirección IP", "Dirección MAC", "Dirección DNS", "Máscara de subred"],
        correcta: 1,
        pista: "Se asigna al fabricar el dispostivo.",
        explicacionRespuesta: "La dirección MAC es el identificador físico único de tu computadora y garantiza que sea reconida en la red local.",
        temaFragmento: "ID Físico"
    },
    {
        capa: "Capa 1: Física",
        capaCorta: "Física",
        numero: 1,
        jefe: "Espectro Miserable",
        imagen: "images/boss-1-physical.svg",
        fallback: "👻",
        lore: "Aunque parece intocable, se mueve por cables físicos situados por toda la habitación.",
        pregunta: "¿En qué estado o unidad viajan los datos del espectro?",
        opciones: ["Paquetes", "Tramas", "Bits", "Segmentos"],
        correcta: 2,
        pista: "La unidad mínima de información, ceros y unos.",
        explicacionRespuesta: "Todo se descompone en secuencias de Bits (1 y 0) o pulsos eléctricos para su trasmisión por vías físicas.",
        temaFragmento: "Medio Físico"
    }
];

const gameState = {
    currentLevel: 0,
    score: 1000,
    penalties: { error: 50, hint: 100, override: 150, finalHack: 300 },
    isTransitioning: false,
    hintUsed: false,
    selectedMasterCode: [],
    collectedFragments: [],
    isGameOver: false
};

// ============================================================
// UI MANAGER
// ============================================================
const uiManager = {
    els: {},

    init() {
        // Cachear referencias DOM
        this.els = {
            score: document.getElementById('ui-score'),
            progressBar: document.getElementById('ui-progress-bar'),
            slots: document.getElementById('ui-slots'),
            gameOverScreen: document.getElementById('game-over-screen'),
            inventoryUI: document.getElementById('inventory-ui'),
            arena: document.getElementById('game-arena'),
            layer: document.getElementById('ui-layer'),
            layerName: document.getElementById('ui-layer-name'),
            boss: document.getElementById('ui-boss'),
            bossImg: document.getElementById('ui-boss-img'),
            bossFallback: document.getElementById('ui-boss-fallback'),
            lore: document.getElementById('ui-lore'),
            question: document.getElementById('ui-question'),
            combatZone: document.getElementById('combat-zone'),
            health: document.getElementById('ui-health'),
            systemFeedback: document.getElementById('system-feedback'),
            hintBtn: document.getElementById('btn-hint'),
            hintBox: document.getElementById('ui-hint-box'),
            combatPhase: document.getElementById('combat-phase'),
            victoryZone: document.getElementById('victory-zone'),
            earlyTerminal: document.getElementById('early-override-terminal'),
            correctAnswer: document.getElementById('ui-correct-answer'),
            explanation: document.getElementById('ui-explanation'),
            gameRelation: document.getElementById('ui-game-relation'),
            fragmentTheme: document.getElementById('ui-fragment-theme'),
            code: document.getElementById('ui-code'),
            finalHackPhase: document.getElementById('final-hack-phase')
        };

        // Generar slots vacíos del inventario
        this.els.slots.innerHTML = '';
        for (let i = 0; i < 7; i++) {
            const layerNum = 7 - i;
            this.els.slots.innerHTML += `<div class="slot empty" id="slot-${i}" data-index="L${layerNum}">·</div>`;
        }
    },

    updateScore(takeDamage = false) {
        this.els.score.textContent = gameState.score;
        if (takeDamage) {
            this.els.score.style.color = 'var(--error)';
            this.els.score.style.transform = 'scale(1.15)';
            setTimeout(() => {
                if (this.els.score) {
                    this.els.score.style.color = '';
                    this.els.score.style.transform = '';
                }
            }, 350);
        }
    },

    updateProgress() {
        const percent = (gameState.currentLevel / gameLevels.length) * 100;
        this.els.progressBar.style.width = `${percent}%`;
    },

    addFragmentToInventory(index, text) {
        const slot = document.getElementById(`slot-${index}`);
        if (slot) {
            slot.textContent = text;
            slot.className = 'slot filled';
        }
    },

    showGameOver() {
        this.els.gameOverScreen.classList.remove('hidden');
    },

    setBossImage(data) {
        const img = this.els.bossImg;
        const fb = this.els.bossFallback;
        img.style.display = '';
        fb.style.display = 'none';
        img.src = data.imagen;
        img.alt = data.jefe;
        img.onerror = () => {
            img.style.display = 'none';
            fb.style.display = 'block';
            fb.textContent = data.fallback || '👹';
        };
    },

    loadLevel(data) {
        this.updateProgress();
        this.els.layer.textContent = data.numero;
        this.els.layerName.textContent = data.capaCorta;
        this.els.boss.textContent = data.jefe;
        this.els.lore.textContent = data.lore;
        this.els.question.textContent = data.pregunta;
        
        this.setBossImage(data);

        // Reset HP
        this.els.health.style.setProperty('--hp-width', '100%');
        this.els.systemFeedback.textContent = '';

        // Reset hint
        gameState.hintUsed = false;
        this.els.hintBtn.disabled = false;
        this.els.hintBtn.innerHTML = '<span>💡</span> Extraer pista del log (−100 pts)';
        this.els.hintBox.classList.add('hidden');

        // Renderizar opciones
        this.els.combatZone.innerHTML = '';
        data.opciones.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.textContent = opt;
            btn.className = 'action-btn';
            btn.onclick = () => gameLoop.checkAnswer(idx, data.correcta, btn);
            this.els.combatZone.appendChild(btn);
        });

        this.els.combatPhase.classList.remove('hidden');
        this.els.victoryZone.classList.add('hidden');
        this.els.earlyTerminal.classList.remove('hidden');
    },

    triggerHitAnim() {
        this.els.arena.classList.remove('hit');
        void this.els.arena.offsetWidth;
        this.els.arena.classList.add('hit');
    },

    drainHP() {
        this.els.health.style.setProperty('--hp-width', '0%');
    },

    showLevelClear(data) {
        this.drainHP();
        this.els.systemFeedback.textContent = '';

        this.els.correctAnswer.textContent = data.opciones[data.correcta];
        this.els.explanation.textContent = data.explicacionRespuesta;

        const fragText = gameState.selectedMasterCode[gameState.currentLevel];
        this.els.fragmentTheme.textContent = data.temaFragmento;
        this.els.code.textContent = fragText;

        this.addFragmentToInventory(gameState.currentLevel, fragText);

        setTimeout(() => {
            this.els.combatPhase.classList.add('hidden');
            this.els.earlyTerminal.classList.add('hidden');
            this.els.victoryZone.classList.remove('hidden');
        }, 800);
    },

    startFinalHack() {
        this.drainHP();
        this.els.layer.textContent = '0';
        this.els.layerName.textContent = 'COMPROMETIDO';
        this.els.boss.textContent = 'NÚCLEO PRINCIPAL';

        this.els.victoryZone.classList.add('hidden');
        this.els.earlyTerminal.classList.add('hidden');

        // Purgar inventario visualmente
        this.els.inventoryUI.classList.add('hidden');

        this.els.finalHackPhase.classList.remove('hidden');

        // Auto-focus en el input mandatorio
        setTimeout(() => {
            document.getElementById('mandatory-master-input').focus();
        }, 100);
    },

    showWinScreen(isBypass) {
        const container = document.getElementById('game-arena');
        let rango, rankColor;
        if (gameState.score >= 1100) { rango = 'S+'; rankColor = '#ffce54'; }
        else if (gameState.score >= 900) { rango = 'S'; rankColor = '#f3a712'; }
        else if (gameState.score >= 700) { rango = 'A'; rankColor = '#27ae60'; }
        else if (gameState.score >= 400) { rango = 'B'; rankColor = '#00ffcc'; }
        else { rango = 'C'; rankColor = '#888'; }

        container.innerHTML = `
            <div class="final-win">
                <img src="images/victory.svg" alt="Victoria" class="final-win-img" 
                     onerror="this.style.display='none'">
                <h1 class="win-title">NETWORK SECURED</h1>
                <div class="win-subtitle">${isBypass ? '⚡ BYPASS TOTAL ACTIVADO ⚡' : '7 capas conquistadas'}</div>
                
                <div class="score-card">
                    <div class="score-card-label">PUNTUACIÓN FINAL</div>
                    <div class="final-score">${gameState.score}</div>
                    <div class="rank-badge" style="background:${rankColor};">RANGO ${rango}</div>
                </div>
                
                <button onclick="location.reload()" class="btn-primary" style="margin-top:32px;">
                    ↻ Jugar de nuevo
                </button>
            </div>
        `;
    }
};

// ============================================================
// GAME LOOP
// ============================================================
const gameLoop = {
    init() {
        uiManager.init();

        // Elegir código maestro aleatorio
        const rand = Math.floor(Math.random() * masterCodesDB.length);
        gameState.selectedMasterCode = masterCodesDB[rand];

        // Bind handlers
        document.getElementById('btn-next').onclick = () => this.nextLevel();
        document.getElementById('btn-hint').onclick = () => this.useHint();
        document.getElementById('btn-early-master').onclick = () => this.tryHack(true);
        document.getElementById('btn-mandatory-master').onclick = () => this.tryHack(false);

        // Enter key submit
        document.getElementById('early-master-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.tryHack(true);
        });
        document.getElementById('mandatory-master-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.tryHack(false);
        });

        uiManager.updateScore();
        uiManager.loadLevel(gameLevels[gameState.currentLevel]);
    },

    checkDeath() {
        if (gameState.score <= 0) {
            gameState.score = 0;
            uiManager.updateScore();
            gameState.isGameOver = true;
            uiManager.showGameOver();
            return true;
        }
        return false;
    },

    applyDamage(amount) {
        gameState.score -= amount;
        uiManager.updateScore(true);
        this.checkDeath();
    },

    cleanString(str) {
        if (!str) return '';
        return str.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    },

    tryHack(isEarly) {
        if (gameState.isGameOver) return;

        const inputEl = isEarly
            ? document.getElementById('early-master-input')
            : document.getElementById('mandatory-master-input');
        const feedbackEl = isEarly
            ? document.getElementById('early-master-feedback')
            : document.getElementById('mandatory-feedback');

        const raw = inputEl.value;
        if (!raw) return;

        const cleanedInput = this.cleanString(raw);
        const correctCode = gameState.selectedMasterCode.join('');

        if (cleanedInput === correctCode) {
            if (isEarly) gameState.score += 500;
            uiManager.showWinScreen(isEarly);
        } else {
            const pen = isEarly ? gameState.penalties.override : gameState.penalties.finalHack;
            feedbackEl.style.color = 'var(--error)';
            feedbackEl.textContent = `[ DENEGADO ] -${pen} pts`;
            uiManager.triggerHitAnim();
            this.applyDamage(pen);

            setTimeout(() => {
                if (feedbackEl) feedbackEl.textContent = '';
            }, 3000);
        }
    },

    useHint() {
        if (gameState.hintUsed || gameState.isGameOver) return;
        const cost = gameState.penalties.hint;
        if (confirm(`Extraer el log de ayuda cuesta ${cost} puntos. ¿Continuar?`)) {
            gameState.hintUsed = true;
            this.applyDamage(cost);

            if (!gameState.isGameOver) {
                const hintBox = document.getElementById('ui-hint-box');
                hintBox.textContent = `» ${gameLevels[gameState.currentLevel].pista}`;
                hintBox.classList.remove('hidden');
                const btn = document.getElementById('btn-hint');
                btn.disabled = true;
                btn.innerHTML = '<span>✓</span> Log extraído';
            }
        }
    },

    checkAnswer(selected, correct, btnEl) {
        if (gameState.isTransitioning || gameState.isGameOver) return;

        if (selected === correct) {
            gameState.isTransitioning = true;
            // Marcar el botón ganador
            if (btnEl) {
                btnEl.style.background = 'var(--success)';
                btnEl.style.borderColor = 'var(--success-bright)';
                btnEl.style.color = '#000';
            }
            setTimeout(() => {
                uiManager.showLevelClear(gameLevels[gameState.currentLevel]);
            }, 250);
        } else {
            uiManager.triggerHitAnim();
            // Marcar el botón perdedor
            if (btnEl) {
                btnEl.style.background = 'var(--hp-deep)';
                btnEl.style.borderColor = 'var(--hp)';
                setTimeout(() => {
                    btnEl.style.background = '';
                    btnEl.style.borderColor = '';
                }, 600);
            }
            const fb = document.getElementById('system-feedback');
            fb.textContent = `× Fallo crítico en el ataque. -${gameState.penalties.error} pts`;
            this.applyDamage(gameState.penalties.error);
        }
    },

    nextLevel() {
        gameState.currentLevel++;
        gameState.isTransitioning = false;

        if (gameState.currentLevel < gameLevels.length) {
            uiManager.loadLevel(gameLevels[gameState.currentLevel]);
        } else {
            uiManager.startFinalHack();
        }
    }
};

// ============================================================
// INTRO SCREEN
// ============================================================
function setupIntro() {
    const introBtn = document.getElementById('btn-start');
    const introScreen = document.getElementById('intro-screen');
    const gameScreen = document.getElementById('game-screen');

    introBtn.onclick = () => {
        introScreen.style.opacity = '0';
        introScreen.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            introScreen.classList.add('hidden');
            gameScreen.classList.remove('hidden');
            gameLoop.init();
        }, 500);
    };
}

// Boot
window.addEventListener('DOMContentLoaded', setupIntro);