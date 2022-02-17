import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './NewPostForm.scss';
import { addNewPost } from '../../api/posts';

export const NewPostForm: React.FC = () => {
  const navigate = useNavigate();
  const [postBody, setPostBody] = useState<string>('');
  const [postTitle, setPostTitle] = useState<string>('');

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostTitle(event.target.value);
  };

  const handleBodyInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostBody(event.target.value);
  };

  const handleAddPost = async (event: React.FormEvent) => {
    event.preventDefault();
    await addNewPost(
      postTitle,
      postBody,
    );
    setPostBody('');
    setPostTitle('');

    navigate('/');
  };

  return (
    <form className="NewCommentForm" onSubmit={handleAddPost}>
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Post title"
          className="NewCommentForm__input"
          value={postTitle}
          onChange={handleTitleInput}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Post text"
          className="NewCommentForm__input"
          value={postBody}
          onChange={handleBodyInput}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add new post
      </button>

      {/* <NavLink
        to="/"
        className={({
          isActive,
        }) => `navbar-item is-tab nav-link ${isActive ? ' active' : ''}`}
      >
        <button
          type="submit"
          className="NewCommentForm__submit-button button"
        >
          Add new post
        </button>
      </NavLink> */}
    </form>
  );
};
