import { BASE_URL } from './api';

export const getPostDetails = async (postId: number) => {
  if (postId !== 0) {
    const url = `${BASE_URL}/posts/${postId}?_embed=comments`;
    const response = await fetch(url);

    return response.json();
  }

  return {
    body: '',
    id: 0,
    title: '',
    comments: [],
  };
};

export const getAllPosts = async () => {
  const url = `${BASE_URL}/posts/`;
  const response = await fetch(url);

  return response.json();
};

export const addNewPost = async (
  title: string,
  body: string,
) => {
  const data = {
    title,
    body,
  };

  const url = `${BASE_URL}/posts`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const deletePost = async (postId: string) => {
  const url = `${BASE_URL}/posts/${postId}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

export const updatePost = async (
  id: string,
  title: string,
  body: string,
) => {
  const data = {
    title,
    body,
  };

  const url = `${BASE_URL}/posts/${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
};
