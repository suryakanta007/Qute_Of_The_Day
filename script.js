
const quteContent = document.querySelector(".qute-content");
const authorName =  document.querySelector(".author-name");


// All the buttons : 
const addNew = document.querySelector(".addnew");
const copy = document.querySelector(".copy");
const share = document.querySelector(".share");

// call the api and get response 
async function getRandomQute(){
    try {
        const JSONdata = await fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random");
        const data = await JSONdata.json();
        return data;
    } catch (error) {
        throw new Error(error);
    }
} 
// render into the dom
function showQute(){
    const data = getRandomQute();
    data.then((res)=>{
        console.log(res)
        const content = res.data.content
        const author = res.data.author
        quteContent.innerText = content;
        authorName.innerText = author;
    })
}

async function copyToClipboard(element) {
    try {
      await navigator.clipboard.writeText(element.textContent);
      // Highlight effect
      element.classList.add("highlighted");
      setTimeout(() => {
        element.classList.remove("highlighted");
      }, 1000); // Remove highlight after 1 second
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }
// It is for default 1st time call to show a random qute.
showQute()

addNew.addEventListener("click",(e)=>{
    showQute()
})

copy.addEventListener("click",()=>{
    copyToClipboard(quteContent);
})