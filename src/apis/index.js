import axios from 'axios';

export default {

  SERVER_URL: 'http://localhost:8081',
  UNSPLASH: {
    SERVER_URL: 'https://api.unsplash.com',
    KEY: 'Client-ID _wPDVNUmeDRW1AaUi-SE9CyzWD-imab1x3MOqvzuvcc'
  },

  async getTopics() {
    try {
      const axiosInstance = axios.create({ baseURL: this.SERVER_URL });
      const res = (await axiosInstance.get('/topics')).data;
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
        '/count',
        { params: { topic } }
      )).data;
      return res;
    } catch (err) {
      console.log('Error in API call with local server: ', err);  // @TODO wrap in error object
      return null;
    }
  },

  async getPhotos(topic) {
    try {
      const axiosInstance = axios.create({ baseURL: this.UNSPLASH.SERVER_URL });
      const res = (await axiosInstance.get(
        `/topics/${topic}/photos`,
        { headers: { Authorization: this.UNSPLASH.KEY } }
      )).data;
      return res;
    } catch (err) {
      console.log('Error in API call with local server: ', err);  // @TODO wrap in error object
      return null;
    }
  }

}