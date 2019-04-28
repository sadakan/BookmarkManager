import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import * as actions from '../actions';
import Bookmark from './Bookmark';
import Folder from './Folder';
import NavBar from './NavBar';
import { apiUrl } from '../reducers/bookmarks';

class BookmarkManagerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", url: "" }
    this.inputTitle = this.inputTitle.bind(this);
    this.inputUrl = this.inputUrl.bind(this);
    this.getBookmarkList();
  }

  inputTitle(e) {
    this.setState({ title: e.target.value })
  }

  inputUrl(e) {
    this.setState({ url: e.target.value })
  }

  getBookmarkList() {
    axios.get(apiUrl)
    .then((result) => {
      const bookmarkList = result.data.message.list;
      console.log(bookmarkList);
      this.props.actions.updateBookmarkList(bookmarkList);
    })
    .catch(() => {
      console.log('通信に失敗しました。');
    });
  }

  addButtonOnClick() {
    const { title, url } = this.state;
    if (title != null && title.length > 0) {
      if (url != null && url.length > 0) {
        this.props.actions.addBookmark(title, url);
      } else {
        this.props.actions.addFolder(title);
      }
    }
  }

  postBookmarkList() {
    axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      url: apiUrl,
      data: this.props.stateBookmarks
    })
    .then((result) => {
      console.log(result);
    })
    .catch(() => {
      console.log('POST通信に失敗しました。');
    });
  }

  render() {
    const { actions, stateBookmarks } = this.props;
    const { title, url } = this.state;
    return (
      <Wrapper>
        <NavBar />
        <div className="contents">
          {stateBookmarks.list.map((item, index) => (item.type == 'folder')
            ? <Folder key={index} id={item.id} name={item.name} children={item.children} />
            : <Bookmark key={index} id={item.id} name={item.name} url={item.url} />
          )}
          <div>
            <input type="text" placeholder="title" value={title} onChange={this.inputTitle} />
            <input type="text" placeholder="url" value={url} onChange={this.inputUrl} />
            <input type="button" value="追加" onClick={() => this.addButtonOnClick()} />
            <input type="button" value="保存" onClick={() => this.postBookmarkList()} />
          </div>
          <Link to={"hello"}>hello</Link>
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  .contents {
    padding-top: 55px;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const mapState = (state, ownProps) => ({
  stateBookmarks: state.bookmarks
});

const mapDispatch = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export const BookmarkManager = connect(mapState, mapDispatch)(BookmarkManagerComponent);
