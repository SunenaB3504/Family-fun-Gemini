// js/state.js
// Manages the dynamic state of the game

export let currentScreen = 'family-selection-screen';
export let selectedFamilyMember = null;
export let currentMemberQuestions = [];
export let currentQuestionIndex = 0;
export let score = 0;
export let earnedBadges = [];
export let correctStreak = { // Example for badge tracking
    weekday_sequence: 0,
    month_sequence: 0
};
export let sqlDB = null; // For SQL.js database instance

// Functions to update state (optional, but good practice for complex state)
export function setCurrentScreen(screenId) {
    currentScreen = screenId;
}
export function setSelectedFamilyMember(name) {
    selectedFamilyMember = name;
}
export function setCurrentMemberQuestions(questions) {
    currentMemberQuestions = questions;
}
export function setCurrentQuestionIndex(index) {
    currentQuestionIndex = index;
}
export function setScore(newScore) {
    score = newScore;
}
export function addScore(points) {
    score += points;
}
export function addEarnedBadge(badgeName) {
    if (!earnedBadges.includes(badgeName)) {
        earnedBadges.push(badgeName);
        return true; // Indicate that a new badge was added
    }
    return false;
}
export function resetCorrectStreak() {
     correctStreak = { weekday_sequence: 0, month_sequence: 0 };
}
export function incrementCorrectStreak(type) {
    if (correctStreak.hasOwnProperty(type)) {
        correctStreak[type]++;
    }
}
export function setSqlDB(dbInstance) {
    sqlDB = dbInstance;
}