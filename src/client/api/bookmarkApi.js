import qs from 'qs';
import axios from './axios';

async function getBookmarks(query) {
  const { data } = await axios({
    method: 'get',
    url: `/bookmarks/?${qs.stringify(query)}`,
  });

  return data;
}

async function getBookmark(id) {
  const { data } = await axios({
    method: 'get',
    url: `/bookmarks/${id}`,
  });

  return data;
}

async function updateBookmark(id, params) {
  const { data } = await axios({
    method: 'patch',
    url: `/bookmarks/${id}`,
    data: params,
  });

  return data;
}

async function createBookmark(params) {
  const { data } = await axios({
    method: 'post',
    url: '/bookmarks',
    data: params,
  });

  return data;
}

function deleteBookmark(id) {
  return axios({
    method: 'delete',
    url: `/bookmarks/${id}`,
  });
}

function setBookmarkTags(id, data) {
  return axios({
    method: 'post',
    url: `/bookmarks/${id}/tags`,
    data,
  });
}

export default {
  getBookmarks,
  getBookmark,
  deleteBookmark,
  updateBookmark,
  createBookmark,
  setBookmarkTags,
};
