import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generates an HTML receipt based on the provided data
 * @param {Object} data - The data needed to generate the receipt
 * @param {Object} data.restaurant - Restaurant information
 * @param {string} data.restaurant.address - Restaurant address
 * @param {string} data.restaurant.phone - Restaurant phone number
 * @param {string} data.restaurant.email - Restaurant email
 * @param {Object} data.order - Order information
 * @param {string} data.order.id - Order ID
 * @param {string} data.order.date - Order date
 * @param {string} data.order.time - Order time
 * @param {string} data.order.paymentMethod - Payment method used
 * @param {Array} data.order.items - Array of order items
 * @param {number} data.order.subtotal - Order subtotal
 * @param {number} data.order.taxRate - Tax rate percentage
 * @param {number} data.order.tax - Tax amount
 * @param {number} [data.order.deliveryFee] - Optional delivery fee
 * @param {number} [data.order.tip] - Optional tip amount
 * @param {number} data.order.total - Order total
 * @param {Object} data.customer - Customer information
 * @param {string} data.customer.name - Customer name
 * @param {string} data.customer.address - Customer address
 * @param {string} data.customer.phone - Customer phone number
 * @param {string} data.customer.email - Customer email
 * @param {boolean} [data.showDownloadButton=false] - Whether to show the download button
 * @returns {Promise<string>} The generated HTML receipt
 */
async function generateReceipt(data) {
    const templatePath = path.join(__dirname, 'receipt.ejs');
    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, data, {}, (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });
}

export default generateReceipt;
