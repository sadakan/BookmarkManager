import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import * as actions from '../actions';
import Bookmark from './Bookmark';
import Folder from './Folder';

class BookmarkManagerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", url: "" }
    this.inputTitle = this.inputTitle.bind(this);
    this.inputUrl = this.inputUrl.bind(this);
    this.getBookmarks();
  }

  inputTitle(e) {
    this.setState({ title: e.target.value })
  }

  inputUrl(e) {
    this.setState({ url: e.target.value })
  }

  getBookmarks() {
    axios.get('http://localhost:3000/bookmark')
    .then((result) => {
      const bookmarks = result.data.message.list;
      console.log(bookmarks);
      this.props.actions.setBookmarks(bookmarks);
    })
    .catch(() => {
      console.log('通信に失敗しました。');
    });
  }

  postBookmarks() {
    axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      url: 'http://localhost:3000/bookmark',
      data: this.props.bookmarks 
    })
    .then((result) => {
      console.log(result);
    })
    .catch(() => {
      console.log('POST通信に失敗しました。');
    });
  }

  render() {
    const { actions, bookmarks } = this.props;
    const { title, url } = this.state;
    return (
      <Wrapper>
        <div className="navbar">
          <span className="home">ブックマーク</span>
        </div>
        <div className="contents">
          {bookmarks.list.map((item, index) => (item.type == 'folder')
            ? <Folder key={index} id={item.id} name={item.name} children={item.children} />
            : <Bookmark key={index} id={item.id} name={item.name} url={item.url} />
          )}
          <div>
            <input type="text" placeholder="title" value={title} onChange={this.inputTitle} />
            <input type="text" placeholder="url" value={url} onChange={this.inputUrl} />
            <input type="button" value="追加" onClick={() => actions.addBookmark(title, url)} />
            <input type="button" value="保存" onClick={() => this.postBookmarks()} />
          </div>
          <Link to={"hello"}>hello</Link>
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  .navbar {
    top: 0;
    position: fixed;
    width: 100%;
    height: 50px;
    z-index: 1;
    background-color: #4367d6;
    color: #ffffff
    display: flex;
    align-items: center
  }
  .home {
    padding-left: 10px;
  }
  .contents {
    padding-top: 60px;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const mapState = (state, ownProps) => ({
  bookmarks: state.bookmarks
});

const mapDispatch = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export const BookmarkManager = connect(mapState, mapDispatch)(BookmarkManagerComponent);
