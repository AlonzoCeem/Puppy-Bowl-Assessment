//Divs I want to manipulate.
const content = document.querySelector("#content");
const selected = document.querySelector("#selected");

//Player Bank.
let players = [];

//Initial Render.
async function render(){
    await getPlayers();
    //This if else statement is used to make sure that you stay on the same page when you reload.
    if(window.location.pathname === "/index.html" && window.location.hash === ""){
        displayPlayers();
    }else{
        displayPlayer(window.location.hash)
    }
}

async function getPlayers(){
    const data = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2307/players");
    const playersData = await data.json();
    players = playersData.data.players;
}

function displayPlayers(){
    const html = players.map((obj) => {
        return `
        <div class="index">
            <a href="#${obj.id}">${obj.name}</a>
            <p>${obj.breed}</p>
        </div>
        `
    }).join("");
    content.innerHTML = html;
}

render();

//Hash Change event.
window.addEventListener("hashchange",(event) => {
    displayPlayer(window.location.hash);
})

function displayPlayer(hash){
    const html = players.map((obj) => {
        if(hash === "#" + obj.id){
            return `
                <div>
                    <div class="selectedContent">
                        <a href="index.html">Back to All Puppies!</a>
                        <h1>${obj.name}</h1>
                        <p>${obj.breed}</p>
                        <img src="${obj.imageUrl}">
                    </div>
                </div>
            `
        }
    }).join("");
    content.innerHTML = "";
    selected.innerHTML = html;
}

//Bug to be fixed: If you go from index.html to index.html#hashnumber the back button won't display the players again on index.html.