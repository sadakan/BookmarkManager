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
  if (action.type === actionTypes.ADD_BOOKMARK) {
    return {
      list: [
        ...state.list,
        { id: getMaxId(state.list) + 1, type: 'bookmark', name: action.title, url: action.url }
      ]
    };
  } else if (action.type === actionTypes.MOVE_BOOKMARK) {
    console.log(state);
    const fromId = action.fromId;
    const toId = action.toId;
    const bookmark = getBookmarkById(state.list, fromId);
    insertBookmark(state.list, bookmark, toId);
//    let newlist = state.list;
//    const fromBookmark = newlist.find((e) => e.id == fromId);
//    const toBookmarkIndex = newlist.findIndex((e) => e.id == toId);
//    newlist = newlist.filter((e) => e.id != fromId);
//    newlist = {list: [
//      ...newlist.slice(0, toBookmarkIndex),
//      fromBookmark,
//      ...newlist.slice(toBookmarkIndex)
//    ]}
    return state;
  } else {
    return state;
  }
};

const getMaxId = (list) => {
  return list.reduce((accumulator, current) => {
    let currentValue = (current.type === 'folder') ? Math.max(current.id, getMaxId(current.children)) : current.id;
    return Math.max(accumulator, currentValue);
  }, 0);
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

const insertBookmark = (list, bookmark, toId) => {
  let toIdx = list.findIndex((e) => e.id == toId);
  if (toIdx < 0) {
    list.map((e) => {
      if (e.type == 'folder') {
        return insertBookmark(e.children, bookmark, toId);
      } else {
        return e;
      }
    });
  }
  return [
    ...list.slice(0, toIdx),
    bookmark,
    ...list.slice(toIdx)
  ];
}

const moveBookmark = (list, fromId, toId) => {
  list.map((elem) => {
    if (elem.id !== fromId) {
      return elem;
    }
  });
  return list;
}

export default bookmarks;
