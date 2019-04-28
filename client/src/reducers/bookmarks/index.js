import * as sub from './common';

export const apiUrl = 'http://localhost:3000/bookmark';

export const actionTypes = {
  UPDATE_BOOKMARK_LIST:    'UPDATE_BOOKMARK_LIST',
  ADD_BOOKMARK:            'ADD_BOOKMARK',
  ADD_FOLDER:              'ADD_FOLDER',
  MOVE_ITEM:               'MOVE_ITEM',
  MOVE_ITEM_TO_FOLDER:     'MOVE_ITEM_TO_FOLDER',
  REMOVE_ITEM:             'REMOVE_ITEM',
}

export const movePositions = {
  MOVE_TO_BEFORE: 'MOVE_TO_BEFORE',
  MOVE_TO_AFTER:  'MOVE_TO_AFTER',
}

let initialBookmarks = { list: [] };

const bookmarks = (state = initialBookmarks, action) => {
  console.log(action);
  if (action.type === actionTypes.UPDATE_BOOKMARK_LIST) {
    return updateBookmarkList(action.bookmarks);
  } else if (action.type === actionTypes.ADD_BOOKMARK) {
    return addBookmark(state.list, action.title, action.url);
  } else if (action.type === actionTypes.ADD_FOLDER) {
    return addFolder(state.list, action.title);
  } else if (action.type === actionTypes.MOVE_ITEM) {
    return moveItem(state.list, action.fromId, action.toId, action.movePosition);
  } else if (action.type === actionTypes.MOVE_ITEM_TO_FOLDER) {
    return moveItemToFolder(state.list, action.fromId, action.toId);
  } else if (action.type === actionTypes.REMOVE_ITEM) {
    return removeItem(state.list, action.id);
  } else {
    return state;
  }
};

// ブックマークリストを引数の値で更新
const updateBookmarkList = (bookmarkList) => {
  return { list: [ ...sub.numberingAllItemId(bookmarkList, 0) ] };
}

// ブックマークをリストの末尾に追加
const addBookmark = (bookmarkList, title, url) => {
  let bookmark = { id: sub.getMaxId(bookmarkList) + 1, type: 'bookmark', name: title, url: url };
  return { list: [ ...bookmarkList, bookmark ] };
}

// フォルダをリストの末尾に追加
const addFolder = (bookmarkList, title) => {
  let folder = { id: sub.getMaxId(bookmarkList) + 1, type: 'folder', name: title, children: [] };
  return { list: [ ...bookmarkList, folder ] };
}

// ブックマーク/フォルダを移動
const moveItem = (bookmarkList, fromId, toId, movePosition) => {
  let resultList = bookmarkList;
  const bookmark = sub.getItemById(resultList, fromId);
  resultList = sub.removeItem(resultList, fromId);
  resultList = ((movePosition === movePositions.MOVE_TO_BEFORE)) 
    ? sub.insertItemBefore(resultList, bookmark, toId)
    : sub.insertItemAfter(resultList, bookmark, toId);
  return { list: [ ...resultList ] };
}

// ブックマーク/フォルダをフォルダ内に移動
const moveItemToFolder = (bookmarkList, fromId, toId) => {
  let resultList = bookmarkList;
  const bookmark = sub.getItemById(resultList, fromId);
  resultList = sub.removeItem(resultList, fromId);
  resultList = sub.insertItemToFolder(resultList, bookmark, toId);
  return { list: [ ...resultList ] };
}

// ブックマーク/フォルダを削除
const removeItem = (bookmarkList, id) => {
  return { list: [ ...sub.removeItem(bookmarkList, id) ] };
}

export default bookmarks;
