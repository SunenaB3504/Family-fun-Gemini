// js/config.js
export const POINTS_PER_CORRECT_ANSWER = 10;
export const MAX_QUESTIONS_PER_ROUND = 5;

// Badge Criteria (Example)
export const badgeCriteria = {
    "Memory Starter": 50, // Points needed
    "Weekday Whiz": 3,    // Number of correct weekday_sequence answers
    "Month Master": 3     // Number of correct month_sequence answers
    // Add more badges
};

// Sequences for distractors (can be moved elsewhere if preferred)
export const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];