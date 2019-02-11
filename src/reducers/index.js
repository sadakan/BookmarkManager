import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import bookmarks from './bookmarks';

export default (history) => combineReducers({
  bookmarks: bookmarks,
  router: connectRouter(history)
});
