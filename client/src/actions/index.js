import { actionTypes, movePositions } from '../reducers/bookmarks';

export const updateBookmarkList = (bookmarks) => ({ type: actionTypes.UPDATE_BOOKMARK_LIST, bookmarks });
export const addBookmark = (title, url) => ({ type: actionTypes.ADD_BOOKMARK, title, url });
export const addFolder = (title) => ({ type: actionTypes.ADD_FOLDER, title });
export const moveBookmarkToBefore = (fromId, toId) => ({ type: actionTypes.MOVE_BOOKMARK, fromId, toId, movePosition: movePositions.MOVE_TO_BEFORE });
export const moveBookmarkToAfter = (fromId, toId) => ({ type: actionTypes.MOVE_BOOKMARK, fromId, toId, movePosition: movePositions.MOVE_TO_AFTER });
export const moveFolder = (fromId, toId) => ({ type: actionTypes.MOVE_FOLDER, fromId, toId });
export const moveBookmarkToFolder = (fromId, toId) => ({ type: actionTypes.MOVE_BOOKMARK_TO_FOLDER, fromId, toId });
export const moveFolderToFolder = (fromId, toId) => ({ type: actionTypes.MOVE_FOLDER_TO_FOLDER, fromId, toId });
export const removeBookmark = (id) => ({ type: actionTypes.REMOVE_BOOKMARK, id });

