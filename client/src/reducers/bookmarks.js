// import * as actionTypes from '../utils/actionTypes';

export const actionTypes = {
  SET_BOOKMARK: 'SET_BOOKMARK',
  ADD_BOOKMARK: 'ADD_BOOKMARK',
  MOVE_BOOKMARK: 'MOVE_BOOKMARK',
  REMOVE_BOOKMARK: 'REMOVE_BOOKMARK'
}

let initialBookmarks = { list: [] };

const bookmarks = (state = initialBookmarks, action) => {
  console.log(action);
  if (action.type === actionTypes.ADD_BOOKMARK) {
    return addBookmark(state.list, action.title, action.url);
  } else if (action.type === actionTypes.MOVE_BOOKMARK) {
    return moveBookmark(state.list, action.fromId, action.toId);
  } else if (action.type === actionTypes.REMOVE_BOOKMARK) {
    let list = removeBookmark(state.list, action.id);
    return { list: [ ...list ] };
  } else if (action.type === actionTypes.SET_BOOKMARK) {
    let result = numberingBookmarkId(action.bookmarks, 0);
    console.log(result);
    return { list: [ ...result.list ] };
  } else {
    return state;
  }
};

// ブックマークを追加
const addBookmark = (currentBookmarkList, title, url) => {
  let addItem;
  if (title != null && title.length > 0) {
    // タイトルのみ入力の場合フォルダ追加
    addItem = (url != null && url.length > 0)
      ? { id: getMaxId(currentBookmarkList) + 1, type: 'bookmark', name: title, url: url }
      : { id: getMaxId(currentBookmarkList) + 1, type: 'folder', name: title, children: [] };
    return { list: [ ...currentBookmarkList, addItem ] };
  }
  return { list: currentBookmarkList };
}

// 全ブックマークにIDを採番
const numberingBookmarkId = (list, maxId) => {
  list.map((e) => {
    e.id = maxId++;
    if (e.type === 'folder') {
      let result = numberingBookmarkId(e.children, maxId);
      e.children = result.list;
      maxId = result.maxId;
    }
    return e;
  });
  return { list, maxId };
}

// ブックマークリスト中の最大IDを取得
const getMaxId = (list) => {
  return list.reduce((accumulator, current) => {
    let currentValue = (current.type === 'folder') ? Math.max(current.id, getMaxId(current.children)) : current.id;
    return Math.max(accumulator, currentValue);
  }, 0);
}

// ブックマークを特定箇所に移動
const moveBookmark = (list, fromId, toId) => {
  let resultList = list;
  const bookmark = getBookmarkById(list, fromId);
  resultList = removeBookmark(resultList, fromId);
  resultList = insertBookmark(resultList, bookmark, toId);
  return { list: [ ...resultList ] };
}

// IDを元にブックマークを取得
const getBookmarkById = (list, id) => {
  let bookmark = list.find((e) => e.id == id);
  if (typeof bookmark === 'undefined') {
    list.filter((e) => e.type == 'folder').some((e) => {
      bookmark = getBookmarkById(e.children, id);
      return (typeof bookmark !== 'undefined');
    });
  }
  return bookmark;
}

// ブックマークを削除
const removeBookmark = (list, id) => {
  let idx = list.findIndex((e) => e.id == id);
  if (idx >= 0) {
    return [
      ...list.slice(0, idx),
      ...list.slice(idx+1)
    ];
  } else {
    return list.map((e) => {
      e.children = (e.type == 'folder') ? removeBookmark(e.children, id) : e.children;
      return e;
    });
  }
}

// ブックマークを特定箇所に挿入
const insertBookmark = (list, bookmark, id) => {
  let idx = list.findIndex((e) => e.id == id);
  if (idx >= 0) {
    return [
      ...list.slice(0, idx),
      bookmark,
      ...list.slice(idx)
    ];
  } else {
    return list.map((e) => {
      e.children = (e.type == 'folder') ? insertBookmark(e.children, bookmark, id) : e.children;
      return e;
    });
  }
}

export default bookmarks;
