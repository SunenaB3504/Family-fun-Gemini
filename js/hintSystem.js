/**
 * Hint System for Family Chronicle
 * Provides revealing hints for days, months, zodiac signs and seasons
 */

// Track whether hints are currently visible
const hintState = {
  weekdays: false,
  months: false,
  zodiac: false,
  seasons: false
};

/**
 * Toggle visibility of a specific hint category
 * @param {string} hintType - Type of hint to toggle (weekdays, months, zodiac, seasons)
 */
export function toggleHint(hintType) {
  // Toggle the state
  hintState[hintType] = !hintState[hintType];
  
  // Get the relevant elements
  const buttonEl = document.getElementById(`${hintType}-hint-button`);
  
  switch(hintType) {
    case 'weekdays':
      const weekdayStrip = document.getElementById('weekday-strip');
      if (hintState[hintType]) {
        weekdayStrip.classList.add('visible-hint');
        buttonEl.textContent = 'Hide Weekdays';
        buttonEl.classList.add('active-hint');
      } else {
        weekdayStrip.classList.remove('visible-hint');
        buttonEl.textContent = 'Show Weekdays';
        buttonEl.classList.remove('active-hint');
      }
      break;
      
    case 'months':
      const monthStrip = document.getElementById('month-strip');
      if (hintState[hintType]) {
        monthStrip.classList.add('visible-hint');
        buttonEl.textContent = 'Hide Months';
        buttonEl.classList.add('active-hint');
      } else {
        monthStrip.classList.remove('visible-hint');
        buttonEl.textContent = 'Show Months';
        buttonEl.classList.remove('active-hint');
      }
      break;
      
    case 'zodiac':
      // Fixed selector to target the first .visual-aids-title element
      const zodiacTitle = document.querySelector('.visual-aids-title');
      const zodiacContent = document.getElementById('zodiac-strip');
      
      if (hintState[hintType]) {
        if (zodiacTitle) zodiacTitle.classList.add('visible-hint');
        if (zodiacContent) zodiacContent.classList.add('visible-hint');
        buttonEl.textContent = 'Hide Zodiac Signs';
        buttonEl.classList.add('active-hint');
      } else {
        if (zodiacTitle) zodiacTitle.classList.remove('visible-hint');
        if (zodiacContent) zodiacContent.classList.remove('visible-hint');
        buttonEl.textContent = 'Show Zodiac Signs';
        buttonEl.classList.remove('active-hint');
      }
      break;
    
    case 'seasons':
      // Fixed selector to target the second .visual-aids-title element
      const seasonTitles = document.querySelectorAll('.visual-aids-title');
      const seasonsTitle = seasonTitles.length > 1 ? seasonTitles[1] : null;
      const seasonsContent = document.getElementById('seasons-strip');
      
      if (hintState[hintType]) {
        if (seasonsTitle) seasonsTitle.classList.add('visible-hint');
        if (seasonsContent) seasonsContent.classList.add('visible-hint');
        buttonEl.textContent = 'Hide Seasons';
        buttonEl.classList.add('active-hint');
      } else {
        if (seasonsTitle) seasonsTitle.classList.remove('visible-hint');
        if (seasonsContent) seasonsContent.classList.remove('visible-hint');
        buttonEl.textContent = 'Show Seasons';
        buttonEl.classList.remove('active-hint');
      }
      break;
  }
}

/**
 * Initialize the hint system - set up initial states
 */
export function initializeHints() {
  // Make sure elements exist before trying to hide them
  const weekdayStrip = document.getElementById('weekday-strip');
  const monthStrip = document.getElementById('month-strip');
  const zodiacStrip = document.getElementById('zodiac-strip');
  const seasonsStrip = document.getElementById('seasons-strip');
  const titles = document.querySelectorAll('.visual-aids-title');
  
  // Hide all hint content initially
  if (weekdayStrip) weekdayStrip.classList.remove('visible-hint');
  if (monthStrip) monthStrip.classList.remove('visible-hint');
  if (zodiacStrip) zodiacStrip.classList.remove('visible-hint');
  if (seasonsStrip) seasonsStrip.classList.remove('visible-hint');
  
  titles.forEach(el => {
    el.classList.remove('visible-hint');
  });
  
  // Set up event listeners for hint buttons
  const weekdaysButton = document.getElementById('weekdays-hint-button');
  const monthsButton = document.getElementById('months-hint-button');  
  const zodiacButton = document.getElementById('zodiac-hint-button');
  const seasonsButton = document.getElementById('seasons-hint-button');
  
  if (weekdaysButton) weekdaysButton.addEventListener('click', () => toggleHint('weekdays'));
  if (monthsButton) monthsButton.addEventListener('click', () => toggleHint('months'));
  if (zodiacButton) zodiacButton.addEventListener('click', () => toggleHint('zodiac'));
  if (seasonsButton) seasonsButton.addEventListener('click', () => toggleHint('seasons'));
  
  console.log('Hint system initialized');
}
