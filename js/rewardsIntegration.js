/**
 * Rewards Integration Module
 * Connects the Game State with the Rewards System
 */

import * as state from './state.js';
import * as ui from './ui.js';

// Create an app core interface for the rewards system
const AppCore = {
    // Get the complete game state
    getState() {
        return {
            points: state.score,
            userLevel: Math.floor(state.score / 100) + 1, // Simple level calculation
            rewards: state.earnedRewards || [],
            claimedRewards: state.claimedRewards || []
        };
    },
    
    // Add points to the score
    addPoints(points) {
        state.addScore(points);
        return state.score;
    },
    
    // Save user data
    saveUserData() {
        // Save to localStorage for persistence
        localStorage.setItem('familyFunGeminiState', JSON.stringify({
            score: state.score,
            earnedRewards: state.earnedRewards || [],
            claimedRewards: state.claimedRewards || []
        }));
        return true;
    },
    
    // Load user data from storage
    loadUserData() {
        const savedData = localStorage.getItem('familyFunGeminiState');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                state.setScore(data.score || 0);
                state.earnedRewards = data.earnedRewards || [];
                state.claimedRewards = data.claimedRewards || [];
                return true;
            } catch (e) {
                console.error('Error loading saved data:', e);
                return false;
            }
        }
        return false;
    }
};

// Create a UI interface for the rewards system
const RewardsUI = {
    updatePoints(points) {
        // Update points display in both game and rewards screens
        document.getElementById('score-display').textContent = `Score: ${points}`;
        document.getElementById('rewards-score-display').textContent = `Score: ${points}`;
        
        // Update badges display
        ui.updateBadgesDisplay();
    }
};

// Initialize the rewards system with our app interfaces
export function initializeRewards() {
    // First load any saved user data
    AppCore.loadUserData();
    
    // Initialize the rewards system with our interfaces
    RewardsSystem.init(AppCore, RewardsUI);
    
    // Set up the rewards button in the game screen
    setupRewardsButton();
    
    console.log('Rewards system initialized');
    
    return {
        AppCore,
        RewardsUI
    };
}

// Set up the rewards button and navigation
function setupRewardsButton() {
    // Add a rewards button to the game header
    const gameHeader = document.querySelector('.game-header');
    const rewardsBtn = document.createElement('button');
    rewardsBtn.id = 'open-rewards-btn';
    rewardsBtn.textContent = '🎁 Rewards';
    rewardsBtn.classList.add('rewards-button');
    
    // Insert the rewards button before the back button
    const backBtn = document.getElementById('back-to-selection-btn');
    if (gameHeader && backBtn) {
        gameHeader.insertBefore(rewardsBtn, backBtn);
    }
    
    // Add click event to open rewards screen
    rewardsBtn.addEventListener('click', function() {
        document.getElementById('game-screen').classList.remove('active-screen');
        document.getElementById('rewards-screen').classList.add('active-screen');
        
        // Update the rewards display when opening the screen
        RewardsSystem.updateRewardsDisplay(state.score);
    });
    
    // Add back button functionality
    const backFromRewardsBtn = document.getElementById('back-from-rewards-btn');
    if (backFromRewardsBtn) {
        backFromRewardsBtn.addEventListener('click', function() {
            document.getElementById('rewards-screen').classList.remove('active-screen');
            document.getElementById('game-screen').classList.add('active-screen');
        });
    }
}

// Function to add points and trigger rewards updates
export function addPoints(points) {
    state.addScore(points);
    RewardsUI.updatePoints(state.score);
    
    // Check for new rewards
    RewardsSystem.updateRewardsBasedOnPoints();
    
    return state.score;
}
