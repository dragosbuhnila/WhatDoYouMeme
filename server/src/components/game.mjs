const base_url = "http://localhost:3001"

class Game {
    /* 
    * @param {Array} memes - Array of 3 meme names
    * @param {Array} captions - Array of 3 arrays of captions
    * Game is composed of:
    *   - 3 fields for the memes: strings
    *   - 3 fields for the captions: arrays of Caption objects
    */
    constructor(memes, captions) {
        this.meme1 = base_url + `/memes/${memes[0]}.jpg`;
        this.meme2 = base_url + `/memes/${memes[1]}.jpg`;
        this.meme3 = base_url + `/memes/${memes[2]}.jpg`;
        this.captions1 = captions[0];
        this.captions2 = captions[1];
        this.captions3 = captions[2];
    }
}

export default Game;