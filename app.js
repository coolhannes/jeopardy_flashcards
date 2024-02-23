const flashcardContainer = document.getElementById('flashcard');
const nextButton = document.getElementById('next-btn');

let currentClue = {
    category: '',
    clue: '',
    solution: ''
};

nextButton.addEventListener('click', () => {
    if (nextButton.textContent === 'Show Solution') {
        showSolution();
    } else {
        fetchRandomClue();
    }
});


async function fetchRandomClue() {
    try {
        const response = await fetch('json_files/combined_questions.json');
        if (!response.ok) {
            throw new Error('Failed to fetch JSON file');
        }
        const data = await response.json();
        
        // Extract keys (dates) from the JSON object
        const dates = Object.keys(data);
        
        // Randomly select a date
        const randomDate = dates[Math.floor(Math.random() * dates.length)];
        
        // Get the array of clues for the randomly selected date
        const clues = data[randomDate];
        
        // Randomly select a clue from the array
        const randomClue = clues[Math.floor(Math.random() * clues.length)];

        currentClue = {
            category: randomClue.category,
            clue: randomClue.clue,
            solution: randomClue.solution
        };

        //console.log('currentClue:', currentClue); // Log the current clue object

        showClue(currentClue);
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

function showClue() {
    flashcardContainer.innerHTML = `
        <h2>${currentClue.category}</h2>
        <p><strong>Clue:</strong> ${currentClue.clue}</p>
    `;
    nextButton.textContent = 'Show Solution';
}

function showSolution() {
    flashcardContainer.innerHTML += `
        <p><strong>Solution:</strong> ${currentClue.solution}</p>
    `;
    nextButton.textContent = 'Next Clue';
}

// Initial setup
async function initialize() {
    await fetchRandomClue();
}

initialize();
