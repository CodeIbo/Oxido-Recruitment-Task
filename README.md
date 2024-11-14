# Oxido zadanie rekrutacyjne

Aplikacja konwertuje pliki tekstowe (.txt) na pliki HTML z odpowiednią strukturą, przy pomocy api **Open AI** i modelu **gpt-4o**. Wykorzystuje asynchroniczne zapisywanie oraz odczytywanie plików ( możliwość używania na serwerach ).

## Wymagania

- Node.js (wersja 14 lub wyższa)
- Konto i klucz API OpenAI

## Instalacja

1. Sklonuj repozytory `git clone [repository-url]`
2. Stwórz plik **.env** bazując **env.example** i wypełnij .
3. Zainstaluj paczki przy pomocy `npm i`

## Działanie

Aplikacja gotowa do uruchmienia, należy umieścić pliki do konwersji w folderze _articles/txt_. Nastepnie uruchomić aplikację przy pomocy komendy `npm run start`. <br/>
Po przetworzeniu, aplikacja zakończy swoje działania a w folderze _articles/html_, znajdą się odpowiedniki plików tekstowych.

## Ograniczenia

- Aplikacja posiada prostą obsługę błędów, które będą się wyświetlać w konsoli i przerywać działanie skryptu
- Limit plików txtowych do 5 podczas jednej iteracji aplikacji ( _dla bezpieczeństwa użytkownika interaktującego z api_ )

# Preview - zadanie dodatkowe

Został przygotowany folder preview zawierający:

- _podglad.html_
- _szablon.html_

Podstawą tego jest skrypt **preview.js**. Zajmuje się on asynchroniczną podmiana kontentu w pliku _szablon.html_ przy pomocy komendy wprowadzanej w terminalu. <br>
komenda:&nbsp;`npm run preview <nazwa-pliku>`. <br> Skrypt wykona operacje wyczyszczenia starego wyglądu _podglad.html_ oraz podmiany go na podstawie _szablon.html_ wraz z nowym wybranym przez siebie artykułem.

### Dodatkowe informacje od autora

Zadanie, mające dość prostą podstawę można poszerzać i skalować, jednym z pierwszych pomysłów jest stworzenie menu w którym użytkownik będzie miał wylistowane wszystkie pliki i gdzie bedzie mogl podejrzeć je przy pomocy jednego kliknięcia. Dodatkowo można też ograniczyc wrzucanie np artykułow bezposrednio do projektu a stworzyc prosty panel przez obsługę np dropzone, które zapewni szybkie przetwarzanie artykułów i uprości cały proces.

