import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { getPostsFromServer } from '../../store/index';
import { setSelectedPostId } from '../../store/postsListSlice';
import { deletePost } from '../../api/posts';

import './PostsList.scss';

export const PostsList = () => {
  const {
    selectedPostId,
    posts,
  } = useSelector((state: PostsState) => state.postsListSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsFromServer());
  }, []);

  const handleOpenPost = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setSelectedPostId(+event.currentTarget.name));
  };

  const handleDeletePost = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await deletePost(event.currentTarget.name);
    dispatch(getPostsFromServer());
  };

  const getVisiblePosts = () => {
    if (posts.length !== 0) {
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
                onClick={handleDeletePost}
              >
                Delete
              </button>
            </div>
          </li>
        ))
      );
    }

    return (<span>This user does not have posts yet</span>);
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
      <ul className="PostsList__list">
        {getVisiblePosts()}
      </ul>
    </div>
  );
};
