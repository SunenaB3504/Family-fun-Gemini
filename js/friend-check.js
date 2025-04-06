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

// Friend check functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log("Friend check script loaded");
    
    // Elements
    const checkFriendBtn = document.getElementById('check-friend-btn');
    const submitFriendInfoBtn = document.getElementById('submit-friend-info-btn');
    const cancelFriendCheckBtn = document.getElementById('cancel-friend-check-btn');
    const friendNameInput = document.getElementById('friend-name');
    const friendDobInput = document.getElementById('friend-dob');
    const friendResultsArea = document.getElementById('friend-results-area');
    const friendPredictionOutput = document.getElementById('friend-prediction-output');
    
    const familySelectionScreen = document.getElementById('family-selection-screen');
    const checkFriendScreen = document.getElementById('check-friend-screen');
    
    // Debug logging to verify elements are found
    console.log("Check friend button:", checkFriendBtn);
    console.log("Family selection screen:", familySelectionScreen);
    console.log("Check friend screen:", checkFriendScreen);
    
    // Check with a friend button click
    if (checkFriendBtn) {
        checkFriendBtn.addEventListener('click', function() {
            console.log("Check friend button clicked");
            familySelectionScreen.classList.remove('active-screen');
            checkFriendScreen.classList.add('active-screen');
            friendResultsArea.classList.add('hidden');
            friendNameInput.value = '';
            friendDobInput.value = '';
        });
    }
    
    // Cancel button click - return to selection screen
    if (cancelFriendCheckBtn) {
        cancelFriendCheckBtn.addEventListener('click', function() {
            console.log("Cancel button clicked");
            checkFriendScreen.classList.remove('active-screen');
            familySelectionScreen.classList.add('active-screen');
        });
    }
    
    // Submit friend info button click
    if (submitFriendInfoBtn) {
        submitFriendInfoBtn.addEventListener('click', function() {
            console.log("Submit button clicked");
            const friendName = friendNameInput.value.trim();
            const friendDob = friendDobInput.value;
            
            if (!friendName || !friendDob) {
                alert("Please enter both name and date of birth.");
                return;
            }
            
            // Generate friend details
            const friendDetails = generateFriendDetails(friendName, friendDob);
            
            // Display the results
            friendPredictionOutput.innerHTML = friendDetails;
            friendResultsArea.classList.remove('hidden');
            
            // Store friend data
            storeFriendData(friendName, friendDob);
        });
    }
    
    // Function to generate friend details based on DOB
    function generateFriendDetails(name, dobString) {
        const dob = new Date(dobString);
        const weekday = getWeekday(dob);
        const zodiac = getZodiacSign(dob);
        const season = getSeason(dob);
        const animal = getIndianAstroAnimal(dob);
        const nameMeaning = getNameMeaning(name);
        const birthDateFact = getBirthDateFact(dob);
        
        // Format the HTML output
        return `
            <div class="friend-detail">
                <h4>Birth Details:</h4>
                <p>🎂 <strong>${name}</strong> was born on <strong>${formatDate(dob)}</strong></p>
                <p>📅 Day of the week: <strong>${weekday}</strong></p>
                <p>✨ ${birthDateFact}</p>
            </div>
            
            <div class="friend-detail">
                <h4>Zodiac Sign: ${zodiac.sign}</h4>
                <p>⭐ ${zodiac.traits}</p>
            </div>
            
            <div class="friend-detail">
                <h4>Indian Astrology Animal: ${animal.animal}</h4>
                <p>🐾 ${animal.traits}</p>
            </div>
            
            <div class="friend-detail">
                <h4>Season: ${season.season}</h4>
                <p>🌈 ${season.features}</p>
            </div>
            
            <div class="friend-detail">
                <h4>Name Meaning:</h4>
                <p>👤 ${nameMeaning}</p>
            </div>
            
            <div class="friend-questions">
                <h4>Questions to Ask ${name}:</h4>
                <ul>
                    ${generateQuestions(name, dob).map(q => `<li>${q}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Helper functions
    function getWeekday(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    }
    
    function getZodiacSign(date) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
            return { 
                sign: 'Aquarius', 
                traits: 'Innovative, progressive, and independent. Aquarians are known for their originality and humanitarian approach.'
            };
        } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
            return { 
                sign: 'Pisces', 
                traits: 'Compassionate, artistic, and intuitive. Pisceans are known for their empathy and emotional understanding.'
            };
        } else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
            return { 
                sign: 'Aries', 
                traits: 'Energetic, courageous, and confident. Arians are natural leaders who are passionate and enthusiastic.'
            };
        } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
            return { 
                sign: 'Taurus', 
                traits: 'Reliable, patient, and practical. Taureans are known for their determination and devotion.'
            };
        } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
            return { 
                sign: 'Gemini', 
                traits: 'Curious, adaptable, and communicative. Geminis are known for their sociability and learning ability.'
            };
        } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
            return { 
                sign: 'Cancer', 
                traits: 'Loyal, emotional, and caring. Cancerians are known for their protective and nurturing nature.'
            };
        } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
            return { 
                sign: 'Leo', 
                traits: 'Creative, passionate, and generous. Leos are known for their confidence and leadership.'
            };
        } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
            return { 
                sign: 'Virgo', 
                traits: 'Analytical, practical, and hardworking. Virgos are known for their attention to detail and helpfulness.'
            };
        } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
            return { 
                sign: 'Libra', 
                traits: 'Diplomatic, fair-minded, and social. Librans are known for their cooperative and harmonious approach.'
            };
        } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
            return { 
                sign: 'Scorpio', 
                traits: 'Resourceful, brave, and passionate. Scorpios are known for their intensity and determination.'
            };
        } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
            return { 
                sign: 'Sagittarius', 
                traits: 'Optimistic, freedom-loving, and philosophical. Sagittarians are known for their honesty and enthusiasm.'
            };
        } else {
            return { 
                sign: 'Capricorn', 
                traits: 'Responsible, disciplined, and self-controlled. Capricorns are known for their independence and ambition.'
            };
        }
    }
    
    function getSeason(date) {
        const month = date.getMonth() + 1;
        
        if (month >= 3 && month <= 5) {
            return { 
                season: 'Spring', 
                features: 'A time of new beginnings, growth, and renewal. Spring represents hope and fresh opportunities.'
            };
        } else if (month >= 6 && month <= 8) {
            return { 
                season: 'Summer', 
                features: 'A time of abundance, energy, and fulfillment. Summer represents joy and vitality.'
            };
        } else if (month >= 9 && month <= 11) {
            return { 
                season: 'Autumn', 
                features: 'A time of transformation, maturity, and harvest. Autumn represents change and reflection.'
            };
        } else {
            return { 
                season: 'Winter', 
                features: 'A time of rest, introspection, and endurance. Winter represents resilience and inner strength.'
            };
        }
    }
    
    function getIndianAstroAnimal(date) {
        const day = date.getDay();
        
        switch(day) {
            case 0: return { animal: 'Lion', traits: 'Strong, confident, and natural leader' };
            case 1: return { animal: 'Deer', traits: 'Gentle, alert, and graceful' };
            case 2: return { animal: 'Elephant', traits: 'Wise, loyal, and protective' };
            case 3: return { animal: 'Peacock', traits: 'Beautiful, proud, and expressive' };
            case 4: return { animal: 'Tiger', traits: 'Powerful, passionate, and fearless' };
            case 5: return { animal: 'Horse', traits: 'Free-spirited, energetic, and social' };
            case 6: return { animal: 'Cow', traits: 'Patient, nurturing, and dependable' };
            default: return { animal: 'Owl', traits: 'Intelligent, mysterious, and perceptive' };
        }
    }
    
    function getNameMeaning(name) {
        // This is a simplified version. In a real app, you'd use an API or database
        return `The name ${name} is associated with qualities such as creativity, kindness, and intelligence. People with this name are often natural leaders and bring joy to others.`;
    }
    
    function getBirthDateFact(date) {
        const month = date.getMonth();
        const day = date.getDate();
        const year = date.getFullYear();
        
        const facts = [
            `People born in ${year} share their birth year with many significant events in history.`,
            `Your birth month, ${date.toLocaleString('default', {month: 'long'})}, is known for its unique energy and characteristics.`,
            `Being born on day ${day} of the month is considered especially lucky in many cultures.`,
            `The numerology of your birth date suggests you have natural talents in creative thinking and problem-solving.`
        ];
        
        return facts[Math.floor(Math.random() * facts.length)];
    }
    
    function generateQuestions(name, date) {
        const weekday = getWeekday(date);
        const zodiac = getZodiacSign(date).sign;
        const season = getSeason(date).season;
        const animal = getIndianAstroAnimal(date).animal;
        
        return [
            `What day of the week was ${name} born on?`,
            `What is ${name}'s zodiac sign?`,
            `What season was ${name} born in?`,
            `What animal is associated with ${name} in Indian astrology?`,
            `What month was ${name} born in?`,
            `What year was ${name} born in?`
        ];
    }
    
    function formatDate(date) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    function storeFriendData(name, dob) {
        // Get existing friends or initialize new array
        let friends = JSON.parse(localStorage.getItem('friends') || '[]');
        
        // Add new friend
        friends.push({
            name: name,
            dob: dob,
            addedOn: new Date().toISOString()
        });
        
        // Store back in localStorage
        localStorage.setItem('friends', JSON.stringify(friends));
        console.log("Friend data stored:", name, dob);
    }
});
