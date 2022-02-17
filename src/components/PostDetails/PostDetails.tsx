import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostDetailsFromServer } from '../../store/index';
import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';
import { deleteComment } from '../../api/comments';
import './PostDetails.scss';

export const PostDetails: React.FC = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);

  const dispatch = useDispatch();
  const selectedPostId = useSelector((state: PostsState) => state.postsListSlice.selectedPostId);
  const selectedPostDetails = useSelector((state: PostsState) => state.postDetailsSlice);
  const comments = useSelector((state: PostsState) => state.postDetailsSlice.comments);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        await dispatch(getPostDetailsFromServer(selectedPostId));
      } catch {
        setError('Some error ocurred while connecting the server');
      }

      setLoading(false);
    })();
  }, [selectedPostId]);

  const toggleComments = () => {
    setCommentsVisible(!commentsVisible);
  };

  const getCommentsButton = () => {
    if (comments && comments.length > 0) {
      return (
        <button
          type="button"
          className="button"
          onClick={toggleComments}
        >
          {!commentsVisible
            ? `Show ${comments.length} comments`
            : `Hide ${comments.length} comments`}
        </button>
      );
    }

    return (
      <span>No comments found</span>
    );
  };

  const deleteHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setCommentsLoading(true);
    try {
      await deleteComment(event.currentTarget.name);
      await dispatch(getPostDetailsFromServer(selectedPostId));
    } catch {
      setError('Having trouble connecting to the server');
    }

    setCommentsLoading(false);
  };

  const getPostDetails = () => {
    if (selectedPostId !== 0 && loading === false) {
      return (
        <>
          <section className="PostDetails__post">
            <h3>{selectedPostDetails && selectedPostDetails.title}</h3>
            <p>{selectedPostDetails && selectedPostDetails.body}</p>
          </section>

          {commentsLoading === true
            ? (<Loader />)
            : (
              <section className="PostDetails__comments">
                {getCommentsButton()}

                <ul className="PostDetails__list">
                  {comments && commentsVisible && comments.map(comment => (
                    <li className="PostDetails__list-item" key={comment.id}>
                      <button
                        type="button"
                        className="PostDetails__remove-button"
                        name={String(comment.id)}
                        onClick={deleteHandler}
                      >
                        X
                      </button>
                      <p>{comment.body}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm />
            </div>
          </section>
        </>
      );
    }

    return (<Loader />);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <div className="error">{error}</div>

      {selectedPostId !== 0 ? (
        getPostDetails()
      ) : (
        <span>Please select a post to see details</span>
      )}
    </div>
  );
};
