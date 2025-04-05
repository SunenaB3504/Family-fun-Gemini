// js/data.js
// (Consider loading this from JSON files in a future step for easier management)

// Sample Family Data
export const familyData = {
    "Mom": {
        dob: "1985-06-15",
        milestones: [ /* ... */ ]
    },
    "Dad": {
        dob: "1983-11-22",
        milestones: [ /* ... */ ]
    },
    "Grandma": {
         dob: "1955-03-08",
         milestones: [ /* ... */ ]
    },
    "Nia": {
        dob: "2015-09-30", // Example
        milestones: [ /* ... */ ]
    }
};

// Sample Question Bank
export const questionBank = {
     "Mom": [
         { type: "weekday_sequence", text: "Mom was born on a Saturday. What day comes after Saturday?", answer: "Sunday", options: ["Friday", "Sunday", "Monday"] },
         { type: "month_sequence", text: "Mom's birthday is in June. What month comes before June?", answer: "May", options: ["July", "April", "May"] },
         // ... more questions
     ],
     "Dad": [
          { type: "weekday_sequence", text: "Dad was born on a Thursday. What day was it two days before he was born?", answer: "Tuesday", options: ["Wednesday", "Tuesday", "Friday"] },
          {
              type: "weekday_drag_sequence",
              text: "Drag these days into the correct order:",
              items: ["Monday", "Tuesday", "Wednesday"]
          },
          // ... more questions
     ],
     "Grandma": [ /* ... questions ... */ ],
     "Nia": [
         { type: "month_sequence", text: "Nia's birthday is in September. What month is that?", answer: "September", options: ["August", "September", "October"] },
         {
               type: "event_drag_sequence",
               text: "Put these steps in order:",
               items: ["Birth", "First Steps", "Kindergarten"]
           },
          // ... more questions
      ]
};