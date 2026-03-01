// import Ocr from '@gutenye/ocr-node';
// import multer from 'multer';
// import express from 'express';
// import cors from 'cors';

// process.on('unhandledRejection', err => {
//     console.error('UNHANDLED REJECTION:', err);
// });

// process.on('uncaughtException', err => {
//     console.error('UNCAUGHT EXCEPTION:', err);
// });

// let ocr;

// async function start() {
//     // ocr = await Ocr.create({
//     //     models: {
//     //         detectionPath: './ch_PP-OCRv4_det_infer.onnx',
//     //         recognitionPath: './ch_PP-OCRv4_rec_infer.onnx',
//     //         dictionaryPath: './ppocr_keys_v1.txt'
//     //     }
//     // });

//     const app = express();
//     app.use(cors());

//     const upload = multer({ storage: multer.memoryStorage() });

//     async function extract(url) {
//         const result = await ocr.detect(url);
//         const line = result.filter(line => line.text.includes('ccount'))[0]; // Account Number
//         const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
//         const text = line.text.split('').filter(letter => chars.includes(letter)).join('');
//         return text;
//     }

//     app.post('/ocr', upload.single('image'), async (req, res) => {
//         try {
//             const url = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
//             const text = await extract(url);
//             res.json({ text });
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     });

//     app.listen(process.env.PORT || 8080, () => {
//         console.log('Server on port 8080');
//     });
// }

// start().catch(err=>{
//     console.error('Error starting server:', err);
// })

import express from 'express';
import multer from 'multer';
import cors from 'cors';
import Tesseract from 'tesseract.js';
import {google} from 'googleapis';

process.on('unhandledRejection', err => {
    console.error('UNHANDLED REJECTION:', err);
});

process.on('uncaughtException', err => {
    console.error('UNCAUGHT EXCEPTION:', err);
});

const KEYFILE = './json-key.json';
const SPREADSHEET_ID = '1PTonSsWfUq_MDIA21qR3IWT6l6-_7YSPxC_hMlJr6Tk';

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILE,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});
const sheets = google.sheets({ version: 'v4', auth });

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

async function extract(buffer) {
    const { data: { text } } = await Tesseract.recognize(buffer, 'eng'); // change to 'chi_sim' if Chinese
    const line = text.split('\n').find(l => l.includes('mber')); // find the line with "Account"
    if (!line) return '';
    const digits = line.split('').filter(c => '0123456789'.includes(c)).join('');
    return digits;
}

function randomID() {
    return Math.random().toString(36).substring(2, 10);
}

app.post('/checkout', async (req, res) => {
    try {
        const { accountNumber, whatOrdered } = req.body;
        // const timestamp = new Date().toISOString();
        // in m/d/y h:m:s format in 12hr timezone in LA
        const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
        const id = randomID();
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Data!A:E',
            valueInputOption: 'RAW',
            requestBody: {
                values: [[id, timestamp, accountNumber, whatOrdered, "Unpaid"]]
            }
        });
        res.json({ success: true, transactionId: id, timestamp });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
app.post('/ocr', upload.single('image'), async (req, res) => {
    try {
        const text = await extract(req.file.buffer);
        res.json({ text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
app.post('/ocr-full', upload.single('image'), async (req, res) => {
    try {
        const r = await Tesseract.recognize(req.file.buffer, 'eng');
        res.json({ text: r.data.text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Server running on port 8080');
});