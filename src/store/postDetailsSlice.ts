import { AnyAction } from 'redux';
// Action types
const SET_POST_DETAILS = 'SET_POST_DETAILS';

// Action creators
export const setPostDetails = (posts: Post[]) => ({ type: SET_POST_DETAILS, payload: posts });

const initialState: PostDetailsSlice = {
  body: '',
  id: 0,
  title: '',
  comments: [],
};

const postDetailsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_POST_DETAILS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default postDetailsReducer;
