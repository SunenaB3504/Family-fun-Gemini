// js/ui.js
// Functions for updating the User Interface

import * as dom from './domElements.js';
import * as state from './state.js';
import { familyData } from './data.js';
// *** Removed import of returnToFamilySelection and handleFriendSubmit as listeners are now in main.js ***
import { selectFamilyMember, handleAnswer } from './gameLogic.js'; // Import needed game logic functions


// Show/Hide Screens
export function showScreen(screenId) {
    Object.values(dom.screens).forEach(screen => screen.classList.remove('active-screen'));
    if (dom.screens[screenId]) {
        dom.screens[screenId].classList.add('active-screen');
        state.setCurrentScreen(screenId); // Update state
    } else {
         console.error("Screen ID not found:", screenId);
         dom.screens.selection.classList.add('active-screen'); // Fallback
         state.setCurrentScreen('selection');
    }
}

// Populate Family Selection Buttons
export function populateFamilySelection() {
    dom.familyButtonsContainer.innerHTML = ''; // Clear existing buttons
    Object.keys(familyData).forEach(name => {
        const button = document.createElement('button');
        button.textContent = name;
        button.dataset.memberName = name;
        button.addEventListener('click', () => selectFamilyMember(name)); // Call imported function
        dom.familyButtonsContainer.appendChild(button);
    });
}

// Update Score Display
export function updateScoreDisplay() {
    dom.scoreDisplay.textContent = `Score: ${state.score}`;
}

// Update Progress Bar
export function updateProgressBar() {
    const totalQuestions = state.currentMemberQuestions.length > 0 ? state.currentMemberQuestions.length : 1;
    const progress = totalQuestions > 0 ? (state.currentQuestionIndex / totalQuestions) * 100 : 0;
    dom.progressBar.style.width = `${progress}%`;
    dom.progressBar.textContent = `${Math.round(progress)}%`;
}

// Show Feedback Message
export function showFeedback(isCorrect, correctAnswer) {
    dom.feedbackArea.className = isCorrect ? 'feedback-correct' : 'feedback-incorrect';
    if (isCorrect) {
        const messages = ["Correct!", "Awesome!", "You got it!", "Great memory!", "Excellent!"];
        dom.feedbackArea.textContent = messages[Math.floor(Math.random() * messages.length)];
    } else {
         dom.feedbackArea.textContent = `Not quite. The answer was ${correctAnswer}.`;
    }
}

// Create Answer Options Dynamically
export function createAnswerOptions(question) {
    dom.answerOptionsContainer.innerHTML = ''; // Clear previous options

    if (question.inputType === 'number') {
        const input = document.createElement('input');
        input.type = 'number';
        input.id = 'number-answer-input';
        input.min = 0;
        dom.answerOptionsContainer.appendChild(input);

        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Submit';
        submitBtn.addEventListener('click', () => {
            const value = parseInt(input.value, 10);
            if (!isNaN(value)) {
                handleAnswer(value, question); // Call imported handler from gameLogic.js
            } else {
                dom.feedbackArea.textContent = "Please enter a number.";
                dom.feedbackArea.className = 'feedback-prompt';
            }
        });
        dom.answerOptionsContainer.appendChild(submitBtn);

    } else if (question.options) { // Check if options exist (for multiple choice)
        const options = question.options // Use original order or shuffle if desired: shuffleArray([...question.options]);
        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => handleAnswer(option, question)); // Call imported handler from gameLogic.js
            dom.answerOptionsContainer.appendChild(button);
        });
    }
    // If it's a drag-drop question type, this function might not add anything,
    // as the setup is handled in implementDragAndDropSequence
}

// Update Badges Display
export function updateBadgesDisplay() {
    if (state.earnedBadges.length > 0) {
        dom.badgesDisplayList.textContent = state.earnedBadges.join(', ');
    } else {
        dom.badgesDisplayList.textContent = 'None yet!';
    }
}

// Set up drag and drop sequence mini-game
export function implementDragAndDropSequence(items, correctOrder) {
    // Get the mini-game area and show it
    dom.miniGameArea.innerHTML = '';
    dom.miniGameArea.classList.remove('hidden');
    
    // Add title to the mini-game
    const title = document.createElement('h3');
    title.textContent = 'Order the Items!';
    dom.miniGameArea.appendChild(title);
    
    // Create source container for draggable items
    const sourceContainer = document.createElement('div');
    sourceContainer.className = 'drag-container source-container';
    sourceContainer.id = 'draggable-source';
    dom.miniGameArea.appendChild(sourceContainer);
    
    // Create shuffled items
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);
    shuffledItems.forEach(item => {
        const draggable = document.createElement('div');
        draggable.className = 'draggable-item';
        draggable.textContent = item;
        draggable.draggable = true;
        draggable.addEventListener('dragstart', (e) => {
            draggable.classList.add('dragging');
            e.dataTransfer.setData('text/plain', item);
        });
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
        sourceContainer.appendChild(draggable);
    });
    
    // Create target container with drop zones
    const targetContainer = document.createElement('div');
    targetContainer.className = 'drag-container target-container';
    dom.miniGameArea.appendChild(targetContainer);
    
    // Add drop zones
    for (let i = 0; i < items.length; i++) {
        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.dataset.position = i;
        
        // Handle drop events
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.style.backgroundColor = '#e6f2ff';
        });
        
        dropZone.addEventListener('dragleave', () => {
            dropZone.style.backgroundColor = '#fff';
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            const item = e.dataTransfer.getData('text/plain');
            
            // Only allow drop if zone is empty
            if (dropZone.textContent === '') {
                dropZone.textContent = item;
                dropZone.style.backgroundColor = '#fff';
                
                // Remove from source if it was dropped
                const sourceItems = sourceContainer.querySelectorAll('.draggable-item');
                sourceItems.forEach(sourceItem => {
                    if (sourceItem.textContent === item) {
                        sourceItem.remove();
                    }
                });
                
                // Check if all items are placed
                checkDragAndDropCompletion(correctOrder);
            }
        });
        
        targetContainer.appendChild(dropZone);
    }
    
    // Add check button
    const checkButton = document.createElement('button');
    checkButton.textContent = 'Check Order';
    checkButton.addEventListener('click', () => {
        checkDragAndDropCompletion(correctOrder);
    });
    dom.miniGameArea.appendChild(checkButton);
}

// Check if drag and drop sequence is correct
function checkDragAndDropCompletion(correctOrder) {
    const dropZones = document.querySelectorAll('.drop-zone');
    const currentOrder = Array.from(dropZones).map(zone => zone.textContent);
    
    // Only check if all zones are filled
    if (!currentOrder.includes('')) {
        const isCorrect = correctOrder.every((item, index) => item === currentOrder[index]);
        
        if (isCorrect) {
            showFeedback(true, '');
            // Could trigger next question or award points here
        } else {
            showFeedback(false, correctOrder.join(' → '));
        }
    }
}

// *** The addCoreEventListeners function is REMOVED from this file ***