/* ═══════════════════════════════════════════════════════════════
   🎮 JACKAL'S GARDEN - MAIN APPLICATION
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════════════════════════
   📦 ASSET DEFINITIONS
   ═══════════════════════════════════════════════════════════════ */

const ASSETS = {
    // Folder structure - adjust if assets are in a different location
    BASE_PATH: './assets/',

    // Base images (10 files)
    bases: [
        'base/base_default_female.png',
        'base/base_default_male.png',
        'base/base_blue_female.png',
        'base/base_blue_male.png',
        'base/base_pink_female.png',
        'base/base_pink_male.png',
        'base/base_gray_female.png',
        'base/base_gray_male.png',
        'base/base_golden_female.png',
        'base/base_golden_male.png',
    ],

    // Tails (13 files)
    tails: {
        curled_tip: ['default', 'blue', 'pink', 'gray'],
        fluffy: ['default', 'blue', 'pink', 'gray', 'golden'],
        sleek: ['default', 'blue', 'pink', 'gray'],
    },

    // Ears (13 files)
    ears: {
        rounded: ['default', 'blue', 'pink', 'gray', 'golden'],
        folded: ['default', 'blue', 'pink', 'gray'],
        tall_upright: ['default', 'blue', 'pink', 'gray'],
    },

    // Eyebrows (3 files)
    eyebrows: ['dark', 'light', 'golden'],

    // Eyes (6 files)
    eyes: [
        'bright_round',
        'bright_round_blue',
        'almond',
        'half_lidded',
        'masked',
        'narrow',
    ],

    // Nose (1 file)
    nose: 'nose_default.png',

    // Mouths (4 files)
    mouths: ['surprised', 'happy', 'smug', 'neutral'],

    // Accessories (3 files)
    accessories: ['bone', 'feather', 'flowers'],
};

/* ═══════════════════════════════════════════════════════════════
   🎨 APPLICATION STATE
   ═══════════════════════════════════════════════════════════════ */

const state = {
    currentJackal: null,
    loadedImages: {},
    isGenerating: false,
    isMuted: false,
    audioContext: null,
};

/* ═══════════════════════════════════════════════════════════════
   🔊 WEB AUDIO API - SOUND GENERATION
   ═══════════════════════════════════════════════════════════════ */

class SoundGenerator {
    constructor() {
        // Initialize AudioContext on first user interaction (browser requirement)
        this.audioContext = null;
    }

    init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            state.audioContext = this.audioContext;
        }
    }

    // Soft, warm "pop" for button clicks
    playButtonClick() {
        if (state.isMuted || !this.audioContext) return;

        const now = this.audioContext.currentTime;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(200, now);

        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        oscillator.start(now);
        oscillator.stop(now + 0.1);
    }

    // Gentle "whoosh" for generation
    playGenerate() {
        if (state.isMuted || !this.audioContext) return;

        const now = this.audioContext.currentTime;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, now);
        oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.3);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, now);

        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        oscillator.start(now);
        oscillator.stop(now + 0.3);
    }

    // Soft "poof" when jackal appears
    playAppear() {
        if (state.isMuted || !this.audioContext) return;

        const now = this.audioContext.currentTime;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.15);

        gainNode.gain.setValueAtTime(0.12, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        oscillator.start(now);
        oscillator.stop(now + 0.15);
    }

    // Gentle chime for downloads and other actions
    playSuccess() {
        if (state.isMuted || !this.audioContext) return;

        const now = this.audioContext.currentTime;
        const frequencies = [523.25, 659.25, 783.99]; // C, E, G chord

        frequencies.forEach((freq, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, now);

            const startTime = now + (index * 0.05);
            gainNode.gain.setValueAtTime(0.08, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

            oscillator.start(startTime);
            oscillator.stop(startTime + 0.3);
        });
    }
}

const soundGenerator = new SoundGenerator();

/* ═══════════════════════════════════════════════════════════════
   🎲 JACKAL GENERATION LOGIC
   ═══════════════════════════════════════════════════════════════ */

class JackalGenerator {
    // Utility: Random element from array
    static random(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Extract color from base filename (e.g., "base_golden_female.png" -> "golden")
    static extractColorFromBase(basePath) {
        const filename = basePath.split('/').pop();
        const parts = filename.replace('.png', '').split('_');
        // Format: base_COLOR_GENDER.png
        return parts[1]; // default, blue, pink, gray, or golden
    }

    // Extract gender from base filename
    static extractGenderFromBase(basePath) {
        const filename = basePath.split('/').pop();
        const parts = filename.replace('.png', '').split('_');
        return parts[2]; // female or male
    }

    // Generate a random jackal following all rules
    static generate() {
        const jackal = {};

        // 1. BASE SELECTION
        jackal.base = this.random(ASSETS.bases);
        const color = this.extractColorFromBase(jackal.base);
        const gender = this.extractGenderFromBase(jackal.base);
        jackal.color = color;
        jackal.gender = gender;

        // 2. TAIL SELECTION (color-matching)
        if (color === 'golden') {
            // MUST use fluffy golden tail (only option)
            jackal.tail = 'tails/tail_fluffy_golden.png';
            jackal.tailType = 'fluffy';
        } else {
            // Random type, match color
            const tailTypes = ['curled_tip', 'fluffy', 'sleek'];
            const availableTypes = tailTypes.filter(type =>
                ASSETS.tails[type].includes(color)
            );
            const tailType = this.random(availableTypes);
            jackal.tail = `tails/tail_${tailType}_${color}.png`;
            jackal.tailType = tailType;
        }

        // 3. EARS SELECTION (color-matching)
        if (color === 'golden') {
            // MUST use rounded golden ears (only option)
            jackal.ears = 'ears/ears_rounded_golden.png';
            jackal.earsType = 'rounded';
        } else {
            // Random type, match color
            const earsTypes = ['rounded', 'folded', 'tall_upright'];
            const availableTypes = earsTypes.filter(type =>
                ASSETS.ears[type].includes(color)
            );
            const earsType = this.random(availableTypes);
            jackal.ears = `ears/ears_${earsType}_${color}.png`;
            jackal.earsType = earsType;
        }

        // 5. EYES
        jackal.eyes = this.random(ASSETS.eyes);

        // 4. EYEBROWS (conditional)
        const eyesWithImpliedBrows = ['half_lidded', 'narrow'];
        if (eyesWithImpliedBrows.includes(jackal.eyes)) {
            // NO eyebrows (implied in eyes)
            jackal.eyebrows = null;
        } else if (color === 'golden') {
            // MUST use golden eyebrows
            jackal.eyebrows = 'eyebrow_golden.png';
        } else {
            // Random dark or light
            const browOptions = ['dark', 'light'];
            const brow = this.random(browOptions);
            jackal.eyebrows = `eyebrow_${brow}.png`;
        }

        // 6. NOSE
        jackal.nose = ASSETS.nose;

        // 7. MOUTH (conditional)
        const eyesWithBuiltInMouth = ['bright_round', 'bright_round_blue'];
        if (eyesWithBuiltInMouth.includes(jackal.eyes)) {
            // NO mouth (built into eyes)
            jackal.mouth = null;
        } else {
            // Random mouth
            const mouthType = this.random(ASSETS.mouths);
            jackal.mouth = `mouth_${mouthType}.png`;
        }

        // 8. ACCESSORIES (optional)
        const accessoryRoll = Math.random();
        if (accessoryRoll < 0.25) {
            // 25% chance for each accessory
            const acc = this.random(ASSETS.accessories);
            jackal.accessory = `accessory_${acc}.png`;
        } else {
            jackal.accessory = null;
        }

        return jackal;
    }

    // Get human-readable trait names
    static getTraitNames(jackal) {
        return {
            base: `${jackal.color} ${jackal.gender}`,
            tail: `${jackal.tailType} (${jackal.color})`,
            ears: `${jackal.earsType.replace('_', ' ')} (${jackal.color})`,
            eyes: jackal.eyes.replace('_', ' '),
            eyebrows: jackal.eyebrows ? jackal.eyebrows.replace('eyebrow_', '').replace('.png', '') : 'none (implied)',
            nose: 'default',
            mouth: jackal.mouth ? jackal.mouth.replace('mouth_', '').replace('.png', '') : 'integrated in eyes',
            accessory: jackal.accessory ? jackal.accessory.replace('accessory_', '').replace('.png', '') : 'none',
        };
    }
}

/* ═══════════════════════════════════════════════════════════════
   🖼️ IMAGE LOADING & CACHING
   ═══════════════════════════════════════════════════════════════ */

class ImageLoader {
    static async loadImage(path) {
        // Check cache first
        if (state.loadedImages[path]) {
            return state.loadedImages[path];
        }

        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                state.loadedImages[path] = img;
                resolve(img);
            };
            img.onerror = () => {
                console.error(`Failed to load image: ${path}`);
                reject(new Error(`Failed to load: ${path}`));
            };
            img.src = ASSETS.BASE_PATH + path;
        });
    }

    // Preload all assets for smooth experience
    static async preloadAllAssets() {
        const allPaths = [];

        // Bases
        allPaths.push(...ASSETS.bases);

        // Tails
        Object.keys(ASSETS.tails).forEach(type => {
            ASSETS.tails[type].forEach(color => {
                allPaths.push(`tails/tail_${type}_${color}.png`);
            });
        });

        // Ears
        Object.keys(ASSETS.ears).forEach(type => {
            ASSETS.ears[type].forEach(color => {
                allPaths.push(`ears/ears_${type}_${color}.png`);
            });
        });

        // Eyebrows
        ASSETS.eyebrows.forEach(type => {
            allPaths.push(`eyebrows/eyebrow_${type}.png`);
        });

        // Eyes
        ASSETS.eyes.forEach(type => {
            allPaths.push(`eyes/eyes_${type}.png`);
        });

        // Nose
        allPaths.push(`noses/${ASSETS.nose}`);

        // Mouths
        ASSETS.mouths.forEach(type => {
            allPaths.push(`mouths/mouth_${type}.png`);
        });

        // Accessories
        ASSETS.accessories.forEach(type => {
            allPaths.push(`accessories/accessory_${type}.png`);
        });

        const total = allPaths.length;
        let loaded = 0;

        const progressBar = document.getElementById('progressFill');

        // Load all images
        const promises = allPaths.map(async (path) => {
            try {
                await this.loadImage(path);
                loaded++;
                if (progressBar) {
                    progressBar.style.width = `${(loaded / total) * 100}%`;
                }
            } catch (error) {
                console.warn(`Could not load ${path}, will continue without it`);
            }
        });

        await Promise.all(promises);
    }
}

/* ═══════════════════════════════════════════════════════════════
   🎨 CANVAS RENDERING
   ═══════════════════════════════════════════════════════════════ */

class CanvasRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
    }

    // Clear canvas
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Draw a single layer
    async drawLayer(imagePath) {
        if (!imagePath) return; // Skip null layers

        try {
            const img = await ImageLoader.loadImage(imagePath);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        } catch (error) {
            console.error(`Error drawing layer ${imagePath}:`, error);
        }
    }

    // Render complete jackal with proper layer order
    async renderJackal(jackal) {
        this.clear();

        // LAYER ORDER (back to front):
        // 1. Tail
        await this.drawLayer(jackal.tail);

        // 2. Ears
        await this.drawLayer(jackal.ears);

        // 3. Base (with collar)
        await this.drawLayer(jackal.base);

        // 4. Eyebrows (if applicable)
        if (jackal.eyebrows) {
            await this.drawLayer(`eyebrows/${jackal.eyebrows}`);
        }

        // 5. Eyes
        await this.drawLayer(`eyes/eyes_${jackal.eyes}.png`);

        // 6. Nose
        await this.drawLayer(`noses/${jackal.nose}`);

        // 7. Mouth (if applicable)
        if (jackal.mouth) {
            await this.drawLayer(`mouths/${jackal.mouth}`);
        }

        // 8. Accessories (if selected)
        if (jackal.accessory) {
            await this.drawLayer(`accessories/${jackal.accessory}`);
        }
    }
}

/* ═══════════════════════════════════════════════════════════════
   ✨ VISUAL EFFECTS
   ═══════════════════════════════════════════════════════════════ */

class VisualEffects {
    // Create floating particles
    static createParticles() {
        const container = document.getElementById('particlesContainer');
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random starting position
            particle.style.left = `${Math.random() * 100}%`;

            // Random animation duration (10-30 seconds)
            const duration = 10 + Math.random() * 20;
            particle.style.animationDuration = `${duration}s`;

            // Random delay
            particle.style.animationDelay = `${Math.random() * 5}s`;

            container.appendChild(particle);
        }
    }

    // Sparkle burst effect
    static createSparkles() {
        const container = document.getElementById('sparkleContainer');
        const sparkleChars = ['✨', '⭐', '💫', '🌟', '✦', '★'];
        const sparkleCount = 8;

        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];

            // Random position around the center
            const angle = (i / sparkleCount) * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            sparkle.style.setProperty('--tx', `${tx}px`);
            sparkle.style.setProperty('--ty', `${ty}px`);

            sparkle.style.left = '50%';
            sparkle.style.top = '50%';

            container.appendChild(sparkle);

            // Remove after animation
            setTimeout(() => {
                sparkle.remove();
            }, 800);
        }
    }

    // Subtle camera shake
    static cameraShake() {
        const container = document.querySelector('.jackal-container');
        container.style.animation = 'none';
        // Force reflow
        void container.offsetWidth;
        container.style.animation = 'breathe 3s ease-in-out infinite';
    }
}

/* ═══════════════════════════════════════════════════════════════
   🎯 UI CONTROLLER
   ═══════════════════════════════════════════════════════════════ */

class UIController {
    static updateTraitPanel(jackal) {
        const traits = JackalGenerator.getTraitNames(jackal);

        document.getElementById('traitBase').textContent = traits.base;
        document.getElementById('traitTail').textContent = traits.tail;
        document.getElementById('traitEars').textContent = traits.ears;
        document.getElementById('traitEyes').textContent = traits.eyes;
        document.getElementById('traitEyebrows').textContent = traits.eyebrows;
        document.getElementById('traitNose').textContent = traits.nose;
        document.getElementById('traitMouth').textContent = traits.mouth;
        document.getElementById('traitAccessory').textContent = traits.accessory;
    }

    static toggleTraitPanel() {
        const panel = document.getElementById('traitPanel');
        const isOpen = panel.classList.toggle('open');
        panel.setAttribute('aria-hidden', !isOpen);
        soundGenerator.playButtonClick();
    }

    static closeTraitPanel() {
        const panel = document.getElementById('traitPanel');
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
    }

    static toggleHelp() {
        const overlay = document.getElementById('helpOverlay');
        const isOpen = overlay.classList.toggle('open');
        overlay.setAttribute('aria-hidden', !isOpen);
        soundGenerator.playButtonClick();
    }

    static closeHelp() {
        const overlay = document.getElementById('helpOverlay');
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
    }

    static toggleMute() {
        state.isMuted = !state.isMuted;
        const btn = document.getElementById('muteBtn');
        const icon = document.getElementById('muteIcon');

        btn.setAttribute('aria-pressed', state.isMuted);
        icon.textContent = state.isMuted ? '🔇' : '🔊';

        soundGenerator.playButtonClick();
    }

    static async downloadJackal() {
        if (!state.currentJackal) return;

        soundGenerator.playButtonClick();

        const canvas = document.getElementById('jackalCanvas');

        try {
            // Convert canvas to blob
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');

                // Generate filename with traits
                const traits = JackalGenerator.getTraitNames(state.currentJackal);
                const filename = `jackal_${traits.base.replace(' ', '_')}_${traits.eyes.replace(' ', '_')}.png`;

                link.download = filename;
                link.href = url;
                link.click();

                URL.revokeObjectURL(url);

                soundGenerator.playSuccess();
            }, 'image/png');
        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed. Please try again.');
        }
    }
}

/* ═══════════════════════════════════════════════════════════════
   🎲 MAIN GENERATION FUNCTION
   ═══════════════════════════════════════════════════════════════ */

const renderer = new CanvasRenderer('jackalCanvas');

async function generateNewJackal() {
    if (state.isGenerating) return;

    state.isGenerating = true;
    soundGenerator.playGenerate();

    const canvas = document.getElementById('jackalCanvas');

    // Fade out current jackal
    canvas.classList.add('fade-out');

    await new Promise(resolve => setTimeout(resolve, 300));

    // Generate new jackal
    const jackal = JackalGenerator.generate();
    state.currentJackal = jackal;

    // Render new jackal
    await renderer.renderJackal(jackal);

    // Update trait panel
    UIController.updateTraitPanel(jackal);

    // Fade in new jackal
    canvas.classList.remove('fade-out');

    // Visual effects
    VisualEffects.createSparkles();
    soundGenerator.playAppear();

    await new Promise(resolve => setTimeout(resolve, 100));

    state.isGenerating = false;
}

/* ═══════════════════════════════════════════════════════════════
   🎹 KEYBOARD SHORTCUTS
   ═══════════════════════════════════════════════════════════════ */

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ignore if typing in an input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        switch (e.key) {
            case ' ': // Spacebar
                e.preventDefault();
                generateNewJackal();
                break;

            case 'd':
            case 'D':
                e.preventDefault();
                UIController.downloadJackal();
                break;

            case 't':
            case 'T':
                e.preventDefault();
                UIController.toggleTraitPanel();
                break;

            case 'm':
            case 'M':
                e.preventDefault();
                UIController.toggleMute();
                break;

            case '?':
                e.preventDefault();
                UIController.toggleHelp();
                break;

            case 'Escape':
                e.preventDefault();
                UIController.closeTraitPanel();
                UIController.closeHelp();
                break;
        }
    });
}

/* ═══════════════════════════════════════════════════════════════
   🎬 EVENT LISTENERS
   ═══════════════════════════════════════════════════════════════ */

function setupEventListeners() {
    // Generate button
    document.getElementById('generateBtn').addEventListener('click', () => {
        soundGenerator.playButtonClick();
        generateNewJackal();
    });

    // Download button
    document.getElementById('downloadBtn').addEventListener('click', () => {
        UIController.downloadJackal();
    });

    // Trait panel toggle
    document.getElementById('toggleTraitsBtn').addEventListener('click', () => {
        UIController.toggleTraitPanel();
    });

    // Close trait panel
    document.getElementById('closeTraitsBtn').addEventListener('click', () => {
        UIController.closeTraitPanel();
    });

    // Mute button
    document.getElementById('muteBtn').addEventListener('click', () => {
        UIController.toggleMute();
    });

    // Help button
    document.getElementById('helpBtn').addEventListener('click', () => {
        UIController.toggleHelp();
    });

    // Close help
    document.getElementById('closeHelpBtn').addEventListener('click', () => {
        UIController.closeHelp();
    });

    // Close overlays on background click
    document.getElementById('helpOverlay').addEventListener('click', (e) => {
        if (e.target.id === 'helpOverlay') {
            UIController.closeHelp();
        }
    });

    // Initialize audio context on first user interaction
    document.addEventListener('click', () => {
        soundGenerator.init();
    }, { once: true });
}

/* ═══════════════════════════════════════════════════════════════
   🚀 INITIALIZATION
   ═══════════════════════════════════════════════════════════════ */

async function init() {
    console.log('🐾 Welcome to Jackal\'s Garden');

    const loadingOverlay = document.getElementById('loadingOverlay');

    try {
        // Preload all assets
        await ImageLoader.preloadAllAssets();

        // Create floating particles
        VisualEffects.createParticles();

        // Setup event listeners
        setupEventListeners();

        // Setup keyboard shortcuts
        setupKeyboardShortcuts();

        // Hide loading overlay
        loadingOverlay.classList.add('hidden');

        // Generate first jackal
        await generateNewJackal();

        console.log('✅ Garden is ready!');
    } catch (error) {
        console.error('Failed to initialize:', error);
        loadingOverlay.innerHTML = `
            <div class="loading-content">
                <p class="loading-text" style="color: #8B6F47;">Failed to load assets</p>
                <p style="color: #8B7355; margin-top: 1rem;">Please ensure all asset files are in the ./assets/ folder</p>
            </div>
        `;
    }
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
