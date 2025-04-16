import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import {receiptTemplate} from "../templates/receipttemplate.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateReceipt(name, email, amount, paymentId) {
    const date = new Date().toLocaleDateString();
    const html = receiptTemplate({ name, email, amount, date, paymentId });
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const receiptsDir = path.join(__dirname, '../receipts');
    if (!fs.existsSync(receiptsDir)) {
        fs.mkdirSync(receiptsDir);
    }

    const filePath = path.join(receiptsDir, `${paymentId}.pdf`);
    await page.pdf({ path: filePath, format: 'A4', printBackground: true });

    await browser.close();
    return filePath;
}

export default generateReceipt;