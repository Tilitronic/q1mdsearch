/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import axios from 'axios';

const max = '&max=';

const url = 'https://api.datamuse.com';
const sug = '/sug?s=';

export async function getDatamuseSug(word, num = 10) {
    try {
        const response = await axios.get(url + sug + word + max + num);
        console.log('The Datamuse suggestion data from response is: ', response);
        const { data } = response;
        const lableddData = data.map((obj) => ({ label: obj.word, ...obj }));
        return lableddData;
    } catch (error) {
        console.log('Request to Datamuse suggestion failed:', error);
    }
}
