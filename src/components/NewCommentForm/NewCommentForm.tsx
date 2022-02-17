import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postComment } from '../../api/comments';
import { getPostDetailsFromServer } from '../../store/index';
import { Loader } from '../Loader';
import './NewCommentForm.scss';

export const NewCommentForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bodyForComment, setBodyForComment] = useState<string>('');

  const dispatch = useDispatch();
  const selectedPostId = useSelector((state: PostsState) => state.postsListSlice.selectedPostId);

  const handleBodyInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyForComment(event.target.value);
  };

  const handleAddComment = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await postComment(selectedPostId, bodyForComment);
    } catch {
      setError('Failed to post a comment');
    }

    setLoading(false);
    setBodyForComment('');

    dispatch(getPostDetailsFromServer(selectedPostId));
  };

  const getForm = () => {
    if (loading === false) {
      return (
        <form className="NewCommentForm" onSubmit={handleAddComment}>
          <div className="error">{error}</div>

          <div className="form-field">
            <textarea
              name="body"
              placeholder="Type comment here"
              className="NewCommentForm__input"
              value={bodyForComment}
              onChange={handleBodyInput}
              required
            />
          </div>

          <button
            type="submit"
            className="NewCommentForm__submit-button"
          >
            Add a comment
          </button>
        </form>
      );
    }

    return <Loader />;
  };

  return getForm();
};
