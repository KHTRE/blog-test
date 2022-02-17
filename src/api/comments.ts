import { BASE_URL } from './api';

export const postComment = async (
  postId: number,
  bodyForComment: string,
) => {
  const data = {
    postId,
    body: bodyForComment,
  };
  const url = `${BASE_URL}/comments`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const deleteComment = async (postId: string) => {
  const url = `${BASE_URL}/comments/${postId}`;

  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
