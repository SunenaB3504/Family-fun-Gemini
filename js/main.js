// js/main.js - Main entry point for the application

// Import necessary functions from different modules
import { initSqlJsDb, handleFriendSubmit } from './friendCheck.js';
import { populateFamilySelection, showScreen, updateScoreDisplay, updateProgressBar, updateBadgesDisplay } from './ui.js';
import { startGame, returnToFamilySelection } from './gameLogic.js'; 
import { initializeHints } from './hintSystem.js';
import * as dom from './domElements.js';
import * as state from './state.js';

// Initialize the different parts of the application
function initializeApp() {
    console.log("Initializing Family Chronicle App...");

    // Setup UI elements and initial state displays
    populateFamilySelection();
    updateScoreDisplay();
    updateProgressBar(); // Initialize progress bar visually
    updateBadgesDisplay();
    
    // Initialize the hint system
    initializeHints();

    // --- Add Core Event Listeners Directly Here ---
    // Use imported DOM elements and handler functions
    dom.checkFriendBtn.addEventListener('click', () => showScreen('check-friend')); // Change 'friend' to 'check-friend'

    dom.backToSelectionBtn.addEventListener('click', returnToFamilySelection); // Use imported handler

    dom.cancelFriendCheckBtn.addEventListener('click', () => {
        // Logic uses imported state and UI function
        const targetScreen = state.selectedFamilyMember ? 'game' : 'selection';
        showScreen(targetScreen);
    });

    dom.submitFriendInfoBtn.addEventListener('click', handleFriendSubmit); // Use imported handler
    // --- End Event Listener Setup ---

    // Initialize offline database for friend feature
    initSqlJsDb(); // Use imported function

    // Show the initial screen
    showScreen('selection'); // Use imported UI function

    console.log("App Initialized.");
}

// Wait for the DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', initializeApp);

// Add this to your existing rendering function where question types are handled
function nextQuestion() {
    // ...existing code...
    
    // Handle different question types
    switch(question.type) {
        // ...existing cases...
        
        case 'weekday_drag_sequence':
        case 'month_drag_sequence':
        case 'season_drag_sequence':
        case 'zodiac_drag_sequence':
        case 'leap_year_sequence':
            renderDragSequence(question, answerOptionsArea);
            break;
            
        // ...more existing cases...
    }
}

// Add or modify this function to handle the new sequence games
function renderDragSequence(question, container) {
    container.innerHTML = '';
    
    // Create instruction text
    const instructionText = document.createElement('p');
    instructionText.textContent = question.text;
    instructionText.className = 'sequence-instruction';
    container.appendChild(instructionText);
    
    // Add helper text if available
    if (question.helperText) {
        const helperText = document.createElement('p');
        helperText.textContent = question.helperText;
        helperText.className = 'sequence-helper-text';
        helperText.style.fontStyle = 'italic';
        helperText.style.fontSize = '0.9rem';
        container.appendChild(helperText);
    }
    
    // Create source container for draggable items
    const sourceContainer = document.createElement('div');
    sourceContainer.className = 'drag-container source-container';
    
    // Create scrambled items
    const scrambledItems = [...question.items];
    shuffleArray(scrambledItems);
    
    scrambledItems.forEach(item => {
        const dragItem = document.createElement('div');
        dragItem.textContent = item;
        dragItem.className = 'draggable-item';
        dragItem.setAttribute('draggable', true);
        dragItem.addEventListener('dragstart', handleDragStart);
        sourceContainer.appendChild(dragItem);
    });
    
    // Create target container with drop zones
    const targetContainer = document.createElement('div');
    targetContainer.className = 'drag-container target-container';
    
    for (let i = 0; i < question.items.length; i++) {
        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.setAttribute('data-position', i);
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('drop', (e) => handleDrop(e, question));
        targetContainer.appendChild(dropZone);
    }
    
    container.appendChild(sourceContainer);
    container.appendChild(targetContainer);
    
    // Add check button
    const checkButton = document.createElement('button');
    checkButton.textContent = 'Check Order';
    checkButton.className = 'sequence-check-btn';
    checkButton.addEventListener('click', () => checkSequenceOrder(question));
    container.appendChild(checkButton);
}

// Add these helper functions if they don't already exist
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.textContent);
    e.target.classList.add('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

function handleDrop(e, question) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const data = e.dataTransfer.getData('text/plain');
    const draggingElement = document.querySelector('.dragging');
    
    if (draggingElement) {
        draggingElement.classList.remove('dragging');
    }
    
    // Check if drop zone already has an item
    if (e.currentTarget.children.length === 0) {
        const newElement = document.createElement('div');
        newElement.textContent = data;
        newElement.className = 'draggable-item';
        newElement.setAttribute('draggable', true);
        newElement.addEventListener('dragstart', handleDragStart);
        e.currentTarget.appendChild(newElement);
        
        // Remove from source container if it's there
        const sourceItems = document.querySelectorAll('.source-container .draggable-item');
        sourceItems.forEach(item => {
            if (item.textContent === data && item !== draggingElement) {
                item.remove();
            }
        });
    }
}

function checkSequenceOrder(question) {
    const dropZones = document.querySelectorAll('.drop-zone');
    const userSequence = [];
    
    dropZones.forEach(zone => {
        if (zone.children.length > 0) {
            userSequence.push(zone.children[0].textContent);
        }
    });
    
    // Check if all zones are filled
    if (userSequence.length !== question.items.length) {
        showFeedback(false, 'Please place all items in order');
        return;
    }
    
    // Check if sequence is correct
    const isCorrect = JSON.stringify(userSequence) === JSON.stringify(question.items);
    
    showFeedback(
        isCorrect, 
        isCorrect ? 'Correct! That\'s the right order.' : 'Not quite right. Try again!'
    );
    
    if (isCorrect) {
        score += 10;
        updateScore();
        
        // After a delay, show next question
        setTimeout(() => {
            nextQuestion();
        }, 2000);
    }
}

// Helper function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}