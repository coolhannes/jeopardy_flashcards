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
        const response = await fetch('json_files/files_list.json');
        if (!response.ok) {
            throw new Error('Failed to fetch JSON file');
        }
        const fileList = await response.json();
        const randomIndex = Math.floor(Math.random() * fileList.length);
        const randomJSONFile = fileList[randomIndex];
        const jsonDataResponse = await fetch(randomJSONFile);
        if (!jsonDataResponse.ok) {
            throw new Error('Failed to fetch JSON data');
        }
        const jsonData = await jsonDataResponse.json();
        const game = jsonData.game;
        const phases = Object.keys(game);
        const randomPhaseKey = phases[Math.floor(Math.random() * phases.length)];
        const randomPhase = game[randomPhaseKey];

        if (randomPhase.category) {

            currentClue = {
                category: randomPhase.category,
                clue: randomPhase.clue,
                solution: randomPhase.solution
            };

        } else {

            const randomCategoryIndex = Math.floor(Math.random() * randomPhase.length);
            
            const randomCategory = randomPhase[randomCategoryIndex];
            console.log('randomCategory:', randomCategory);
            
            const randomClues = randomCategory.clues;
            console.log('randomClues:', randomClues);
            
            const randomClueIndex = Math.floor(Math.random() * randomClues.length);
            const randomClue = randomClues[randomClueIndex];
            
            console.log('randomClue:', randomClue); // Log the random clue object

            currentClue = {
                category: randomCategory.category,
                clue: randomClue.clue,
                solution: randomClue.solution
            };
        }

        showClue();
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

