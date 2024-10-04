const serif = document.getElementById('serif');
const input = document.getElementById('searchBar');
const wordDisplay = document.getElementById('word');
const spellingWord = document.getElementById('pronunciation');

const slider = document.querySelector('.slider');
const buttonPlay = document.getElementById("play");
let audio;

const typeOfWord = document.getElementById("typeOfWord");
const meaningWord = document.getElementById("meaning");
const synonymsWord = document.getElementById("synonyms");
const link = document.getElementById("sourceLink");

function requesting()
{
    const wordA = input.value.trim();  // Get value and delete blank spaces
    alert(wordA);

    // Verify if input is empty
    if (!wordA)
    {
        alert('Please, only words with A.');
        return;
    }

    // API URL request
    const url = `https://od-api-sandbox.oxforddictionaries.com/api/v2/entries/en-gb/${wordA}`;

    // Define headers
    const headers =
    {
        'Accept': 'application/json',
        'app_id': '3e3bb53b',  // Tu app_id
        'app_key': '9be6420317b9a71a16a1e28346a7977f'  // Tu app_key
    };

    // Request to API
    fetch(url, {
        method: 'GET',
        headers: headers
    })
    .then(response => {
        if (!response.ok) {  // Handle http errors
            throw new Error('Request error: ' + response.statusText);
        }
        return response.json();  // Parser response json(It converts response to JSON format)
    })
    .then(data => {
        // Show all json data
        console.log(data);

        // Extraer detalles de pronunciación (if available)
        const pronunciation = data.results[0].lexicalEntries[0].entries[0].pronunciations[0];

        //Extract type of word
        const noun = data.results[0].lexicalEntries[0].lexicalCategory.text;
        const meaning = data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
        // Navigate to the synonyms
        const synonyms = data.results[0].lexicalEntries[0].entries[0].senses[0].synonyms[0].text;
        alert(synonyms);
        
        // Show word and pronunciation
        wordDisplay.textContent = input.value;
        spellingWord.textContent = pronunciation.phoneticSpelling;
        typeOfWord.textContent = noun;
        meaningWord.textContent = '• ' + meaning;
        synonymsWord.textContent = synonyms;
        link.href = url;
        link.textContent = url;
        
        // Play to listen to pronunciation
        audio = new Audio(pronunciation.audioFile);
        
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Word no found'); // Mensaje de error para el usuario
    });
}

// When pressing event it calls requesting function to perform API request
input.addEventListener('keydown', function(event)
{
    if (event.key === 'Enter')
    {
        requesting();  // Call to requesting function
    }
});

//When pressing play button it will play pronunciation
buttonPlay.addEventListener("click", function()
{
    // Play to listen to pronunciation
    audio.play();  // Play pronunciation
});

// Change the background for the selectors by class
function changeBackground(color)
{
    const containers = 
    [
        '.headerContainer',
        '.headerContainerArrow',
        '.switch',
        '.headerContaner_button',
        '.containerSpelling',
        '.containerSpelling-buttonPlay',
        '.typeOfWordContainer',
        '.meaningContainer',
        '.synonymsContainer',
        '.containerSource'
    ];

    // Iterate through each class and apply the new background
    containers.forEach(selector =>
    {
        let elements = document.querySelectorAll(selector);
        elements.forEach(element =>
        {
            element.style.background = color;
        });
    });
}

//////////////////////////////////////////////////////////////
// Change the color for the selectors by class
function changeColor(color)
{
    const containersWords =
    [
        '#serif',
        '#word',
        '#typeOfWord',
        '#meaning',
        '#sourceLink'
    ];

    // Iterate through each class and apply the new background
    containersWords.forEach(selector =>
    {
        let elements = document.querySelectorAll(selector);
        elements.forEach(element =>
        {
            element.style.color = color;
        });
    });

    spellingWord.style.color = "rgb(108, 5, 233)";
}

// Select the checkbox
const checkbox = document.querySelector('.switch input');

// Add an event listener for the checkbox state change
checkbox.addEventListener('change', function() 
{
    if (checkbox.checked) 
    {
        // Call the function to change the background to a specific color
        changeBackground('black');
        changeColor("white");
        slider.style.backgroundColor = 'rgb(108, 5, 233)';
    } 
    else
    {
        // Call the function to change the background to a specific color
        changeBackground('white');
        changeColor("black");
        slider.style.backgroundColor = '#ccc';
    }
});






