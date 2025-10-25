// GAME LEVEL DATABASE - 20 LEVELS WITH PROGRESSIVE DIFFICULTY
// Calculations are corrected for player size (Max Gap: 198px, Max Height: 144px)
const allLevels = [
    // { // LEVEL 1: Welcome!
    //     startPos: { x: 50, y: 450 },
    //     platforms: [
    //         { x: 0, y: 500, width: 100, height: 40, type: 'platform' },
    //         // Gap: 80px. Very easy.
    //         { x: 280, y: 480, width: 50, height: 40, type: 'platform' },
    //         // Gap: 90px.
    //         { x: 520, y: 460, width: 50, height: 40, type: 'platform' },
    //         { x: 700, y: 410, width: 50, height: 50, type: 'goal' }
    //     ]
    // },
    // { // LEVEL 2: First Hazard
    //     startPos: { x: 50, y: 450 },
    //     platforms: [
    //         { x: 0, y: 500, width: 250, height: 40, type: 'platform' },
    //         // A simple 100px lava gap.
    //         { x: 280, y: 430, width: 100, height: 20, type: 'lava' },
    //         { x: 450, y: 500, width: 50, height: 40, type: 'platform' },
    //         { x: 750, y: 450, width: 50, height: 50, type: 'goal' },
    //     ]
    // },
    // { // LEVEL 3: The Climb
    //     startPos: { x: 50, y: 450 },
    //     platforms: [
    //         { x: 0, y: 500, width: 150, height: 40, type: 'platform' },
    //         // Easy vertical steps.
    //         { x: 250, y: 440, width: 120, height: 20, type: 'platform' },
    //         { x: 450, y: 380, width: 120, height: 20, type: 'platform' },
    //         { x: 450, y: 320, width: 20, height: 20, type: 'lava' },
    //         { x: 600, y: 260, width: 50, height: 50, type: 'goal' },
    //     ]
    // },
    // { // LEVEL 4: Stepping Stones
    //     startPos: { x: 50, y: 450 },
    //     platforms: [
    //         { x: 0, y: 500, width: 100, height: 40, type: 'platform' },
    //         // Moderate 120px gaps.
    //         { x: 220, y: 500, width: 20, height: 20, type: 'platform' },
    //         { x: 400, y: 450, width: 20, height: 30, type: 'platform' },
    //         { x: 580, y: 500, width: 20, height: 20, type: 'platform' },
    //         { x: 750, y: 450, width: 50, height: 50, type: 'goal' },
    //     ]
    // },
    // { // LEVEL 5: The Floor is Lava
    //     startPos: { x: 50, y: 450 },
    //     platforms: [
    //         { x: 0, y: 500, width: 150, height: 40, type: 'platform' },
    //         // Raises the stakes, but jumps are still easy (130px gap).
    //         { x: 280, y: 480, width: 20, height: 50, type: 'platform' },
    //         { x: 480, y: 460, width: 30, height: 20, type: 'platform' },
    //         { x: 680, y: 440, width: 20, height: 20, type: 'platform' },
    //         { x: 850, y: 390, width: 50, height:30, type: 'goal' },
    //         { x: 0, y: 520, width: 1000, height: 20, type: 'lava' },
    //     ]
    // },
    // { // LEVEL 6: A Little Tricky
    //     startPos: { x: 50, y: 150 },
    //     platforms: [
    //         { x: 0, y: 200, width: 100, height: 40, type: 'platform' },
    //         // First big drop.
    //         { x: 200, y: 400, width: 100, height: 20, type: 'platform' },
    //         { x: 450, y: 350, width: 30, height: 20, type: 'lava' },
    //         // Gap is 150px. Getting challenging.
    //         { x: 450, y: 400, width: 100, height: 20, type: 'platform' },
    //         { x: 700, y: 330, width: 20, height: 20, type: 'platform' },
    //         { x: 800, y: 220, width: 50, height: 50, type: 'goal' },
    //         { x: 0, y: 520, width: 800, height: 20, type: 'lava' },
    //     ]
    // },
    // { // LEVEL 7: Narrow Paths
    //     startPos: { x: 50, y: 450 },
    //     platforms: [
    //         { x: 0, y: 500, width: 100, height: 40, type: 'platform' },
    //         // Gaps are moderate (140px), but platforms are smaller.
    //         { x: 240, y: 500, width: 5, height: 20, type: 'platform' },
    //         { x: 430, y: 500, width: 5, height: 20, type: 'platform' },
    //         { x: 620, y: 500, width: 5, height: 20, type: 'platform' },
    //         { x: 780, y: 450, width: 50, height: 50, type: 'goal' },
    //         { x: 0, y: 520, width: 900, height: 20, type: 'lava' },
    //     ]
    // },
    // { // LEVEL 8: The Hurdle
    //     startPos: { x: 50, y: 450 },
    //     platforms: [
    //         { x: 0, y: 500, width: 600, height: 40, type: 'platform' },
    //         // Teaches the player to control jump height.
    //         { x: 150, y: 500, width: 80, height: 20, type: 'lava' },
    //         { x: 150, y: 380, width: 80, height: 60, type: 'lava' },
    //         { x: 350, y: 420, width: 80, height: 20, type: 'lava' },
    //         { x: 500, y: 450, width: 50, height: 50, type: 'goal' },
    //     ]
    // },
    // { // LEVEL 9: Rising Tide
    //     startPos: { x: 50, y: 450 },
    //     platforms: [
    //         { x: 0, y: 500, width: 100, height: 40, type: 'platform' },
    //         // Vertical jumps are getting higher (100px).
    //         { x: 220, y: 400, width: 5, height: 20, type: 'platform' },
    //         { x: 100, y: 300, width: 5, height: 20, type: 'platform' },
    //         { x: 200, y: 200, width: 5, height: 20, type: 'platform' },
    //         { x: 350, y: 150, width: 50, height: 50, type: 'goal' },
    //         { x: 0, y: 520, width: 500, height: 20, type: 'lava' },
    //     ]
    // },
    // { // LEVEL 10: Leap of Faith
    //     startPos: { x: 50, y: 100 },
    //     platforms: [
    //         { x: 0, y: 150, width: 100, height: 20, type: 'platform' },
    //         // A long falling jump (180px gap) that requires trust.
    //         { x: 280, y: 350, width: 2, height: 20, type: 'platform' },
    //         { x: 600, y: 500, width: 50, height: 50, type: 'goal' },
    //         { x: 0, y: 520, width: 800, height: 20, type: 'lava' },
    //     ]
    // },
    { // LEVEL 11: The Gauntlet
        startPos: { x: 50, y: 50 },
        platforms: [
            { x: 0, y: 100, width: 80, height: 40, type: 'platform' },
            // Gaps are consistently challenging now (160px).
            { x: 240, y: 480, width: 10, height: 20, type: 'platform' },
            { x: 460, y: 460, width: 5, height: 20, type: 'platform' },
            { x: 680, y: 400, width: 10, height: 20, type: 'lava' },
            { x: 680, y: 440, width: 60, height: 20, type: 'platform' },
            { x: 850, y: 390, width: 50, height: 50, type: 'goal' },
            { x: 0, y: 520, width: 1000, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 12: Reversal
        startPos: { x: 50, y: 450 },
        platforms: [
            { x: 0, y: 500, width: 80, height: 40, type: 'platform' },
            // A 170px jump to the right...
            { x: 250, y: 500, width: 60, height: 20, type: 'platform' },
            // ...then a 140px jump back to the left.
            { x: 50, y: 400, width: 60, height: 20, type: 'platform' },
            { x: 250, y: 300, width: 60, height: 20, type: 'platform' },
            { x: 150, y: 200, width: 50, height: 50, type: 'goal' },
            { x: 0, y: 520, width: 400, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 13: High Road, Low Road
        startPos: { x: 50, y: 150 },
        platforms: [
            { x: 0, y: 200, width: 100, height: 20, type: 'platform' },
            // A long jump over a pit. Gap: 180px.
            { x: 280, y: 200, width: 100, height: 20, type: 'platform' },
            { x: 280, y: 520, width: 100, height: 20, type: 'lava' }, // Decoy
            { x: 480, y: 400, width: 100, height: 20, type: 'platform' },
            { x: 650, y: 350, width: 50, height: 50, type: 'goal' },
        ]
    },
    { // LEVEL 14: Don't Look Down
        startPos: { x: 50, y: 150 },
        platforms: [
            // A series of 185px gaps, requires consistent execution.
            { x: 0, y: 200, width: 80, height: 40, type: 'platform' },
            { x: 265, y: 200, width: 60, height: 20, type: 'platform' },
            { x: 510, y: 200, width: 60, height: 20, type: 'platform' },
            { x: 755, y: 200, width: 60, height: 20, type: 'platform' },
            { x: 900, y: 150, width: 50, height: 50, type: 'goal' },
            { x: 0, y: 520, width: 1000, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 15: The Limit
        startPos: { x: 50, y: 450 },
        platforms: [
            { x: 0, y: 500, width: 100, height: 40, type: 'platform' },
            // Gap is 195px. Very close to the 198px maximum.
            { x: 295, y: 500, width: 100, height: 40, type: 'platform' },
            { x: 450, y: 450, width: 50, height: 50, type: 'goal' },
            { x: 0, y: 520, width: 600, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 16: Needle Point
        startPos: { x: 50, y: 450 },
        platforms: [
            { x: 0, y: 500, width: 100, height: 40, type: 'platform' },
            // A 190px gap to a tiny 20px wide platform.
            { x: 290, y: 500, width: 20, height: 20, type: 'platform' },
            // And another.
            { x: 500, y: 500, width: 20, height: 20, type: 'platform' },
            { x: 600, y: 450, width: 50, height: 50, type: 'goal' },
            { x: 0, y: 520, width: 700, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 17: Maximum Altitude
        startPos: { x: 50, y: 450 },
        platforms: [
            { x: 0, y: 500, width: 100, height: 40, type: 'platform' },
            // A 144px vertical jump, the absolute maximum.
            { x: 150, y: 365, width: 60, height: 20, type: 'platform' },
            // Another one, requiring a change of direction.
            { x: 100, y: 235, width: 60, height: 20, type: 'platform' },
            { x: 200, y: 100, width: 50, height: 50, type: 'goal' },
            { x: 0, y: 520, width: 400, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 18: The Long Fall
        startPos: { x: 50, y: 150 },
        platforms: [
            { x: 0, y: 200, width: 100, height: 20, type: 'platform' },
            // This ~240px gap is only possible because of the long fall.
            { x: 440, y: 500, width: 100, height: 20, type: 'platform' },
            { x: 550, y: 450, width: 50, height: 50, type: 'goal' },
            { x: 0, y: 520, width: 600, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 19: Razor's Edge
        startPos: { x: 50, y: 450 },
        platforms: [
            { x: 0, y: 500, width: 80, height: 40, type: 'platform' },
            // Gap is 198px. The absolute maximum. No room for error.
            { x: 278, y: 500, width: 80, height: 20, type: 'platform' },
            // A max height jump of 144px follows immediately.
            { x: 400, y: 370, width: 60, height: 20, type: 'platform' },
            // A long fall to the goal.
            { x: 600, y: 500, width: 50, height: 50, type: 'goal' },
            { x: 0, y: 520, width: 800, height: 20, type: 'lava' },
        ]
    },
    { // LEVEL 20: The Finale
        startPos: { x: 50, y: 450 },
        platforms: [
            { x: 0, y: 500, width: 80, height: 40, type: 'platform' },
            { x: 275, y: 480, width: 20, height: 20, type: 'platform' }, // 195px gap to a needle
            { x: 400, y: 350, width: 20, height: 20, type: 'platform' }, // 144px high jump from needle
            { x: 200, y: 250, width: 100, height: 20, type: 'platform' },// Tricky arc jump back
            { x: 495, y: 200, width: 100, height: 40, type: 'platform' },// Final 195px jump
            { x: 600, y: 150, width: 50, height: 40, type: 'goal' },
            { x: -100, y: 520, width: 800, height: 20, type: 'lava' },
        ]
    }
];