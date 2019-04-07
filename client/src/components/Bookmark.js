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
    this.state = {
      onDragStart: false, onDragOverUpper: false, onDragOverLower: false, onMouseOver: false,
    }
    this.bindEvent();
  }

  bindEvent() {
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragEnterUpper = this.onDragEnterUpper.bind(this);
    this.onDragOverUpper = this.onDragOverUpper.bind(this);
    this.onDragLeaveUpper = this.onDragLeaveUpper.bind(this);
    this.onDragEnterLower = this.onDragEnterLower.bind(this);
    this.onDragOverLower = this.onDragOverLower.bind(this);
    this.onDragLeaveLower = this.onDragLeaveLower.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  componentDidMount() {
  }

  onDragStart(e) {
    e.dataTransfer.setData('id', e.target.id);
    e.dataTransfer.setData('type', 'bookmark');
    this.setState({ onDragStart: true });
    console.log('onDragStart id=' + e.target.id + ',type=' + e.target.type);
  }

  onDragEnd(e) {
    console.log('onDragEnd');
    this.setState({ onDragStart: false });
  }

  onDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    let fromId = e.dataTransfer.getData('id');
    let fromType = e.dataTransfer.getData('type');
    let toId = e.currentTarget.id;
    let toUpper = this.state.onDragOverUpper;
    let toLower = this.state.onDragOverLower;
    this.setState({ onDragOverUpper: false });
    this.setState({ onDragOverLower: false });
    console.log('onDrop from[id:' + fromId + ',type:' + fromType + '], to[id' + toId + ',type:bookmark]');
    if (toUpper) {
      this.props.actions.moveItemToBefore(fromId, toId);
    } else {
      this.props.actions.moveItemToAfter(fromId, toId);
    }
  }

  onDragEnterUpper(e) {
    this.setState({ onDragOverUpper: true });
  }

  onDragEnterLower(e) {
    this.setState({ onDragOverLower: true });
  }

  onDragOverUpper(e) {
    e.stopPropagation(); // defaultで現在のドラッグイベントを初期化？するらしい。
    e.preventDefault();  // 故に無効化しないとdropイベントが発火しない。でもdragEndは発火する。よく分からない。
  }

  onDragOverLower(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  onDragLeaveUpper(e) {
    this.setState({ onDragOverUpper: false });
  }

  onDragLeaveLower(e) {
    this.setState({ onDragOverLower: false });
  }

  onMouseOver(e) {
    this.setState({ onMouseOver: true });
  }

  onMouseOut(e) {
    this.setState({ onMouseOver: false });
  }

  getClassName() {
    return classnames(
      'bookmark',
      { 'dragStart': this.state.onDragStart },
      { 'dragOverUpper': this.state.onDragOverUpper },
      { 'dragOverLower': this.state.onDragOverLower },
      { 'mouseOver': this.state.onMouseOver },
    );
  }

  render() {
    const { id, name, url } = this.props;
    const { onMouseOver } = this.state;

    return (
      <Wrapper>
        <div id={id} className={this.getClassName()} draggable="true"
          onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} onDrop={this.onDrop}
          onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} >
          <li>
            <a href={url} target="_blank">{name}</a>
            <DeleteLink id={id} hover={onMouseOver ? 'true' : ''} />
          </li>
          <div className="background upperHalf"
            onDragEnter={this.onDragEnterUpper} onDragOver={this.onDragOverUpper} onDragLeave={this.onDragLeaveUpper} />
          <div className="background lowerHalf"
            onDragEnter={this.onDragEnterLower} onDragOver={this.onDragOverLower} onDragLeave={this.onDragLeaveLower} />
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  .bookmark {
    position: relative;
  }
  .dragOver {
    border: 2px dashed rgb(0,0,0);
  }
  .dragStart {
    opacity: 0.4;
  }
  li {
    list-style-type: none;
  }
  li:before {
    font-family: 'Font Awesome 5 Free';
    font-weight: 400;
    content: '\f15b';
    padding-right: 8px;
  }
  a {
    color: rgb(90,90,90);
  }
  .background {
    position: absolute;
    width: 100%;
    height: 50%;
    display: block;
  }
  .background.upperHalf {
    top: 0px;
  }
  .background.lowerHalf {
    bottom: 0px;
  }
  .mouseOver > .background {
    display: none;
  }
  .dragOverUpper > .background.upperHalf {
    border-top: solid 1px #00f;
  }
  .dragOverLower > .background.lowerHalf {
    border-bottom: solid 1px #00f
  }
`;

export default connect(
  (state, ownProps) => ({ bookmarks: state.bookmarks }),
  (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
)(Bookmark);
