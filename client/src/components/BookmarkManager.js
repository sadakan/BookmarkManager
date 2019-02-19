import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import * as actions from '../actions';
import Bookmark from './Bookmark';
import Folder from './Folder';

class BookmarkManagerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", url: "" }
    this.inputTitle = this.inputTitle.bind(this);
    this.inputUrl = this.inputUrl.bind(this);
  }

  inputTitle(e) {
    this.setState({ title: e.target.value })
  }

  inputUrl(e) {
    this.setState({ url: e.target.value })
  }

  getBookmarks() {
    axios.get('http://localhost:3000/bookmark')
    .then((results) => {
      const bookmarks = results.data.message.list;
      console.log(bookmarks);
      this.props.actions.setBookmarks(bookmarks);
    })
    .catch(() => {
      console.log('通信に失敗しました。');
    });
  }

  render() {
    const { actions, bookmarks } = this.props;
    const { title, url } = this.state;
    return (
      <div>
        <span>BookmarkManager</span>
        {bookmarks.list.map((item, index) => (item.type == 'folder')
          ? <Folder key={index} id={item.id} name={item.name} children={item.children} />
          : <Bookmark key={index} id={item.id} name={item.name} url={item.url} />
        )}
        <Link to={"hello"}>hello</Link>
        <div>
          <input type="text" placeholder="title" value={title} onChange={this.inputTitle} />
          <input type="text" placeholder="url" value={url} onChange={this.inputUrl} />
          <input type="button" value="追加" onClick={() => actions.addBookmark(title, url)} />
          <input type="button" value="reload" onClick={() => this.getBookmarks()} />
        </div>
      </div>
    )
  }
}

const mapState = (state, ownProps) => ({
  bookmarks: state.bookmarks
});

const mapDispatch = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export const BookmarkManager = connect(mapState, mapDispatch)(BookmarkManagerComponent);
