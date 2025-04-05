// js/gameLogic.js
// Contains the core logic for game flow

import * as state from './state.js';
import * as dom from './domElements.js';
import * as ui from './ui.js';
import { familyData, questionBank } from './data.js';
import { getWeekday, formatDate, shuffleArray } from './utils.js';
import { checkAndAwardBadges } from './gamification.js';
import { POINTS_PER_CORRECT_ANSWER, MAX_QUESTIONS_PER_ROUND } from './config.js';
// Import Mini-game functions
import { showFindSequenceCardMiniGame } from './miniGames/findCard.js';
import { implementDragAndDropSequence } from './miniGames/dragDrop.js';

// Select Family Member
export function selectFamilyMember(name) {
    console.log(`Selected family member: ${name}`);
    state.setSelectedFamilyMember(name);
    const member = familyData[name];
    if (!member) {
        console.error("Family member data not found:", name);
        return;
    }

    const dobDate = new Date(member.dob + 'T00:00:00');
    const weekday = getWeekday(dobDate);
    const formattedDob = formatDate(dobDate);

    dom.memberInfoDisplay.textContent = `Playing for: ${name} (Born: ${formattedDob}, Day: ${weekday})`;

    const questionsForMember = questionBank[name] || [];
    state.setCurrentMemberQuestions(
        shuffleArray([...questionsForMember]).slice(0, MAX_QUESTIONS_PER_ROUND)
    );
    state.setCurrentQuestionIndex(0);
    state.resetCorrectStreak(); // Reset streaks for new round

    if (state.currentMemberQuestions.length > 0) {
        ui.showScreen('game');
        loadQuestion();
    } else {
        dom.feedbackArea.textContent = `No questions available yet for ${name}. Try another member.`;
        dom.feedbackArea.className = 'feedback-prompt';
        ui.showScreen('game');
        dom.answerOptionsContainer.innerHTML = '';
        dom.questionText.textContent = '';
    }
    ui.updateProgressBar();
}

// Load the current question
export function loadQuestion() {
    dom.miniGameArea.classList.add('hidden');
    dom.miniGameArea.innerHTML = '';
    dom.feedbackArea.textContent = '';
    dom.feedbackArea.className = '';

    if (state.currentQuestionIndex >= state.currentMemberQuestions.length) {
        endRound();
        return;
    }

    const question = state.currentMemberQuestions[state.currentQuestionIndex];
    dom.questionText.textContent = question.text;

    // Handle different question types for UI setup
    if (question.type.includes('_drag_sequence') && question.items) {
         dom.answerOptionsContainer.innerHTML = ''; // Clear standard answers area
         implementDragAndDropSequence(question.type, question.items); // Setup Drag/Drop UI
    } else {
         ui.createAnswerOptions(question); // Setup standard answer options (buttons, input)
         // Ensure answer buttons are enabled
         dom.answerOptionsContainer.querySelectorAll('button, input').forEach(el => el.disabled = false);
    }

    ui.updateProgressBar();
}

// Handle user's answer
export function handleAnswer(selectedAnswer, question) {
    dom.answerOptionsContainer.querySelectorAll('button, input').forEach(el => el.disabled = true);

    let isCorrect = false;
    // Ensure case-insensitive comparison for strings
     if (typeof question.answer === 'string' && typeof selectedAnswer === 'string') {
         isCorrect = selectedAnswer.toLowerCase() === question.answer.toLowerCase();
     } else if (typeof question.answer === 'number' && typeof selectedAnswer === 'number') {
          isCorrect = selectedAnswer === question.answer;
     } else {
         // Fallback for potential type mismatches, adjust as needed
         isCorrect = selectedAnswer == question.answer;
     }


    ui.showFeedback(isCorrect, question.answer);

    if (isCorrect) {
        state.addScore(POINTS_PER_CORRECT_ANSWER);
        ui.updateScoreDisplay();
        checkAndAwardBadges(question.type); // Use imported function

        if (question.type === 'weekday_sequence' || question.type === 'month_sequence') {
            setTimeout(() => {
                 showFindSequenceCardMiniGame(question.type, question.answer); // Use imported function
            }, 1200);
        } else if (question.type === 'event_order') {
             console.log("Correct Order! Potential spot for Timeline Drag-Drop.");
             setTimeout(nextQuestion, 1500);
        } else {
            setTimeout(nextQuestion, 1500);
        }
    } else {
        dom.feedbackArea.textContent += " Let's try the next one.";
        setTimeout(nextQuestion, 2000);
    }
}

// Move to the next question
export function nextQuestion() {
    state.setCurrentQuestionIndex(state.currentQuestionIndex + 1);
    loadQuestion();
}

// End the round for the current family member
export function endRound() {
    dom.questionText.textContent = `Round complete for ${state.selectedFamilyMember}!`;
    dom.answerOptionsContainer.innerHTML = '';
    dom.feedbackArea.textContent = `Your total score is now: ${state.score}`; // Show cumulative score
    dom.feedbackArea.className = 'feedback-prompt';
    dom.miniGameArea.classList.add('hidden'); // Ensure mini-game area is hidden

    const backButton = document.createElement('button');
    backButton.textContent = 'Choose Another Family Member';
    backButton.addEventListener('click', returnToFamilySelection);
    dom.answerOptionsContainer.appendChild(backButton);
}

// Return to family selection screen
export function returnToFamilySelection() {
    state.setSelectedFamilyMember(null);
    dom.memberInfoDisplay.textContent = '';
    // Score persists across members unless reset here
    ui.showScreen('selection');
}