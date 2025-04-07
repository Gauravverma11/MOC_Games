// Get references to HTML elements
const button = document.getElementById('randomButton'); // Random button element
const result = document.getElementById('result'); // Result display element
const inputArea = document.querySelector('.input-area'); // Input area container
const userInput = document.getElementById('userInput'); // User input field
const submitButton = document.getElementById('submitButton'); // Submit button
const timerDisplay = document.getElementById('timer'); // Timer display element
const displayBox = document.createElement('div'); // Div for displaying user input
const heading = document.createElement('h3'); // Heading for the display box
const separator = document.createElement('div'); // Separator line between heading and input

// Set heading text and style
heading.textContent = 'Your Input'; // Set heading text
heading.style.textAlign = 'center'; // Center heading text
displayBox.appendChild(heading); // Add heading to display box

// Style the separator line
separator.style.width = '100%'; // Set separator width to 100%
separator.style.height = '1px'; // Set separator height to 1px
separator.style.background = 'rgba(0, 255, 0, 0.5)'; // Set separator background color (neon green)
separator.style.backdropFilter = 'blur(4px)'; // Add blur effect to separator
separator.style.webkitBackdropFilter = 'blur(4px)'; // Add blur effect for Safari compatibility
separator.style.margin = '10px 0'; // Add margin to separator
displayBox.appendChild(separator); // Add separator to display box

// Style the display box
displayBox.style.position = 'fixed'; // Set display box position to fixed
displayBox.style.bottom = '20px'; // Set display box bottom position
displayBox.style.left = '20px'; // Set display box left position
displayBox.style.padding = '20px'; // Add padding to display box
displayBox.style.background = 'rgba(0, 0, 0, 0.8)'; // Set display box background color (dark)
displayBox.style.borderRadius = '16px'; // Set display box border radius
displayBox.style.boxShadow = '0 4px 30px rgba(0, 255, 0, 0.3)'; // Add neon green glow to display box
displayBox.style.backdropFilter = 'blur(8px)'; // Add blur effect to display box
displayBox.style.webkitBackdropFilter = 'blur(8px)'; // Add blur effect for Safari compatibility
displayBox.style.color = '#00ff00'; // Set display box text color (neon green)
displayBox.style.display = 'none'; // Initially hide the display box
displayBox.style.width = '300px'; // Set display box width
document.body.appendChild(displayBox); // Add display box to the document body

let countdownInterval; // Variable to store countdown interval

// Event listener for the random button click
button.addEventListener('click', () => {
    // Fetch data from data.json
    fetch('data.json')
        .then(response => {
            // Check if response is successful
            if (!response.ok) throw new Error('Failed to fetch data.json');
            return response.json(); // Parse response as JSON
        })
        .then(data => {
            // Check if required fields exist in the JSON data
            if (!data.alphabet || !data.genre || !data.origin) {
                throw new Error('Missing fields in data.json');
            }

            // Select random values from the JSON data
            const alphabet = data.alphabet[Math.floor(Math.random() * data.alphabet.length)];
            const genre = data.genre[Math.floor(Math.random() * data.genre.length)];
            const origin = data.origin[Math.floor(Math.random() * data.origin.length)];

            // Display the random data
            result.textContent = `Alphabet: ${alphabet} | Genre: ${genre} | Origin: ${origin}`;
            result.classList.add('fade-in'); // Add fade-in animation

            // Show input area and enable input elements
            inputArea.style.display = 'block';
            userInput.disabled = false;
            userInput.value = '';
            submitButton.disabled = false;

            // Start the 20-second timer
            startTimer(20);
        })
        .catch(error => {
            // Handle fetch errors
            console.error('Fetch error:', error);
            result.textContent = '⚠️ Error loading data.';
        });
});

// Event listener for the submit button click
submitButton.addEventListener('click', () => {
    // Get trimmed input value
    const inputValue = userInput.value.trim();
    if (inputValue) {
        // Clear previous display box content
        displayBox.textContent = '';
        // Add heading to display box
        displayBox.appendChild(heading);
        // Add separator line to display box
        displayBox.appendChild(separator);
        // Create paragraph element for input value
        const inputParagraph = document.createElement('p');
        // Set input paragraph text content
        inputParagraph.textContent = inputValue;
        // Center input paragraph text
        inputParagraph.style.textAlign = 'center';
        // Set input paragraph text color (neon green)
        inputParagraph.style.color = '#00ff00';
        // Add input paragraph to display box
        displayBox.appendChild(inputParagraph);
        // Show the display box
        displayBox.style.display = 'block';
        // Add fade-in animation
        displayBox.classList.add('fade-in');
        // Stop the timer
        clearInterval(countdownInterval);
        // Hide the input area
        inputArea.style.display = 'none';
    }
});

// Function to start the timer
function startTimer(seconds) {
    let timeLeft = seconds; // Initialize time left
    timerDisplay.textContent = `Time left: ${timeLeft}s`; // Display initial time left
    timerDisplay.style.color = '#00ff00'; // Set timer text color (neon green)

    clearInterval(countdownInterval); // Stop previous timer if running

    // Start countdown interval
    countdownInterval = setInterval(() => {
        timeLeft--; // Decrement time left
        timerDisplay.textContent = `Time left: ${timeLeft}s`; // Update timer display

        // Check if time is up
        if (timeLeft <= 0) {
            clearInterval(countdownInterval); // Stop timer
            timerDisplay.textContent = '⏰ Time is up!'; // Display time up message
            inputArea.style.display = 'none'; // Hide input area
        }
    }, 1000); // Update every 1 second
}
