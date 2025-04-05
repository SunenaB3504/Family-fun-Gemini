/**
 * Mini-games for Family Chronicle
 * Includes Find the Card and other interactive games
 */

// Function to create a find the card game
export function createFindTheCardGame(container, options, correctAnswer, onComplete) {
    // Clear any existing content
    container.innerHTML = '';
    
    // Create game title
    const gameTitle = document.createElement('h3');
    gameTitle.textContent = 'Find the Card';
    gameTitle.className = 'mini-game-title';
    container.appendChild(gameTitle);
    
    // Create game instructions
    const instructions = document.createElement('p');
    instructions.textContent = 'Click on the card that shows the correct answer!';
    instructions.className = 'mini-game-instructions';
    container.appendChild(instructions);
    
    // Create card container
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    container.appendChild(cardContainer);
    
    // Shuffle the options
    const shuffledOptions = [...options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }
    
    // Create cards for each option
    shuffledOptions.forEach(option => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Create card front (the answer side)
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        cardFront.textContent = option;
        cardFront.style.display = 'none'; // Initially hidden
        
        // Create card back (the question mark side)
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.innerHTML = '<span style="font-size: 36px; color: white;">?</span>';
        
        card.appendChild(cardFront);
        card.appendChild(cardBack);
        
        // Add click event to flip card
        card.addEventListener('click', () => {
            // Don't allow clicks if already flipped
            if (cardFront.style.display !== 'none') return;
            
            // Visual flip effect
            card.style.transform = 'rotateY(180deg)';
            
            // After a short delay, show the answer
            setTimeout(() => {
                cardBack.style.display = 'none';
                cardFront.style.display = 'flex';
                
                // Check if answer is correct
                const isCorrect = option === correctAnswer;
                
                // Highlight card as correct or incorrect
                if (isCorrect) {
                    card.classList.add('card-correct');
                    card.style.borderColor = '#4CAF50';
                    card.style.boxShadow = '0 0 10px #4CAF50';
                } else {
                    card.classList.add('card-incorrect');
                    card.style.borderColor = '#F44336';
                }
                
                // After showing result, proceed to next question
                setTimeout(() => {
                    if (typeof onComplete === 'function') {
                        onComplete(isCorrect);
                    }
                }, 1500);
                
            }, 500);
        });
        
        cardContainer.appendChild(card);
    });
    
    // Show the mini-game
    container.classList.remove('hidden');
}

// Function to create memory card game
export function createMemoryCardGame(container, items, onComplete) {
    // Implementation for memory game would go here
    // Similar structure to Find the Card game but with matching pairs
}

// Add more mini-games as needed
