import React, { Component } from 'react';
import styled from 'styled-components';

class NavBar extends Component {
  render() {
    return (
      <Wrapper>
        <div className="navbar">
          <span className="home">ブックマーク</span>
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
    height: 45px;
    z-index: 1;
    background-color: rgb(69,103,214);
    color: #ffffff
    display: flex;
    align-items: center
  }
  .home {
    padding-left: 10px;
  }
`;

export default NavBar;