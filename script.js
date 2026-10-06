/**
 * QR Studio Pro - Application Engine
 * High-performance QR generation, styling, scanning & export
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. STATE & CORE CONFIGURATION
    // ==========================================
    const state = {
        activeType: 'url',
        activeView: 'generator',
        fillMode: 'single', // 'single', 'linear', 'radial'
        colorPrimary: '#6366f1',
        colorSecondary: '#ec4899',
        colorBg: '#ffffff',
        isTransparentBg: false,
        dotType: 'rounded',
        cornerSquareType: 'extra-rounded',
        cornerDotType: 'dot',
        hasCustomEyeColor: false,
        colorCornerSquare: '#4f46e5',
        colorCornerDot: '#4f46e5',
        logoSrc: null,
        logoName: '',
        logoSize: 0.30,
        logoMargin: 5,
        hideBackgroundDots: true,
        errorCorrection: 'Q',
        margin: 10,
        frameStyle: 'none',
        frameText: 'SCAN ME',
        cameraStream: null,
        cameraScanAnimationId: null
    };

    // Preset Brand SVG Icons as Data URIs for embedded center logo
    const BRAND_ICONS = {
        wifi: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%236366f1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`,
        whatsapp: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="%2325D366"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>`,
        globe: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%233b82f6" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
        github: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="%23181717"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
        linkedin: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="%230A66C2"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
        instagram: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%23E4405F" stroke-width="2.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
        youtube: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="%23FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
        mail: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="%236366f1" stroke-width="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`
    };

    // DOM Elements
    const qrCanvasTarget = document.getElementById('qr-canvas-target');
    const qrFramedCard = document.getElementById('qr-framed-card');
    const frameTopTag = document.getElementById('frame-top-tag');
    const frameBottomTag = document.getElementById('frame-bottom-tag');
    const scanStatus = document.getElementById('scan-status');
    const dataSizeBadge = document.getElementById('data-size-badge');
    const formSubtitle = document.getElementById('form-subtitle');

    // ==========================================
    // 2. INSTANTIATE QR CODE STYLING
    // ==========================================
    const qrCode = new QRCodeStyling({
        width: 280,
        height: 280,
        type: 'canvas',
        data: 'https://google.com',
        margin: state.margin,
        qrOptions: {
            errorCorrectionLevel: state.errorCorrection
        },
        dotsOptions: {
            color: state.colorPrimary,
            type: state.dotType
        },
        backgroundOptions: {
            color: state.colorBg
        },
        imageOptions: {
            crossOrigin: 'anonymous',
            hideBackgroundDots: state.hideBackgroundDots,
            imageSize: state.logoSize,
            margin: state.logoMargin
        },
        cornersSquareOptions: {
            type: state.cornerSquareType,
            color: state.colorPrimary
        },
        cornersDotOptions: {
            type: state.cornerDotType,
            color: state.colorPrimary
        }
    });

    // Mount initial QR Code
    qrCode.append(qrCanvasTarget);

    // ==========================================
    // 3. ENCODING LOGIC BY TYPE
    // ==========================================
    function getEncodedPayload() {
        switch (state.activeType) {
            case 'url': {
                let url = document.getElementById('input-url').value.trim();
                if (!url) return '';
                if (!/^https?:\/\//i.test(url)) {
                    url = 'https://' + url;
                }
                return url;
            }
            case 'text': {
                return document.getElementById('input-text').value.trim();
            }
            case 'wifi': {
                const ssid = document.getElementById('wifi-ssid').value.trim();
                if (!ssid) return '';
                const enc = document.getElementById('wifi-encryption').value;
                const pass = document.getElementById('wifi-password').value;
                const hidden = document.getElementById('wifi-hidden').checked;
                // Escape special characters for WiFi string
                const escapeWifi = (str) => str.replace(/([\\;,:"])/g, '\\$1');
                return `WIFI:T:${enc};S:${escapeWifi(ssid)};P:${enc === 'nopass' ? '' : escapeWifi(pass)};H:${hidden};;`;
            }
            case 'whatsapp': {
                const rawPhone = document.getElementById('wa-phone').value.trim().replace(/[^0-9]/g, '');
                if (!rawPhone) return '';
                const msg = document.getElementById('wa-message').value.trim();
                return msg ? `https://wa.me/${rawPhone}?text=${encodeURIComponent(msg)}` : `https://wa.me/${rawPhone}`;
            }
            case 'email': {
                const to = document.getElementById('email-to').value.trim();
                if (!to) return '';
                const sub = document.getElementById('email-subject').value.trim();
                const body = document.getElementById('email-body').value.trim();
                const params = [];
                if (sub) params.push(`subject=${encodeURIComponent(sub)}`);
                if (body) params.push(`body=${encodeURIComponent(body)}`);
                return `mailto:${to}${params.length ? '?' + params.join('&') : ''}`;
            }
            case 'phone': {
                const activeSubtype = document.querySelector('.seg-btn[data-subtype].active')?.dataset.subtype || 'call';
                const phone = document.getElementById('phone-number').value.trim();
                if (!phone) return '';
                if (activeSubtype === 'sms') {
                    const smsMsg = document.getElementById('sms-message').value.trim();
                    return `SMSTO:${phone}:${smsMsg}`;
                }
                return `tel:${phone}`;
            }
            case 'vcard': {
                const fn = document.getElementById('vcard-fn').value.trim();
                const ln = document.getElementById('vcard-ln').value.trim();
                const phone = document.getElementById('vcard-phone').value.trim();
                const email = document.getElementById('vcard-email').value.trim();
                const org = document.getElementById('vcard-org').value.trim();
                const title = document.getElementById('vcard-title').value.trim();
                const url = document.getElementById('vcard-url').value.trim();
                if (!fn && !ln && !phone && !email) return '';

                let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
                vcard += `N:${ln};${fn};;;\n`;
                vcard += `FN:${[fn, ln].filter(Boolean).join(' ')}\n`;
                if (org) vcard += `ORG:${org}\n`;
                if (title) vcard += `TITLE:${title}\n`;
                if (phone) vcard += `TEL:${phone}\n`;
                if (email) vcard += `EMAIL:${email}\n`;
                if (url) vcard += `URL:${url}\n`;
                vcard += 'END:VCARD';
                return vcard;
            }
            case 'upi': {
                const id = document.getElementById('upi-id').value.trim();
                if (!id) return '';
                const name = document.getElementById('upi-name').value.trim();
                const amt = document.getElementById('upi-amount').value.trim();
                const note = document.getElementById('upi-note').value.trim();
                const params = [`pa=${encodeURIComponent(id)}`];
                if (name) params.push(`pn=${encodeURIComponent(name)}`);
                if (amt) params.push(`am=${encodeURIComponent(amt)}`);
                if (note) params.push(`tn=${encodeURIComponent(note)}`);
                params.push('cu=INR');
                return `upi://pay?${params.join('&')}`;
            }
            default:
                return '';
        }
    }

    // ==========================================
    // 4. DEBOUNCED QR UPDATE ENGINE
    // ==========================================
    let updateTimer = null;
    function scheduleQRUpdate() {
        clearTimeout(updateTimer);
        updateTimer = setTimeout(renderQR, 120);
    }

    function renderQR() {
        const payload = getEncodedPayload();
        const byteCount = new Blob([payload]).size;
        dataSizeBadge.textContent = `${byteCount} bytes`;

        if (!payload) {
            scanStatus.innerHTML = '<span class="status-dot" style="background:#ef4444;box-shadow:0 0 10px #ef4444"></span><span class="status-text" style="color:#ef4444">Missing input data</span>';
            return;
        }

        scanStatus.innerHTML = '<span class="status-dot"></span><span class="status-text">Ready to scan</span>';

        // Dots Configuration (Solid or Gradient)
        const dotsOptions = {
            type: state.dotType
        };

        if (state.fillMode === 'single') {
            dotsOptions.color = state.colorPrimary;
            delete dotsOptions.gradient;
        } else {
            delete dotsOptions.color;
            dotsOptions.gradient = {
                type: state.fillMode, // 'linear' or 'radial'
                rotation: state.fillMode === 'linear' ? 0.785 : 0, // 45 deg
                colorStops: [
                    { offset: 0, color: state.colorPrimary },
                    { offset: 1, color: state.colorSecondary }
                ]
            };
        }

        // Corner Eyes Color
        const cornersSquareOptions = {
            type: state.cornerSquareType,
            color: state.hasCustomEyeColor ? state.colorCornerSquare : (state.fillMode === 'single' ? state.colorPrimary : state.colorPrimary)
        };

        const cornersDotOptions = {
            type: state.cornerDotType,
            color: state.hasCustomEyeColor ? state.colorCornerDot : (state.fillMode === 'single' ? state.colorPrimary : state.colorPrimary)
        };

        // Background Color (White/Custom or Transparent)
        const backgroundOptions = {
            color: state.isTransparentBg ? 'rgba(0,0,0,0)' : state.colorBg
        };

        // Frame styling updates
        updateFrameVisuals();

        // Update QRCodeStyling instance
        qrCode.update({
            data: payload,
            margin: state.margin,
            qrOptions: {
                errorCorrectionLevel: state.errorCorrection
            },
            dotsOptions: dotsOptions,
            backgroundOptions: backgroundOptions,
            cornersSquareOptions: cornersSquareOptions,
            cornersDotOptions: cornersDotOptions,
            image: state.logoSrc || undefined,
            imageOptions: {
                crossOrigin: 'anonymous',
                hideBackgroundDots: state.hideBackgroundDots,
                imageSize: state.logoSize,
                margin: state.logoMargin
            }
        });
    }

    function updateFrameVisuals() {
        qrFramedCard.className = `qr-framed-card frame-${state.frameStyle}`;
        frameTopTag.textContent = state.frameText || 'SCAN ME';
        frameBottomTag.textContent = state.frameText || 'SCAN ME';

        // When transparent background is selected and frame is 'none', let card show transparent/dark
        if (state.isTransparentBg && state.frameStyle === 'none') {
            qrFramedCard.style.background = 'transparent';
            qrFramedCard.style.boxShadow = 'none';
        } else {
            qrFramedCard.style.background = state.colorBg;
            qrFramedCard.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.45)';
        }
    }

    // ==========================================
    // 5. VIEW & TYPE SWITCHING
    // ==========================================
    // View Switcher (Generator vs Scanner)
    const modeButtons = document.querySelectorAll('.mode-btn');
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            state.activeView = view;
            modeButtons.forEach(b => b.classList.toggle('active', b === btn));
            document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
            document.getElementById(`view-${view}`).classList.add('active');

            if (view === 'scanner') {
                // Stop camera if leaving or handle scanner tab
            } else {
                stopCameraStream();
            }
        });
    });

    // Content Type Selector Pills
    const typePills = document.querySelectorAll('.type-pill');
    const formPanes = document.querySelectorAll('.form-pane');
    typePills.forEach(pill => {
        pill.addEventListener('click', () => {
            const type = pill.dataset.type;
            state.activeType = type;
            typePills.forEach(p => {
                p.classList.toggle('active', p === pill);
                p.setAttribute('aria-selected', p === pill ? 'true' : 'false');
            });
            formPanes.forEach(pane => pane.classList.toggle('active', pane.id === `pane-${type}`));

            // Update subtitle hint
            const subtitles = {
                url: 'Provide your link or web destination',
                text: 'Enter plain text, notes, or details',
                wifi: 'Enter network credentials for automatic connection',
                whatsapp: 'Enter phone number with country code for instant chat',
                email: 'Pre-fill recipient email and message',
                phone: 'Dial a number or create a pre-filled SMS message',
                vcard: 'Digital business card to save into contacts',
                upi: 'Generate seamless payment QR for instant checkout'
            };
            formSubtitle.textContent = subtitles[type] || 'Provide details';
            scheduleQRUpdate();
        });
    });

    // Subtype Selector for Phone (Call vs SMS)
    const segButtons = document.querySelectorAll('.seg-btn[data-subtype]');
    const smsMsgGroup = document.getElementById('group-sms-msg');
    segButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            segButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (btn.dataset.subtype === 'sms') {
                smsMsgGroup.classList.remove('hidden');
            } else {
                smsMsgGroup.classList.add('hidden');
            }
            scheduleQRUpdate();
        });
    });

    // Text Char Counter
    const inputText = document.getElementById('input-text');
    const textChars = document.getElementById('text-chars');
    inputText.addEventListener('input', () => {
        textChars.textContent = inputText.value.length;
        scheduleQRUpdate();
    });

    // Quick URL chips
    document.querySelectorAll('.example-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const target = document.getElementById(chip.dataset.target);
            target.value = chip.dataset.val;
            scheduleQRUpdate();
        });
    });

    // WiFi password visibility toggle
    const toggleWifiPass = document.getElementById('toggle-wifi-pass');
    const wifiPassword = document.getElementById('wifi-password');
    toggleWifiPass.addEventListener('click', () => {
        const isPass = wifiPassword.type === 'password';
        wifiPassword.type = isPass ? 'text' : 'password';
        toggleWifiPass.textContent = isPass ? '🙈' : '👁️';
    });

    // Wi-Fi encryption changer (hide password if open)
    document.getElementById('wifi-encryption').addEventListener('change', (e) => {
        document.getElementById('wifi-pass-group').style.display = e.target.value === 'nopass' ? 'none' : 'flex';
        scheduleQRUpdate();
    });

    // Attach real-time input listeners to all form controls
    const formInputElements = document.querySelectorAll('.editor-panel input, .editor-panel textarea, .editor-panel select');
    formInputElements.forEach(elem => {
        elem.addEventListener('input', scheduleQRUpdate);
        elem.addEventListener('change', scheduleQRUpdate);
    });

    // ==========================================
    // 6. ACCORDION NAVIGATION
    // ==========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            const isOpen = item.classList.contains('open');
            item.classList.toggle('open', !isOpen);
            header.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
        });
    });

    // ==========================================
    // 7. STYLING CONTROLS (Colors, Shapes, Eyes)
    // ==========================================
    // Fill mode switcher (Single vs Linear vs Radial)
    const fillModeBtns = document.querySelectorAll('#fill-mode-control .seg-btn');
    const gradientSecondaryBox = document.getElementById('gradient-secondary-box');
    const colorSummary = document.getElementById('color-summary');

    fillModeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            fillModeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.fillMode = btn.dataset.mode;
            gradientSecondaryBox.style.display = state.fillMode === 'single' ? 'none' : 'block';
            colorSummary.textContent = `${state.fillMode.toUpperCase()} • ${state.colorPrimary}`;
            scheduleQRUpdate();
        });
    });

    // Color pickers + Hex sync
    function bindColorSync(colorInputId, hexInputId, stateKey) {
        const colorInput = document.getElementById(colorInputId);
        const hexInput = document.getElementById(hexInputId);

        colorInput.addEventListener('input', (e) => {
            hexInput.value = e.target.value;
            state[stateKey] = e.target.value;
            scheduleQRUpdate();
        });

        hexInput.addEventListener('input', (e) => {
            let val = e.target.value.trim();
            if (!val.startsWith('#')) val = '#' + val;
            if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
                colorInput.value = val;
                state[stateKey] = val;
                scheduleQRUpdate();
            }
        });
    }

    bindColorSync('color-primary', 'color-primary-hex', 'colorPrimary');
    bindColorSync('color-secondary', 'color-secondary-hex', 'colorSecondary');
    bindColorSync('color-bg', 'color-bg-hex', 'colorBg');
    bindColorSync('color-corner-square', 'color-corner-square-hex', 'colorCornerSquare');
    bindColorSync('color-corner-dot', 'color-corner-dot-hex', 'colorCornerDot');

    // Transparent Background Checkbox
    const transparentBgCheckbox = document.getElementById('transparent-bg');
    transparentBgCheckbox.addEventListener('change', (e) => {
        state.isTransparentBg = e.target.checked;
        scheduleQRUpdate();
    });

    // Quick Palette Swatches
    document.querySelectorAll('.palette-swatch').forEach(swatch => {
        swatch.addEventListener('click', () => {
            state.colorPrimary = swatch.dataset.primary;
            document.getElementById('color-primary').value = state.colorPrimary;
            document.getElementById('color-primary-hex').value = state.colorPrimary;

            if (swatch.dataset.secondary) {
                state.colorSecondary = swatch.dataset.secondary;
                document.getElementById('color-secondary').value = state.colorSecondary;
                document.getElementById('color-secondary-hex').value = state.colorSecondary;
            }

            state.fillMode = swatch.dataset.mode || 'single';
            fillModeBtns.forEach(b => b.classList.toggle('active', b.dataset.mode === state.fillMode));
            gradientSecondaryBox.style.display = state.fillMode === 'single' ? 'none' : 'block';
            colorSummary.textContent = `${state.fillMode.toUpperCase()} • ${state.colorPrimary}`;
            scheduleQRUpdate();
        });
    });

    // Dot Pattern Shapes
    const shapeSummary = document.getElementById('shape-summary');
    const shapeButtons = document.querySelectorAll('#pattern-shape-grid .shape-opt');
    shapeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            shapeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.dotType = btn.dataset.dot;
            shapeSummary.textContent = `${btn.title} Dots • ${state.cornerSquareType}`;
            scheduleQRUpdate();
        });
    });

    // Corner eye types
    document.getElementById('corner-square-type').addEventListener('change', (e) => {
        state.cornerSquareType = e.target.value;
        scheduleQRUpdate();
    });
    document.getElementById('corner-dot-type').addEventListener('change', (e) => {
        state.cornerDotType = e.target.value;
        scheduleQRUpdate();
    });

    // Custom Corner Eye Color Toggle
    const customEyeToggle = document.getElementById('custom-eye-color-toggle');
    const customEyeWrap = document.getElementById('custom-eye-color-wrap');
    customEyeToggle.addEventListener('change', (e) => {
        state.hasCustomEyeColor = e.target.checked;
        customEyeWrap.style.display = state.hasCustomEyeColor ? 'grid' : 'none';
        scheduleQRUpdate();
    });

    // ==========================================
    // 8. LOGO & BRANDING
    // ==========================================
    const logoDropzone = document.getElementById('logo-dropzone');
    const logoFileInput = document.getElementById('logo-file-input');
    const logoControlsWrap = document.getElementById('logo-controls-wrap');
    const activeLogoImg = document.getElementById('active-logo-img');
    const activeLogoName = document.getElementById('active-logo-name');
    const btnRemoveLogo = document.getElementById('btn-remove-logo');
    const logoSummary = document.getElementById('logo-summary');
    const logoSizeRange = document.getElementById('logo-size-range');
    const logoSizeVal = document.getElementById('logo-size-val');
    const logoMarginRange = document.getElementById('logo-margin-range');
    const logoMarginVal = document.getElementById('logo-margin-val');
    const hideBackgroundDotsCheck = document.getElementById('hide-background-dots');

    function applyLogo(src, name) {
        state.logoSrc = src;
        state.logoName = name;
        activeLogoImg.src = src;
        activeLogoName.textContent = name;
        logoControlsWrap.style.display = 'block';
        logoSummary.textContent = name;
        // Automatically switch error correction to 'H' for reliable scan
        document.getElementById('error-correction').value = 'H';
        state.errorCorrection = 'H';
        scheduleQRUpdate();
    }

    function removeLogo() {
        state.logoSrc = null;
        state.logoName = '';
        logoFileInput.value = '';
        activeLogoImg.src = '';
        logoControlsWrap.style.display = 'none';
        logoSummary.textContent = 'No logo selected';
        document.querySelectorAll('.brand-chip').forEach(b => b.classList.remove('active'));
        scheduleQRUpdate();
    }

    logoDropzone.addEventListener('click', () => logoFileInput.click());
    logoFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => applyLogo(event.target.result, file.name);
            reader.readAsDataURL(file);
        }
    });

    // Drag and drop for logo
    logoDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        logoDropzone.classList.add('drag-over');
    });
    logoDropzone.addEventListener('dragleave', () => logoDropzone.classList.remove('drag-over'));
    logoDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        logoDropzone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => applyLogo(event.target.result, file.name);
            reader.readAsDataURL(file);
        }
    });

    // Preset Brand Logos
    document.querySelectorAll('.brand-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const brand = chip.dataset.brand;
            document.querySelectorAll('.brand-chip').forEach(b => b.classList.toggle('active', b === chip));
            if (BRAND_ICONS[brand]) {
                applyLogo(BRAND_ICONS[brand], chip.title + ' Icon');
            }
        });
    });

    btnRemoveLogo.addEventListener('click', removeLogo);

    logoSizeRange.addEventListener('input', (e) => {
        state.logoSize = parseFloat(e.target.value);
        logoSizeVal.textContent = Math.round(state.logoSize * 100) + '%';
        scheduleQRUpdate();
    });

    logoMarginRange.addEventListener('input', (e) => {
        state.logoMargin = parseInt(e.target.value, 10);
        logoMarginVal.textContent = state.logoMargin + 'px';
        scheduleQRUpdate();
    });

    hideBackgroundDotsCheck.addEventListener('change', (e) => {
        state.hideBackgroundDots = e.target.checked;
        scheduleQRUpdate();
    });

    // ==========================================
    // 9. FRAME & BANNER
    // ==========================================
    const frameButtons = document.querySelectorAll('.frame-opt');
    const frameTextGroup = document.getElementById('frame-text-group');
    const frameLabelInput = document.getElementById('frame-label-input');
    const frameSummary = document.getElementById('frame-summary');

    frameButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            frameButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.frameStyle = btn.dataset.frame;
            frameTextGroup.style.display = state.frameStyle === 'none' ? 'none' : 'block';
            frameSummary.textContent = btn.textContent;
            updateFrameVisuals();
        });
    });

    frameLabelInput.addEventListener('input', (e) => {
        state.frameText = e.target.value.trim() || 'SCAN ME';
        updateFrameVisuals();
    });

    // ==========================================
    // 10. ADVANCED (Error Correction & Margin)
    // ==========================================
    document.getElementById('error-correction').addEventListener('change', (e) => {
        state.errorCorrection = e.target.value;
        scheduleQRUpdate();
    });

    const quietZoneRange = document.getElementById('quiet-zone-range');
    const quietZoneVal = document.getElementById('quiet-zone-val');
    quietZoneRange.addEventListener('input', (e) => {
        state.margin = parseInt(e.target.value, 10);
        quietZoneVal.textContent = state.margin + 'px';
        scheduleQRUpdate();
    });

    // ==========================================
    // 11. EXPORT & ACTIONS (Download, Copy, Print)
    // ==========================================
    const btnDownloadQR = document.getElementById('btn-download-qr');
    const downloadFormat = document.getElementById('download-format');
    const downloadSize = document.getElementById('download-size');

    btnDownloadQR.addEventListener('click', async () => {
        const payload = getEncodedPayload();
        if (!payload) {
            showToast('Please provide data before downloading', 'error');
            return;
        }

        const format = downloadFormat.value; // 'png', 'svg', 'jpeg', 'webp'
        const size = parseInt(downloadSize.value, 10);
        const filename = `qr-code-${Date.now()}`;

        btnDownloadQR.disabled = true;
        btnDownloadQR.innerHTML = '<span>Rendering High-Res...</span>';

        try {
            // For custom download resolutions, instantiate an export QRCodeStyling instance
            const exportQR = new QRCodeStyling({
                width: size,
                height: size,
                type: format === 'svg' ? 'svg' : 'canvas',
                data: payload,
                margin: state.margin,
                qrOptions: { errorCorrectionLevel: state.errorCorrection },
                dotsOptions: {
                    type: state.dotType,
                    color: state.fillMode === 'single' ? state.colorPrimary : undefined,
                    gradient: state.fillMode !== 'single' ? {
                        type: state.fillMode,
                        rotation: state.fillMode === 'linear' ? 0.785 : 0,
                        colorStops: [
                            { offset: 0, color: state.colorPrimary },
                            { offset: 1, color: state.colorSecondary }
                        ]
                    } : undefined
                },
                backgroundOptions: {
                    color: state.isTransparentBg ? 'rgba(0,0,0,0)' : state.colorBg
                },
                cornersSquareOptions: {
                    type: state.cornerSquareType,
                    color: state.hasCustomEyeColor ? state.colorCornerSquare : state.colorPrimary
                },
                cornersDotOptions: {
                    type: state.cornerDotType,
                    color: state.hasCustomEyeColor ? state.colorCornerDot : state.colorPrimary
                },
                image: state.logoSrc || undefined,
                imageOptions: {
                    crossOrigin: 'anonymous',
                    hideBackgroundDots: state.hideBackgroundDots,
                    imageSize: state.logoSize,
                    margin: state.logoMargin
                }
            });

            await exportQR.download({ name: filename, extension: format });
            showToast(`Downloaded as ${format.toUpperCase()} (${size}x${size})!`, 'success');
            saveToHistory(payload, `${state.activeType.toUpperCase()} QR Code`);
        } catch (err) {
            console.error('Download error:', err);
            showToast('Download failed. Please try PNG.', 'error');
        } finally {
            btnDownloadQR.disabled = false;
            btnDownloadQR.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Download QR Code</span>
            `;
        }
    });

    // Copy Image to Clipboard
    const btnCopyImage = document.getElementById('btn-copy-image');
    btnCopyImage.addEventListener('click', async () => {
        try {
            const rawBlob = await qrCode.getRawData('png');
            if (navigator.clipboard && window.ClipboardItem) {
                await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': rawBlob })
                ]);
                showToast('QR Image copied to clipboard!', 'success');
            } else {
                showToast('Clipboard image API not supported in browser', 'error');
            }
        } catch (err) {
            console.error(err);
            showToast('Unable to copy image to clipboard', 'error');
        }
    });

    // Copy Encoded Link/Text
    const btnCopyContent = document.getElementById('btn-copy-content');
    btnCopyContent.addEventListener('click', async () => {
        const payload = getEncodedPayload();
        if (!payload) {
            showToast('No content to copy', 'error');
            return;
        }
        await navigator.clipboard.writeText(payload);
        showToast('QR content copied to clipboard!', 'success');
    });

    // Print QR Code
    const btnPrintQR = document.getElementById('btn-print-qr');
    btnPrintQR.addEventListener('click', async () => {
        try {
            const rawBlob = await qrCode.getRawData('png');
            const url = URL.createObjectURL(rawBlob);
            const printWin = window.open('', '_blank');
            if (!printWin) {
                showToast('Please allow popups to print', 'error');
                return;
            }
            printWin.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Print QR Code</title>
                    <style>
                        body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; font-family: sans-serif; }
                        img { max-width: 400px; height: auto; }
                        h2 { margin-bottom: 20px; color: #111; }
                    </style>
                </head>
                <body>
                    <h2>${state.frameText || 'Scan QR Code'}</h2>
                    <img src="${url}" onload="window.print();window.close();" />
                </body>
                </html>
            `);
            printWin.document.close();
        } catch (err) {
            console.error(err);
            showToast('Failed to trigger print view', 'error');
        }
    });

    // Reset All to Defaults
    document.getElementById('btn-reset-all').addEventListener('click', () => {
        if (!confirm('Reset all fields and styles to defaults?')) return;
        document.getElementById('input-url').value = 'https://google.com';
        document.getElementById('input-text').value = '';
        document.getElementById('wifi-ssid').value = '';
        document.getElementById('wifi-password').value = '';
        document.getElementById('wa-phone').value = '';
        document.getElementById('wa-message').value = '';
        document.getElementById('email-to').value = '';
        document.getElementById('phone-number').value = '';
        document.getElementById('vcard-fn').value = '';
        document.getElementById('upi-id').value = '';
        state.colorPrimary = '#6366f1';
        state.colorSecondary = '#ec4899';
        state.colorBg = '#ffffff';
        state.fillMode = 'single';
        state.isTransparentBg = false;
        state.dotType = 'rounded';
        removeLogo();
        scheduleQRUpdate();
        showToast('Reset to defaults', 'success');
    });

    // ==========================================
    // 12. QR CODE SCANNER (File & Camera)
    // ==========================================
    const scanTabs = document.querySelectorAll('.scan-tab-btn');
    const scanFilePane = document.getElementById('pane-scan-file');
    const scanCameraPane = document.getElementById('pane-scan-camera');
    const scanDropzone = document.getElementById('scan-dropzone');
    const scanFileInput = document.getElementById('scan-file-input');
    const scanResultCard = document.getElementById('scan-result-card');
    const scanResultText = document.getElementById('scan-result-text');
    const scanResultType = document.getElementById('scan-result-type');
    const btnOpenScanLink = document.getElementById('btn-open-scan-link');
    const btnCopyScanResult = document.getElementById('btn-copy-scan-result');
    const btnImportScanResult = document.getElementById('btn-import-scan-result');
    const btnToggleCamera = document.getElementById('btn-toggle-camera');
    const cameraVideo = document.getElementById('camera-video');
    const cameraCanvas = document.getElementById('camera-canvas');

    scanTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            scanTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const isFile = tab.id === 'tab-scan-file';
            scanFilePane.classList.toggle('active', isFile);
            scanCameraPane.classList.toggle('active', !isFile);
            if (isFile) stopCameraStream();
        });
    });

    // File Drag and Drop for Scanner
    scanDropzone.addEventListener('click', () => scanFileInput.click());
    scanFileInput.addEventListener('change', (e) => {
        if (e.target.files[0]) decodeImageFile(e.target.files[0]);
    });
    scanDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        scanDropzone.classList.add('drag-over');
    });
    scanDropzone.addEventListener('dragleave', () => scanDropzone.classList.remove('drag-over'));
    scanDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        scanDropzone.classList.remove('drag-over');
        if (e.dataTransfer.files[0]) decodeImageFile(e.dataTransfer.files[0]);
    });

    function decodeImageFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                if (typeof jsQR !== 'undefined') {
                    const code = jsQR(imageData.data, imageData.width, imageData.height);
                    if (code) {
                        displayScanResult(code.data);
                    } else {
                        showToast('No readable QR code found in this image', 'error');
                    }
                } else {
                    showToast('Decoder library loading, please try again', 'error');
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // Camera Stream Management
    let isCameraActive = false;
    btnToggleCamera.addEventListener('click', async () => {
        if (isCameraActive) {
            stopCameraStream();
        } else {
            await startCameraStream();
        }
    });

    async function startCameraStream() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            state.cameraStream = stream;
            cameraVideo.srcObject = stream;
            cameraVideo.setAttribute('playsinline', true);
            await cameraVideo.play();
            isCameraActive = true;
            btnToggleCamera.innerHTML = '<span>Stop Camera</span>';
            scanCameraLoop();
        } catch (err) {
            console.error('Camera access error:', err);
            showToast('Unable to access camera: ' + err.message, 'error');
        }
    }

    function stopCameraStream() {
        if (state.cameraStream) {
            state.cameraStream.getTracks().forEach(track => track.stop());
            state.cameraStream = null;
        }
        if (state.cameraScanAnimationId) {
            cancelAnimationFrame(state.cameraScanAnimationId);
            state.cameraScanAnimationId = null;
        }
        isCameraActive = false;
        btnToggleCamera.innerHTML = '<span>Start Camera</span>';
    }

    function scanCameraLoop() {
        if (!isCameraActive || cameraVideo.readyState !== cameraVideo.HAVE_ENOUGH_DATA) {
            state.cameraScanAnimationId = requestAnimationFrame(scanCameraLoop);
            return;
        }

        cameraCanvas.width = cameraVideo.videoWidth;
        cameraCanvas.height = cameraVideo.videoHeight;
        const ctx = cameraCanvas.getContext('2d');
        ctx.drawImage(cameraVideo, 0, 0, cameraCanvas.width, cameraCanvas.height);
        const imageData = ctx.getImageData(0, 0, cameraCanvas.width, cameraCanvas.height);

        if (typeof jsQR !== 'undefined') {
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: 'dontInvert'
            });
            if (code && code.data) {
                stopCameraStream();
                displayScanResult(code.data);
                return;
            }
        }

        state.cameraScanAnimationId = requestAnimationFrame(scanCameraLoop);
    }

    function displayScanResult(text) {
        scanResultCard.style.display = 'block';
        scanResultText.textContent = text;
        document.getElementById('scan-result-time').textContent = new Date().toLocaleTimeString();

        // Detect type
        const isUrl = /^https?:\/\//i.test(text);
        if (isUrl) {
            scanResultType.textContent = 'Detected URL';
            btnOpenScanLink.style.display = 'inline-flex';
            btnOpenScanLink.href = text;
        } else if (text.startsWith('WIFI:')) {
            scanResultType.textContent = 'Wi-Fi Credentials';
            btnOpenScanLink.style.display = 'none';
        } else if (text.startsWith('BEGIN:VCARD')) {
            scanResultType.textContent = 'vCard Contact';
            btnOpenScanLink.style.display = 'none';
        } else {
            scanResultType.textContent = 'Decoded Text';
            btnOpenScanLink.style.display = 'none';
        }

        showToast('QR Code successfully scanned!', 'success');
    }

    btnCopyScanResult.addEventListener('click', async () => {
        const text = scanResultText.textContent;
        if (text) {
            await navigator.clipboard.writeText(text);
            showToast('Scan result copied to clipboard!', 'success');
        }
    });

    btnImportScanResult.addEventListener('click', () => {
        const text = scanResultText.textContent;
        if (!text) return;

        // Switch to generator view
        document.getElementById('mode-generator').click();

        if (/^https?:\/\//i.test(text)) {
            document.getElementById('tab-url').click();
            document.getElementById('input-url').value = text;
        } else {
            document.getElementById('tab-text').click();
            document.getElementById('input-text').value = text;
        }
        scheduleQRUpdate();
        showToast('Imported into Generator!', 'success');
    });

    // ==========================================
    // 13. HISTORY SYSTEM (localStorage)
    // ==========================================
    const HISTORY_KEY = 'qr_studio_history_v2';
    const historyModal = document.getElementById('history-modal');
    const historyList = document.getElementById('history-list');
    const historyEmpty = document.getElementById('history-empty');

    function getHistory() {
        try {
            return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
        } catch {
            return [];
        }
    }

    function saveToHistory(content, title) {
        const history = getHistory();
        // Prevent duplicate consecutive entries
        if (history.length > 0 && history[0].content === content) return;

        const newEntry = {
            id: Date.now(),
            content: content,
            title: title || 'QR Code',
            date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
        };

        history.unshift(newEntry);
        if (history.length > 15) history.pop();
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }

    function renderHistoryModal() {
        const history = getHistory();
        historyList.innerHTML = '';

        if (history.length === 0) {
            historyEmpty.style.display = 'block';
            return;
        }

        historyEmpty.style.display = 'none';
        history.forEach(item => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <span class="history-item-icon">🔲</span>
                <div class="history-item-details">
                    <div class="history-item-title">${escapeHTML(item.title)}: ${escapeHTML(item.content)}</div>
                    <div class="history-item-meta">${item.date}</div>
                </div>
                <div class="history-item-actions">
                    <button type="button" class="btn-history-load" data-id="${item.id}">Load</button>
                    <button type="button" class="btn-history-delete" data-id="${item.id}" title="Delete">✕</button>
                </div>
            `;
            historyList.appendChild(div);
        });

        // Bind Load & Delete
        historyList.querySelectorAll('.btn-history-load').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id, 10);
                const item = history.find(h => h.id === id);
                if (item) {
                    if (/^https?:\/\//i.test(item.content)) {
                        document.getElementById('tab-url').click();
                        document.getElementById('input-url').value = item.content;
                    } else {
                        document.getElementById('tab-text').click();
                        document.getElementById('input-text').value = item.content;
                    }
                    scheduleQRUpdate();
                    closeHistoryModal();
                    showToast('History item loaded into editor', 'success');
                }
            });
        });

        historyList.querySelectorAll('.btn-history-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id, 10);
                const updated = history.filter(h => h.id !== id);
                localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
                renderHistoryModal();
            });
        });
    }

    function openHistoryModal() {
        renderHistoryModal();
        historyModal.classList.add('open');
        historyModal.setAttribute('aria-hidden', 'false');
    }

    function closeHistoryModal() {
        historyModal.classList.remove('open');
        historyModal.setAttribute('aria-hidden', 'true');
    }

    document.getElementById('btn-open-history').addEventListener('click', openHistoryModal);
    document.getElementById('btn-close-history').addEventListener('click', closeHistoryModal);
    historyModal.addEventListener('click', (e) => {
        if (e.target === historyModal) closeHistoryModal();
    });

    document.getElementById('btn-clear-history').addEventListener('click', () => {
        if (confirm('Clear all history items?')) {
            localStorage.removeItem(HISTORY_KEY);
            renderHistoryModal();
            showToast('History cleared', 'success');
        }
    });

    // ==========================================
    // 14. TOAST NOTIFICATIONS
    // ==========================================
    const toastContainer = document.getElementById('toast-container');
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        const icon = type === 'success' ? '✓' : type === 'error' ? '⚠️' : 'ℹ️';
        toast.innerHTML = `<span>${icon}</span> <span>${escapeHTML(message)}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => toast.remove(), 250);
        }, 3200);
    }

    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag));
    }

    // Initial Trigger
    scheduleQRUpdate();
});