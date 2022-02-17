import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { getPostsFromServer } from '../../store/index';
import { setSelectedPostId } from '../../store/postsListSlice';
import { deletePost } from '../../api/posts';
import { Loader } from '../Loader';

import './PostsList.scss';

export const PostsList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {
    selectedPostId,
    posts,
  } = useSelector((state: PostsState) => state.postsListSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        await dispatch(getPostsFromServer());
      } catch {
        setError('Some error ocurred while connecting the server');
      }

      setLoading(false);
    })();
  }, []);

  const handleOpenPost = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setSelectedPostId(+event.currentTarget.name));
  };

  const handleDeletePost = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    try {
      await deletePost(event.currentTarget.name);
      await dispatch(getPostsFromServer());
    } catch {
      setError('Server did not respond');
    }

    setLoading(false);
  };

  const handleUpdatePost = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const id: string = event.currentTarget.name;

    navigate('/update-post-form', { state: id });
  };

  const getVisiblePosts = () => {
    if (posts.length !== 0 && loading === false) {
      return (
        posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            {post.title}

            <div>
              <button
                type="button"
                className={classNames(
                  'PostsList__button',
                  'button',
                  { 'PostsList__button--opened': selectedPostId === post.id },
                )}
                name={String(post.id)}
                onClick={handleOpenPost}
              >
                Open
              </button>

              <button
                type="button"
                className={classNames(
                  'PostsList__button',
                  'button',
                )}
                name={String(post.id)}
                onClick={handleUpdatePost}
              >
                Update
              </button>

              <button
                type="button"
                className={classNames(
                  'PostsList__button',
                  'button',
                )}
                name={String(post.id)}
                onClick={handleDeletePost}
              >
                Delete
              </button>
            </div>
          </li>
        ))
      );
    }

    if (posts.length === 0 && loading === false) {
      return (<span>There are no posts yet. You can add your own.</span>);
    }

    return (<Loader />);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <NavLink
        to="/new-post-form"
        className={({
          isActive,
        }) => `navbar-item is-tab nav-link ${isActive ? ' active' : ''}`}
      >
        <button type="button">Add new post</button>
      </NavLink>

      <div className="error">{error}</div>

      <ul className="PostsList__list">
        {getVisiblePosts()}
      </ul>
    </div>
  );
};
