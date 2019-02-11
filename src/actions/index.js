import * as actionTypes from '../utils/actionTypes';

export const addBookmark = (title, url) => ({ type: actionTypes.ADD_BOOKMARK, title, url });
export const moveBookmark = (fromId, toId) => ({ type: actionTypes.MOVE_BOOKMARK, fromId, toId });

