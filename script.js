document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const quoteList = document.getElementById('quoteList');
    const errorMessage = document.getElementById('errorMessage');
    let quotes = [];

    fetch('https://dummyjson.com/quotes')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch quotes');
            return response.json();
        })
        .then(data => {
            quotes = data.quotes;
            renderQuotes(quotes);
        })
        .catch(error => {
            errorMessage.textContent = `Error: ${error.message}`;
            errorMessage.style.display = 'block';
        });

    function renderQuotes(quotesArray) {
        quoteList.innerHTML = '';
        quotesArray.forEach(quote => {
            const li = document.createElement('li');
            li.className = 'quote-item';
            li.textContent = `"${quote.quote}" - ${quote.author}`;
            quoteList.appendChild(li);
        });
    }

    function filterQuotes(searchTerm) {
        const filtered = quotes.filter(quote => 
            quote.quote.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderQuotes(filtered);
    }

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.trim();
        if (searchTerm === '') {
            renderQuotes(quotes);
        } else {
            filterQuotes(searchTerm);
        }
    });
});