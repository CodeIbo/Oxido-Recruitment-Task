
import fs from 'fs';
import path from 'path';

const HTML_DIR = './articles/html';
const PREVIEW_FILE = './preview/podglad.html';
const TEMPLATE_FILE = './preview/szablon.html';

const args = process.argv.slice(2);
if (args.length === 0) {
  throw Error('Podaj nazwę pliku do podglądu. Użycie: npm run preview <nazwa_pliku>')
}
const fileName = args[0];
const htmlFilePath = path.join(HTML_DIR, `${fileName}.html`);


async function checkFileExists(filePath) {
  try {
    await fs.promises.access(filePath);
  } catch (error) {
    throw new Error(`Plik ${filePath} nie istnieje.`);
  }
}


async function generatePreview() {
  try {
    await checkFileExists(htmlFilePath);
    await checkFileExists(TEMPLATE_FILE);
    await checkFileExists(PREVIEW_FILE);

    const articleContent = await fs.promises.readFile(htmlFilePath, 'utf-8');

    let templateContent = await fs.promises.readFile(TEMPLATE_FILE, 'utf-8');

    const previewContent = templateContent.replace('<!-- Tutaj wklej wygenerowany kod artykułu -->', articleContent);

    await fs.promises.writeFile(PREVIEW_FILE, previewContent, 'utf-8');

    console.log(`Podgląd artykułu został zapisany w pliku ${PREVIEW_FILE}.`);
  } catch (error) {
    console.error(`Błąd: ${error.message}`);
  }
}

(async () => { await generatePreview() })() 