// get quote from API
async function getQuote(){
    
    const proxyUrl = 'https://guarded-peak-77488.herokuapp.com/'// to enable CORS
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {
        const response = await fetch(proxyUrl + apiUrl)
        const data = await response.json()
        console.log(data);
        return data;
    }catch(err){
        // if there's error in loading the data , try again
        getQuote();
        console.log("No quote :(",err);
    }
}

async function Update(){
    const quote = await getQuote();// wait until it is finished
    // console.log(quote)
    const txt = document.querySelector("#quote");
    const author = document.querySelector("#author")
    txt.innerHTML=quote["quoteText"];
    if (quote["quoteAuthor"]!=""){
        author.innerHTML=quote["quoteAuthor"];
    }else{
        author.innerHTML="Unknown";
    }
    
}
const newQuote= document.querySelector("#new-quote");
newQuote.addEventListener("click", Update);
