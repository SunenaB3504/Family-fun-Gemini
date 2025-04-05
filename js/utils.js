// js/utils.js
// General utility functions

// Get Weekday Name from Date Object
export function getWeekday(date) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
}

// Format Date (e.g., 15-Jun-1985)
export function formatDate(date) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    // Handle potential invalid date object
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }
    return date.toLocaleDateString('en-GB', options).replace(/ /g, '-');
}

// Shuffle an array (Fisher-Yates)
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// NEW Helper: Get Distractors for Sequence Cards (moved from main script)
import { WEEKDAYS, MONTHS } from './config.js'; // Import sequences

export function getSequenceDistractors(correctItem, type, count) {
    const distractors = new Set();
    let sequence = [];

    if (type.includes('weekday')) {
        sequence = WEEKDAYS;
    } else if (type.includes('month')) {
        sequence = MONTHS;
    } else {
        const possible = ['Apple', 'Banana', 'Orange', 'Grape', 'Pear', 'Plum'];
        return shuffleArray(possible).filter(item => item.toLowerCase() !== correctItem.toLowerCase()).slice(0, count);
    }

    const correctIndex = sequence.findIndex(item => item.toLowerCase() === correctItem.toLowerCase());
    if (correctIndex === -1) return [];

    for (let i = 1; distractors.size < count; i++) {
        const prevIndex = (correctIndex - i + sequence.length) % sequence.length;
        if (sequence[prevIndex].toLowerCase() !== correctItem.toLowerCase()) {
             distractors.add(sequence[prevIndex]);
             if (distractors.size >= count) break;
        }
        const nextIndex = (correctIndex + i) % sequence.length;
         if (sequence[nextIndex].toLowerCase() !== correctItem.toLowerCase()) {
             distractors.add(sequence[nextIndex]);
              if (distractors.size >= count) break;
         }
         if (i > sequence.length) break;
    }
    return Array.from(distractors);
}