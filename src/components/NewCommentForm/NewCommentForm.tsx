import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './NewCommentForm.scss';
import { postComment } from '../../api/comments';
import { getPostDetailsFromServer } from '../../store/index';

export const NewCommentForm: React.FC = () => {
  const dispatch = useDispatch();
  const selectedPostId = useSelector((state: PostsState) => state.postsListSlice.selectedPostId);
  const [bodyForComment, setBodyForComment] = useState<string>('');

  const handleBodyInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyForComment(event.target.value);
  };

  const handleAddComment = async (event: React.FormEvent) => {
    event.preventDefault();
    await postComment(
      selectedPostId,
      bodyForComment,
    );
    setBodyForComment('');

    dispatch(getPostDetailsFromServer(selectedPostId));
  };

  return (
    <form className="NewCommentForm" onSubmit={handleAddComment}>
      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={bodyForComment}
          onChange={handleBodyInput}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};
