// js/data.js
// (Consider loading this from JSON files in a future step for easier management)

// Sample Family Data - make available both as module export and global variable
window.familyData = {
    "Mom": {
        dob: "1980-07-01",
        milestones: [ /* ... */ ]
    },
    "Dad": {
        dob: "1972-03-09",
        milestones: [ /* ... */ ]
    },
    "Grandma": {
         dob: "1953-08-18",
         milestones: [ /* ... */ ]
    },
    "Grandpa": {
         dob: "1945-02-03",
         milestones: [ /* ... */ ]
    },
    "Nandu": {
        dob: "2002-04-08",
        milestones: [ /* ... */ ]
    },
    "Neil": {
        dob: "2008-03-19",
        milestones: [ /* ... */ ]
    },
    "Nia": {
        dob: "2015-11-27", // Updated from 2015-09-30
        milestones: [
            { age: "1 day", event: "Started breast feeding" },
            { age: "2 weeks", event: "First vaccination" },
            { age: "6 months", event: "Started sitting" },
            { age: "7 months", event: "Called 'ma' for the first time" },
            { age: "10 months", event: "Started walking" },
            { age: "3 years", event: "Started kindergarten" },
            { age: "5 years", event: "Started school" }
        ]
    }
};

// Sample Question Bank
window.questionBank = {
     "Mom": [
         // Basic date concepts
         { type: "weekday_sequence", text: "Mom was born on a Tuesday. What day comes after Tuesday?", answer: "Wednesday", options: ["Monday", "Wednesday", "Thursday"] },
         { type: "month_sequence", text: "Mom's birthday is in July. What month comes before July?", answer: "June", options: ["June", "May", "August"] },
         { type: "season", text: "Mom was born in July. What season is July in?", answer: "Summer", options: ["Spring", "Summer", "Fall"] },
         { type: "date_math", text: "Mom was born on July 1. If today is June 29, how many days until her birthday?", answer: "2", options: ["1", "2", "3"] },
         
         // Math concepts
         { type: "addition", text: "Mom was born on the 1st day of the 7th month. What is 1 + 7?", answer: "8", options: ["7", "8", "9"] },
         { type: "multiplication", text: "Mom was born on the 1st. What is 1 × 7?", answer: "7", options: ["6", "7", "8"] },
         { type: "math_sequence", text: "Mom was born in '80. Put these numbers in order:", items: ["78", "79", "80", "81"] },
         { type: "month_position", text: "Mom was born in July. If January is the 1st month, what position is July?", answer: "7th", options: ["6th", "7th", "8th"] },
         
         // Calendar facts
         { type: "date_fact", text: "Mom's birth year was 1980. Was that a leap year?", answer: "Yes", options: ["No", "Yes", "Maybe"] },
         { type: "calendar_math", text: "If Mom's birthday is July 1, what date is exactly one week later?", answer: "July 8", options: ["July 7", "July 8", "July 9"] },
         
         // Additional questions to reach 50
         { type: "weekday_count", text: "If Mom was born on Tuesday, how many days is it from Sunday to her birthday?", answer: "3", options: ["2", "3", "4"] },
         { type: "month_count", text: "How many months from January to Mom's birth month (July)?", answer: "6", options: ["5", "6", "7"] },
         { type: "year_math", text: "Mom was born in 1980. If we add the digits (1+9+8+0), what do we get?", answer: "18", options: ["17", "18", "19"] },
         { type: "odd_even", text: "Mom was born in 1980. Is this an odd or even year?", answer: "Even", options: ["Odd", "Even", "Neither"] },
         { type: "date_part", text: "Mom was born on July 1. What is the day part of her birth date?", answer: "1", options: ["1", "7", "1980"] },
         { type: "month_part", text: "Mom was born on 07/01/1980. What is the month part?", answer: "07", options: ["01", "07", "1980"] },
         { type: "zodiac", text: "Mom was born on July 1. What is her zodiac sign?", answer: "Cancer", options: ["Gemini", "Cancer", "Leo"] },
         
         // Family comparisons
         { type: "family_compare", text: "Who is older: Mom or Dad?", answer: "Dad", options: ["Mom", "Dad", "Same age"] },
         { type: "family_compare", text: "Who has a birthday in summer: Mom or Nia?", answer: "Mom", options: ["Mom", "Nia", "Both"] },
         { type: "age_difference", text: "About how many years older is Mom than Nia?", answer: "35", options: ["25", "30", "35"] },
         
         // Month patterns
         { type: "month_pattern", text: "July is the 7th month. If we skip every other month starting from January, will we include July?", answer: "Yes", options: ["Yes", "No"] },
         { type: "days_in_month", text: "How many days are in Mom's birth month (July)?", answer: "31", options: ["30", "31", "28"] },
         { type: "season_change", text: "If Mom was born in summer, what season comes next?", answer: "Fall", options: ["Spring", "Winter", "Fall"] },
         
         // Time calculations
         { type: "decade", text: "Mom was born in the decade of:", answer: "1980s", options: ["1970s", "1980s", "1990s"] },
         { type: "century", text: "Mom was born in which century?", answer: "20th", options: ["19th", "20th", "21st"] },
         { type: "millennium", text: "Mom was born in which millennium?", answer: "2nd", options: ["1st", "2nd", "3rd"] },

         // Additional math-based questions
         { type: "subtraction", text: "If Mom was born in 1980, how many years before 2000 is that?", answer: "20", options: ["20", "15", "10"] },
         { type: "division", text: "Mom was born on the 1st. If we have 8 cookies to share with 1 friend, how many would each get?", answer: "4", options: ["2", "4", "8"] },
         { type: "age_milestone", text: "Mom was born in 1980. In what year did she turn 20?", answer: "2000", options: ["1990", "2000", "2010"] },
         { type: "age_milestone", text: "Mom was born in 1980. In what year did she turn 30?", answer: "2010", options: ["2000", "2010", "2020"] },
         { type: "age_milestone", text: "Mom was born in 1980. In what year did she turn 40?", answer: "2020", options: ["2010", "2020", "2030"] },
         
         // Pattern recognition
         { type: "sequence", text: "Mom's birthday is on the 1st. What comes next: 1, 3, 5, 7, ...?", answer: "9", options: ["8", "9", "10"] },
         { type: "number_pattern", text: "Mom was born in '80. What is 8 tens plus 0 ones?", answer: "80", options: ["8", "80", "800"] },
         { type: "skip_counting", text: "Count by 5s starting at Mom's birth day (1): 1, 6, 11, ...?", answer: "16", options: ["15", "16", "17"] },
         
         // Calendar navigation
         { type: "month_after", text: "What is the 3rd month after Mom's birth month?", answer: "October", options: ["September", "October", "November"] },
         { type: "month_before", text: "What is the 2nd month before Mom's birth month?", answer: "May", options: ["April", "May", "June"] },
         { type: "weekday_after", text: "Mom was born on Tuesday. What is 3 days after that?", answer: "Friday", options: ["Thursday", "Friday", "Saturday"] },
         { type: "half_year", text: "What month is half a year from Mom's birthday?", answer: "January", options: ["December", "January", "February"] },
         
         // Educational calendar facts
         { type: "month_days", text: "Mom was born in July. Which has more days: July or April?", answer: "July", options: ["July", "April", "Same"] },
         { type: "leap_year_rule", text: "Mom's birth year (1980) is divisible by 4. Does that make it a leap year?", answer: "Yes", options: ["No", "Yes", "Cannot tell"] },
         { type: "season_hemisphere", text: "Mom was born in July. Is it summer in the Southern Hemisphere then?", answer: "No", options: ["Yes", "No", "Same as North"] },
         
         // Time spans
         { type: "days_in_span", text: "About how many days are in the month of Mom's birthday?", answer: "31", options: ["28", "30", "31"] },
         { type: "weeks_in_month", text: "About how many complete weeks are in Mom's birth month?", answer: "4", options: ["3", "4", "5"] },
         { type: "days_in_year", text: "Mom was born in 1980. How many days were in that year?", answer: "366", options: ["365", "366", "367"] },
         
         // More zodiac and astrology related
         { type: "zodiac_element", text: "Mom's zodiac sign (Cancer) is associated with which element?", answer: "Water", options: ["Fire", "Earth", "Water"] },
         { type: "zodiac_neighbors", text: "Which signs come before and after Mom's sign (Cancer)?", answer: "Gemini and Leo", options: ["Taurus and Leo", "Gemini and Leo", "Gemini and Virgo"] },
         { type: "birth_stone", text: "What is the birthstone for Mom's birth month (July)?", answer: "Ruby", options: ["Pearl", "Ruby", "Peridot"] },
         
         // New sequence games
         {
             type: "weekday_drag_sequence",
             text: "Put the days of the week in order starting from Sunday:",
             items: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
         },
         {
             type: "month_drag_sequence",
             text: "Put the months in order starting from Mom's birth month (July):",
             items: ["July", "August", "September", "October", "November", "December", "January"]
         },
         {
             type: "season_drag_sequence",
             text: "Put the seasons in order starting with the season Mom was born in (Summer):",
             items: ["Summer", "Fall", "Winter", "Spring"]
         },
         {
             type: "zodiac_drag_sequence",
             text: "Put these zodiac signs in order, starting with Mom's sign (Cancer):",
             items: ["Cancer", "Leo", "Virgo", "Libra", "Scorpio"]
         },
         {
             type: "leap_year_sequence",
             text: "Drag the years in order. Mom was born in a leap year (1980).",
             items: ["1976", "1980", "1984", "1988", "1992"],
             helperText: "All these years are leap years."
         }
     ],
     "Dad": [
          // Existing questions
          { type: "weekday_sequence", text: "Dad was born on a Thursday. What day was it two days before he was born?", answer: "Tuesday", options: ["Wednesday", "Tuesday", "Friday"] },
          {
              type: "weekday_drag_sequence",
              text: "Drag these days into the correct order:",
              items: ["Monday", "Tuesday", "Wednesday"]
          },
          // New questions about Dad's birth date
          { type: "season", text: "Dad was born in March. What season is March in?", answer: "Spring", options: ["Winter", "Spring", "Summer"] },
          { type: "date_math", text: "Dad was born on March 9. If today was March 7, how many days until his birthday?", answer: "2", options: ["1", "2", "3"] },
          { type: "addition", text: "Dad was born on the 9th day of the 3rd month. What is 9 + 3?", answer: "12", options: ["11", "12", "13"] },
          { type: "multiplication", text: "Dad was born on the 9th. What is 9 × 3?", answer: "27", options: ["18", "27", "36"] },
          { type: "math_sequence", text: "Dad was born in '72. Put these numbers in order:", items: ["70", "71", "72", "73"] },
          { type: "month_position", text: "Dad was born in March. If January is the 1st month, what position is March?", answer: "3rd", options: ["2nd", "3rd", "4th"] },
          { type: "date_fact", text: "Dad's birth year was 1972. Was that a leap year?", answer: "Yes", options: ["No", "Yes", "Maybe"] },
          { type: "calendar_math", text: "If Dad's birthday is March 9, what date is exactly one week later?", answer: "March 16", options: ["March 15", "March 16", "March 17"] },
          // Additional questions to reach 50
          { type: "weekday_count", text: "If Dad was born on Thursday, how many days is it from Sunday to his birthday?", answer: "5", options: ["4", "5", "6"] },
          { type: "month_count", text: "How many months from January to Dad's birth month (March)?", answer: "2", options: ["2", "3", "4"] },
          { type: "year_math", text: "Dad was born in 1972. If we add the digits (1+9+7+2), what do we get?", answer: "19", options: ["18", "19", "20"] },
          { type: "odd_even", text: "Dad was born in 1972. Is this an odd or even year?", answer: "Even", options: ["Odd", "Even", "Neither"] },
          { type: "date_part", text: "Dad was born on March 9. What is the day part of his birth date?", answer: "9", options: ["3", "9", "1972"] },
          { type: "month_part", text: "Dad was born on 03/09/1972. What is the month part?", answer: "03", options: ["09", "03", "1972"] },
          { type: "zodiac", text: "Dad was born on March 9. What is his zodiac sign?", answer: "Pisces", options: ["Aquarius", "Pisces", "Aries"] },
          
          // Family comparisons
          { type: "family_compare", text: "Who is older: Dad or Mom?", answer: "Dad", options: ["Mom", "Dad", "Same age"] },
          { type: "family_compare", text: "Who has a birthday in spring: Dad or Nia?", answer: "Dad", options: ["Dad", "Nia", "Both"] },
          { type: "age_difference", text: "About how many years older is Dad than Neil?", answer: "36", options: ["30", "36", "40"] },
          
          // Month patterns
          { type: "month_pattern", text: "March is the 3rd month. If we skip every other month starting from January, will we include March?", answer: "Yes", options: ["Yes", "No"] },
          { type: "days_in_month", text: "How many days are in Dad's birth month (March)?", answer: "31", options: ["28", "30", "31"] },
          { type: "season_change", text: "If Dad was born in spring, what season comes next?", answer: "Summer", options: ["Winter", "Summer", "Fall"] },
          
          // Time calculations
          { type: "decade", text: "Dad was born in the decade of:", answer: "1970s", options: ["1960s", "1970s", "1980s"] },
          { type: "century", text: "Dad was born in which century?", answer: "20th", options: ["19th", "20th", "21st"] },
          { type: "millennium", text: "Dad was born in which millennium?", answer: "2nd", options: ["1st", "2nd", "3rd"] },

          // Additional math-based questions
          { type: "subtraction", text: "If Dad was born in 1972, how many years before 2000 is that?", answer: "28", options: ["18", "28", "38"] },
          { type: "division", text: "Dad was born on the 9th. If we have 27 candies to share with 9 friends, how many would each get?", answer: "3", options: ["2", "3", "4"] },
          { type: "age_milestone", text: "Dad was born in 1972. In what year did he turn 20?", answer: "1992", options: ["1982", "1992", "2002"] },
          { type: "age_milestone", text: "Dad was born in 1972. In what year did he turn 30?", answer: "2002", options: ["1992", "2002", "2012"] },
          { type: "age_milestone", text: "Dad was born in 1972. In what year did he turn 40?", answer: "2012", options: ["2002", "2012", "2022"] },
          
          // Pattern recognition
          { type: "sequence", text: "Dad's birthday is on the 9th. What comes next: 3, 6, 9, ...?", answer: "12", options: ["10", "11", "12"] },
          { type: "number_pattern", text: "Dad was born in '72. What is 7 tens plus 2 ones?", answer: "72", options: ["9", "72", "720"] },
          { type: "skip_counting", text: "Count by 3s starting at Dad's birth day (9): 9, 12, 15, ...?", answer: "18", options: ["17", "18", "19"] },
          
          // Calendar navigation
          { type: "month_after", text: "What is the 3rd month after Dad's birth month?", answer: "June", options: ["May", "June", "July"] },
          { type: "month_before", text: "What is the 2nd month before Dad's birth month?", answer: "January", options: ["December", "January", "February"] },
          { type: "weekday_after", text: "Dad was born on Thursday. What is 3 days after that?", answer: "Sunday", options: ["Saturday", "Sunday", "Monday"] },
          { type: "half_year", text: "What month is half a year from Dad's birthday?", answer: "September", options: ["August", "September", "October"] },
          
          // Educational calendar facts
          { type: "month_days", text: "Dad was born in March. Which has more days: March or April?", answer: "March", options: ["March", "April", "Same"] },
          { type: "leap_year_rule", text: "Dad's birth year (1972) is divisible by 4. Does that make it a leap year?", answer: "Yes", options: ["No", "Yes", "Cannot tell"] },
          { type: "season_hemisphere", text: "Dad was born in March. Is it spring in the Southern Hemisphere then?", answer: "No", options: ["Yes", "No", "Same as North"] },
          
          // Time spans
          { type: "days_in_span", text: "About how many days are in the month of Dad's birthday?", answer: "31", options: ["28", "30", "31"] },
          { type: "weeks_in_month", text: "About how many complete weeks are in Dad's birth month?", answer: "4", options: ["3", "4", "5"] },
          { type: "days_in_year", text: "Dad was born in 1972. How many days were in that year?", answer: "366", options: ["365", "366", "367"] },
          
          // More zodiac and astrology related
          { type: "zodiac_element", text: "Dad's zodiac sign (Pisces) is associated with which element?", answer: "Water", options: ["Fire", "Earth", "Water"] },
          { type: "zodiac_neighbors", text: "Which signs come before and after Dad's sign (Pisces)?", answer: "Aquarius and Aries", options: ["Capricorn and Aries", "Aquarius and Taurus", "Aquarius and Aries"] },
          { type: "birth_stone", text: "What is the birthstone for Dad's birth month (March)?", answer: "Aquamarine", options: ["Garnet", "Amethyst", "Aquamarine"] },
          
          // New sequence games
         {
             type: "weekday_drag_sequence",
             text: "Put the days of the week in order starting from Sunday:",
             items: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
         },
         {
             type: "month_drag_sequence",
             text: "Put the months in order starting from Dad's birth month (March):",
             items: ["March", "April", "May", "June", "July", "August", "September"]
         },
         {
             type: "season_drag_sequence",
             text: "Put the seasons in order starting with the season Dad was born in (Spring):",
             items: ["Spring", "Summer", "Fall", "Winter"]
         },
         {
             type: "zodiac_drag_sequence",
             text: "Put these zodiac signs in order, starting with Dad's sign (Pisces):",
             items: ["Pisces", "Aries", "Taurus", "Gemini", "Cancer"]
         },
         {
             type: "leap_year_sequence",
             text: "Drag the years in order. Dad was born in a leap year (1972).",
             items: ["1968", "1972", "1976", "1980", "1984"],
             helperText: "All these years are leap years."
         }
     ],
     "Nandu": [
          { type: "weekday_sequence", text: "Nandu was born on a Monday. What day comes after Monday?", answer: "Tuesday", options: ["Sunday", "Tuesday", "Wednesday"] },
          { type: "month_sequence", text: "Nandu's birthday is in April. What month comes before April?", answer: "March", options: ["February", "March", "May"] },
          { type: "season", text: "Nandu was born in April. What season is April in?", answer: "Spring", options: ["Winter", "Spring", "Summer"] },
          { type: "date_math", text: "Nandu was born on April 8. If today is April 6, how many days until Nandu's birthday?", answer: "2", options: ["1", "2", "3"] },
          { type: "addition", text: "Nandu was born on the 8th day of the 4th month. What is 8 + 4?", answer: "12", options: ["10", "12", "14"] },
          { type: "multiplication", text: "Nandu was born on the 8th. What is 8 × 4?", answer: "32", options: ["24", "32", "36"] },
          { type: "math_sequence", text: "Nandu was born in '02. Put these numbers in order:", items: ["00", "01", "02", "03"] },
          { type: "month_position", text: "Nandu was born in April. If January is the 1st month, what position is April?", answer: "4th", options: ["3rd", "4th", "5th"] },
          { type: "date_fact", text: "Nandu's birth year was 2002. Was that a leap year?", answer: "No", options: ["Yes", "No", "Maybe"] },
          { type: "calendar_math", text: "If Nandu's birthday is April 8, what date is exactly one week later?", answer: "April 15", options: ["April 14", "April 15", "April 16"] },
          // Additional questions to reach 50
          { type: "weekday_count", text: "If Nandu was born on Monday, how many days is it from Sunday to his birthday?", answer: "1", options: ["1", "2", "3"] },
          { type: "month_count", text: "How many months from January to Nandu's birth month (April)?", answer: "3", options: ["2", "3", "4"] },
          { type: "year_math", text: "Nandu was born in 2002. If we add the digits (2+0+0+2), what do we get?", answer: "4", options: ["3", "4", "5"] },
          { type: "odd_even", text: "Nandu was born in 2002. Is this an odd or even year?", answer: "Even", options: ["Odd", "Even", "Neither"] },
          { type: "date_part", text: "Nandu was born on April 8. What is the day part of his birth date?", answer: "8", options: ["4", "8", "2002"] },
          { type: "month_part", text: "Nandu was born on 04/08/2002. What is the month part?", answer: "04", options: ["08", "04", "2002"] },
          { type: "zodiac", text: "Nandu was born on April 8. What is his zodiac sign?", answer: "Aries", options: ["Pisces", "Aries", "Taurus"] },
          
          // Family comparisons
          { type: "family_compare", text: "Who is older: Nandu or Neil?", answer: "Nandu", options: ["Nandu", "Neil", "Same age"] },
          { type: "family_compare", text: "Who has a birthday in spring: Nandu or Dad?", answer: "Both", options: ["Nandu", "Dad", "Both"] },
          { type: "age_difference", text: "About how many years older is Nandu than Nia?", answer: "13", options: ["10", "13", "15"] },
          
          // Month patterns
          { type: "month_pattern", text: "April is the 4th month. If we skip every other month starting from January, will we include April?", answer: "Yes", options: ["Yes", "No"] },
          { type: "days_in_month", text: "How many days are in Nandu's birth month (April)?", answer: "30", options: ["30", "31", "28"] },
          { type: "season_change", text: "If Nandu was born in spring, what season comes next?", answer: "Summer", options: ["Winter", "Summer", "Fall"] },
          
          // Time calculations
          { type: "decade", text: "Nandu was born in the decade of:", answer: "2000s", options: ["1990s", "2000s", "2010s"] },
          { type: "century", text: "Nandu was born in which century?", answer: "21st", options: ["20th", "21st", "22nd"] },
          { type: "millennium", text: "Nandu was born in which millennium?", answer: "3rd", options: ["2nd", "3rd", "4th"] },

          // Additional math-based questions
          { type: "subtraction", text: "If Nandu was born in 2002, how many years before 2020 is that?", answer: "18", options: ["18", "15", "10"] },
          { type: "division", text: "Nandu was born on the 8th. If we have 32 candies to share with 8 friends, how many would each get?", answer: "4", options: ["2", "4", "8"] },
          { type: "age_milestone", text: "Nandu was born in 2002. In what year did he turn 10?", answer: "2012", options: ["2002", "2012", "2022"] },
          { type: "age_milestone", text: "Nandu was born in 2002. In what year did he turn 20?", answer: "2022", options: ["2012", "2022", "2032"] },
          { type: "age_milestone", text: "Nandu was born in 2002. In what year will he turn 30?", answer: "2032", options: ["2022", "2032", "2042"] },
          
          // Pattern recognition
          { type: "sequence", text: "Nandu's birthday is on the 8th. What comes next: 4, 6, 8, ...?", answer: "10", options: ["9", "10", "11"] },
          { type: "number_pattern", text: "Nandu was born in '02. What is 0 tens plus 2 ones?", answer: "2", options: ["0", "2", "20"] },
          { type: "skip_counting", text: "Count by 4s starting at Nandu's birth day (8): 8, 12, 16, ...?", answer: "20", options: ["18", "19", "20"] },
          
          // Calendar navigation
          { type: "month_after", text: "What is the 3rd month after Nandu's birth month?", answer: "July", options: ["June", "July", "August"] },
          { type: "month_before", text: "What is the 2nd month before Nandu's birth month?", answer: "February", options: ["January", "February", "March"] },
          { type: "weekday_after", text: "Nandu was born on Monday. What is 3 days after that?", answer: "Thursday", options: ["Wednesday", "Thursday", "Friday"] },
          { type: "half_year", text: "What month is half a year from Nandu's birthday?", answer: "October", options: ["September", "October", "November"] },
          
          // Educational calendar facts
          { type: "month_days", text: "Nandu was born in April. Which has more days: April or May?", answer: "May", options: ["April", "May", "Same"] },
          { type: "leap_year_rule", text: "Nandu's birth year (2002) is not divisible by 4. Does that make it a leap year?", answer: "No", options: ["No", "Yes", "Cannot tell"] },
          { type: "season_hemisphere", text: "Nandu was born in April. Is it spring in the Southern Hemisphere then?", answer: "No", options: ["Yes", "No", "Same as North"] },
          
          // Time spans
          { type: "days_in_span", text: "About how many days are in the month of Nandu's birthday?", answer: "30", options: ["28", "30", "31"] },
          { type: "weeks_in_month", text: "About how many complete weeks are in Nandu's birth month?", answer: "4", options: ["3", "4", "5"] },
          { type: "days_in_year", text: "Nandu was born in 2002. How many days were in that year?", answer: "365", options: ["365", "366", "367"] },
          
          // More zodiac and astrology related
          { type: "zodiac_element", text: "Nandu's zodiac sign (Aries) is associated with which element?", answer: "Fire", options: ["Fire", "Earth", "Water"] },
          { type: "zodiac_neighbors", text: "Which signs come before and after Nandu's sign (Aries)?", answer: "Pisces and Taurus", options: ["Aquarius and Taurus", "Pisces and Gemini", "Pisces and Taurus"] },
          { type: "birth_stone", text: "What is the birthstone for Nandu's birth month (April)?", answer: "Diamond", options: ["Amethyst", "Aquamarine", "Diamond"] },
          
          // New sequence games
         {
             type: "weekday_drag_sequence",
             text: "Put the days of the week in order starting from Sunday:",
             items: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
         },
         {
             type: "month_drag_sequence",
             text: "Put the months in order starting from Nandu's birth month (April):",
             items: ["April", "May", "June", "July", "August", "September", "October"]
         },
         {
             type: "season_drag_sequence",
             text: "Put the seasons in order starting with the season Nandu was born in (Spring):",
             items: ["Spring", "Summer", "Fall", "Winter"]
         },
         {
             type: "zodiac_drag_sequence",
             text: "Put these zodiac signs in order, starting with Nandu's sign (Aries):",
             items: ["Aries", "Taurus", "Gemini", "Cancer", "Leo"]
         },
         {
             type: "leap_year_sequence",
             text: "Drag the years in order. Nandu was born in 2002 (not a leap year).",
             items: ["2000", "2002", "2004", "2008", "2012"],
             helperText: "2000, 2004, 2008, and 2012 are leap years."
         }
     ],
     "Neil": [
          { type: "weekday_sequence", text: "Neil was born on a Wednesday. What day comes after Wednesday?", answer: "Thursday", options: ["Tuesday", "Thursday", "Friday"] },
          { type: "month_sequence", text: "Neil's birthday is in March. What month comes after March?", answer: "April", options: ["February", "April", "May"] },
          { type: "season", text: "Neil was born in March. What season is March in?", answer: "Spring", options: ["Winter", "Spring", "Summer"] },
          { type: "date_math", text: "Neil was born on March 19. If today is March 17, how many days until Neil's birthday?", answer: "2", options: ["1", "2", "3"] },
          { type: "addition", text: "Neil was born on the 19th day of the 3rd month. What is 19 + 3?", answer: "22", options: ["21", "22", "23"] },
          { type: "multiplication", text: "Neil was born on the 19th. What is 19 × 3?", answer: "57", options: ["47", "57", "67"] },
          { type: "math_sequence", text: "Neil was born in '08. Put these numbers in order:", items: ["06", "07", "08", "09"] },
          { type: "month_position", text: "Neil was born in March. If January is the 1st month, what position is March?", answer: "3rd", options: ["2nd", "3rd", "4th"] },
          { type: "date_fact", text: "Neil's birth year was 2008. Was that a leap year?", answer: "Yes", options: ["No", "Yes", "Maybe"] },
          { type: "calendar_math", text: "If Neil's birthday is March 19, what date is exactly one week later?", answer: "March 26", options: ["March 25", "March 26", "March 27"] },
          // Additional questions to reach 50
          { type: "weekday_count", text: "If Neil was born on Wednesday, how many days is it from Sunday to his birthday?", answer: "3", options: ["2", "3", "4"] },
          { type: "month_count", text: "How many months from January to Neil's birth month (March)?", answer: "2", options: ["2", "3", "4"] },
          { type: "year_math", text: "Neil was born in 2008. If we add the digits (2+0+0+8), what do we get?", answer: "10", options: ["9", "10", "11"] },
          { type: "odd_even", text: "Neil was born in 2008. Is this an odd or even year?", answer: "Even", options: ["Odd", "Even", "Neither"] },
          { type: "date_part", text: "Neil was born on March 19. What is the day part of his birth date?", answer: "19", options: ["3", "19", "2008"] },
          { type: "month_part", text: "Neil was born on 03/19/2008. What is the month part?", answer: "03", options: ["19", "03", "2008"] },
          { type: "zodiac", text: "Neil was born on March 19. What is his zodiac sign?", answer: "Pisces", options: ["Aquarius", "Pisces", "Aries"] },
          
          // Family comparisons
          { type: "family_compare", text: "Who is older: Neil or Nia?", answer: "Neil", options: ["Neil", "Nia", "Same age"] },
          { type: "family_compare", text: "Who has a birthday in spring: Neil or Dad?", answer: "Both", options: ["Neil", "Dad", "Both"] },
          { type: "age_difference", text: "About how many years older is Neil than Nia?", answer: "7", options: ["5", "7", "9"] },
          
          // Month patterns
          { type: "month_pattern", text: "March is the 3rd month. If we skip every other month starting from January, will we include March?", answer: "Yes", options: ["Yes", "No"] },
          { type: "days_in_month", text: "How many days are in Neil's birth month (March)?", answer: "31", options: ["28", "30", "31"] },
          { type: "season_change", text: "If Neil was born in spring, what season comes next?", answer: "Summer", options: ["Winter", "Summer", "Fall"] },
          
          // Time calculations
          { type: "decade", text: "Neil was born in the decade of:", answer: "2000s", options: ["1990s", "2000s", "2010s"] },
          { type: "century", text: "Neil was born in which century?", answer: "21st", options: ["20th", "21st", "22nd"] },
          { type: "millennium", text: "Neil was born in which millennium?", answer: "3rd", options: ["2nd", "3rd", "4th"] },

          // Additional math-based questions
          { type: "subtraction", text: "If Neil was born in 2008, how many years before 2020 is that?", answer: "12", options: ["12", "10", "8"] },
          { type: "division", text: "Neil was born on the 19th. If we have 57 candies to share with 19 friends, how many would each get?", answer: "3", options: ["2", "3", "4"] },
          { type: "age_milestone", text: "Neil was born in 2008. In what year did he turn 10?", answer: "2018", options: ["2008", "2018", "2028"] },
          { type: "age_milestone", text: "Neil was born in 2008. In what year will he turn 20?", answer: "2028", options: ["2018", "2028", "2038"] },
          { type: "age_milestone", text: "Neil was born in 2008. In what year will he turn 30?", answer: "2038", options: ["2028", "2038", "2048"] },
          
          // Pattern recognition
          { type: "sequence", text: "Neil's birthday is on the 19th. What comes next: 9, 14, 19, ...?", answer: "24", options: ["20", "24", "29"] },
          { type: "number_pattern", text: "Neil was born in '08. What is 0 tens plus 8 ones?", answer: "8", options: ["0", "8", "80"] },
          { type: "skip_counting", text: "Count by 5s starting at Neil's birth day (19): 19, 24, 29, ...?", answer: "34", options: ["33", "34", "35"] },
          
          // Calendar navigation
          { type: "month_after", text: "What is the 3rd month after Neil's birth month?", answer: "June", options: ["May", "June", "July"] },
          { type: "month_before", text: "What is the 2nd month before Neil's birth month?", answer: "January", options: ["December", "January", "February"] },
          { type: "weekday_after", text: "Neil was born on Wednesday. What is 3 days after that?", answer: "Saturday", options: ["Friday", "Saturday", "Sunday"] },
          { type: "half_year", text: "What month is half a year from Neil's birthday?", answer: "September", options: ["August", "September", "October"] },
          
          // Educational calendar facts
          { type: "month_days", text: "Neil was born in March. Which has more days: March or April?", answer: "March", options: ["March", "April", "Same"] },
          { type: "leap_year_rule", text: "Neil's birth year (2008) is divisible by 4. Does that make it a leap year?", answer: "Yes", options: ["No", "Yes", "Cannot tell"] },
          { type: "season_hemisphere", text: "Neil was born in March. Is it spring in the Southern Hemisphere then?", answer: "No", options: ["Yes", "No", "Same as North"] },
          
          // Time spans
          { type: "days_in_span", text: "About how many days are in the month of Neil's birthday?", answer: "31", options: ["28", "30", "31"] },
          { type: "weeks_in_month", text: "About how many complete weeks are in Neil's birth month?", answer: "4", options: ["3", "4", "5"] },
          { type: "days_in_year", text: "Neil was born in 2008. How many days were in that year?", answer: "366", options: ["365", "366", "367"] },
          
          // More zodiac and astrology related
          { type: "zodiac_element", text: "Neil's zodiac sign (Pisces) is associated with which element?", answer: "Water", options: ["Fire", "Earth", "Water"] },
          { type: "zodiac_neighbors", text: "Which signs come before and after Neil's sign (Pisces)?", answer: "Aquarius and Aries", options: ["Capricorn and Aries", "Aquarius and Taurus", "Aquarius and Aries"] },
          { type: "birth_stone", text: "What is the birthstone for Neil's birth month (March)?", answer: "Aquamarine", options: ["Garnet", "Amethyst", "Aquamarine"] },
          
          // New sequence games
         {
             type: "weekday_drag_sequence",
             text: "Put the days of the week in order starting from Sunday:",
             items: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
         },
         {
             type: "month_drag_sequence",
             text: "Put the months in order starting from Neil's birth month (March):",
             items: ["March", "April", "May", "June", "July", "August", "September"]
         },
         {
             type: "season_drag_sequence",
             text: "Put the seasons in order starting with the season Neil was born in (Spring):",
             items: ["Spring", "Summer", "Fall", "Winter"]
         },
         {
             type: "zodiac_drag_sequence",
             text: "Put these zodiac signs in order, starting with Neil's sign (Pisces):",
             items: ["Pisces", "Aries", "Taurus", "Gemini", "Cancer"]
         },
         {
             type: "leap_year_sequence",
             text: "Drag the years in order. Neil was born in a leap year (2008).",
             items: ["2004", "2008", "2012", "2016", "2020"],
             helperText: "All these years are leap years."
         }
     ],
     "Grandma": [
          { type: "weekday_sequence", text: "Grandma was born on a Tuesday. What day comes before Tuesday?", answer: "Monday", options: ["Sunday", "Monday", "Wednesday"] },
          { type: "month_sequence", text: "Grandma's birthday is in August. What month comes after August?", answer: "September", options: ["July", "September", "October"] },
          { type: "season", text: "Grandma was born in August. What season is August in?", answer: "Summer", options: ["Spring", "Summer", "Fall"] },
          { type: "date_math", text: "Grandma was born on August 18. If today is August 16, how many days until her birthday?", answer: "2", options: ["1", "2", "3"] },
          { type: "addition", text: "Grandma was born on the 18th day of the 8th month. What is 18 + 8?", answer: "26", options: ["24", "26", "28"] },
          { type: "multiplication", text: "Grandma was born on the 18th. What is 18 × 2?", answer: "36", options: ["34", "36", "38"] },
          { type: "math_sequence", text: "Grandma was born in '53. Put these numbers in order:", items: ["51", "52", "53", "54"] },
          { type: "month_position", text: "Grandma was born in August. If January is the 1st month, what position is August?", answer: "8th", options: ["7th", "8th", "9th"] },
          { type: "date_fact", text: "Grandma's birth year was 1953. Was that a leap year?", answer: "No", options: ["Yes", "No", "Maybe"] },
          { type: "calendar_math", text: "If Grandma's birthday is August 18, what date is exactly one week later?", answer: "August 25", options: ["August 24", "August 25", "August 26"] },
          // Additional questions to reach 50
          { type: "weekday_count", text: "If Grandma was born on Tuesday, how many days is it from Sunday to her birthday?", answer: "2", options: ["2", "3", "4"] },
          { type: "month_count", text: "How many months from January to Grandma's birth month (August)?", answer: "7", options: ["6", "7", "8"] },
          { type: "year_math", text: "Grandma was born in 1953. If we add the digits (1+9+5+3), what do we get?", answer: "18", options: ["17", "18", "19"] },
          { type: "odd_even", text: "Grandma was born in 1953. Is this an odd or even year?", answer: "Odd", options: ["Odd", "Even", "Neither"] },
          { type: "date_part", text: "Grandma was born on August 18. What is the day part of her birth date?", answer: "18", options: ["8", "18", "1953"] },
          { type: "month_part", text: "Grandma was born on 08/18/1953. What is the month part?", answer: "08", options: ["18", "08", "1953"] },
          { type: "zodiac", text: "Grandma was born on August 18. What is her zodiac sign?", answer: "Leo", options: ["Cancer", "Leo", "Virgo"] },
          
          // Family comparisons
          { type: "family_compare", text: "Who is older: Grandma or Grandpa?", answer: "Grandpa", options: ["Grandma", "Grandpa", "Same age"] },
          { type: "family_compare", text: "Who has a birthday in summer: Grandma or Mom?", answer: "Both", options: ["Grandma", "Mom", "Both"] },
          { type: "age_difference", text: "About how many years older is Grandma than Dad?", answer: "19", options: ["15", "19", "23"] },
          
          // Month patterns
          { type: "month_pattern", text: "August is the 8th month. If we skip every other month starting from January, will we include August?", answer: "Yes", options: ["Yes", "No"] },
          { type: "days_in_month", text: "How many days are in Grandma's birth month (August)?", answer: "31", options: ["30", "31", "28"] },
          { type: "season_change", text: "If Grandma was born in summer, what season comes next?", answer: "Fall", options: ["Spring", "Winter", "Fall"] },
          
          // Time calculations
          { type: "decade", text: "Grandma was born in the decade of:", answer: "1950s", options: ["1940s", "1950s", "1960s"] },
          { type: "century", text: "Grandma was born in which century?", answer: "20th", options: ["19th", "20th", "21st"] },
          { type: "millennium", text: "Grandma was born in which millennium?", answer: "2nd", options: ["1st", "2nd", "3rd"] },

          // Additional math-based questions
          { type: "subtraction", text: "If Grandma was born in 1953, how many years before 2000 is that?", answer: "47", options: ["37", "47", "57"] },
          { type: "division", text: "Grandma was born on the 18th. If we have 36 cookies to share with 18 friends, how many would each get?", answer: "2", options: ["2", "3", "4"] },
          { type: "age_milestone", text: "Grandma was born in 1953. In what year did she turn 20?", answer: "1973", options: ["1963", "1973", "1983"] },
          { type: "age_milestone", text: "Grandma was born in 1953. In what year did she turn 30?", answer: "1983", options: ["1973", "1983", "1993"] },
          { type: "age_milestone", text: "Grandma was born in 1953. In what year did she turn 40?", answer: "1993", options: ["1983", "1993", "2003"] },
          
          // Pattern recognition
          { type: "sequence", text: "Grandma's birthday is on the 18th. What comes next: 6, 12, 18, ...?", answer: "24", options: ["20", "24", "28"] },
          { type: "number_pattern", text: "Grandma was born in '53. What is 5 tens plus 3 ones?", answer: "53", options: ["5", "53", "530"] },
          { type: "skip_counting", text: "Count by 6s starting at Grandma's birth day (18): 18, 24, 30, ...?", answer: "36", options: ["30", "36", "42"] },
          
          // Calendar navigation
          { type: "month_after", text: "What is the 3rd month after Grandma's birth month?", answer: "November", options: ["October", "November", "December"] },
          { type: "month_before", text: "What is the 2nd month before Grandma's birth month?", answer: "June", options: ["May", "June", "July"] },
          { type: "weekday_after", text: "Grandma was born on Tuesday. What is 3 days after that?", answer: "Friday", options: ["Thursday", "Friday", "Saturday"] },
          { type: "half_year", text: "What month is half a year from Grandma's birthday?", answer: "February", options: ["January", "February", "March"] },
          
          // Educational calendar facts
          { type: "month_days", text: "Grandma was born in August. Which has more days: August or September?", answer: "August", options: ["August", "September", "Same"] },
          { type: "leap_year_rule", text: "Grandma's birth year (1953) is not divisible by 4. Does that make it a leap year?", answer: "No", options: ["No", "Yes", "Cannot tell"] },
          { type: "season_hemisphere", text: "Grandma was born in August. Is it summer in the Southern Hemisphere then?", answer: "No", options: ["Yes", "No", "Same as North"] },
          
          // Time spans
          { type: "days_in_span", text: "About how many days are in the month of Grandma's birthday?", answer: "31", options: ["28", "30", "31"] },
          { type: "weeks_in_month", text: "About how many complete weeks are in Grandma's birth month?", answer: "4", options: ["3", "4", "5"] },
          { type: "days_in_year", text: "Grandma was born in 1953. How many days were in that year?", answer: "365", options: ["365", "366", "367"] },
          
          // More zodiac and astrology related
          { type: "zodiac_element", text: "Grandma's zodiac sign (Leo) is associated with which element?", answer: "Fire", options: ["Fire", "Earth", "Water"] },
          { type: "zodiac_neighbors", text: "Which signs come before and after Grandma's sign (Leo)?", answer: "Cancer and Virgo", options: ["Gemini and Virgo", "Cancer and Virgo", "Cancer and Libra"] },
          { type: "birth_stone", text: "What is the birthstone for Grandma's birth month (August)?", answer: "Peridot", options: ["Ruby", "Peridot", "Sapphire"] },
          
          // New sequence games
         {
             type: "weekday_drag_sequence",
             text: "Put the days of the week in order starting from Sunday:",
             items: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
         },
         {
             type: "month_drag_sequence",
             text: "Put the months in order starting from Grandma's birth month (August):",
             items: ["August", "September", "October", "November", "December", "January", "February"]
         },
         {
             type: "season_drag_sequence",
             text: "Put the seasons in order starting with the season Grandma was born in (Summer):",
             items: ["Summer", "Fall", "Winter", "Spring"]
         },
         {
             type: "zodiac_drag_sequence",
             text: "Put these zodiac signs in order, starting with Grandma's sign (Leo):",
             items: ["Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"]
         },
         {
             type: "leap_year_sequence",
             text: "Drag the years in order. Grandma was born in 1953 (not a leap year).",
             items: ["1952", "1953", "1956", "1960", "1964"],
             helperText: "1952, 1956, 1960, and 1964 are leap years."
         }
     ],
     "Grandpa": [
          { type: "weekday_sequence", text: "Grandpa was born on a Saturday. What day comes after Saturday?", answer: "Sunday", options: ["Friday", "Sunday", "Monday"] },
          { type: "month_sequence", text: "Grandpa's birthday is in February. What month comes after February?", answer: "March", options: ["January", "March", "April"] },
          { type: "season", text: "Grandpa was born in February. What season is February in?", answer: "Winter", options: ["Fall", "Winter", "Spring"] },
          { type: "date_math", text: "Grandpa was born on February 3. If today is February 1, how many days until his birthday?", answer: "2", options: ["1", "2", "3"] },
          { type: "addition", text: "Grandpa was born on the 3rd day of the 2nd month. What is 3 + 2?", answer: "5", options: ["4", "5", "6"] },
          { type: "multiplication", text: "Grandpa was born on the 3rd. What is 3 × 2?", answer: "6", options: ["5", "6", "7"] },
          { type: "math_sequence", text: "Grandpa was born in '45. Put these numbers in order:", items: ["43", "44", "45", "46"] },
          { type: "month_position", text: "Grandpa was born in February. If January is the 1st month, what position is February?", answer: "2nd", options: ["1st", "2nd", "3rd"] },
          { type: "date_fact", text: "Grandpa's birth year was 1945. Was that a leap year?", answer: "No", options: ["Yes", "No", "Maybe"] },
          { type: "calendar_math", text: "If Grandpa's birthday is February 3, what date is exactly one week later?", answer: "February 10", options: ["February 9", "February 10", "February 11"] },
          // Additional questions to reach 50
          { type: "weekday_count", text: "If Grandpa was born on Saturday, how many days is it from Sunday to his birthday?", answer: "6", options: ["5", "6", "7"] },
          { type: "month_count", text: "How many months from January to Grandpa's birth month (February)?", answer: "1", options: ["1", "2", "3"] },
          { type: "year_math", text: "Grandpa was born in 1945. If we add the digits (1+9+4+5), what do we get?", answer: "19", options: ["18", "19", "20"] },
          { type: "odd_even", text: "Grandpa was born in 1945. Is this an odd or even year?", answer: "Odd", options: ["Odd", "Even", "Neither"] },
          { type: "date_part", text: "Grandpa was born on February 3. What is the day part of his birth date?", answer: "3", options: ["2", "3", "1945"] },
          { type: "month_part", text: "Grandpa was born on 02/03/1945. What is the month part?", answer: "02", options: ["03", "02", "1945"] },
          { type: "zodiac", text: "Grandpa was born on February 3. What is his zodiac sign?", answer: "Aquarius", options: ["Capricorn", "Aquarius", "Pisces"] },
          
          // Family comparisons
          { type: "family_compare", text: "Who is older: Grandpa or Grandma?", answer: "Grandpa", options: ["Grandma", "Grandpa", "Same age"] },
          { type: "family_compare", text: "Who has a birthday in winter: Grandpa or Dad?", answer: "Grandpa", options: ["Grandpa", "Dad", "Both"] },
          { type: "age_difference", text: "About how many years older is Grandpa than Dad?", answer: "27", options: ["25", "27", "30"] },
          
          // Month patterns
          { type: "month_pattern", text: "February is the 2nd month. If we skip every other month starting from January, will we include February?", answer: "Yes", options: ["Yes", "No"] },
          { type: "days_in_month", text: "How many days are in Grandpa's birth month (February)?", answer: "28", options: ["28", "29", "30"] },
          { type: "season_change", text: "If Grandpa was born in winter, what season comes next?", answer: "Spring", options: ["Spring", "Summer", "Fall"] },
          
          // Time calculations
          { type: "decade", text: "Grandpa was born in the decade of:", answer: "1940s", options: ["1930s", "1940s", "1950s"] },
          { type: "century", text: "Grandpa was born in which century?", answer: "20th", options: ["19th", "20th", "21st"] },
          { type: "millennium", text: "Grandpa was born in which millennium?", answer: "2nd", options: ["1st", "2nd", "3rd"] },

          // Additional math-based questions
          { type: "subtraction", text: "If Grandpa was born in 1945, how many years before 2000 is that?", answer: "55", options: ["45", "55", "65"] },
          { type: "division", text: "Grandpa was born on the 3rd. If we have 6 candies to share with 3 friends, how many would each get?", answer: "2", options: ["1", "2", "3"] },
          { type: "age_milestone", text: "Grandpa was born in 1945. In what year did he turn 20?", answer: "1965", options: ["1955", "1965", "1975"] },
          { type: "age_milestone", text: "Grandpa was born in 1945. In what year did he turn 30?", answer: "1975", options: ["1965", "1975", "1985"] },
          { type: "age_milestone", text: "Grandpa was born in 1945. In what year did he turn 40?", answer: "1985", options: ["1975", "1985", "1995"] },
          
          // Pattern recognition
          { type: "sequence", text: "Grandpa's birthday is on the 3rd. What comes next: 3, 6, 9, ...?", answer: "12", options: ["10", "11", "12"] },
          { type: "number_pattern", text: "Grandpa was born in '45. What is 4 tens plus 5 ones?", answer: "45", options: ["4", "45", "450"] },
          { type: "skip_counting", text: "Count by 3s starting at Grandpa's birth day (3): 3, 6, 9, ...?", answer: "12", options: ["11", "12", "13"] },
          
          // Calendar navigation
          { type: "month_after", text: "What is the 3rd month after Grandpa's birth month?", answer: "May", options: ["April", "May", "June"] },
          { type: "month_before", text: "What is the 2nd month before Grandpa's birth month?", answer: "December", options: ["November", "December", "January"] },
          { type: "weekday_after", text: "Grandpa was born on Saturday. What is 3 days after that?", answer: "Tuesday", options: ["Monday", "Tuesday", "Wednesday"] },
          { type: "half_year", text: "What month is half a year from Grandpa's birthday?", answer: "August", options: ["July", "August", "September"] },
          
          // Educational calendar facts
          { type: "month_days", text: "Grandpa was born in February. Which has more days: February or March?", answer: "March", options: ["February", "March", "Same"] },
          { type: "leap_year_rule", text: "Grandpa's birth year (1945) is not divisible by 4. Does that make it a leap year?", answer: "No", options: ["No", "Yes", "Cannot tell"] },
          { type: "season_hemisphere", text: "Grandpa was born in February. Is it winter in the Southern Hemisphere then?", answer: "No", options: ["Yes", "No", "Same as North"] },
          
          // Time spans
          { type: "days_in_span", text: "About how many days are in the month of Grandpa's birthday?", answer: "28", options: ["28", "29", "30"] },
          { type: "weeks_in_month", text: "About how many complete weeks are in Grandpa's birth month?", answer: "4", options: ["3", "4", "5"] },
          { type: "days_in_year", text: "Grandpa was born in 1945. How many days were in that year?", answer: "365", options: ["365", "366", "367"] },
          
          // More zodiac and astrology related
          { type: "zodiac_element", text: "Grandpa's zodiac sign (Aquarius) is associated with which element?", answer: "Air", options: ["Fire", "Earth", "Air"] },
          { type: "zodiac_neighbors", text: "Which signs come before and after Grandpa's sign (Aquarius)?", answer: "Capricorn and Pisces", options: ["Sagittarius and Pisces", "Capricorn and Aries", "Capricorn and Pisces"] },
          { type: "birth_stone", text: "What is the birthstone for Grandpa's birth month (February)?", answer: "Amethyst", options: ["Garnet", "Amethyst", "Aquamarine"] },
          
          // New sequence games
         {
             type: "weekday_drag_sequence",
             text: "Put the days of the week in order starting from Sunday:",
             items: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
         },
         {
             type: "month_drag_sequence",
             text: "Put the months in order starting from Grandpa's birth month (February):",
             items: ["February", "March", "April", "May", "June", "July", "August"]
         },
         {
             type: "season_drag_sequence",
             text: "Put the seasons in order starting with the season Grandpa was born in (Winter):",
             items: ["Winter", "Spring", "Summer", "Fall"]
         },
         {
             type: "zodiac_drag_sequence",
             text: "Put these zodiac signs in order, starting with Grandpa's sign (Aquarius):",
             items: ["Aquarius", "Pisces", "Aries", "Taurus", "Gemini"]
         },
         {
             type: "leap_year_sequence",
             text: "Drag the years in order. Grandpa was born in 1945 (not a leap year).",
             items: ["1944", "1945", "1948", "1952", "1956"],
             helperText: "1944, 1948, 1952, and 1956 are leap years."
         }
     ],
     "Nia": [
         { type: "month_sequence", text: "Nia's birthday is in November. What month is that?", answer: "November", options: ["October", "November", "December"] },
         {
               type: "event_drag_sequence",
               text: "Put these steps in order:",
               items: ["Birth", "First Steps", "Kindergarten"]
           },
         // Added milestone questions for Nia
         { type: "milestone_sequence", text: "When did Nia start breast feeding?", answer: "After 1 day", options: ["After birth", "After 1 day", "After 1 week"] },
         { type: "milestone_sequence", text: "When did Nia get her first vaccination?", answer: "After 2 weeks", options: ["After 1 week", "After 2 weeks", "After 1 month"] },
         { type: "milestone_math", text: "If Nia started sitting at 6 months and walking at 10 months, how many months passed between these milestones?", answer: "4 months", options: ["2 months", "4 months", "6 months"] },
         { type: "milestone_comparison", text: "Did Nia learn to sit before or after saying 'ma'?", answer: "Before", options: ["Before", "After", "Same time"] },
         { type: "milestone_ordering", text: "Put these events in order:", items: ["Birth", "First vaccination", "Started sitting", "Called 'ma'", "Started walking"] },
         { type: "milestone_math", text: "Nia started kindergarten at age 3 and school at age 5. How many years was she in kindergarten?", answer: "2 years", options: ["1 year", "2 years", "3 years"] },
         { type: "addition", text: "If Nia said 'ma' at 7 months and started walking at 10 months, how many months difference is that?", answer: "3", options: ["2", "3", "4"] },
         { type: "milestone_match", text: "Match the milestone with Nia's age: Started walking", answer: "10 months", options: ["6 months", "7 months", "10 months"] },
         { type: "event_sequence", text: "Which came first?", answer: "Sitting", options: ["Walking", "Sitting", "Kindergarten"] },
         { type: "milestone_drag_sequence", text: "Put these milestones in the correct order:", items: ["Birth", "Breast feeding", "First vaccination", "Sitting", "Saying 'ma'", "Walking", "Kindergarten", "School"] },
         { type: "milestone_age", text: "How old was Nia when she started school?", answer: "5 years", options: ["3 years", "4 years", "5 years"] },
         { type: "milestone_subtraction", text: "If Nia started walking at 10 months and sitting at 6 months, walking happened how many months after sitting?", answer: "4 months", options: ["2 months", "4 months", "6 months"] },
         { type: "true_false", text: "Nia learned to walk before she could sit.", answer: "False", options: ["True", "False"] },
         { type: "milestone_comparison", text: "Did Nia start kindergarten before or after turning 4?", answer: "Before", options: ["Before", "After", "Same time"] },
         // Add more standard date questions and milestone questions to reach 50
         { type: "weekday_sequence", text: "Nia was born on a Friday. What day comes after Friday?", answer: "Saturday", options: ["Thursday", "Saturday", "Sunday"] },
         { type: "season", text: "Nia was born in November. What season is that?", answer: "Fall", options: ["Summer", "Fall", "Winter"] },
         { type: "zodiac", text: "Nia was born on November 27. What is her zodiac sign?", answer: "Sagittarius", options: ["Scorpio", "Sagittarius", "Capricorn"] },
         { type: "weekday_count", text: "If Nia was born on Friday, how many days is it from Sunday to her birthday?", answer: "5", options: ["4", "5", "6"] },
         { type: "month_count", text: "How many months from January to Nia's birth month (November)?", answer: "10", options: ["9", "10", "11"] },
         { type: "year_math", text: "Nia was born in 2015. If we add the digits (2+0+1+5), what do we get?", answer: "8", options: ["7", "8", "9"] },
         { type: "odd_even", text: "Nia was born in 2015. Is this an odd or even year?", answer: "Odd", options: ["Odd", "Even", "Neither"] },
         { type: "date_part", text: "Nia was born on November 27. What is the day part of her birth date?", answer: "27", options: ["11", "27", "2015"] },
         { type: "month_part", text: "Nia was born on 11/27/2015. What is the month part?", answer: "11", options: ["27", "11", "2015"] },
         { type: "family_compare", text: "Who is older: Nia or Neil?", answer: "Neil", options: ["Nia", "Neil", "Same age"] },
         { type: "family_compare", text: "Who has a birthday in fall: Nia or Mom?", answer: "Nia", options: ["Nia", "Mom", "Both"] },
         { type: "age_difference", text: "About how many years older is Nia than Neil?", answer: "7", options: ["5", "7", "9"] },
         { type: "month_pattern", text: "November is the 11th month. If we skip every other month starting from January, will we include November?", answer: "Yes", options: ["Yes", "No"] },
         { type: "days_in_month", text: "How many days are in Nia's birth month (November)?", answer: "30", options: ["30", "31", "28"] },
         { type: "season_change", text: "If Nia was born in fall, what season comes next?", answer: "Winter", options: ["Spring", "Winter", "Summer"] },
         { type: "decade", text: "Nia was born in the decade of:", answer: "2010s", options: ["2000s", "2010s", "2020s"] },
         { type: "century", text: "Nia was born in which century?", answer: "21st", options: ["20th", "21st", "22nd"] },
         { type: "millennium", text: "Nia was born in which millennium?", answer: "3rd", options: ["2nd", "3rd", "4th"] },
         { type: "subtraction", text: "If Nia was born in 2015, how many years before 2020 is that?", answer: "5", options: ["5", "4", "3"] },
         { type: "division", text: "Nia was born on the 27th. If we have 54 candies to share with 27 friends, how many would each get?", answer: "2", options: ["1", "2", "3"] },
         { type: "age_milestone", text: "Nia was born in 2015. In what year did she turn 5?", answer: "2020", options: ["2015", "2020", "2025"] },
         { type: "age_milestone", text: "Nia was born in 2015. In what year will she turn 10?", answer: "2025", options: ["2020", "2025", "2030"] },
         { type: "age_milestone", text: "Nia was born in 2015. In what year will she turn 15?", answer: "2030", options: ["2025", "2030", "2035"] },
         { type: "sequence", text: "Nia's birthday is on the 27th. What comes next: 7, 17, 27, ...?", answer: "37", options: ["30", "37", "47"] },
         { type: "number_pattern", text: "Nia was born in '15. What is 1 ten plus 5 ones?", answer: "15", options: ["1", "15", "150"] },
         { type: "skip_counting", text: "Count by 10s starting at Nia's birth day (27): 27, 37, 47, ...?", answer: "57", options: ["47", "57", "67"] },
         { type: "month_after", text: "What is the 3rd month after Nia's birth month?", answer: "February", options: ["January", "February", "March"] },
         { type: "month_before", text: "What is the 2nd month before Nia's birth month?", answer: "September", options: ["August", "September", "October"] },
         { type: "weekday_after", text: "Nia was born on Friday. What is 3 days after that?", answer: "Monday", options: ["Sunday", "Monday", "Tuesday"] },
         { type: "half_year", text: "What month is half a year from Nia's birthday?", answer: "May", options: ["April", "May", "June"] },
         { type: "month_days", text: "Nia was born in November. Which has more days: November or December?", answer: "December", options: ["November", "December", "Same"] },
         { type: "leap_year_rule", text: "Nia's birth year (2015) is not divisible by 4. Does that make it a leap year?", answer: "No", options: ["No", "Yes", "Cannot tell"] },
         { type: "season_hemisphere", text: "Nia was born in November. Is it fall in the Southern Hemisphere then?", answer: "No", options: ["Yes", "No", "Same as North"] },
         { type: "days_in_span", text: "About how many days are in the month of Nia's birthday?", answer: "30", options: ["28", "30", "31"] },
         { type: "weeks_in_month", text: "About how many complete weeks are in Nia's birth month?", answer: "4", options: ["3", "4", "5"] },
         { type: "days_in_year", text: "Nia was born in 2015. How many days were in that year?", answer: "365", options: ["365", "366", "367"] },
         { type: "zodiac_element", text: "Nia's zodiac sign (Sagittarius) is associated with which element?", answer: "Fire", options: ["Fire", "Earth", "Water"] },
         { type: "zodiac_neighbors", text: "Which signs come before and after Nia's sign (Sagittarius)?", answer: "Scorpio and Capricorn", options: ["Libra and Capricorn", "Scorpio and Capricorn", "Scorpio and Aquarius"] },
         { type: "birth_stone", text: "What is the birthstone for Nia's birth month (November)?", answer: "Topaz", options: ["Opal", "Topaz", "Turquoise"] },
         
         // New sequence games
         {
             type: "weekday_drag_sequence",
             text: "Put the days of the week in order starting from Sunday:",
             items: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
         },
         {
             type: "month_drag_sequence",
             text: "Put the months in order starting from Nia's birth month (November):",
             items: ["November", "December", "January", "February", "March", "April", "May"]
         },
         {
             type: "season_drag_sequence",
             text: "Put the seasons in order starting with the season Nia was born in (Fall):",
             items: ["Fall", "Winter", "Spring", "Summer"]
         },
         {
             type: "zodiac_drag_sequence",
             text: "Put these zodiac signs in order, starting with Nia's sign (Sagittarius):",
             items: ["Sagittarius", "Capricorn", "Aquarius", "Pisces", "Aries"]
         },
         {
             type: "leap_year_sequence",
             text: "Drag the years in order. Nia was born in 2015 (not a leap year).",
             items: ["2012", "2015", "2016", "2020", "2024"],
             helperText: "2012, 2016, 2020, and 2024 are leap years."
         }
      ]
};