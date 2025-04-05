// js/miniGames/findCard.js
import * as dom from '../domElements.js';
import { shuffleArray, getSequenceDistractors } from '../utils.js';
import { triggerSpellingTask } from './spelling.js'; // Import next step
import { nextQuestion } from '../gameLogic.js'; // Import fallback step

export function showFindSequenceCardMiniGame(type, correctItem) {
    console.log(`Starting 'Find the Sequence Card' for ${type} with answer ${correctItem}`);
    dom.miniGameArea.innerHTML = ''; // Clear previous content
    dom.miniGameArea.classList.remove('hidden');

    const distractors = getSequenceDistractors(correctItem, type, 3); // Use imported helper
    if (distractors.length < 2) {
        console.warn("Not enough distractors found for sequence card game.");
        triggerSpellingTask(correctItem); // Fallback to spelling task
        return;
    }

    const itemsToShow = shuffleArray([correctItem, ...distractors]); // Use imported helper

    const title = document.createElement('h3');
    title.textContent = 'Mini-Game: Find the Card!';
    dom.miniGameArea.appendChild(title);

    const instruction = document.createElement('p');
    instruction.innerHTML = `Click on the card that says: <strong>${correctItem}</strong>`;
    dom.miniGameArea.appendChild(instruction);

    const cardContainer = document.createElement('div');
    cardContainer.id = 'card-container';
    dom.miniGameArea.appendChild(cardContainer);

    itemsToShow.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('sequence-card');
        card.textContent = item;
        card.dataset.item = item;

        card.addEventListener('click', (event) => {
            cardContainer.querySelectorAll('.sequence-card').forEach(c => c.style.pointerEvents = 'none');

            const clickedItem = event.target.dataset.item;
            const isCardCorrect = clickedItem.toLowerCase() === correctItem.toLowerCase();

            if (isCardCorrect) {
                event.target.classList.add('reveal-correct');
                instruction.textContent = 'Well done!';
                setTimeout(() => triggerSpellingTask(correctItem), 1500); // Use imported function
            } else {
                event.target.classList.add('reveal-incorrect');
                instruction.textContent = `Not quite! The answer was ${correctItem}.`;
                const correctCard = cardContainer.querySelector(`.sequence-card[data-item="${correctItem}"]`);
                if(correctCard) correctCard.classList.add('reveal-correct');
                setTimeout(nextQuestion, 2500); // Use imported function
            }
        }, { once: true });

        cardContainer.appendChild(card);
    });
}