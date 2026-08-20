//list for popups
const characters = [
    {
        id: 1,
        name: "Torcida",
        image: "./slike/characters/hooligan.png",
        description: "Looks like Hajduk is playing tonight, and that means scraped cars and broken skulls! Try to avoid this fella, or at least bribe him... There's no way you're getting out of a scrap with him. Unless..."
    },
    {
        id: 2,
        name: "Purple Guy",
        image: "./slike/characters/purple guy.png",
        description: "A mysterious figure that works part-time in a very special pizzeria. Total freak who enters animal costumes in his spare time."
    },
    {
        id: 3,
        name: "Laid back fella",
        image: "./slike/characters/kerum.png",
        description: "This relaxed fella is most well knows for his prosciutto business, but that doesn't mean he can't dabble into the housing market from time to time."
    },
    {
        id: 4,
        name: "Van-sama",
        image: "./slike/characters/darkholme.png",
        description: "This living legend has retired from his illustrious acting carreer. Now, he's just a humble real estate agent who just wants to live the rest of his days in peace in this lovely city."
    },
    {
        id: 5,
        name: "Your local dealer",
        image: "./slike/characters/scammer.png",
        description: "Just your friendly neighborhood dealer, and it looks like he now deals in house as well!"
    },
    {
        id: 6,
        name: "Supermarket worker",
        image: "./slike/characters/studenac_angry.png",
        description: "Here to fulfill the women iclusivity quota. She's always pissed, but my lawyer has advised me not to make further jokes about that."
    },
    {
        id: 7,
        name: "The Beast",
        image: "./slike/characters/Bruno3.png",
        description: "One of the three board executives of the speculator conglomerate that has been poisoning this city. They are the main cause all the prices skyrocketed. Vicious and greedy, they will stop at nothing to see your endeavor fail. The most heinous acts are but child's play to them, so tread very carefully..."
    }
];

function renderCharacterCards() {
    const container = document.querySelector("#character-wheel");
    characters.forEach(character => {
        const card = document.createElement("div");
        card.classList.add("character-card");
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}" class="character-image"/>
            <h3 class="character-name text-content">${character.name}</h3>
        `;
        card.addEventListener("click", () => showCharacterPopup(character.id));
        container.appendChild(card);
    });
}

renderCharacterCards();

//make popup visible
function showCharacterPopup(id) {
    let character;

    for (let i = 0; i < characters.length; i++) {
        if (characters[i].id === id) {
            character = characters[i];
            break;
        }
    }

    const popupContent = document.querySelector(".pop-up-content");

    //cleaning the leftovers
    const leftovers = popupContent.querySelector(".pop-up-elements");
    if (leftovers) {
        leftovers.remove();
    }

    //creating pop-up elements
    const elements = document.createElement("div");
    elements.classList.add("pop-up-elements");

    const elementsInnerHTML = `
        <h2 class="pop-up-name">${character.name}</h2>
        <img class="pop-up-image" src="${character.image}" alt="${character.name}" />
        <br />
        <p class="pop-up-description">${character.description}</p>
    `;

    elements.innerHTML = elementsInnerHTML;
    popupContent.appendChild(elements);

    document.querySelector("#character-pop-up").classList.add("active");
}

//close popup
document.querySelector(".pop-up-close").addEventListener("click", () => {
    document.querySelector("#character-pop-up").classList.remove("active");
});

//button change of sprite
const buttonImg = document.querySelector("#red-button-image");
let lock = false;

function pressButton(e) {
    e.preventDefault(); // prevents things like double-firing or unwanted scrolling on touch
    buttonImg.src = "./slike/red-button-pressed.png";
    //buttonPressSFX();
    lock = true;
}

function releaseButton(e) {
    e.preventDefault();
    buttonImg.src = "./slike/red button unpressed.png";
    if (lock == true) {
        changeNewsText();
        lock = false;
    }
}

const redButton = document.querySelector(".red-button");

redButton.addEventListener("mousedown", pressButton);
redButton.addEventListener("touchstart", pressButton);

redButton.addEventListener("mouseup", releaseButton);
redButton.addEventListener("touchend", releaseButton);

redButton.addEventListener("mouseleave", releaseButton);
redButton.addEventListener("touchcancel", releaseButton);

//news list
const news = [
    "Promet split increasing the number of ticket-masters in zone.",
    "Debt collector from Sinj roaming around.",
    "Sulphur reserve spillage in proximity.",
    "Flooding after Heavy Rain(TM)",
    "Sewage clogged after INTENSE SHIT SESH.",
    "Air quality as bad as Sarajevo.",
    "Gas station runs out of hot dogs.",
    "4pm traffic seen at 12am",
    "Cocaine stocks ran out on the street.",
    "Nearby book store runs out of smut.",
    "Local babushka gave up.",
    "Philipp Zawadlawsky seen whipping it around.",
    "New fast food line open for business.",
    "UNESCO recognizes area as historic treasure.",
    "Area selected for upcoming film festival.",
    "Massive garage sale upcoming...",
    "Joker schedules new group pissing session.",
    "18 fully clothed cowboys trying to read a good book in GK Marka Marulicha",
    "Lovrinac sponsors FESB racing",
    "Everyone now lives in Lovrinac?"
]

//new news text
const newsText = document.querySelector(".news-text");
function changeNewsText() {
    const i = Math.floor(Math.random() * news.length);
    newsText.textContent = news[i];
}

//delay too big, unsatisfying
/*
const sound = new Audio("./audio/button-press.wav");
sound.preload = "auto";
//button press sfx
function buttonPressSFX(){
    //sound.currentTime=0.15;
    sound.play();
}
*/

//jukebox
const jukeboxSound = new Audio("./audio/pjesma.mp3");
jukeboxSound.loop = true;
jukeboxSound.volume = 0.3;

document.querySelector("#jukebox img").addEventListener("click", () => {
    const jukeboxImg = document.querySelector("#jukebox img");

    if (jukeboxSound.paused) {
        jukeboxSound.play();
        jukeboxImg.classList.add("playing");
    } else {
        jukeboxSound.pause();
        jukeboxImg.classList.remove("playing");
    }
});

//soparnik
let soparnikScore = 0;
const scoreDisplay = document.querySelector("#soparnik-score");
const rainContainer = document.querySelector("#soparnik-rain-container");

function spawnSoparnik() {
if (window.innerWidth < 1024) {
        return; // don't spawn anything below this width
    }

    const soparnik = document.createElement("img");
    soparnik.src = "./slike/soparnik.png";
    soparnik.classList.add("falling-soparnik");
    soparnik.draggable = false;

    const edgeWidth = window.innerWidth * 0.2; // width of the "edge zone" on each side, in pixels — adjust to taste
    const imageWidth = 60;

    // randomly choose left edge or right edge
    const spawnOnLeft = Math.random() < 0.5;

    let randomLeft;
    if (spawnOnLeft) {
        randomLeft = Math.random() * (edgeWidth - imageWidth);
    } else {
        randomLeft = window.innerWidth - edgeWidth + Math.random() * (edgeWidth - imageWidth);
    }

    soparnik.style.left = `${randomLeft}px`;

    const fallDuration = 3 + Math.random() * 4;
    const spinDuration = 1 + Math.random() * 2;

    // randomly choose spin direction
    const spinDirection = Math.random() < 0.5 ? "spin-left" : "spin-right";

    soparnik.style.animation = `fall ${fallDuration}s linear forwards, ${spinDirection} ${spinDuration}s linear infinite`;

    rainContainer.appendChild(soparnik);

    soparnik.addEventListener("mousedown", catchSoparnik);
    soparnik.addEventListener("touchstart", catchSoparnik);

    soparnik.addEventListener("animationend", (e) => {
        if (e.animationName === "fall") {
            soparnik.remove();
        }
    });

    soparnik.addEventListener("mousedown", catchSoparnik);
    soparnik.addEventListener("touchstart", catchSoparnik);

    function catchSoparnik(e) {
        e.preventDefault();

        // get the soparnik's current position before removing it
        const rect = soparnik.getBoundingClientRect();

        spawnExplosionEffect(rect.left, rect.top);

        soparnik.remove();
        soparnikScore++;
        scoreDisplay.textContent = soparnikScore;
    }
}

// spawn a new soparnik every ~800ms
setInterval(spawnSoparnik, 800);



function spawnExplosionEffect(x, y) {
    const explosion = document.createElement("img");
    explosion.src = "./slike/explosion.gif";
    explosion.classList.add("explosion-effect");
    explosion.style.left = `${x}px`;
    explosion.style.top = `${y}px`;

    rainContainer.appendChild(explosion);

    // remove the gif element after it's done playing
    setTimeout(() => {
        explosion.remove();
    }, 600); // adjust to match your GIF's actual duration in milliseconds
}