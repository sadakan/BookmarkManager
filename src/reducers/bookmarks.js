import * as actionTypes from '../utils/actionTypes';

const initialAppState = {
  list: [
    { id: 0, type: 'folder', name: 'フォルダ1', children: [
      { id: 1, type: 'bookmark', name: 'なぜ、組織のつくりとソフトウェアアーキテクチャは似てしまうのか', url:'https://qiita.com/hirokidaichi/items/d12fcce80ee593bcf34d' },
      { id: 2, type: 'bookmark', name: 'WebブラウザでUnityで作ったシーンを歩き廻ろう！', url:'https://qiita.com/ChinatsuMatsumoto/items/c99457cc85318da892cb' },
      { id: 8, type: 'folder', name: 'フォルダ2', children: [
        { id: 9, type: 'bookmark', name: 'AWSサービス一覧（2019/01版）', url:'https://qiita.com/moritalous/items/31a56acbf2ce367b712d' },
      ]},
    ]},
    { id: 4, type: 'bookmark', name: 'WebRTC利用でありがちな不満点とベストプラクティスの模索', url:'https://qiita.com/nakakura/items/50974e6622807a6dbc09' },
    { id: 5, type: 'bookmark', name: 'Vue + Vue Router + Vuex + Laravel チュートリアル（全16回）を書きました。', url:'https://qiita.com/MasahiroHarada/items/2597bd6973a45f92e1e8' },
    { id: 3, type: 'folder', name: 'フォルダ3', children: [
      { id: 6, type: 'bookmark', name: '仕事で使えるかも知れないWindows コマンド＆ワンライナー集 + バッチファイル', url:'https://qiita.com/ryuichi1208/items/4bf20f702176101a3ecf' }
    ]},
    { id: 7, type: 'bookmark', name: 'Haskellをかける少女', url:'https://qiita.com/jzmstrjp/items/11dcd3ec26027ff30214' },
  ]
};

const bookmarks = (state = initialAppState, action) => {
  console.log(action);
  if (action.type === actionTypes.ADD_BOOKMARK) {
    return addBookmark(state.list, action.title, action.url);
  } else if (action.type === actionTypes.MOVE_BOOKMARK) {
    return moveBookmark(state.list, action.fromId, action.toId);
  } else {
    return state;
  }
};

const addBookmark = (list, title, url) => {
  return {
    list: [
      ...list,
      { id: getMaxId(list) + 1, type: 'bookmark', name: title, url: url }
    ]
  };
}

const getMaxId = (list) => {
  return list.reduce((accumulator, current) => {
    let currentValue = (current.type === 'folder') ? Math.max(current.id, getMaxId(current.children)) : current.id;
    return Math.max(accumulator, currentValue);
  }, 0);
}

const moveBookmark = (list, fromId, toId) => {
  let resultList = list;
  const bookmark = getBookmarkById(list, fromId);
  resultList = removeBookmark(resultList, fromId);
  resultList = insertBookmark(resultList, bookmark, toId);
  return { list: [ ...resultList ] };
}

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
