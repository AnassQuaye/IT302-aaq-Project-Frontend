/*
  Name: Anass Agoe-Mensah Quaye
  Date: November 20, 2026
  Course: IT-302-001: Advanced Internet Applications
  Assignment: Phase 5 C.U.D. Node.js Data using React.js Assignment
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

  createComment(ucid, data) {
    return axios.post(`${BACKEND_URL}/api/v1/${ucid}/nexus/comment`, data);
  }

  updateComment(ucid, data) {
    return axios.put(`${BACKEND_URL}/api/v1/${ucid}/nexus/comment`, data);
  }

  deleteComment(ucid, commentId, userId) {
    return axios.delete(`${BACKEND_URL}/api/v1/${ucid}/nexus/comment`, {
      data: { comment_id: commentId, user_id: userId },
    });
  }
}

const animeDataServiceInstance = new AnimeDataService();
export default animeDataServiceInstance;