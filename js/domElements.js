// js/domElements.js
// Central place to get references to DOM elements

export const screens = {
    selection: document.getElementById('family-selection-screen'),
    game: document.getElementById('game-screen'),
    friend: document.getElementById('check-friend-screen')
};
export const familyButtonsContainer = document.getElementById('family-buttons-container');
export const checkFriendBtn = document.getElementById('check-friend-btn');
export const backToSelectionBtn = document.getElementById('back-to-selection-btn');
export const memberInfoDisplay = document.getElementById('member-info-display');
export const scoreDisplay = document.getElementById('score-display');
export const questionText = document.getElementById('question-text');
export const answerOptionsContainer = document.getElementById('answer-options');
export const feedbackArea = document.getElementById('feedback-area');
export const progressBar = document.getElementById('progress-bar');
export const progressBarContainer = document.getElementById('progress-bar-container');
export const badgesDisplayList = document.getElementById('earned-badges-list');
export const miniGameArea = document.getElementById('mini-game-area');

// Friend Check Elements
export const friendNameInput = document.getElementById('friend-name');
export const friendDobInput = document.getElementById('friend-dob');
export const submitFriendInfoBtn = document.getElementById('submit-friend-info-btn');
export const cancelFriendCheckBtn = document.getElementById('cancel-friend-check-btn');
export const friendResultsArea = document.getElementById('friend-results-area');
export const friendPredictionOutput = document.getElementById('friend-prediction-output');

// Add any other elements you might need reference to