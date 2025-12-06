# 🐾 Jackal's Garden - Pup Generator

A peaceful, beautiful web application for generating unique jackal companions to teach Nonviolent Communication through nurturing care.

![Jackal's Garden](preview.png)

## ✨ Overview

**Jackal's Garden** is a kawaii-style character generator that creates adorable jackal pups with over 7,040 unique combinations. Built with a serene desert oasis aesthetic inspired by Studio Ghibli, this web app creates a safe, warm space for emotional honesty and nurturing interactions.

### 🎨 Design Philosophy

- **Peaceful & Nurturing**: Every interaction feels gentle and emotionally safe
- **Desert Sanctuary**: Warm peach and sandy tones with soft gradients
- **Kawaii Aesthetic**: Cute, rounded shapes with soft colors
- **Mindful Interactions**: Calming animations and gentle sounds
- **Accessibility First**: Keyboard navigation, ARIA labels, reduced motion support

## 🌟 Features

### Core Functionality
- ✅ **7,040+ Unique Combinations** - Procedurally generated jackals with proper layering
- ✅ **Smart Generation Rules** - Color-matching tails/ears, conditional eyebrows/mouths
- ✅ **Canvas-Based Rendering** - High-quality 1024x1024px PNG output
- ✅ **Download as PNG** - Save your favorite jackals
- ✅ **Trait Viewer** - Slide-out panel showing current jackal's attributes

### Visual Design
- 🎨 **Desert Gradient Background** - Warm peach to sandy beige
- 💫 **Floating Particle Effects** - Gentle atmosphere animations
- ✨ **Sparkle Bursts** - Delightful feedback on generation
- 🌊 **Breathing Animation** - Subtle life to the jackal display
- 📱 **Fully Responsive** - Works beautifully on desktop, tablet, and mobile

### Audio Experience
- 🔊 **Web Audio API Sounds** - Procedurally generated, gentle tones
  - Soft "pop" for button clicks
  - Gentle "whoosh" for generation
  - Pleasant "poof" when jackals appear
  - Harmonic chime for success actions
- 🔇 **Mute Toggle** - Full audio control
- 🎵 **Non-Intrusive** - Carefully tuned to be calming, not annoying

### Accessibility
- ⌨️ **Keyboard Shortcuts** - Full keyboard navigation
- 🎯 **ARIA Labels** - Screen reader friendly
- 👁️ **Focus States** - Clear visual focus indicators
- 🎭 **Reduced Motion Support** - Respects user preferences
- 🌗 **High Contrast Mode** - Enhanced for accessibility

## 🎮 Usage

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Spacebar` | Generate new jackal |
| `D` | Download current jackal |
| `T` | Toggle trait panel |
| `M` | Mute/unmute sounds |
| `?` | Show help overlay |
| `Esc` | Close panels/overlays |

### Interactive Elements

1. **Generate Button** 🐾
   - Click or press Spacebar to create a new jackal
   - Watch the sparkle burst and hear gentle sounds

2. **Download Button** 💾
   - Save the current jackal as a PNG image
   - Filename includes base color and eye type

3. **View Traits Button** 📋
   - Opens slide-out panel with complete trait breakdown
   - Shows base, tail, ears, eyes, eyebrows, nose, mouth, accessory

4. **Sound Toggle** 🔊/🔇
   - Mute or unmute all audio effects
   - State persists during session

5. **Help Button** ❓
   - Shows keyboard shortcuts and information
   - Press `?` or click to open

## 📦 Installation & Setup

### Quick Start

1. **Clone or download this repository**

```bash
git clone https://github.com/yourusername/jackal-generator.git
cd jackal-generator
```

2. **Organize your assets**

Create the following folder structure in your project:

```
jackal-generator/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── base/
    │   ├── base_default_female.png
    │   ├── base_default_male.png
    │   ├── base_blue_female.png
    │   ├── base_blue_male.png
    │   ├── base_pink_female.png
    │   ├── base_pink_male.png
    │   ├── base_gray_female.png
    │   ├── base_gray_male.png
    │   ├── base_golden_female.png
    │   └── base_golden_male.png
    ├── tails/
    │   ├── tail_curled_tip_default.png
    │   ├── tail_curled_tip_blue.png
    │   ├── tail_curled_tip_pink.png
    │   ├── tail_curled_tip_gray.png
    │   ├── tail_fluffy_default.png
    │   ├── tail_fluffy_blue.png
    │   ├── tail_fluffy_pink.png
    │   ├── tail_fluffy_gray.png
    │   ├── tail_fluffy_golden.png
    │   ├── tail_sleek_default.png
    │   ├── tail_sleek_blue.png
    │   ├── tail_sleek_pink.png
    │   └── tail_sleek_gray.png
    ├── ears/
    │   ├── ears_rounded_default.png
    │   ├── ears_rounded_blue.png
    │   ├── ears_rounded_pink.png
    │   ├── ears_rounded_gray.png
    │   ├── ears_rounded_golden.png
    │   ├── ears_folded_default.png
    │   ├── ears_folded_blue.png
    │   ├── ears_folded_pink.png
    │   ├── ears_folded_gray.png
    │   ├── ears_tall_upright_default.png
    │   ├── ears_tall_upright_blue.png
    │   ├── ears_tall_upright_pink.png
    │   └── ears_tall_upright_gray.png
    ├── eyebrows/
    │   ├── eyebrow_dark.png
    │   ├── eyebrow_light.png
    │   └── eyebrow_golden.png
    ├── eyes/
    │   ├── eyes_bright_round.png
    │   ├── eyes_bright_round_blue.png
    │   ├── eyes_almond.png
    │   ├── eyes_half_lidded.png
    │   ├── eyes_masked.png
    │   └── eyes_narrow.png
    ├── noses/
    │   └── nose_default.png
    ├── mouths/
    │   ├── mouth_surprised.png
    │   ├── mouth_happy.png
    │   ├── mouth_smug.png
    │   └── mouth_neutral.png
    └── accessories/
        ├── accessory_bone.png
        ├── accessory_feather.png
        └── accessory_flowers.png
```

3. **Serve the application**

You can use any local web server. Here are a few options:

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Node.js (using npx):**
```bash
npx http-server
```

**PHP:**
```bash
php -S localhost:8000
```

4. **Open in browser**

Navigate to `http://localhost:8000` in your web browser.

### Asset Requirements

All assets must be:
- **Format**: PNG with transparency
- **Dimensions**: 1024x1024 pixels
- **Style**: Kawaii/cute with soft colors
- **Naming**: Exact filenames as specified in the structure above

## 🎲 Generation Rules

The jackal generator follows specific rules to ensure color consistency and proper combinations:

### 1. Base Selection
- Randomly picks from 10 bases (5 colors × 2 genders)
- Collar color indicates gender (pink = female, blue = male)
- Color extracted from filename determines compatible parts

### 2. Color Matching
- **Tails and ears MUST match base color**
- Golden coats have limited options:
  - Tail: Only fluffy golden available
  - Ears: Only rounded golden available
- Other colors have multiple style options

### 3. Conditional Features

**Eyebrows:**
- Skip if eyes are `half_lidded` or `narrow` (implied eyebrows)
- Golden coats must use `eyebrow_golden.png`
- Others randomly choose dark or light

**Mouth:**
- Skip if eyes are `bright_round` or `bright_round_blue` (built-in mouth)
- Otherwise, random from 4 mouth types

### 4. Accessories
- 25% chance for each: bone, feather, flowers
- 25% chance for none

### 5. Layer Order (back to front)
1. Tail
2. Ears
3. Base (with collar)
4. Eyebrows (if applicable)
5. Eyes
6. Nose
7. Mouth (if applicable)
8. Accessories (if selected)

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript**: No frameworks required
- **Canvas API**: High-quality image rendering and compositing
- **Web Audio API**: Procedural sound generation

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Performance Optimizations
- Image preloading and caching
- Efficient canvas rendering
- CSS transform/opacity for smooth 60fps animations
- Lazy particle generation
- Minimal DOM manipulation

### Accessibility Features
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader friendly
- Respects `prefers-reduced-motion`
- High contrast mode support

## 🎨 Customization

### Changing Colors

Edit CSS custom properties in `style.css`:

```css
:root {
    --color-primary: #D4A574;      /* Warm tan */
    --color-secondary: #8B6F47;    /* Rich brown */
    --color-accent: #FFB6B9;       /* Soft pink */
    --color-bg-light: #FFE5D4;     /* Light peach */
    --color-bg-dark: #F5DEB3;      /* Sandy beige */
    --color-text: #5C4033;         /* Warm dark brown */
}
```

### Adjusting Asset Path

If your assets are in a different location, update `script.js`:

```javascript
const ASSETS = {
    BASE_PATH: './assets/',  // Change this path
    // ...
};
```

### Modifying Sounds

Sound parameters can be adjusted in the `SoundGenerator` class in `script.js`. Each method controls frequency, duration, and gain for different interactions.

## 📝 File Structure

```
jackal-generator/
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # Generation logic and interactions
├── README.md           # This file
└── assets/             # Image assets (53 PNG files)
```

### Code Organization

**index.html**
- Semantic HTML5 structure
- Accessibility attributes
- Canvas for rendering
- Overlay panels and controls

**style.css**
- CSS custom properties (design system)
- Responsive layouts (mobile-first)
- Smooth animations
- Accessibility styles

**script.js**
- Asset definitions and mappings
- `JackalGenerator` - Generation logic
- `ImageLoader` - Asset loading and caching
- `CanvasRenderer` - Layer compositing
- `SoundGenerator` - Web Audio API sounds
- `VisualEffects` - Particles and sparkles
- `UIController` - Interface management

## 🌱 About Nonviolent Communication

Jackal's Garden is inspired by **Nonviolent Communication (NVC)**, a communication framework developed by Marshall Rosenberg. In NVC terminology:

- **Jackal** represents judgmental, reactive communication
- **Giraffe** represents compassionate, needs-based communication

This generator helps players nurture their "jackal" (reactive emotions) with compassion, transforming judgment into understanding through gentle care and attention.

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- Report bugs
- Suggest new features
- Improve documentation
- Add new asset variants
- Optimize performance

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by Nonviolent Communication by Marshall Rosenberg
- Visual style influenced by Studio Ghibli aesthetics
- UI/UX patterns from mindfulness apps like Calm and Headspace
- Kawaii art style from Japanese cute culture

## 💬 Contact

For questions, feedback, or support, please open an issue on GitHub.

---

**Made with 💖 for emotional honesty and gentle communication**

🐾 Welcome to the Garden 🐾
