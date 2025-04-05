/**
 * Friend Check Functionality
 * This module handles the "Check with a friend" feature
 */

// Function to handle checking with a friend
function checkWithFriend() {
    // Get the current question or screen content
    const currentScreen = document.querySelector('.active-screen');
    if (!currentScreen) return;
    
    // Check if friend-check-modal exists
    let modal = document.getElementById('friend-check-modal');
    
    // Create modal if it doesn't exist
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'friend-check-modal';
        modal.className = 'friend-modal';
        
        const modalContent = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Check with a Friend</h3>
                <p>Show this to your friend or family member:</p>
                <div class="friend-question-box"></div>
                <div class="friend-controls">
                    <button id="friend-correct">They got it right!</button>
                    <button id="friend-incorrect">Try again</button>
                </div>
            </div>
        `;
        
        modal.innerHTML = modalContent;
        document.body.appendChild(modal);
        
        // Set up event listeners for modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        document.getElementById('friend-correct').addEventListener('click', () => {
            handleFriendResponse(true);
        });
        
        document.getElementById('friend-incorrect').addEventListener('click', () => {
            handleFriendResponse(false);
        });
    }
    
    // Get current question content and display in modal
    const questionContent = currentScreen.querySelector('h2, p:first-of-type').textContent;
    modal.querySelector('.friend-question-box').textContent = questionContent;
    
    // Display the modal
    modal.style.display = 'block';
}

// Handle friend's response
function handleFriendResponse(isCorrect) {
    const modal = document.getElementById('friend-check-modal');
    
    if (isCorrect) {
        // Friend got it right
        let feedbackEl = document.createElement('div');
        feedbackEl.className = 'feedback-correct';
        feedbackEl.textContent = 'Great job! Your friend got it right!';
        
        // Add a small bonus to progress if applicable
        if (typeof updateProgress === 'function') {
            updateProgress(5); // Give a small bonus to progress
        }
        
        modal.querySelector('.modal-content').appendChild(feedbackEl);
        
        // Close modal after delay
        setTimeout(() => {
            modal.style.display = 'none';
        }, 2000);
    } else {
        // Friend got it wrong
        let feedbackEl = document.createElement('div');
        feedbackEl.className = 'feedback-incorrect';
        feedbackEl.textContent = 'That\'s okay! Keep trying!';
        
        modal.querySelector('.modal-content').appendChild(feedbackEl);
    }
}

// Initialize check with a friend buttons
function initCheckWithFriendButtons() {
    const checkButtons = document.querySelectorAll('.check-with-friend-btn');
    
    checkButtons.forEach(button => {
        button.addEventListener('click', checkWithFriend);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCheckWithFriendButtons);
