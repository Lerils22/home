document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const playerEl = document.getElementById('player-character');
    const levelText = document.getElementById('level-indicator');
    const menu = document.getElementById('menu');
    const startButton = document.getElementById('startButton');
    const overlay = document.getElementById('transition-overlay');

    // --- CONSTANTS ---
    const GRAVITY = 0.5;
    const JUMP_FORCE = -12;
    const SPEED = 5;
    const TRANSITION_SPEED = 2.0;

    // --- STATE ---
    let keys = {};
    let currentLevel = 0;
    let platforms = [];
    let running = false;
    let transitioning = false;
    let fade = 0;
    let fadeState = "none";
    let nextLevel = 0;

    const player = { x: 0, y: 0, w: 42, h: 42, vx: 0, vy: 0, grounded: false, startX: 0, startY: 0 };

    // --- INPUT ---
    window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
    window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

    // --- COLLISION CHECK ---
    function collides(a, b) {
        return (a.x < b.x + b.width && a.x + a.w > b.x && a.y < b.y + b.height && a.y + a.h > b.y);
    }

    // --- PLAYER RESET ---
    function resetPlayer(x, y) {
        player.x = x; player.y = y; player.vx = 0; player.vy = 0;
        player.startX = x; player.startY = y;
    }

    // --- RESPAWN ---
    function respawn() {
        player.x = player.startX;
        player.y = player.startY;
        player.vx = 0;
        player.vy = 0;
    }

    // --- UPDATE ---
    function update(dt) {
        if (!running || transitioning) return;

        // Horizontal movement
        player.vx = 0;
        if (keys['a'] || keys['arrowleft']) player.vx = -SPEED;
        if (keys['d'] || keys['arrowright']) player.vx = SPEED;

        // Jump
        if ((keys['w'] || keys['arrowup'] || keys[' ']) && player.grounded) {
            player.vy = JUMP_FORCE;
            player.grounded = false;
        }

        player.vy += GRAVITY;
        player.x += player.vx;

        // Horizontal collisions
        platforms.forEach(p => {
            if (p.type === 'platform' && collides(player, p)) {
                if (player.vx > 0) player.x = p.x - player.w;
                else if (player.vx < 0) player.x = p.x + p.width;
            }
        });

        player.y += player.vy;
        player.grounded = false;

        // Vertical collisions
        platforms.forEach(p => {
            if (p.type === 'platform' && collides(player, p)) {
                if (player.vy > 0 && player.y + player.h - player.vy <= p.y) {
                    player.y = p.y - player.h;
                    player.vy = 0;
                    player.grounded = true;
                } else if (player.vy < 0) {
                    player.y = p.y + p.height;
                    player.vy = 0;
                }
            }
        });

        // Interactions
        for (let p of platforms) {
            if (collides(player, p)) {
                if (p.type === 'lava') return respawn();
                if (p.type === 'goal') return startTransition(currentLevel + 1);
            }
        }

        // Fall off map
        if (player.y > canvas.height + 400) respawn();
    }

    // --- DRAW ---
    function draw() {
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#87CEEB');
        grad.addColorStop(1, '#ADD8E6');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const camX = -player.x + canvas.width / 2;

        ctx.save();
        ctx.translate(camX, 0);
        platforms.forEach(p => {
            ctx.fillStyle = (p.type === 'platform') ? '#2c3e50' :
                            (p.type === 'lava') ? '#e74c3c' :
                            (p.type === 'goal') ? '#f1c40f' : '#9b59b6';
            ctx.fillRect(p.x, p.y, p.width, p.height);
        });
        ctx.restore();

        playerEl.style.transform = `translate(${player.x + camX}px, ${player.y}px)`;
    }

    // --- LEVEL TRANSITION ---
    function startTransition(levelIndex) {
        if (transitioning) return;
        transitioning = true;
        fadeState = "out";
        nextLevel = levelIndex;
    }

    function handleTransition(dt) {
        if (!transitioning) return;

        if (fadeState === "out") {
            fade += TRANSITION_SPEED * dt;
            if (fade >= 1) {
                fade = 1;
                loadLevel(nextLevel);
                fadeState = "in";
            }
        } else if (fadeState === "in") {
            fade -= TRANSITION_SPEED * dt;
            if (fade <= 0) {
                fade = 0;
                transitioning = false;
                fadeState = "none";
            }
        }

        overlay.style.opacity = fade;
    }

    // --- LOAD LEVEL ---
    function loadLevel(i) {
        if (i >= allLevels.length) return endGame("You Beat All 10 Levels!");
        currentLevel = i;
        const data = allLevels[i];
        platforms = data.platforms;
        resetPlayer(data.startPos.x, data.startPos.y);
        levelText.textContent = `Level: ${i + 1}`;
    }

    // --- GAME CONTROL ---
    function startGame() {
        menu.classList.add('hidden');
        loadLevel(0);
        running = true;
        startButton.blur();
    }

    function endGame(msg) {
        running = false;
        menu.classList.remove('hidden');
        document.getElementById('menu-title').textContent = msg;
        startButton.textContent = "Play Again";
    }

    // --- LOOP ---
    let last = 0;
    function loop(t) {
        const dt = (t - last) / 1000;
        last = t;
        handleTransition(dt);
        update(dt);
        draw();
        requestAnimationFrame(loop);
    }

    startButton.addEventListener('click', startGame);
    startButton.disabled = false;
    startButton.textContent = "Start Game";

    requestAnimationFrame(loop);
});
