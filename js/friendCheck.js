// js/friendCheck.js
// Handles the "Check with Friend" feature, including SQL.js and API calls

// Make sure to provide the sql-wasm.js script globally or adjust path
// import initSqlJs from './sql-wasm.js'; // If hosting sql-wasm.js locally

import * as state from './state.js';
import * as dom from './domElements.js';
import { formatDate, getWeekday } from './utils.js'; // Assuming getWeekday isn't needed here, but formatDate is useful

// SQL.js Database Logic
async function initSqlJsDb() {
    try {
        // Ensure initSqlJs is available (usually loaded globally via script tag in HTML)
        if (typeof initSqlJs !== 'function') {
             throw new Error("SQL.js library not loaded. Ensure the script tag is present in index.html.");
        }
        const SQL = await initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}` });
        const savedDb = localStorage.getItem('friend_database');
        let dbInstance;
        if (savedDb) {
             const Uints = new Uint8Array(savedDb.split(','));
             dbInstance = new SQL.Database(Uints);
             console.log("Loaded existing Friend DB from localStorage.");
        } else {
            dbInstance = new SQL.Database();
            console.log("Created new Friend DB.");
            dbInstance.run("CREATE TABLE IF NOT EXISTS friends (name TEXT PRIMARY KEY, dob TEXT);");
            persistSqlDb(dbInstance); // Save empty structure
        }
        state.setSqlDB(dbInstance); // Store instance in state
         console.log("SQL.js initialized successfully.");
    } catch (err) {
        console.error("Error initializing SQL.js:", err);
        dom.checkFriendBtn.disabled = true;
        dom.checkFriendBtn.title = "Offline storage unavailable";
    }
}

function persistSqlDb(dbInstance = state.sqlDB) { // Use state.sqlDB by default
     if (dbInstance) {
         const data = dbInstance.export();
         localStorage.setItem('friend_database', data.join(','));
         console.log("Friend DB saved to localStorage.");
     }
 }


function saveFriendData(name, dob) {
     if (!state.sqlDB) {
         console.error("SQL DB not initialized.");
         return false;
     }
     try {
         state.sqlDB.run("INSERT OR REPLACE INTO friends (name, dob) VALUES (?, ?)", [name, dob]);
         persistSqlDb(); // Save changes
         console.log(`Saved/Updated friend: ${name}, DOB: ${dob}`);
         return true;
     } catch (err) {
         console.error("Error saving friend data:", err);
         return false;
     }
}

// Friend Submit Handler
export async function handleFriendSubmit() {
    const name = dom.friendNameInput.value.trim();
    const dob = dom.friendDobInput.value;

    dom.friendPredictionOutput.textContent = ""; // Clear previous results
    dom.friendResultsArea.classList.add('hidden'); // Hide results area initially

    if (!name || !dob) {
        dom.friendPredictionOutput.textContent = "Please enter both name and date of birth.";
         dom.friendResultsArea.classList.remove('hidden');
        return;
    }

    const saved = saveFriendData(name, dob);
    if(!saved){
        dom.friendPredictionOutput.textContent = "Could not save friend data locally.";
         dom.friendResultsArea.classList.remove('hidden');
        return;
    }

    dom.friendPredictionOutput.textContent = "Fetching fun facts (placeholder)...";
    dom.friendResultsArea.classList.remove('hidden');

    try {
        const dobDate = new Date(dob + 'T00:00:00');
        const zodiacSign = getZodiacSign(dobDate); // Use local helper
        const dateFact = await fetchDateFactAPI(dob); // Use local helper

        dom.friendPredictionOutput.innerHTML = `
            <strong>${name}</strong> (Born: ${formatDate(dobDate)})<br>
            Zodiac Sign: ${zodiacSign}<br>
            Fun Fact for ${formatDate(dobDate)}: ${dateFact}<br>
            <small>(Name and DOB saved locally)</small>
        `;
    } catch (error) {
        console.error("Error fetching friend predictions:", error);
        dom.friendPredictionOutput.textContent = "Could not fetch fun facts. See console for details.";
    }
}


// API and Zodiac Helpers (Keep these local to this module or move to utils if used elsewhere)
async function fetchDateFactAPI(dob) {
    const date = new Date(dob + 'T00:00:00');
    const month = date.getMonth() + 1;
    const day = date.getDate();
    try {
        // Important: Use HTTPS for Numbers API
        const response = await fetch(`https://numbersapi.com/${month}/${day}/date`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const text = await response.text();
        return text;
    } catch (error) {
        console.error("Failed to fetch date fact:", error);
        // Consider checking for CORS issues if running locally without a server
         if (error instanceof TypeError && error.message.includes('fetch')) {
             return "Could not fetch fact due to network or CORS issue. Try running from a local server.";
         }
        return "Could not fetch a fun fact for this date.";
    }
}

function getZodiacSign(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    // ... (Zodiac sign logic remains the same)
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn";
    return "Unknown";
}

// Export initialization function
export { initSqlJsDb };