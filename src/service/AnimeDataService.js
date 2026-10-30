/*
  Name: Anass Agoe-Mensah Quaye
  Date: October 30, 2026
  Course: IT-302: Advanced Internet Applications
  Assignment: Phase 4 Read Node.js Data using React.js Assignment
  Email: aaq@njit.edu
*/

import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

class AnimeDataService {
  getAll(ucid, page = 0) {
    return axios.get(`${BACKEND_URL}/api/v1/${ucid}/nexus?pageNumber=${page}`);
  }

  get(ucid, id) {
    return axios
      .get(`${BACKEND_URL}/api/v1/${ucid}/nexus/id/${id}`)
      .catch(() =>
        // Fallback: if /id/:id returns 404, locate the single record from getAll
        this.getAll(ucid).then((res) => {
          const list = res.data.nexus || res.data.animes || res.data;
          const found = Array.isArray(list)
            ? list.find((item) => String(item._id) === String(id))
            : null;
          return { data: found };
        })
      );
  }

  find(ucid, query, by = 'title', page = 0) {
    return axios.get(
      `${BACKEND_URL}/api/v1/${ucid}/nexus?${by}=${encodeURIComponent(query)}&pageNumber=${page}`
    );
  }
}

const animeDataServiceInstance = new AnimeDataService();
export default animeDataServiceInstance;