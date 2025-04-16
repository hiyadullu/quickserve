import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateQRCode(restaurantId, restaurantName, baseUrl) {
    try {
        console.log('Generating QR code with:', { restaurantId, restaurantName, baseUrl });
        
        // Create the QR code data - link to customer page
        const qrData = `${baseUrl}/customer/${restaurantId}?qrCode=true`;
        // console.log('QR Data:', qrData);
        
        // Create directory for QR codes if it doesn't exist
        const qrDir = path.join(__dirname, '../qr-codes');
        if (!fs.existsSync(qrDir)) {
            fs.mkdirSync(qrDir, { recursive: true });
        }

        // Create restaurant-specific directory
        const restaurantDir = path.join(qrDir, `${restaurantId}-${restaurantName.replace(/\s+/g, '-').toLowerCase()}`);
        if (!fs.existsSync(restaurantDir)) {
            fs.mkdirSync(restaurantDir, { recursive: true });
        }

        // Generate QR code as data URL
        const qrDataUrl = await QRCode.toDataURL(qrData, {
            color: {
                dark: '#000000',
                light: '#ffffff'
            },
            width: 300,
            margin: 1
        });

        // Save QR code as PNG file
        const qrPath = path.join(restaurantDir, 'table-qr.png');
        await QRCode.toFile(qrPath, qrData, {
            color: {
                dark: '#000000',
                light: '#ffffff'
            },
            width: 300,
            margin: 1
        });
        
        console.log('QR code generated and saved successfully at:', qrPath);
        
        return {
            qrDataUrl,
            qrData,
            qrPath
        };
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
} 