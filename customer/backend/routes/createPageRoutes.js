import express from "express";
import { getTemplate1 } from "../templates/template1.js";
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.post('/:restaurantId', async (req, res) => {
    const restaurantId = req.params.restaurantId;
    const template = getTemplate1();
    
    // Create the EJS file in views/pages
    
    const filePath = join(__dirname, '../../frontend/views/pages', `${restaurantId}-customer-landing.ejs`);
    
    fs.writeFileSync(filePath, template);
    
    res.status(200).json({ message: `Customer landing page for restaurant ${restaurantId} has been created successfully` });
});

export default router;
