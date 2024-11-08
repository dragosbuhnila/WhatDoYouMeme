import MemeDAO from "../daos/memeDAO.mjs"
import CaptionDAO from "../daos/captionDAO.mjs"
import Caption from "../components/caption.mjs"
import HistoryDAO from "../daos/historyDAO.mjs"

import Game from "../components/game.mjs"

class GameController {
    constructor() {
        this.memedao = new MemeDAO
        this.captiondao = new CaptionDAO
        this.historydao = new HistoryDAO
    }

    async createGame() {
        try {
            let memes = await this.memedao.getMemes()

            // // Debugging
            // console.log("Debuggin createGame")
            // for (let meme of memes) {
            //     console.log(meme)
            // }

            // 1) Randomly select 3 memes
            const selectedMemes = []
            for (let i = 0; i < 3; i++) {
                const random_index = Math.floor(Math.random() * memes.length)
                selectedMemes.push(memes[random_index])
                memes.splice(random_index, 1) // Remove the selected meme from the list
            }

            // 2) Fetch captions for each meme
            const selected_captions = []
            for (let meme of selectedMemes) {
                /* Fetch 2 valid captions for each meme */
                let valid_captions = await this.captiondao.getValidCaptions(meme) // Array of caption_texts

                // Randomly select 2 captions
                let selected_valid_captions = []
                for (let i = 0; i < 2; i++) {
                    const random_index = Math.floor(Math.random() * valid_captions.length)
                    selected_valid_captions.push(valid_captions[random_index])
                    valid_captions.splice(random_index, 1) // Remove the selected caption from the list
                }
                // Convert caption_texts to Caption objects
                selected_valid_captions = selected_valid_captions.map((caption_text) => new Caption(caption_text, true))


                /* Fetch 5 invalid captions for each meme */
                let invalid_captions = await this.captiondao.getInvalidCaptions(meme) // Array of caption_texts

                // Randomly select 5 captions
                let selected_invalid_captions = []
                for (let i = 0; i < 5; i++) {
                    const random_index = Math.floor(Math.random() * invalid_captions.length)
                    selected_invalid_captions.push(invalid_captions[random_index])
                    invalid_captions.splice(random_index, 1) // Remove the selected caption from the list
                }
                // Convert caption_texts to Caption objects
                selected_invalid_captions = selected_invalid_captions.map((caption_text) => new Caption(caption_text, false))


                // Combine valid and invalid captions
                const all_captions = selected_valid_captions.concat(selected_invalid_captions)
                all_captions.sort(() => Math.random() - 0.5)

                // Populate selected_captions
                selected_captions.push(all_captions)
            }

            return new Game(selectedMemes, selected_captions)

        } catch (error) {
            console.log("Error in creating game")
            console.log(error)
        }
    }

    async getHistory(username) {
        try {
            // Fetch all games from the database
            return await this.historydao.getHistory(username) // Array of CompleteGame objects
        } catch (error) {
            console.log("Error in getting history")
            console.log(error)
        }
    }

    async saveGame(username, completed_game) {
        try {
            let memes = [completed_game.meme1, completed_game.meme2, completed_game.meme3]
            const scores = [completed_game.score1, completed_game.score2, completed_game.score3]
            const total_score = completed_game.total_score

            memes = memes.map((meme) => meme.split('/').pop()) // Extract the meme name from the URL
            memes = memes.map((meme) => meme.split('.')[0]) // Remove the jpg part
            
            return await this.historydao.saveGame(username, memes, scores, total_score)
        } catch (error) {
            console.log("Error in saving game")
            console.log(error)
        }
    }

    async getHistoricalScore(username) {
        try {
            const history = await this.getHistory(username)
            return history.reduce((sum, game) => sum + game.total_score, 0);
        } catch (error) {
            console.log("Error in getting historical scores")
            console.log(error)
        }
    }
}

export default GameController