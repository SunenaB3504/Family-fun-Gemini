// Simple vanilla JavaScript implementation that uses data.js

// Immediately load data from data.js
let familyData = {};
let questionBank = {};

// Wait for page to fully load before running script
window.onload = function() {
    console.log("Window loaded");
    loadDataThenInitialize();
};

// Function to load data from data.js
function loadDataThenInitialize() {
    console.log("Loading data from data.js");
    
    // Use a simple script import approach
    const script = document.createElement('script');
    script.src = 'js/data.js';
    script.type = 'text/javascript'; // Use standard JavaScript, not module
      
    script.onload = function() {
        console.log("data.js loaded successfully");
        
        // Check if familyData and questionBank are available globally
        if (window.familyData && window.questionBank) {
            familyData = window.familyData;
            questionBank = window.questionBank;
            console.log("Data loaded from global scope:", Object.keys(familyData));
            initializeApp();
        } else {
            // Try alternative loading method
            import('./data.js')
                .then(module => {
                    familyData = module.familyData;
                    questionBank = module.questionBank;
                    console.log("Data loaded via import:", Object.keys(familyData));
                    initializeApp();
                })
                .catch(error => {
                    console.error("Error importing data.js:", error);
                    // Continue with initialization anyway using whatever data we have
                    initializeApp();
                });
        }
    };
    
    script.onerror = function() {
        console.error("Failed to load data.js");
        // Fall back to hardcoded data
        initializeApp();
    };
    
    // Add script to document head (only once)
    document.head.appendChild(script);
}

// Main application initialization
function initializeApp() {
    console.log("App initializing...");
    
    // Elements
    const familySelectionScreen = document.getElementById('family-selection-screen');
    const gameScreen = document.getElementById('game-screen');
    const familyMemberButtons = document.querySelectorAll('.family-member-btn');
    const backToSelectionBtn = document.getElementById('back-to-selection-btn');
    const memberInfoDisplay = document.getElementById('member-info-display');
    const questionText = document.getElementById('question-text');
    const answerOptions = document.getElementById('answer-options');
    const scoreDisplay = document.getElementById('score-display');
    const progressBar = document.getElementById('progress-bar');
    
    console.log("Found family member buttons:", familyMemberButtons.length);
    
    // Game state
    let currentMember = null;
    let score = 0;
    let currentQuestionIndex = 0;
    
    // Set up family member buttons using the data from data.js
    console.log("Setting up family member buttons");
    for (let i = 0; i < familyMemberButtons.length; i++) {
        const btn = familyMemberButtons[i];
        const memberKey = btn.getAttribute('data-member');
        // Convert to proper case for data.js (e.g., "mom" -> "Mom")
        const dataKey = memberKey.charAt(0).toUpperCase() + memberKey.slice(1);
        
        console.log(`Setting up button for ${memberKey} (data key: ${dataKey})`);
        
        // Use direct onclick assignment for better compatibility
        btn.onclick = function() {
            console.log(`${memberKey} clicked`);
            selectFamilyMember(dataKey);
        };
    }
    
    // Add the global selectFamilyMember function
    window.selectFamilyMember = function(memberKey) {
        console.log("selectFamilyMember called with:", memberKey);
        
        // Make sure we have data for this member
        if (!familyData[memberKey]) {
            console.error('No data found for member:', memberKey);
            return;
        }
        
        currentMember = memberKey;
        const member = familyData[memberKey];
        
        // Update display
        memberInfoDisplay.innerHTML = `
            <h3>${memberKey}</h3>
            <p>Born: ${formatDate(new Date(member.dob))}</p>
        `;
        
        // Show game screen
        familySelectionScreen.classList.remove('active-screen');
        gameScreen.classList.add('active-screen');
        
        // Reset game state
        resetGame();
        
        // Load first question
        loadQuestion(0);
    };
    
    // Back to selection button
    if (backToSelectionBtn) {
        backToSelectionBtn.onclick = function() {
            gameScreen.classList.remove('active-screen');
            familySelectionScreen.classList.add('active-screen');
            resetGame();
        };
    }
    
    // Function to load a question
    function loadQuestion(index) {
        if (!currentMember) return;
        
        if (!questionBank[currentMember] || index >= questionBank[currentMember].length) {
            // Game completed or no questions available
            questionText.textContent = `Congratulations! You've completed all questions about ${currentMember}.`;
            answerOptions.innerHTML = `<button id="play-again-btn">Play Again</button>`;
            
            const playAgainBtn = document.getElementById('play-again-btn');
            if (playAgainBtn) {
                playAgainBtn.onclick = function() {
                    gameScreen.classList.remove('active-screen');
                    familySelectionScreen.classList.add('active-screen');
                    resetGame();
                };
            }
            return;
        }
        
        const question = questionBank[currentMember][index];
        currentQuestionIndex = index;
        
        // Update progress bar
        const progress = ((index + 1) / questionBank[currentMember].length) * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${index + 1}/${questionBank[currentMember].length}`;
        
        // Set question text
        questionText.textContent = question.text;
        
        // Create answer buttons - check if we have options or items
        answerOptions.innerHTML = '';
        if (question.options) {
            // Regular question with options
            question.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('answer-btn');
                button.onclick = function() {
                    checkAnswer(option);
                };
                answerOptions.appendChild(button);
            });
        } else if (question.items) {
            // Sequence question with items
            renderDragSequence(question, answerOptions);
        }
    }
    
    // Function to check answer
    function checkAnswer(selectedAnswer) {
        if (!currentMember) return;
        
        const question = questionBank[currentMember][currentQuestionIndex];
        const feedbackArea = document.getElementById('feedback-area');
        const isCorrect = selectedAnswer === question.answer;
        
        if (isCorrect) {
            feedbackArea.innerHTML = `<div class="feedback-correct">Correct! Great job!</div>`;
            score += 10;
            scoreDisplay.textContent = `Score: ${score}`;
        } else {
            feedbackArea.innerHTML = `<div class="feedback-incorrect">Not quite. The correct answer is ${question.answer}.</div>`;
        }
        
        // Disable all answer buttons
        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === question.answer) {
                btn.style.backgroundColor = '#4CAF50';
                btn.style.color = 'white';
            } else if (btn.textContent === selectedAnswer && !isCorrect) {
                btn.style.backgroundColor = '#F44336';
                btn.style.color = 'white';
            }
        });
        
        // Move to next question after a delay
        setTimeout(() => {
            feedbackArea.innerHTML = '';
            loadQuestion(currentQuestionIndex + 1);
        }, 2000);
    }
    
    // Function to reset game state
    function resetGame() {
        score = 0;
        currentQuestionIndex = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        progressBar.style.width = '0%';
        progressBar.textContent = '';
        if (document.getElementById('feedback-area')) {
            document.getElementById('feedback-area').innerHTML = '';
        }
    }
    
    // Helper function to format date
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
      // Initialize hint system
    initHintSystem();
    
    function initHintSystem() {
        // Set up hint button click handlers
        const weekdaysHintButton = document.getElementById('weekdays-hint-button');
        const monthsHintButton = document.getElementById('months-hint-button');
        const zodiacHintButton = document.getElementById('zodiac-hint-button');
        const seasonsHintButton = document.getElementById('seasons-hint-button');
        
        const weekdayStrip = document.getElementById('weekday-strip');
        const monthStrip = document.getElementById('month-strip');
        const zodiacStrip = document.getElementById('zodiac-strip');
        const seasonsStrip = document.getElementById('seasons-strip');
        const zodiacTitle = document.querySelector('.visual-aids-title');
        
        // Helper function to toggle hint visibility
        function toggleHint(button, element, titleElement) {
            if (button) {
                button.addEventListener('click', function() {
                    // Toggle active state on button
                    this.classList.toggle('active-hint');
                    
                    // Toggle visibility of the hint element
                    if (element) {
                        element.classList.toggle('visible-hint');
                    }
                    
                    // If this is the zodiac hint, also toggle the title
                    if (titleElement && this === zodiacHintButton) {
                        titleElement.classList.toggle('visible-hint');
                    }
                });
            }
        }
        
        // Set up each hint button
        toggleHint(weekdaysHintButton, weekdayStrip);
        toggleHint(monthsHintButton, monthStrip);
        toggleHint(zodiacHintButton, zodiacStrip, zodiacTitle);
        toggleHint(seasonsHintButton, seasonsStrip, document.querySelectorAll('.visual-aids-title')[1]);
        
        console.log("Hint system initialized");
    }
    
    // ...existing code for other functions...
    
    // Rendering for sequence drag questions
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
          // Create button container for better alignment
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'sequence-buttons';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.marginTop = '15px';
        
        // Add check button
        const checkButton = document.createElement('button');
        checkButton.textContent = 'Check Order';
        checkButton.className = 'sequence-check-btn';
        checkButton.addEventListener('click', () => checkSequenceOrder(question));
        
        // Add reset button
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset';
        resetButton.className = 'sequence-reset-btn';
        resetButton.style.backgroundColor = '#607D8B';
        resetButton.addEventListener('click', () => resetSequenceOrder(question, sourceContainer, targetContainer));
        
        // Add buttons to container
        buttonContainer.appendChild(checkButton);
        buttonContainer.appendChild(resetButton);
        container.appendChild(buttonContainer);
    }
    
    // Helper functions for drag and drop
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
      function resetSequenceOrder(question, sourceContainer, targetContainer) {
        // Clear all drop zones
        const dropZones = document.querySelectorAll('.drop-zone');
        dropZones.forEach(zone => {
            zone.innerHTML = '';
        });
        
        // Recreate items in source container
        sourceContainer.innerHTML = '';
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
        
        // Clear any feedback
        const feedbackArea = document.getElementById('feedback-area');
        if (feedbackArea) {
            feedbackArea.innerHTML = '';
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
            const feedbackArea = document.getElementById('feedback-area');
            feedbackArea.innerHTML = `<div class="feedback-incorrect">Please place all items in order</div>`;
            return;
        }
        
        // Check if sequence is correct
        const isCorrect = JSON.stringify(userSequence) === JSON.stringify(question.items);
        const feedbackArea = document.getElementById('feedback-area');
        
        if (isCorrect) {
            feedbackArea.innerHTML = `<div class="feedback-correct">Correct! That's the right order.</div>`;
            score += 10;
            scoreDisplay.textContent = `Score: ${score}`;
            
            // After a delay, show next question
            setTimeout(() => {
                feedbackArea.innerHTML = '';
                loadQuestion(currentQuestionIndex + 1);
            }, 2000);
        } else {
            feedbackArea.innerHTML = `<div class="feedback-incorrect">Not quite right. Try again!</div>`;
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
    
    console.log("Main script initialization completed");
}