import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import classnames from 'classnames';

import * as actions from '../actions';

class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = { onDragStart: false, onDragOver: false }
    this.bindEvent();
  }

  bindEvent() {
    this.onCheckChange = this.onCheckChange.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
  }

  onCheckChange(e) {
    this.setState({ open: !this.state.open });
  }

  onDragStart(e) {
    console.log('obDragStart');
    e.dataTransfer.setData('dragStartId', e.target.id);
    this.setState({ onDragStart: true });
  }

  onDragEnter(e) {
    this.setState({ onDragOver: true });
  }

  onDragOver(e) {
    e.stopPropagation(); // defaultで現在のドラッグイベントを初期化？するらしい。
    e.preventDefault();  // 故に無効化しないとdropイベントが発火しない。でもdragEndは発火する。よく分からない。
  }

  onDragLeave(e) {
    this.setState({ onDragOver: false });
  }

  onDragEnd(e) {
    console.log('onDragEnd');
    this.setState({ onDragStart: false });
  }

  onDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ onDragOver: false });
    let fromId = e.dataTransfer.getData('dragStartId');
    let toId = e.currentTarget.id;
    console.log('onDrop from=' + fromId + ',to=' + toId);
    this.props.actions.moveBookmark(fromId, toId);
  }

  getClassName() {
    return classnames(
      {'dragStart': this.state.onDragStart},
      {'dragOver': this.state.onDragOver}
    );
  }

  render() {
    const { id, name, url } = this.props;

    return (
      <Wrapper>
        <div id={id} className={this.getClassName()} draggable="true" onDragStart={this.onDragStart} onDragEnter={this.onDragEnter}
           onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDragEnd={this.onDragEnd} onDrop={this.onDrop}>
          <li><a href={url} target="_blank">{name}</a></li>
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  .dragOver {
    border: 2px dashed #000;
  }
  .dragStart {
    opacity: 0.4;
  }
`;

export default connect(
  (state, ownProps) => ({ bookmarks: state.bookmarks }),
  (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
)(Bookmark);
