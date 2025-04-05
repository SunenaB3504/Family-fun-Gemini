// js/gamification.js
// Handles scoring, badges, etc.

import * as state from './state.js';
import { badgeCriteria } from './config.js';
import { updateBadgesDisplay, showFeedback } from './ui.js'; // Import necessary UI functions

export function checkAndAwardBadges(questionType) {
    // Track streaks
    state.incrementCorrectStreak(questionType);

    let newBadgeEarned = false;
    Object.keys(badgeCriteria).forEach(badgeName => {
        if (!state.earnedBadges.includes(badgeName)) { // Check if already earned
            const criteria = badgeCriteria[badgeName];
            let achieved = false;

            if (badgeName === "Memory Starter" && state.score >= criteria) {
                achieved = true;
            } else if (badgeName === "Weekday Whiz" && state.correctStreak.weekday_sequence >= criteria) {
                 achieved = true;
            } else if (badgeName === "Month Master" && state.correctStreak.month_sequence >= criteria) {
                 achieved = true;
            }
            // Add more badge logic here...

            if (achieved) {
                 if (state.addEarnedBadge(badgeName)) { // Use state function to add badge
                     newBadgeEarned = true;
                     console.log(`Badge Earned: ${badgeName}`);
                     // Optionally show a more prominent notification via UI function
                      // Example: append temporary message to feedback area
                      const feedbackArea = document.getElementById('feedback-area'); // Quick access, or import from domElements
                      if (feedbackArea) {
                         feedbackArea.textContent += ` You earned the ${badgeName} badge!`;
                      }
                 }
            }
        }
    });

    if (newBadgeEarned) {
        updateBadgesDisplay(); // Update the visual list
    }
}