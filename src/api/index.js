import axios from "axios";
import { useSessionStore } from '@/store/session'

const baseUrl = 'http://localhost:3000';

const coreApi = axios.create({
  baseURL: baseUrl,
});

coreApi.interceptors.request.use((config) => {
  const sessionStore = useSessionStore()
  const token = sessionStore.getToken()
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

async function login(username, password) {
  const body = {
    username,
    password,
  };
  const { data } = await coreApi.post('/login', body);
  if (data) {
    const sessionStore = useSessionStore()
    sessionStore.setUser(data.user)
    sessionStore.setToken(data.token)
  } else {
    throw new Error('Login failed');
  }
}

function fetchPosts({ limit, offset }) {
  const query = {
    params: {
      limit,
      offset,
    },
  };
  return coreApi.get('/posts', query);
}

function fetchUserByUsername(username) {
  return coreApi.get(`/user/${username}`);
}

function fetchPostsByUsername(username, { limit, offset }) {
  const query = {
    params: {
      limit,
      offset,
    },
  };
  return coreApi.get(`/user/${username}/posts`, query);
}

function fetchPostById(postId) {
  return coreApi.get(`/post/${postId}`);
}

function addPost(content) {
  return coreApi.post('/post', {
    content,
  });
}

function editPost(postId, content) {
  return coreApi.put(`/post/${postId}`, {
    content,
  });
}

function deletePost(postId) {
  return coreApi.delete(`/post/${postId}`);
}



export {
  login,
  fetchPosts,
  fetchUserByUsername,
  fetchPostsByUsername,
  fetchPostById,
  addPost,
  editPost,
  deletePost,
};