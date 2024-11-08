class CompleteGame {
    /* 
    * @param {Array} memes - Array of 3 meme names
    * @param {Array} scores - Array of 3 scores
    * Game is composed of:
    *   - 3 fields for the memes: strings
    *   - 3 fields for the scores: numbers
    */
    constructor(serversideCompleteGame) {
        this.meme1 = serversideCompleteGame.meme1;
        this.meme2 = serversideCompleteGame.meme2;
        this.meme3 = serversideCompleteGame.meme3;
        this.score1 = serversideCompleteGame.score1;
        this.score2 = serversideCompleteGame.score2;
        this.score3 = serversideCompleteGame.score3;
        this.total_score = serversideCompleteGame.total_score;
    }
}

export default CompleteGame;