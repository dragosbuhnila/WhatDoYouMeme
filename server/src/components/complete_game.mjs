const base_url = "http://localhost:3001"

class CompleteGame {
    /* 
    * @param {Array} memes - Array of 3 meme names
    * @param {Array} scores - Array of 3 scores
    * Game is composed of:
    *   - 3 fields for the memes: strings
    *   - 3 fields for the scores: numbers
    */
    constructor(memes, scores) {
        this.meme1 = base_url + `/memes/${memes[0]}.jpg`;
        this.meme2 = base_url + `/memes/${memes[1]}.jpg`;
        this.meme3 = base_url + `/memes/${memes[2]}.jpg`;
        this.score1 = scores[0];
        this.score2 = scores[1];
        this.score3 = scores[2];
        this.total_score = scores[0] + scores[1] + scores[2];
    }
}

export default CompleteGame;