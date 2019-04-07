// 全ブックマーク/フォルダにIDを採番
export const numberingAllItemId = (bookmarkList, maxId) => {
  let nowMaxId = maxId;
  bookmarkList.map((e) => {
    e.id = nowMaxId++;
    if (e.type === 'folder') {
      let result = numberingAllItemId(e.children, nowMaxId);
      e.children = result.bookmarkList;
      nowMaxId = result.maxId;
    }
    return e;
  });
  // 最終的に返却するのはbookmarkListのみ
  return (maxId !== 0) ? { bookmarkList, maxId:nowMaxId } : bookmarkList;
}

// ブックマークリスト中の最大IDを取得
export const getMaxId = (bookmarkList) => {
  return bookmarkList.reduce((result, e) => {
    let currentValue = (e.type === 'folder') ? Math.max(e.id, getMaxId(e.children)) : e.id;
    return Math.max(result, currentValue);
  }, 0);
}

// IDを元にブックマーク/フォルダを取得
export const getItemById = (bookmarkList, id) => {
  let item = bookmarkList.find((e) => e.id == id);
  if (typeof item === 'undefined') {
    bookmarkList.filter((e) => e.type == 'folder').some((e) => {
      item = getItemById(e.children, id);
      return (typeof item !== 'undefined');
    });
  }
  return item;
}

// IDを元にブックマーク/フォルダを削除
export const removeItem = (bookmarkList, id) => {
  let index = bookmarkList.findIndex((e) => e.id == id);
  if (index >= 0) {
    return [
      ...bookmarkList.slice(0, index),
      ...bookmarkList.slice(index+1)
    ];
  } else {
    return bookmarkList.map((e) => {
      e.children = (e.type == 'folder') ? removeItem(e.children, id) : e.children;
      return e;
    });
  }
}

// ブックマーク/フォルダを指定IDの直前に挿入
export const insertItemBefore = (bookmarkList, item, toId) => {
  let index = bookmarkList.findIndex((e) => e.id == toId);
  if (index >= 0) {
    return [
      ...bookmarkList.slice(0, index),
      item,
      ...bookmarkList.slice(index)
    ];
  } else {
    return bookmarkList.map((e) => {
      e.children = (e.type === 'folder') ? insertItemBefore(e.children, item, toId) : e.children;
      return e;
    });
  }
}

// ブックマーク/フォルダを指定IDの直後に挿入
export const insertItemAfter = (bookmarkList, item, toId) => {
  let index = bookmarkList.findIndex((e) => e.id == toId);
  if (index >= 0) {
    return [
      ...bookmarkList.slice(0, index + 1),
      item,
      ...bookmarkList.slice(index + 1)
    ];
  } else {
    return bookmarkList.map((e) => {
      e.children = (e.type === 'folder') ? insertItemAfter(e.children, item, toId) : e.children;
      return e;
    });
  }
}

// ブックマーク/フォルダを指定IDのフォルダ内末尾に挿入
export const insertItemToFolder = (bookmarkList, item, toId) => {
  let index = bookmarkList.findIndex((e) => e.id == toId);
  if (index >= 0) {
    return bookmarkList.map((e) => {
      e.children = (e.type === 'folder' && e.id == toId) ? [ ...e.children, item ] : e.children;
      return e;
    });
  } else {
    return bookmarkList.map((e) => {
      e.children = (e.type === 'folder') ? insertItemToFolder(e.children, item, toId) : e.children;
      return e;
    });
  }
}

