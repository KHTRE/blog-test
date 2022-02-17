import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { addNewPost } from '../../api/posts';
import './NewPostForm.scss';

export const NewPostForm: React.FC = () => {
  const [error, setError] = useState('');
  const [postBody, setPostBody] = useState<string>('');
  const [postTitle, setPostTitle] = useState<string>('');

  const navigate = useNavigate();

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(event.target.value);
  };

  const handleBodyInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostBody(event.target.value);
  };

  const handleAddPost = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      await addNewPost(postTitle, postBody);
    } catch {
      setError('Failed to create new post');
    }

    setPostBody('');
    setPostTitle('');
    if (error === '') {
      navigate('/');
    }
  };

  return (
    <div className="NewPostForm">
      <NavLink
        to="/"
        className={({
          isActive,
        }) => `navbar-item is-tab nav-link ${isActive ? ' active' : ''}`}
      >
        <button type="button">To home page</button>
      </NavLink>

      <div className="error">{error}</div>
      <div className="NewPostForm__form-wrapper">
        <form className="NewPostForm__form" onSubmit={handleAddPost}>
          <div className="form-field">
            <input
              type="text"
              name="name"
              placeholder="Post title"
              className="NewPostForm__input"
              value={postTitle}
              onChange={handleTitleInput}
              required
            />
          </div>

          <div className="form-field">
            <textarea
              name="body"
              placeholder="Post text"
              className="NewPostForm__input"
              value={postBody}
              onChange={handleBodyInput}
              required
            />
          </div>

          <button
            type="submit"
            className="NewPostForm__submit-button"
          >
            Add new post
          </button>
        </form>
      </div>
    </div>
  );
};
