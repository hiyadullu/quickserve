import nodemailer from 'nodemailer';
import env from 'dotenv';

env.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});
async function testSMTP() {
    try {
        await transporter.verify();
        console.log('✅ SMTP Connection Successful!');
    } catch (error) {
        console.error('❌ SMTP Connection Failed:', error);
    }
}
testSMTP();

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function sendManualEmail(restaurant) {
    // Match the exact CSS of the template
    const cssStyles = `
        <style>
            * {
                font-family: Arial, sans-serif;
            }
            .email-container {
                max-width: 600px;
                margin: auto;
                padding: 20px;
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .logo {
                width: 100px;
                height: 100px;
            }
            h1 {
                font-size: 36px;
                font-weight: 700;
                margin-bottom: 10px;
            }
            p {
                font-size: 16px;
                line-height: 1.5;
            }
            .download-btn {
                background-color: #4CAF50;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            .download-btn:hover {
                background-color: #3e8e41;
            }
        </style>
    `;
    try {
        // Read the HTML template
        const templatePath = path.join(__dirname, 'manualMail.html');
        let htmlContent = fs.readFileSync(templatePath, 'utf8');

        // Replace placeholders with actual data
        htmlContent = htmlContent.replace('[Restaurant Name]', restaurant.name);
        htmlContent = htmlContent.replace(/\[Your Username\]/g, restaurant.email);
        htmlContent = htmlContent.replace(/\[Your Temporary Password\]/g, restaurant.password);
        
        // Get paths for QR code and logo
        const qrCodeFolder = path.join(__dirname, '..', 'qr-codes', `${restaurant.id}-${restaurant.name.replace(/\s+/g, '-').toLowerCase()}`);
        const qrCodePath = path.join(qrCodeFolder, 'table-qr.png');
        const logoPath = path.join(__dirname, '..', 'quickserve_logo.jpeg');
        
        // Replace the image src with cid reference
        htmlContent = htmlContent.replace('/api/placeholder/200/200', 'cid:qr-code');

        // Replace dashboard URL
        const dashboardUrl = `${process.env.POS_URL}/auth/login`;
        htmlContent = htmlContent.replace('https://QuickServe.com/admin', dashboardUrl);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: restaurant.email,
            subject: 'Your Restaurant Menu QR Code is Ready!',
            html: htmlContent,
            attachments: [
                {
                    filename: 'quickserve_user_manual.pdf',
                    path: path.join(__dirname, 'quickserve_user_manual.pdf'),
                    cid: 'manual'
                },
                {
                    filename: 'restaurant-qr-code.png',
                    path: qrCodePath,
                    cid: 'qr-code'
                },
                {
                    filename: 'quickserve_logo.jpeg',
                    path: logoPath,
                    cid: 'logo'
                }
            ]
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}
