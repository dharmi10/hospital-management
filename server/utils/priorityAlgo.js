// helper functions 
// logic that calculates urgency scores based on symptoms


const symptomWeights = {           // the cheatsheet, which tells the computer how serious a symptom is.
  // CRITICAL (Immediate Action)
  "chest pain": 100,
  "difficulty breathing": 100,
  "stroke": 100,
  "unconscious": 100,

  // HIGH (Urgent)
  "high fever": 60,
  "severe cut": 60,
  "broken bone": 60,

  // MEDIUM (Routine)
  "vomiting": 30,
  "rash": 30,
  "headache": 30,

  // LOW (Non-Urgent)
  "runny nose": 10,
  "sore throat": 10,
  "fatigue": 5
};

export const getPriorityScore = (userText) => { 
    // 0 in case the patient types nothing
    if(!userText) return 0; 

    //change all inputs to lowercase so that there are no case related issuses
    const clearText = userText.toLowerCase();
    let maxScore = 0 // at the start the state is 0, will increase as the patient enters the symptoms 

    // loop through each symptom in the dict to get a score. 
    for(const symptom in symptomWeights) {
        if (clearText.include(symptom)){
            let currScore = symptomWeights[symptom]; // gets score for that particular symptom
            if (currScore > maxScore ){
                maxScore = currScore;
            }
        }
    }
    return maxScore;
}

// 1. Fixed "ort" to "export"
export const prioritizeTasks = (tasks) => {
    const now = new Date(); 
    
    const scoredTasks = tasks.map((task) => {
        let score = 0;

        if (task.completed) {
            return { ...task, score: -10000 }; // (Added a zero to match previous logic)
        }
        
        const urgencyScore = getPriorityScore(task.content);
        score += urgencyScore;
        if (task.deadline) {
            const deadlineDate = new Date(task.deadline);
            const timediff = deadlineDate - now;

            // 3. Fixed Math: 1000 ms, not 100 ms
            const hoursremaining = timediff / (1000 * 60 * 60);

            if (hoursremaining < 0) {
                score += 10000 + Math.abs(hoursremaining);
            } 
            else if (hoursremaining <= 24) {
                score += 5000 + (24 - hoursremaining) * 10;
            } 
            else {
                score += 1000 - hoursremaining;
            }
        }

        return { ...task, score };
    });

    scoredTasks.sort((a, b) => b.score - a.score);
    return scoredTasks.map(({ score, ...originalTask }) => originalTask);
};
