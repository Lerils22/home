document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const levelText = document.getElementById('level-indicator');
    const menu = document.getElementById('menu');
    const startButton = document.getElementById('startButton');
    const overlay = document.getElementById('transition-overlay');
    const pauseOverlay = document.getElementById('pause-overlay');
    const inGameControls = document.getElementById('in-game-controls');
    const pauseBtn = document.getElementById('pause-btn');
    const restartBtn = document.getElementById('restart-btn');
    const mobileGameControls = document.getElementById('mobile-game-controls');
    const mobilePauseBtn = document.getElementById('mobile-pause-btn');
    const mobileRestartBtn = document.getElementById('mobile-restart-btn');

    // --- SVG Icons for Pause/Resume ---
    const pauseIconSVG = '<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>';
    const resumeIconSVG = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>';

    // --- Skins ---
    const SKINS = {
        the_eyeball: {
            id: 'the_eyeball',
            draw: (c, w, h, keys) => {
                const centerX = w / 2, centerY = h / 2;
                c.beginPath(); c.arc(centerX, centerY, w / 2, 0, Math.PI * 2); c.fillStyle = '#fff'; c.fill(); c.strokeStyle = '#aaa'; c.lineWidth = 1; c.stroke();
                c.beginPath(); c.strokeStyle = '#e74c3c'; c.lineWidth = 0.5;
                for(let i=0; i<6; i++) { c.moveTo(centerX, centerY); c.lineTo(Math.random()*w, Math.random()*h); } c.stroke();
                let pupilX = centerX;
                if (keys['a'] || keys['arrowleft']) pupilX = centerX * 0.6;
                if (keys['d'] || keys['arrowright']) pupilX = centerX * 1.4;
                c.beginPath(); c.arc(pupilX, centerY, w / 3, 0, Math.PI * 2); c.fillStyle = '#3498db'; c.fill();
                c.beginPath(); c.arc(pupilX, centerY, w / 6, 0, Math.PI * 2); c.fillStyle = '#000'; c.fill();
            }
        },
        nervous_toast: {
            id: 'nervous_toast',
            draw: (c, w, h, keys) => {
                c.fillStyle = '#f3d9a2'; c.strokeStyle = '#c19a6b'; c.lineWidth = w * 0.05;
                c.beginPath(); c.moveTo(0, h); c.lineTo(0, h * 0.2); c.quadraticCurveTo(0, 0, w * 0.2, 0); c.lineTo(w * 0.8, 0); c.quadraticCurveTo(w, 0, w, h * 0.2); c.lineTo(w, h); c.closePath(); c.fill(); c.stroke();
                const jitterX = Math.random() * 2 - 1, jitterY = Math.random() * 2 - 1;
                c.fillStyle = '#000'; c.beginPath(); c.arc(w * 0.3 + jitterX, h * 0.4, w * 0.1, 0, Math.PI * 2); c.arc(w * 0.7 + jitterX, h * 0.4 + jitterY, w * 0.1, 0, Math.PI * 2); c.fill();
                c.beginPath(); c.moveTo(w * 0.3, h * 0.7); c.quadraticCurveTo(w * 0.5, h * 0.6, w * 0.7, h * 0.75); c.strokeStyle = '#000'; c.lineWidth = w * 0.05; c.stroke();
            }
        },
        gentleman_slime: {
            id: 'gentleman_slime',
            draw: (c, w, h, keys) => {
                c.fillStyle = 'rgba(46, 204, 113, 0.8)'; c.beginPath(); c.moveTo(0, h); c.lineTo(0, h * 0.5); c.quadraticCurveTo(w * 0.2, h * 0.1, w * 0.5, h * 0.2); c.quadraticCurveTo(w * 0.8, h * 0.3, w, h * 0.5); c.lineTo(w, h); c.closePath(); c.fill();
                const eyeX = keys['d'] ? w * 0.65 : w * 0.35;
                c.strokeStyle = '#f1c40f'; c.lineWidth = w * 0.05; c.beginPath(); c.arc(eyeX, h * 0.5, w * 0.15, 0, Math.PI * 2); c.stroke();
                c.fillStyle = '#fff'; c.beginPath(); c.arc(eyeX, h * 0.5, w * 0.1, 0, Math.PI * 2); c.fill();
                c.fillStyle = '#000'; c.beginPath(); c.arc(eyeX, h * 0.5, w * 0.05, 0, Math.PI * 2); c.fill();
                c.fillStyle = '#34495e'; c.beginPath(); c.moveTo(w * 0.2, h * 0.75); c.quadraticCurveTo(w*0.5, h*0.7, w*0.8, h*0.8); c.quadraticCurveTo(w*0.5, h*0.8, w*0.2, h*0.75); c.fill();
            }
        },
        cosmic_orb: {
            id: 'cosmic_orb',
            draw: (c, w, h, keys) => {
                const centerX = w / 2, centerY = h / 2;
                const grad = c.createRadialGradient(centerX, centerY, w*0.1, centerX, centerY, w*0.5); grad.addColorStop(0, '#ecf0f1'); grad.addColorStop(1, '#9b59b6');
                c.fillStyle = grad; c.beginPath(); c.arc(centerX, centerY, w/2, 0, Math.PI*2); c.fill();
                const time = Date.now() / 500; c.fillStyle = '#f1c40f';
                for(let i=0; i<3; i++){ const angle = time + i * (Math.PI*2/3); const pX = centerX + Math.cos(angle) * w * 0.4; const pY = centerY + Math.sin(angle) * h * 0.4; c.beginPath(); c.arc(pX, pY, w*0.05, 0, Math.PI*2); c.fill(); }
            }
        }
    };
    let currentSkin = SKINS.the_eyeball;

    // --- CONSTANTS & STATE ---
    const GRAVITY = 0.5, JUMP_FORCE = -12, SPEED = 5, TRANSITION_SPEED = 2.0;
    let keys = {}, currentLevel = 0, platforms = [], running = false, isPaused = false;
    let transitioning = false, fade = 0, fadeState = "none", nextLevel = 0, levelTime = 0;
    const player = { x: 0, y: 0, w: 42, h: 42, vx: 0, vy: 0, grounded: false, startX: 0, startY: 0 };

    // --- INPUT ---
    window.addEventListener('keydown', e => { const key = e.key.toLowerCase(); keys[key] = true; if (running && !transitioning) { if (key === 'p') togglePause(); if (key === 'r') restartLevel(); } });
    window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);
    const leftBtn = document.getElementById('left-btn'), rightBtn = document.getElementById('right-btn'), jumpBtn = document.getElementById('jump-btn');
    function handleTouch(key, isPressed) { keys[key] = isPressed; }
    leftBtn.addEventListener('touchstart', (e) => { e.preventDefault(); handleTouch('a', true); }, { passive: false });
    leftBtn.addEventListener('touchend', (e) => { handleTouch('a', false); }, { passive: false });
    rightBtn.addEventListener('touchstart', (e) => { e.preventDefault(); handleTouch('d', true); }, { passive: false });
    rightBtn.addEventListener('touchend', (e) => { handleTouch('d', false); }, { passive: false });
    jumpBtn.addEventListener('touchstart', (e) => { e.preventDefault(); handleTouch(' ', true); }, { passive: false });
    jumpBtn.addEventListener('touchend', (e) => { handleTouch(' ', false); }, { passive: false });

    // --- CORE LOGIC ---
    function collides(a, b) { return (a.x < b.x + b.width && a.x + a.w > b.x && a.y < b.y + b.height && a.y + a.h > b.y); }
    function resetPlayer(x, y) { player.x = x; player.y = y; player.vx = 0; player.vy = 0; player.startX = x; player.startY = y; }
    function respawn() { resetPlayer(player.startX, player.startY); }

    // --- UPDATE ---
    function update(dt) {
        if (!running || transitioning || isPaused) return;
        levelTime += dt;
        platforms.forEach(p => {
            if (p.isAlternating) { if ((p.timer += dt) >= p.interval) { p.timer = 0; p.active = !p.active; }}
            if (p.type === 'moving') { const oldX = p.x; p.x = p.startX + (p.moveDist / 2) + Math.sin(levelTime * p.speed) * (p.moveDist / 2); p.dx = p.x - oldX; } else { p.dx = 0; }
        });
        player.vx = 0;
        if (keys['a'] || keys['arrowleft']) player.vx = -SPEED;
        if (keys['d'] || keys['arrowright']) player.vx = SPEED;
        if ((keys['w'] || keys['arrowup'] || keys[' ']) && player.grounded) { player.vy = JUMP_FORCE; player.grounded = false; }
        player.vy += GRAVITY * 60 * dt;
        let proposedX = player.x + player.vx, proposedY = player.y + player.vy;
        player.grounded = false; let onMovingPlatform = null;
        platforms.forEach(p => {
            if (p.type === 'lava' || (p.isAlternating && !p.active)) return;
            const vHitbox = { x: player.x, y: proposedY, w: player.w, h: player.h };
            if (collides(vHitbox, p)) {
                if (player.vy > 0) { proposedY = p.y - player.h; player.vy = 0; player.grounded = true; if (p.type === 'moving') onMovingPlatform = p; }
                else if (player.vy < 0) { proposedY = p.y + p.height; player.vy = 0; }
            }
        });
        if (onMovingPlatform) proposedX += onMovingPlatform.dx;
        const hHitbox = { x: proposedX, y: proposedY, w: player.w, h: player.h };
        platforms.forEach(p => {
            if (p.type === 'lava' || (p.isAlternating && !p.active)) return;
            if (collides(hHitbox, p)) { if (player.vx > 0) proposedX = p.x - player.w; else if (player.vx < 0) proposedX = p.x + p.width; }
        });
        player.x = proposedX; player.y = proposedY;
        const iHitbox = { x: player.x, y: player.y, w: player.w, h: player.h + 1 };
        for (let p of platforms) {
            if (collides(iHitbox, p)) {
                if (p.type === 'lava' || (p.isAlternating && !p.active)) return respawn();
                if (p.type === 'goal') return startTransition(currentLevel + 1);
            }
        }
        if (player.y > canvas.height + 200) respawn();
    }

    // --- DRAW ---
    function drawPlayer(camX) { ctx.save(); ctx.translate(player.x + camX, player.y); currentSkin.draw(ctx, player.w, player.h, keys); ctx.restore(); }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height); grad.addColorStop(0, '#87CEEB'); grad.addColorStop(1, '#ADD8E6');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, canvas.width, canvas.height);
        const camX = -player.x + canvas.width / 2 - player.w / 2;
        ctx.save(); ctx.translate(camX, 0);
        platforms.forEach(p => {
            if (p.isAlternating) { ctx.fillStyle = p.active ? '#2c3e50' : '#e74c3c'; }
            else { ctx.fillStyle = (p.type === 'platform')?'#2c3e50':(p.type === 'lava')?'#e74c3c':(p.type === 'goal')?'#f1c40f':(p.type === 'moving')?'#3498db':'#9b59b6'; }
            ctx.fillRect(p.x, p.y, p.width, p.height);
        });
        ctx.restore();
        drawPlayer(camX);
    }

    // --- LEVEL MANAGEMENT ---
    function startTransition(levelIndex) { if (transitioning) return; transitioning = true; fadeState = "out"; nextLevel = levelIndex; }
    function handleTransition(dt) {
        if (!transitioning) return;
        if (fadeState === "out") { if ((fade = Math.min(1, fade + TRANSITION_SPEED * dt)) === 1) { loadLevel(nextLevel); fadeState = "in"; }}
        else if (fadeState === "in") { if ((fade = Math.max(0, fade - TRANSITION_SPEED * dt)) === 0) { transitioning = false; fadeState = "none"; }}
        overlay.style.opacity = fade;
    }
    function loadLevel(i) {
        if (i >= allLevels.length) return endGame("You Beat All 20 Levels!");
        currentLevel = i; const levelData = allLevels[i]; platforms = [];
        levelData.platforms.forEach(p_template => {
            const p = { ...p_template };
            if (p.type === 'alternating') { p.isAlternating = true; p.timer = 0; p.active = true; }
            if (p.type === 'moving') { p.startX = p.x; p.dx = 0; }
            platforms.push(p);
        });
        resetPlayer(levelData.startPos.x, levelData.startPos.y);
        levelText.textContent = `Level: ${i + 1}`; levelTime = 0;
    }

    // --- GAME CONTROL ---
    function startGame() {
        menu.classList.add('hidden');
        inGameControls.classList.remove('hidden'); mobileGameControls.classList.remove('hidden');
        loadLevel(0);
        running = true;
        if (isPaused) { togglePause(); } else { updatePauseButtons(); }
        startButton.blur();
    }
    function endGame(msg) {
        running = false; isPaused = false;
        menu.classList.remove('hidden');
        inGameControls.classList.add('hidden'); mobileGameControls.classList.add('hidden');
        pauseOverlay.classList.add('hidden');
        document.getElementById('menu-title').textContent = msg;
        startButton.textContent = "Play Again";
    }
    function togglePause() {
        if (transitioning || !running) return;
        isPaused = !isPaused;
        updatePauseButtons();
    }
    function updatePauseButtons() {
        pauseOverlay.classList.toggle('hidden', !isPaused);
        pauseBtn.textContent = isPaused ? "Resume (P)" : "Pause (P)";
        mobilePauseBtn.innerHTML = isPaused ? resumeIconSVG : pauseIconSVG;
    }
    function restartLevel() {
        if (transitioning) return;
        if (isPaused) { togglePause(); }
        loadLevel(currentLevel);
    }

    // --- SKIN SELECTION ---
    function setupSkinSelector() {
        const container = document.getElementById('skin-selector-container');
        if (!container) return; container.innerHTML = '';
        const savedSkinId = localStorage.getItem('selectedSkin');
        if (savedSkinId && SKINS[savedSkinId]) { currentSkin = SKINS[savedSkinId]; }
        else { currentSkin = Object.values(SKINS)[0]; }
        for (const skin of Object.values(SKINS)) {
            const wrapper = document.createElement('div'); wrapper.className = 'skin-choice'; wrapper.dataset.skinId = skin.id;
            const previewCanvas = document.createElement('canvas'); previewCanvas.width = 42; previewCanvas.height = 42;
            skin.draw(previewCanvas.getContext('2d'), 42, 42, {});
            wrapper.appendChild(previewCanvas); container.appendChild(wrapper);
            wrapper.addEventListener('click', () => { currentSkin = skin; localStorage.setItem('selectedSkin', skin.id); updateSelectedSkinUI(); });
        }
        updateSelectedSkinUI();
    }
    function updateSelectedSkinUI() { document.querySelectorAll('.skin-choice').forEach(el => el.classList.toggle('selected', el.dataset.skinId === currentSkin.id)); }

    // --- GAME LOOP ---
    let lastTime = 0;
    function loop(timestamp) {
        if (!lastTime) lastTime = timestamp; const dt = (timestamp - lastTime) / 1000; lastTime = timestamp;
        if (dt > 0.1) { requestAnimationFrame(loop); return; }
        handleTransition(dt);
        if (!isPaused) { update(dt); }
        draw();
        requestAnimationFrame(loop);
    }
    
    // --- INITIALIZATION ---
    setupSkinSelector();
    startButton.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', togglePause);
    restartBtn.addEventListener('click', restartLevel);
    mobilePauseBtn.addEventListener('click', togglePause);
    mobileRestartBtn.addEventListener('click', restartLevel);
    startButton.disabled = false;
    startButton.textContent = "Start Game";
    updatePauseButtons();
    requestAnimationFrame(loop);
});
