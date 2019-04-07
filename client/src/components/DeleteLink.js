import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import * as actions from '../actions';

class DeleteLink extends Component {
  constructor(props) {
    super(props);
  }

  removeItem() {
    const id = this.props.id;
    console.log(id);
    this.props.actions.removeItem(id);
  }

  render() {
    const { hover } = this.props;

    return (
      <Wrapper hover={hover}>
        <span className="deleteLink" onClick={() => this.removeItem()}>delete</span>
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
