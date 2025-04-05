// js/main.js
// Main entry point for the application

// Import necessary functions from different modules
import { initSqlJsDb, handleFriendSubmit } from './friendCheck.js';
import { populateFamilySelection, showScreen, updateScoreDisplay, updateProgressBar, updateBadgesDisplay } from './ui.js';
import { returnToFamilySelection } from './gameLogic.js';
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