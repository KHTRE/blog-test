import React, { useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';

import './UpdatePostForm.scss';
import { updatePost } from '../../api/posts';

export const UpdatePostForm: React.FC = () => {
  const navigate = useNavigate();
  const state = useLocation();
  const id = state.state;

  const [postBody, setPostBody] = useState<string>('');
  const [postTitle, setPostTitle] = useState<string>('');
  const [error, setError] = useState('');

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(event.target.value);
  };

  const handleBodyInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostBody(event.target.value);
  };

  const handleUpdatePost = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      await updatePost(
        id as string,
        postTitle,
        postBody,
      );
    } catch {
      setError('Some error ocurred while connecting the server');
    }

    setPostBody('');
    setPostTitle('');

    if (error === '') {
      navigate('/');
    }
  };

  return (
    <div className="UpdatePostForm">
      <NavLink
        to="/"
        className={({
          isActive,
        }) => `navbar-item is-tab nav-link ${isActive ? ' active' : ''}`}
      >
        <button type="button">To home page</button>

        <div className="error">{error}</div>
      </NavLink>
      <div className="UpdatePostForm__form-wrapper">
        <form className="UpdatePostForm__form" onSubmit={handleUpdatePost}>
          <div className="form-field">
            <input
              type="text"
              name="name"
              placeholder="Post title"
              className="UpdatePostForm__input"
              value={postTitle}
              onChange={handleTitleInput}
              required
            />
          </div>

          <div className="form-field">
            <textarea
              name="body"
              placeholder="Post text"
              className="UpdatePostForm__input"
              value={postBody}
              onChange={handleBodyInput}
              required
            />
          </div>

          <button
            type="submit"
            className="UpdatePostForm__submit-button"
          >
            Update post
          </button>
        </form>
      </div>
    </div>
  );
};
