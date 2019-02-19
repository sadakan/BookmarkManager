import * as actionTypes from '../utils/actionTypes';

export const setBookmarks = (bookmarks) => ({ type: actionTypes.SET_BOOKMARK, bookmarks });
export const addBookmark = (title, url) => ({ type: actionTypes.ADD_BOOKMARK, title, url });
export const moveBookmark = (fromId, toId) => ({ type: actionTypes.MOVE_BOOKMARK, fromId, toId });

