/**
 * Rewards System Activation Script
 * Add this script to your index.html to activate and view rewards
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create a rewards button in the game header if it doesn't exist
    function addRewardsButton() {
        const gameHeader = document.querySelector('.game-header');
        if (!gameHeader) return;
        
        // Check if button already exists
        if (document.getElementById('open-rewards-btn')) return;
        
        const rewardsBtn = document.createElement('button');
        rewardsBtn.id = 'open-rewards-btn';
        rewardsBtn.textContent = '🎁 Rewards';
        rewardsBtn.style.backgroundColor = '#ff9800';
        rewardsBtn.style.marginRight = '10px';
        
        // Insert the rewards button before the back button
        const backBtn = document.getElementById('back-to-selection-btn');
        if (gameHeader && backBtn) {
            gameHeader.insertBefore(rewardsBtn, backBtn);
        }
        
        // Add click event to open rewards screen
        rewardsBtn.addEventListener('click', function() {
            openRewardsScreen();
        });
    }
    
    // Function to open rewards screen
    function openRewardsScreen() {
        const rewardsScreen = document.getElementById('rewards-screen');
        
        // If rewards screen doesn't exist, create it
        if (!rewardsScreen) {
            createRewardsScreen();
        }
        
        // Hide game screen and show rewards screen
        document.getElementById('game-screen').classList.remove('active-screen');
        document.getElementById('rewards-screen').classList.add('active-screen');
        
        // Update the rewards display
        if (window.RewardsSystem && typeof RewardsSystem.updateRewardsDisplay === 'function') {
            // Get current score from the display
            const scoreDisplay = document.getElementById('score-display');
            let score = 0;
            if (scoreDisplay) {
                const scoreText = scoreDisplay.textContent;
                score = parseInt(scoreText.replace('Score: ', '')) || 0;
            }
            
            RewardsSystem.updateRewardsDisplay(score);
        }
    }
    
    // Function to create rewards screen if it doesn't exist
    function createRewardsScreen() {
        const appContainer = document.getElementById('app-container');
        if (!appContainer) return;
        
        const rewardsScreen = document.createElement('section');
        rewardsScreen.id = 'rewards-screen';
        rewardsScreen.className = 'screen';
        
        rewardsScreen.innerHTML = `
            <header class="rewards-header">
                <h2>Rewards Center</h2>
                <div id="rewards-score-display">Score: 0</div>
                <button id="back-from-rewards-btn">Back to Game</button>
            </header>
            <div class="rewards-intro">
                <p>Earn points by answering questions correctly to unlock special rewards!</p>
            </div>
            <div id="rewardsGrid">
                <!-- Rewards will be dynamically added here -->
            </div>
        `;
        
        appContainer.appendChild(rewardsScreen);
        
        // Update score in rewards screen
        const scoreDisplay = document.getElementById('score-display');
        const rewardsScoreDisplay = document.getElementById('rewards-score-display');
        if (scoreDisplay && rewardsScoreDisplay) {
            rewardsScoreDisplay.textContent = scoreDisplay.textContent;
        }
        
        // Add back button functionality
        const backFromRewardsBtn = document.getElementById('back-from-rewards-btn');
        if (backFromRewardsBtn) {
            backFromRewardsBtn.addEventListener('click', function() {
                document.getElementById('rewards-screen').classList.remove('active-screen');
                document.getElementById('game-screen').classList.add('active-screen');
            });
        }
    }
    
    // Create an AppCore interface for the rewards system
    const AppCore = {
        // Get the complete game state
        getState() {
            // Get score from UI
            const scoreDisplay = document.getElementById('score-display');
            let score = 0;
            if (scoreDisplay) {
                const scoreText = scoreDisplay.textContent;
                score = parseInt(scoreText.replace('Score: ', '')) || 0;
            }
            
            // Get saved rewards data from localStorage
            let rewards = [];
            let claimedRewards = [];
            try {
                const savedData = localStorage.getItem('familyFunGeminiRewards');
                if (savedData) {
                    const data = JSON.parse(savedData);
                    rewards = data.rewards || [];
                    claimedRewards = data.claimedRewards || [];
                }
            } catch (e) {
                console.error('Error loading saved rewards:', e);
            }
            
            return {
                points: score,
                userLevel: Math.floor(score / 100) + 1, // Simple level calculation
                rewards: rewards,
                claimedRewards: claimedRewards
            };
        },
        
        // Save user data
        saveUserData() {
            const state = this.getState();
            // Save to localStorage for persistence
            localStorage.setItem('familyFunGeminiRewards', JSON.stringify({
                rewards: state.rewards || [],
                claimedRewards: state.claimedRewards || []
            }));
            return true;
        }
    };
    
    // Create a UI interface for the rewards system
    const RewardsUI = {
        updatePoints(points) {
            // Update points display in both game and rewards screens
            const scoreDisplay = document.getElementById('score-display');
            const rewardsScoreDisplay = document.getElementById('rewards-score-display');
            
            if (scoreDisplay) {
                scoreDisplay.textContent = `Score: ${points}`;
            }
            
            if (rewardsScoreDisplay) {
                rewardsScoreDisplay.textContent = `Score: ${points}`;
            }
        }
    };
    
    // Initialize rewards system with our interfaces
    function initializeRewards() {
        if (window.RewardsSystem && typeof RewardsSystem.init === 'function') {
            RewardsSystem.init(AppCore, RewardsUI);
            console.log('Rewards system initialized');
            
            // Add the rewards button to the game header
            addRewardsButton();
            
            // Hook into checkAnswer to update rewards
            hookIntoScoring();
        } else {
            console.error('RewardsSystem not found. Make sure rewards-system.js is loaded.');
        }
    }
    
    // Hook into the game's scoring system
    function hookIntoScoring() {
        // Monitor score changes by observing the score display element
        const scoreDisplay = document.getElementById('score-display');
        if (scoreDisplay) {
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'characterData' || mutation.type === 'childList') {
                        const scoreText = scoreDisplay.textContent;
                        const score = parseInt(scoreText.replace('Score: ', '')) || 0;
                        
                        // Update rewards based on new score
                        if (window.RewardsSystem && typeof RewardsSystem.updateRewardsBasedOnPoints === 'function') {
                            RewardsSystem.updateRewardsBasedOnPoints();
                        }
                    }
                });
            });
            
            observer.observe(scoreDisplay, { 
                characterData: true, 
                childList: true,
                subtree: true
            });
        }
    }
    
    // Wait a moment to ensure rewards-system.js is loaded
    setTimeout(initializeRewards, 500);
});
