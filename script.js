document.addEventListener('DOMContentLoaded', () => {
    const qrText = document.getElementById('qr-text');
    const qrColor = document.getElementById('qr-color');
    const logoInput = document.getElementById('logo-input');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const clearBtn = document.getElementById('clear-btn');
    const qrCodeContainer = document.getElementById('qr-code');

    let logoFile = null;

    const generateQRCode = () => {
        const text = qrText.value;
        if (!text) {
            alert("Please enter text or a URL.");
            return;
        }

        qrCodeContainer.innerHTML = '';

        // Create a hidden div for the QR code library to draw on
        const tempDiv = document.createElement('div');
        tempDiv.style.display = 'none';
        document.body.appendChild(tempDiv);

        new QRCode(tempDiv, {
            text: text,
            width: 256,
            height: 256,
            colorDark: qrColor.value,
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        setTimeout(() => {
            const qrCanvas = tempDiv.querySelector('canvas');
            if (qrCanvas) {
                if (logoFile) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const logoImg = new Image();
                        logoImg.src = e.target.result;
                        logoImg.onload = () => {
                            const ctx = qrCanvas.getContext('2d');
                            const logoSize = qrCanvas.width * 0.2;
                            const x = (qrCanvas.width - logoSize) / 2;
                            const y = (qrCanvas.height - logoSize) / 2;

                            ctx.fillStyle = 'white';
                            ctx.fillRect(x, y, logoSize, logoSize);
                            ctx.drawImage(logoImg, x, y, logoSize, logoSize);

                            const finalImage = new Image();
                            finalImage.src = qrCanvas.toDataURL();
                            qrCodeContainer.appendChild(finalImage);
                            document.body.removeChild(tempDiv);
                        };
                    };
                    reader.readAsDataURL(logoFile);
                } else {
                    const finalImage = new Image();
                    finalImage.src = qrCanvas.toDataURL();
                    qrCodeContainer.appendChild(finalImage);
                    document.body.removeChild(tempDiv);
                }
            }
        }, 100);
    };

    logoInput.addEventListener('change', (e) => {
        logoFile = e.target.files[0];
    });

    generateBtn.addEventListener('click', generateQRCode);

    downloadBtn.addEventListener('click', () => {
        const qrImage = qrCodeContainer.querySelector('img');
        if (qrImage) {
            const link = document.createElement('a');
            link.download = 'qr-code.png';
            link.href = qrImage.src;
            link.click();
        }
    });

    clearBtn.addEventListener('click', () => {
        qrText.value = '';
        qrColor.value = '#000000';
        logoInput.value = '';
        logoFile = null;
        qrCodeContainer.innerHTML = '';
    });
});