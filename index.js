import fs from "fs";
import path from "path"
import OpenAI from 'openai';
import dotenv from "dotenv";


dotenv.config();
const API_KEY = process.env.OPENAI_API_KEY;
const TXT_DIR = './articles/txt';
const HTML_DIR = './articles/html';

const SYSTEM_MESSAGE = `Jesteś konwerterem tekstu na HTML, generującym zawartość tylko do sekcji <body>. 
Twoim zadaniem jest analiza kontekstu tekstu i konwersja go na odpowiednie struktury HTML. Na podstawie treści automatycznie identyfikuj poszczególne elementy w których możesz zawrzeć strukturę html. Działaj ze wszystkimi możliwymi standardami SEO oraz WCAG 2.1.  Tam, gdzie ma to sens kontekstowo, dodawaj obrazki z wykorzystaniem tagu <img> z atrybutem src='image_placeholder.jpg'. Każdy obrazek powinien mieć odpowiedni atrybut alt, który szczegółowo opisuje, co obrazek powinien przedstawiać, zgodnie z kontekstem. Dodaj również opisowy podpis do każdego obrazka za pomocą tagu <figcaption>. Maksymalna liczba obrazków nie powinna przekraczać sumarycznie połowy ilości paragrafów. Generuj tylko kod HTML bez dodatkowych wyjaśnień ani komentarzy oraz nie zmieniaj oryginalnego kontentu.`;

if (!API_KEY) throw Error("Add key to env file")

const client = new OpenAI({
  apiKey: API_KEY
})

async function readTxtFiles() {
  try {
    const files = await fs.promises.readdir(TXT_DIR);
    const txtFiles = files.filter(file => path.extname(file) === '.txt');

    const readPromises = txtFiles.map(async file => {
      const articleText = await fs.promises.readFile(path.join(TXT_DIR, file), 'utf-8');
      return { name: path.parse(file).name, txt: articleText };
    });

    return await Promise.all(readPromises);

  } catch (err) {
    console.error("Error reading files:", err);
    return [];
  }
}

async function saveHtmlFile(article, html) {
  try {
    const filePath = `${HTML_DIR}/${article.name}.html`;
    await fs.promises.writeFile(filePath, html, 'utf-8');
    console.log(`Successfully saved: ${filePath}`);
  }
  catch (err) {
    console.error(`Error saving file ${article.name}.html: ${err.message}`);
  }
}


async function genHtmlFromTxt(text) {
  try {
    const response = await client.chat.completions.create({
      messages: [{
        role: "system",
        content: SYSTEM_MESSAGE
      },
      { role: 'user', content: text }],
      model: 'gpt-4o',
      max_tokens: 1000,
      temperature: 0.2,
    });
    const generatedHtml = response.choices[0].message.content
    if (!generatedHtml) throw Error("No response received from the chat");
    return generatedHtml
  }
  catch (err) {
    throw Error(err)
  }
}

(async () => {
  const articles = await readTxtFiles();
  if (articles.length > 5) {
    throw Error("To many files in txt folder!")
  }
  await Promise.all(
    articles.map(async article => {
      try {
        const convertedHtml = await genHtmlFromTxt(article.txt);
        await saveHtmlFile(article, convertedHtml);
      } catch (error) {
        console.error(`Failed to process ${article.name}: ${error.message}`);
      }
    })
  );
})();
