import axios from './axios';

async function getTags() {
  const { data } = await axios({
    method: 'get',
    url: '/tags',
  });

  return data;
}

async function getTag(id) {
  const { data } = await axios({
    method: 'get',
    url: `/tags/${id}`,
  });

  return data;
}

async function updateTag(id, params) {
  const { data } = await axios({
    method: 'patch',
    url: `/tags/${id}`,
    data: params,
  });

  return data;
}

function deleteTag(id) {
  return axios({
    method: 'delete',
    url: `/tags/${id}`,
  });
}

export default {
  getTags,
  getTag,
  deleteTag,
  updateTag,
};
