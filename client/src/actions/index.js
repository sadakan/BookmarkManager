import { actionTypes, movePositions } from '../reducers/bookmarks';

export const updateBookmarkList = (bookmarks) => ({ type: actionTypes.UPDATE_BOOKMARK_LIST, bookmarks });
export const addBookmark = (title, url) => ({ type: actionTypes.ADD_BOOKMARK, title, url });
export const addFolder = (title) => ({ type: actionTypes.ADD_FOLDER, title });
export const moveItemToBefore = (fromId, toId) => ({ type: actionTypes.MOVE_ITEM, fromId, toId, movePosition: movePositions.MOVE_TO_BEFORE });
export const moveItemToAfter = (fromId, toId) => ({ type: actionTypes.MOVE_ITEM, fromId, toId, movePosition: movePositions.MOVE_TO_AFTER });
export const moveItemToFolder = (fromId, toId) => ({ type: actionTypes.MOVE_ITEM_TO_FOLDER, fromId, toId });
export const removeItem = (id) => ({ type: actionTypes.REMOVE_ITEM, id });

