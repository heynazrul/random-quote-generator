const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const speak = document.getElementById('speak');

let apiQuotes = [];
let errorCounter = 0;

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new quote
function newQuote() {
  showLoadingSpinner();

  // Pick a random Quote form apiQupotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // check if author field is blank and replace with "unknown"
  if (!quote.author) {
    authorText.textContent = '- Unknown';
  } else {
    authorText.textContent = `- ${quote.author}`;
  }

  // Check quote length to determine styling
  if (quote.text.length > 100) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}
//Get Quotes From API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    getQuotes();
  }
}

// Text to Speech
function textToSpeech() {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance();
  let quoteToRead = quoteText.textContent;
  let authorToRead = authorText.textContent;
  utterThis.text = `${quoteToRead} quote by ${authorToRead}`;
  utterThis.rate = 1;
  synth.speak(utterThis);
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
speak.addEventListener('click', textToSpeech);

// On Load
getQuotes();
