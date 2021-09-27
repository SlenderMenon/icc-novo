import axios from 'axios';

// utilities
import constants from '../constants';

export default {

  async getTopics() {
    try {
      const axiosInstance = axios.create({ baseURL: constants.SERVER_URL });
      const res = (await axiosInstance.get('/topics')).data;
      return res;
    } catch (err) {
      console.log('Error in API call with local server: ', err);
      this.props.setMessage('error', `Error getting topics.`);
      return null;
    }
  },

  async getCount(topic) {
    try {
      const axiosInstance = axios.create({ baseURL: constants.SERVER_URL });
      const res = (await axiosInstance.get(
        '/count',
        { params: { topic } }
      )).data;
      return res;
    } catch (err) {
      console.log('Error in API call with local server: ', err);
      this.props.setMessage('error', `Error getting count of "${topic}".`);
      return null;
    }
  },

  async getPhotos(topic, page) {
    try {
      const axiosInstance = axios.create({ baseURL: constants.UNSPLASH.SERVER_URL });
      const res = (await axiosInstance.get(
        `/topics/${topic}/photos`,
        {
          headers: { Authorization: constants.UNSPLASH.KEY },
          params: {
            page: page ?? 1
          }
        }
      )).data;
      return res;
    } catch (err) {
      console.log('Error in API call with local server: ', err);
      this.props.setMessage('error', `Error getting images from Unsplash.`);
      return null;
    }
  }

}