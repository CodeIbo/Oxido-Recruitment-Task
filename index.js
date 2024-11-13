import OpenAI from 'openai';
import dotenv from "dotenv";


dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw Error("Add key to env file")
}

const client = new OpenAI({
  apiKey: apiKey
})

const systemMessage = `
Jesteś konwerterem tekstu na HTML, generującym zawartość tylko do sekcji <body>. 
Twoim zadaniem jest analiza kontekstu tekstu i konwersja go na odpowiednie struktury HTML. 
Na podstawie treści automatycznie identyfikuj poszczególne elementy w których możesz zawrzeć strukturę html. Działaj ze wszystkimi możliwymi standardami SEO oraz WCAG 2.1.  Tam, gdzie ma to sens kontekstowo, dodawaj obrazki z wykorzystaniem tagu <img> z atrybutem src='image_placeholder.jpg'. Każdy obrazek powinien mieć odpowiedni atrybut alt, który szczegółowo opisuje, co obrazek powinien przedstawiać, zgodnie z kontekstem. Dodaj również opisowy podpis do każdego obrazka za pomocą tagu <figcaption>. Maksymalna liczba obrazków nie powinna przekraczać sumarycznie połowy ilości paragrafów. Generuj tylko kod HTML bez dodatkowych wyjaśnień ani komentarzy oraz nie zmieniaj oryginalnego kontentu.
`;


async function genHtmlFromTxt() {
  try {
    const response = await client.chat.completions.create({
      messages: [{
        role: "system",
        content: systemMessage
      },
      { role: 'user', content: 'to jest test' }],
      model: 'gpt-4o',
      max_tokens: 1000,
      temperature: 0.2,
    });
    return response.choices[0]?.message?.content
  }
  catch (err) {
    throw Error(err)
  }
}


