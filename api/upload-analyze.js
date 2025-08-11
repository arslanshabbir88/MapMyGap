import formidable from 'formidable';
import fs from 'fs';
import mammoth from 'mammoth';
import pdf from 'pdf-parse';
import xlsx from 'xlsx';

export const config = { api: { bodyParser: false } };

async function readTxt(filePath) {
  return fs.promises.readFile(filePath, 'utf8');
}

async function readDocx(filePath) {
  const { value } = await mammoth.extractRawText({ path: filePath });
  return value || '';
}

async function readPdf(filePath) {
  const data = await pdf(fs.readFileSync(filePath));
  return data.text || '';
}

async function readXlsx(filePath) {
  const wb = xlsx.readFile(filePath);
  let out = [];
  wb.SheetNames.forEach((name) => {
    const ws = wb.Sheets[name];
    const csv = xlsx.utils.sheet_to_csv(ws);
    out.push(`# ${name}\n${csv}`);
  });
  return out.join('\n\n');
}

function getExt(filename) {
  return (filename.split('.').pop() || '').toLowerCase();
}

export default async function handler(req, res) {
  try {
    const form = formidable({ multiples: false, keepExtensions: true });
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => (err ? reject(err) : resolve({ fields, files })));
    });

    const framework = fields.framework;
    const file = files.file;
    if (!file || !file.filepath) {
      return res.status(400).send('No file uploaded');
    }

    const ext = getExt(file.originalFilename || file.newFilename || '');
    let extractedText = '';
    if (ext === 'txt') extractedText = await readTxt(file.filepath);
    else if (ext === 'docx') extractedText = await readDocx(file.filepath);
    else if (ext === 'pdf') extractedText = await readPdf(file.filepath);
    else if (ext === 'xlsx' || ext === 'xls') extractedText = await readXlsx(file.filepath);
    else return res.status(400).send('Unsupported file type');

    // Call the same analysis logic as /api/analyze
    const analyzeResp = await fetch(`${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileContent: extractedText, framework })
    });

    if (!analyzeResp.ok) {
      const t = await analyzeResp.text();
      return res.status(analyzeResp.status).send(t);
    }

    const json = await analyzeResp.json();
    return res.status(200).json({ ...json, extractedText });
  } catch (e) {
    console.error('upload-analyze error:', e);
    res.status(500).send(e.message || 'Server error');
  }
}
