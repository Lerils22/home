// GAME LEVEL DATABASE - 20 LEVELS WITH PROGRESSIVE DIFFICULTY
const allLevels = [
    { // LEVEL 1: Welcome!
        startPos: { x: 50, y: 450 },
        platforms: [
            { x: 0, y: 500, width: 200, height: 40, type: 'platform' },
            { x: 280, y: 480, width: 100, height: 40, type: 'platform' },
            { x: 520, y: 460, width: 100, height: 40, type: 'platform' },
            { x: 700, y: 410, width: 50, height: 50, type: 'goal' }
        ]
    },
    { // LEVEL 2: First Hazard
        startPos: { x: 50, y: 450 },
        platforms: [
            { x: 0, y: 500, width: 250, height: 40, type: 'platform' },
            { x: 280, y: 500, width: 100, height: 20, type: 'lava' },
            { x: 450, y: 500, width: 250, height: 40, type: 'platform' },
            { x: 750, y: 450, width: 50, height: 50, type: 'goal' },
        ]
    },
    { // LEVEL 3: The Climb
        startPos: { x: 50, y: 450 },
        platforms: [
            { x: 0, y: 500, width: 150, height: 40, type: 'platform' },
            { x: 250, y: 440, width: 120, height: 20, type: 'platform' },
            { x: 450, y: 380, width: 120, height: 20, type: 'platform' },
            { x: 450, y: 320, width: 20, height: 20, type: 'lava' },
            { x: 600, y: 260, width: 50, height: 50, type: 'goal' },
        ]
    },
    { // LEVEL 4: Stepping Stones
        startPos: { x: 50, y: 450 },
        platforms: [
            { x: 0, y: 500, width: 100, height: 40, type: 'platform' },
            { x: 220, y: 500, width: 30, height: 20, type: 'platform' },
            { x: 400, y: 480, width: 30, height: 30, type: 'platform' },
            { x: 580, y: 500, width: 30, height: 20, type: 'platform' },
            { x: 750, y: 450, width: 50, height: 50, type: 'goal' },
        ]
    },
    { // LEVEL 5: The Floor is Lava
        startPos: { x: 50, y: 450 },
        platforms: [
            { x: 0, y: 500, width: 150, height: 40, type: 'platform' },
            { x: 280, y: 480, width: 40, height: 50, type: 'platform' },
            { x: 480, y: 460, width: 40, height: 20, type: 'platform' },
            { x: 680, y: 440, width: 40, height: 20, type: 'platform' },
            { x: 850, y: 390, width: 50, height:30, type: 'goal' },
            { x: 0, y: 520, width: 1000, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 6: A Little Tricky
        startPos: { x: 50, y: 150 },
        platforms: [
            { x: 0, y: 200, width: 100, height: 40, type: 'platform' },
            { x: 200, y: 400, width: 100, height: 20, type: 'platform' },
            { x: 450, y: 350, width: 30, height: 20, type: 'lava' },
            { x: 450, y: 400, width: 100, height: 20, type: 'platform' },
            { x: 700, y: 330, width: 40, height: 20, type: 'platform' },
            { x: 800, y: 220, width: 50, height: 50, type: 'goal' },
            { x: 0, y: 520, width: 800, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 7: Narrow Paths
        startPos: { x: 50, y: 450 },
        platforms: [
            { x: 0, y: 500, width: 100, height: 40, type: 'platform' },
            { x: 240, y: 500, width: 15, height: 20, type: 'platform' },
            { x: 430, y: 500, width: 15, height: 20, type: 'platform' },
            { x: 620, y: 500, width: 15, height: 20, type: 'platform' },
            { x: 780, y: 450, width: 50, height: 50, type: 'goal' },
            { x: 0, y: 520, width: 900, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 8: The Hurdle
        startPos: { x: 50, y: 450 },
        platforms: [
            { x: 0, y: 500, width: 600, height: 40, type: 'platform' },
            { x: 150, y: 500, width: 80, height: 20, type: 'lava' },
            { x: 150, y: 440, width: 80, height: 60, type: 'platform' }, // Changed to platform to be a hurdle
            { x: 350, y: 420, width: 80, height: 80, type: 'lava' },
            { x: 500, y: 450, width: 50, height: 50, type: 'goal' },
        ]
    },
    { // LEVEL 9: Rising Tide
        startPos: { x: 50, y: 450 },
        platforms: [
            { x: 0, y: 500, width: 100, height: 40, type: 'platform' },
            { x: 220, y: 400, width: 30, height: 20, type: 'platform' },
            { x: 100, y: 300, width: 30, height: 20, type: 'platform' },
            { x: 200, y: 200, width: 30, height: 20, type: 'platform' },
            { x: 350, y: 150, width: 50, height: 50, type: 'goal' },
            { x: 0, y: 520, width: 500, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 10: Leap of Faith
        startPos: { x: 50, y: 100 },
        platforms: [
            { x: 0, y: 150, width: 100, height: 20, type: 'platform' },
            { x: 280, y: 350, width: 80, height: 20, type: 'platform' },
            { x: 600, y: 500, width: 50, height: 50, type: 'goal' },
            { x: 0, y: 520, width: 800, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 11: The Gauntlet
        startPos: { x: 50, y: 50 },
        platforms: [
            { x: 0, y: 100, width: 80, height: 40, type: 'platform' },
            { x: 240, y: 480, width: 30, height: 20, type: 'platform' },
            { x: 460, y: 460, width: 30, height: 20, type: 'platform' },
            { x: 700, y: 400, width: 10, height: 5, type: 'lava' },
            { x: 680, y: 440, width: 60, height: 20, type: 'platform' },
            { x: 850, y: 390, width: 50, height: 50, type: 'goal' },
            { x: 0, y: 520, width: 1000, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 12: Reversal
        startPos: { x: 50, y: 450 },
        platforms: [
            { x: 0, y: 500, width: 80, height: 40, type: 'platform' },
            { x: 250, y: 400, width: 60, height: 20, type: 'platform' },
            { x: 150, y: 270, width: 60, height: 20, type: 'platform' },
            { x: 150, y: 50, width: 50, height: 50, type: 'goal' },
            { x: 0, y: 520, width: 400, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 13: High Road, Low Road
        startPos: { x: 50, y: 150 },
        platforms: [
            { x: 0, y: 200, width: 100, height: 20, type: 'platform' },
            { x: 280, y: 200, width: 40, height: 20, type: 'platform' },
            { x: 480, y: 400, width: 40, height: 20, type: 'platform' },
            { x: 650, y: 300, width: 40, height: 20, type: 'platform' },
            { x: 800, y: 200, width: 40, height: 20, type: 'platform' },
            { x: 950, y: 100, width: 50, height: 50, type: 'goal' },
            { x: 0, y: 520, width: 800, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 14: Don't Look Down
        startPos: { x: 50, y: 250 },
        platforms: [
            { x: 0, y: 300, width: 80, height: 40, type: 'platform' },
            { x: 265, y: 200, width: 60, height: 20, type: 'platform' },
            { x: 455, y: 100, width: 60, height: 20, type: 'platform' },
            { x: 650, y: 150, width: 50, height: 50, type: 'goal' },
            { x: 0, y: 520, width: 1000, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 15: The Vanishing Road
        startPos: { x: 50, y: 450 },
        platforms: [
            { x: 0, y: 500, width: 100, height: 40, type: 'platform' },
            { x: 250, y: 500, width: 40, height: 40, type: 'alternating', interval: 1.5 },
            { x: 450, y: 500, width: 40, height: 40, type: 'alternating', interval: 1.0 },
            { x: 650, y: 500, width: 40, height: 40, type: 'alternating', interval: 2.0 },
            { x: 800, y: 450, width: 50, height: 50, type: 'goal' },
            { x: 0, y: 520, width: 900, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 16: Needle Point
        startPos: { x: 50, y: 450 },
        platforms: [
            { x: 0, y: 500, width: 100, height: 40, type: 'platform' },
            { x: 0, y: 400, width: 100, height: 40, type: 'platform' },
            { x: 0, y: 300, width: 100, height: 40, type: 'platform' },
            { x: 200, y: 300, width: 20, height: 20, type: 'platform' },
            { x: 300, y: 300, width: 50, height: 50, type: 'goal' },
            { x: 0, y: 520, width: 700, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 17: Moving Up
        startPos: { x: 50, y: 450 },
        platforms: [
            { x: 0, y: 500, width: 100, height: 40, type: 'platform' },
            { x: 200, y: 365, width: 80, height: 20, type: 'moving', moveDist: 250, speed: 1.5 },
            { x: 100, y: 235, width: 60, height: 20, type: 'moving', moveDist: -200, speed: 1.0 },
            { x: 200, y: 100, width: 50, height: 50, type: 'goal' },
            { x: -100, y: 520, width: 600, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 18: The Squeeze (NEW)
        startPos: { x: 50, y: 100 },
        platforms: [
            { x: 0, y: 500, width: 900, height: 40, type: 'platform' },
            { x: 100, y: 200, width: 40, height: 300, type: 'platform' },
            { x: 250, y: 0, width: 40, height: 350, type: 'platform' },
            { x: 400, y: 200, width: 40, height: 300, type: 'platform' },
            { x: 550, y: 0, width: 40, height: 350, type: 'platform' },
            { x: 700, y: 200, width: 40, height: 300, type: 'platform' },
            { x: 800, y: 450, width: 50, height: 50, type: 'goal' }
        ]
    },
    { // LEVEL 19: Alternating Ascent (NEW)
        startPos: { x: 50, y: 450 },
        platforms: [
            { x: 0, y: 500, width: 100, height: 40, type: 'platform' },
            { x: 200, y: 400, width: 80, height: 20, type: 'alternating', interval: 1.0 },
            { x: 350, y: 300, width: 80, height: 20, type: 'alternating', interval: 1.2 },
            { x: 200, y: 200, width: 80, height: 20, type: 'alternating', interval: 1.4 },
            { x: 350, y: 100, width: 50, height: 50, type: 'goal' },
            { x: 0, y: 520, width: 500, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 20: The Finale
        startPos: { x: 50, y: 450 },
        platforms: [
            { x: 0, y: 500, width: 80, height: 40, type: 'platform' },
            { x: 275, y: 480, width: 40, height: 20, type: 'moving', moveDist: 100, speed: 2 },
            { x: 400, y: 350, width: 40, height: 20, type: 'moving', moveDist: -80, speed: 1 },
            { x: 200, y: 250, width: 100, height: 20, type: 'alternating', interval: 1.2 },
            { x: 495, y: 200, width: 100, height: 40, type: 'platform' },
            { x: 600, y: 150, width: 50, height: 40, type: 'goal' },
            { x: -100, y: 520, width: 800, height: 20, type: 'lava' },
        ]
    }
];
