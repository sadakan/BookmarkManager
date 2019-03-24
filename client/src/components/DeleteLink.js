import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import * as actions from '../actions';

class DeleteLink extends Component {
  constructor(props) {
    super(props);
  }

  removeBookmark() {
    const id = this.props.bookmarkId;
    console.log(id);
    this.props.actions.removeBookmark(id);
  }

  render() {
    const { hover } = this.props;

    return (
      <Wrapper hover={hover}>
        <span className="deleteLink" onClick={() => this.removeBookmark()}>delete</span>
      </Wrapper>
    );
  }
}

const Wrapper = styled.span`
  .deleteLink {
    display: ${(props) => (props.hover == 'true' ? 'block' : 'none')};
    float: right;
    cursor: pointer;
  }
`;

export default connect(
  (state, ownProps) => ({ bookmarks: state.bookmarks }),
  (dispatch) => ({ actions: bindActionCreators(actions, dispatch) })
)(DeleteLink);
