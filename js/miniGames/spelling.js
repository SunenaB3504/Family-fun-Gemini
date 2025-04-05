// js/miniGames/spelling.js
import * as dom from '../domElements.js';
import { nextQuestion } from '../gameLogic.js'; // Import next step

export function triggerSpellingTask(word) {
     console.log(`Starting Spelling task for "${word}"`);
     dom.miniGameArea.innerHTML = '';
     dom.miniGameArea.classList.remove('hidden');

     const title = document.createElement('h3');
     title.textContent = 'Mini-Game: Spell the Word!';
     dom.miniGameArea.appendChild(title);

     const vowels = "aeiou";
     let promptText = word.split('').map((char, index) => {
         if (index > 0 && vowels.includes(char.toLowerCase())) return '_';
         return char;
     }).join('');
     if (!promptText.includes('_') && word.length > 2) {
          promptText = word[0] + '_' + word.substring(2);
     }

     const promptDisplay = document.createElement('span');
     promptDisplay.id = 'spelling-prompt';
     promptDisplay.textContent = promptText;
     dom.miniGameArea.appendChild(promptDisplay);

     const input = document.createElement('input');
     input.type = 'text';
     input.id = 'spelling-input';
     input.setAttribute('aria-label', 'Enter the full spelling');
     input.maxLength = word.length + 2;
     dom.miniGameArea.appendChild(input);

     const checkButton = document.createElement('button');
     checkButton.textContent = 'Check Spelling';
     dom.miniGameArea.appendChild(checkButton);

     const feedback = document.createElement('p');
     feedback.id = 'spelling-feedback';
     dom.miniGameArea.appendChild(feedback);

     checkButton.addEventListener('click', () => {
        const userAnswer = input.value.trim();
        if (userAnswer.toLowerCase() === word.toLowerCase()) {
            feedback.textContent = 'Perfect Spelling!';
            feedback.className = 'feedback-correct';
            input.disabled = true;
            checkButton.disabled = true;
            setTimeout(nextQuestion, 1500); // Use imported function
        } else {
             feedback.textContent = 'Try again! Check the spelling carefully.';
             feedback.className = 'feedback-incorrect';
             input.focus();
        }
     });

      input.addEventListener('keypress', function(event) {
          if (event.key === 'Enter') {
              event.preventDefault();
              checkButton.click();
          }
      });
     input.focus();
 }