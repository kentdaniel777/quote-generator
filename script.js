const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn= document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");

// get quote from API
async function getQuote(){
    
    const proxyUrl = 'https://guarded-peak-77488.herokuapp.com/'// to enable CORS
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        // use "Unknown" if there's no author
        if (data.quoteAuthor===""){
            authorText.innerText="Unknown"
        }else{
            authorText.innerText=data.quoteAuthor;
        }

        // reduce font size for long quotes
        if (data.quoteText.length > 125){
            quoteText.classList.add(".long-quote");
        }else{
            quoteText.classList.remove(".long-quote");
        }
        quoteText.innerText=data.quoteText;
        
    }catch(err){
        // if there's error in loading the data , try again
        getQuote();
        
    }
}

// tweet function
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,"_blank"); // opens twitter in new window
}

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click",tweetQuote);
