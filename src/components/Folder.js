import React, { Component } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

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
    console.log('onDragStart');
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
    console.log('onDrop');
    this.setState({ onDragOver: false });
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

    return (
      <Wrapper>
        <div className={this.getFolderClassName()} draggable="true" onDragStart={this.onDragStart} onDragEnter={this.onDragEnter}
         onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDragEnd={this.onDragEnd} onDrop={this.onDrop} >
          <input type="checkbox" id={id} checked={open} onChange={this.onCheckChange} className="folderCheck" />
          <label htmlFor={id}>{name}</label>
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

export default Folder;
