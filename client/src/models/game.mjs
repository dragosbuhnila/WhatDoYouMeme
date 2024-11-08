class Game {
    /* 
    * @param {Array} memes - Array of 3 meme names
    * @param {Array} captions - Array of 3 arrays of captions
    * Game is composed of:
    *   - 3 fields for the memes: strings
    *   - 3 fields for the captions: arrays of Caption objects
    */
    constructor(memes, captions) {
        this.memes = memes;
        this.captions = captions;
    }
}

export default Game;