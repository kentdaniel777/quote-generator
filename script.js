// DOM elements
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn= document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");
const errorLoading = document.getElementById("error");

// global variables
let MAX_ERROR_COUNT=10;


function showLoadAnim(){
    loader.hidden = false;
    quoteContainer.hidden=true;
}
function removeLoadAnim(){
    if(!loader.hidden){
        loader.hidden = true;
    }
    
    quoteContainer.hidden= false;
}


// get quote from API
let errorCount=0;
async function getQuote(){
    // loads when getquote is run 
    showLoadAnim();
    
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

        
        errorLoading.hidden=true;
        removeLoadAnim();// when the await functions have finished
        
        
    }catch(err){
        // if there's error in loading the data
        errorCount++;
        if (errorCount<MAX_ERROR_COUNT){
            getQuote();
        }else{
            errorLoading.hidden=false;
            loader.hidden=true;
            errorCount=0;
        }
        
        
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
getQuote();