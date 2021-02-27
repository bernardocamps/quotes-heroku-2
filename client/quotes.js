let globalText = null;
let globalAuthor = null;
let globalButton = null;

/**
 * Mudar esta página para o local da API
 */
const globalPAGE = window.location.href + 'api/quotes';

window.addEventListener('load', start);

async function start() {
    globalText = document.getElementById('text');
    globalAuthor = document.getElementById('author');
    globalButton = document.getElementById('newQuote');

    globalButton.addEventListener('click', inspiracao);

    inspiracao();
}

async function getQuote() {
    try {
        const res = await fetch(globalPAGE);
        const quote = await res.json();
        return quote;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function inspiracao() {
    const quote = await getQuote();
    if (quote) {
        let { text, author } = quote;
        if (!author) {
            author = 'Unknown';
        }

        globalText.innerHTML = text;
        globalAuthor.innerHTML = author;
    }
}