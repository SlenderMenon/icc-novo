import axios from 'axios';

export default {

  SERVER_URL: 'http://localhost/',

  async getTopics() {
    try {
      const axiosInstance = axios.create({ baseURL: this.SERVER_URL });
      const res = (await axiosInstance.get('http://localhost:8081/topics')).data;
      return res;
    } catch (err) {
      console.log('Error in API call with local server: ', err);  // @TODO wrap in error object
      return null;
    }
  },

  async getCount(topic) {
    try {
      const axiosInstance = axios.create({ baseURL: this.SERVER_URL });
      const res = (await axiosInstance.get(
        'http://localhost:8081/count',
        { params: { topic } }
      )).data;
      return res;
    } catch (err) {
      console.log('Error in API call with local server: ', err);  // @TODO wrap in error object
      return null;
    }
  }

}