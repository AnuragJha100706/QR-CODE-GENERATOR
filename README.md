# QR Studio Pro 🚀

A modern, high-performance web application for generating, styling, and scanning professional QR codes. Built with Vanilla HTML5, modern CSS3 glassmorphism, and client-side JavaScript.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-2.0.0-indigo.svg)

---

## ✨ Features

### 1. 🎯 Preset Content Types
- 🌐 **Website URL:** Quick prefixes with real-time payload sanitation.
- 📝 **Plain Text:** Multiline notes with live character counter.
- 📶 **Wi-Fi Network:** Automatic connection QR code supporting WPA/WPA2/WPA3, WEP, Open networks, and hidden SSIDs.
- 💬 **WhatsApp:** Direct chat link with pre-filled greeting message.
- 📧 **Email:** Pre-populated recipient, subject line, and body template.
- 📱 **Phone & SMS:** One-tap dial or pre-filled SMS text message.
- 📇 **vCard Contact Card:** Standard vCard 3.0 digital business card.
- 💳 **UPI / Payment:** Instant UPI QR for seamless digital payments.

### 2. 🎨 Advanced Visual Customization
- **Fill Modes:** Solid Color, Linear Gradient (45°), and Radial Gradient.
- **Curated Palettes:** One-click presets (Cyber Violet, Emerald Mint, Sunset Glow, Electric Ocean, Midnight Black, Neon Candy).
- **Dot Patterns:** Rounded, Dots, Square, Classy, Classy-Rounded, and Extra-Rounded.
- **Corner Eye Shapes:** Square, Extra-Rounded, and Circular Dot.
- **Corner Eye Color Override:** Set unique contrasting colors for corner locator eyes.
- **Backgrounds:** Custom background colors or Transparent background toggle (PNG/SVG).
- **Logos & Branding:** Drag-and-drop custom logos (PNG/JPG/SVG) or select from built-in brand badges (WhatsApp, Wi-Fi, GitHub, LinkedIn, Instagram, YouTube, etc.) with customizable size and padding.
- **Frames & Call-to-Action:** Bottom banner, Top banner, or Polished Card with custom text (e.g. "SCAN ME").

### 3. 📥 High-Resolution Export & Quick Actions
- **Formats:** Vector **SVG** (infinite resolution for print/signage), **PNG**, **JPEG**, and **WebP**.
- **Resolution Selector:** Standard (320px), HD (600px), 2K Ultra (1200px), and 4K Print (2048px).
- **Copy Image:** 1-Click copy to clipboard for pasting straight into Figma, Slack, or Docs.
- **Copy Content:** Instant copy of the raw encoded URL/data.
- **Direct Print:** Clean print layout dialog.

### 4. 🔍 Built-in QR Scanner & Decoder
- **Image Upload / Drop:** Decode QR codes directly from image files.
- **Live Camera Scanner:** Interactive viewfinder with real-time optical decoding via `jsQR`.
- **One-Click Import:** Import scanned data directly into the generator to inspect or edit.

### 5. 💾 History
- Automatically saves recently created QR codes locally in `localStorage`.
- One-click restore or delete past codes.

---

## 🛠️ Technologies Used

- **HTML5 & Vanilla CSS3:** Dark glassmorphic design system using CSS variables and modern flex/grid layouts.
- **JavaScript (ES6+):** Pure client-side reactive architecture.
- **[qr-code-styling](https://github.com/kozakdenys/qr-code-styling):** Advanced SVG and Canvas QR rendering with gradient & corner styling.
- **[jsQR](https://github.com/cozmo/jsQR):** Client-side QR code scanner and decoder.
- **Google Fonts:** Plus Jakarta Sans.

---

## 🚀 Getting Started

Simply open `index.html` in any modern web browser:

```bash
# Clone the repository
git clone https://github.com/your-username/qr-code-generator.git

# Open index.html in your browser
double-click index.html or open via Live Server
```

No build step, node modules, or external servers required!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE.md).
