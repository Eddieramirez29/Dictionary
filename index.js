// Define the API URL
const url = 'https://od-api-sandbox.oxforddictionaries.com/api/v2/entries/en-gb/ace';

// Define your headers
const headers = {
  'Accept': 'application/json',
  'app_id': '3e3bb53b',  // Your app_id
  'app_key': '9be6420317b9a71a16a1e28346a7977f'  // Your app_key
};

// Make the API request using fetch
fetch(url, {
  method: 'GET',
  headers: headers
})
  .then(response => response.json())  // Parse the JSON response
  .then(data => {
    // Log the entire data
    console.log(data);

    // Extract pronunciation details (if available)
    const pronunciation = data.results[0].lexicalEntries[0].entries[0].pronunciations[0];
    
    // Log the phonetic spelling and audio file URL
    console.log(`Phonetic Spelling: ${pronunciation.phoneticSpelling}`);
    console.log(`Audio File URL: ${pronunciation.audioFile}`);
    
    // Optional: Play the pronunciation audio (in a browser environment)
    const audio = new Audio(pronunciation.audioFile);
    // audio.play();
  })
  .catch(error => {
    console.error('Error:', error);
  });
