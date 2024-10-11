import axios from "axios";
//todo
let URL = 'https://apichallenges.herokuapp.com/';

export class ChallengerService {
        constructor (options){
            this.options = options;
        }

    async post(){
        const response = await axios.post(`${URL}challenger`);
        return response;
    }
}