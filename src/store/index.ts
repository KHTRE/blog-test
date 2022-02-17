import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';
import postsReducer, { setPosts } from './postsListSlice';
import postDetailsReducer, { setPostDetails } from './postDetailsSlice';
import { getPostDetails, getAllPosts } from '../api/posts';

const rootReducer = combineReducers({
  postsListSlice: postsReducer,
  postDetailsSlice: postDetailsReducer,
});

/**
 * Thunk - is a function that should be used as a normal action creator
 *
 * dispatch(loadMessage())
 */
export const getPostsFromServer = () => {
  // inner function is an action handled by Redux Thunk
  return async (dispatch: Dispatch<any>) => {
    try {
      const posts = await getAllPosts();

      dispatch(setPosts(posts));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error loading posts', error);
    }
  };
};

export const getPostDetailsFromServer = (selectedPostId: number) => {
  // inner function is an action handled by Redux Thunk
  return async (dispatch: Dispatch<any>) => {
    try {
      const postDetails = await getPostDetails(selectedPostId);

      dispatch(setPostDetails(postDetails));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error loading details', error);
    }
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
