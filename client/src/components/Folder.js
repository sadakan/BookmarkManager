import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import classnames from 'classnames';

import * as actions from '../actions';
import Bookmark from './Bookmark';

class Folder extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, onDragStart: false, onDragOver: false }
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

  getFolderClassName() {
    return classnames(
      'folder',
      {'dragStart': this.state.onDragStart},
      {'dragOver': this.state.onDragOver}
    );
  }

  render() {
    const { id, name, children } = this.props;
    const { open } = this.state;
    const checkId = id + '_check';

    return (
      <Wrapper>
        <div id={id} className={this.getFolderClassName()} draggable="true" onDragStart={this.onDragStart} onDragEnter={this.onDragEnter}
         onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDragEnd={this.onDragEnd} onDrop={this.onDrop} >
          <input type="checkbox" id={checkId} checked={open} onChange={this.onCheckChange} className="folderCheck" />
          <label htmlFor={checkId}>{name}</label>
        </div>
        <div className="accordion" open={open}>
          {children.map((item, index) => (item.type == 'folder')
            ? <Folder key={index} id={item.id} name={item.name} children={item.children} />
            : <Bookmark key={index} id={item.id} name={item.name} url={item.url} />
          )}
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
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"] + label:before {
    font-family: 'Font Awesome 5 Free';
    font-weight: bold;
    content: '\f105';
    padding-right: 8px;
  }
  input[type="checkbox"]:checked + label:before {
    content: '\f107';
  }
  .accordion {
    // padding-left: ${props => props.ggg ? 3 : 0}em;
    padding-left: 2em;
    opacity: 0;
    max-height: 0px;
    overflow-y: hidden;
    transition: all 0.5s;
  }
  .accordion[open] {
    opacity: 1;
    max-height: 20em;
  }
`;

export default connect(
  (state, ownProps) => ({ bookmarks: state.bookmarks }),
  (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
)(Folder);
