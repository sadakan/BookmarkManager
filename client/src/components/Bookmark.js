import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import classnames from 'classnames';

import * as actions from '../actions';
import DeleteLink from './DeleteLink';

class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = { onDragStart: false, onDragOver: false, onMouseOver: false }
    this.bindEvent();
  }

  bindEvent() {
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  componentDidMount() {
  }

  onDragStart(e) {
    e.dataTransfer.setData('dragStartId', e.target.id);
    this.setState({ onDragStart: true });
    console.log('onDragStart id=' + e.target.id);
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

  onMouseOver(e) {
    this.setState({ onMouseOver: true });
  }

  onMouseOut(e) {
    this.setState({ onMouseOver: false });
  }

  getClassName() {
    return classnames(
      {'dragStart': this.state.onDragStart},
      {'dragOver': this.state.onDragOver}
    );
  }

  render() {
    const { id, name, url } = this.props;
    const { onDragOver, onMouseOver } = this.state;

    return (
      <Wrapper>
        <div id={id} className={this.getClassName()} draggable="true"
           onDragStart={this.onDragStart} onDragEnter={this.onDragEnter} onDragOver={this.onDragOver}
           onDragLeave={this.onDragLeave} onDragEnd={this.onDragEnd} onDrop={this.onDrop}
           onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
          <li>
            <a href={url} target="_blank">{name}</a>
            <DeleteLink bookmarkId={id} hover={onMouseOver ? 'true' : ''} />
          </li>
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
  a {
    color: #5a5a5a;
  }
`;

export default connect(
  (state, ownProps) => ({ bookmarks: state.bookmarks }),
  (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
)(Bookmark);
