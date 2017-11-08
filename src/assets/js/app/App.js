import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Header from '../components/header';
import Content from '../components/content';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.headerHeight = $('.header').height() || 0;

    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight - this.headerHeight,
    };
  }
  updateDimensions = () => {
    this.headerHeight = $('.header').height() || 0;

    this.setState({
      windowHeight: window.innerHeight - this.headerHeight,
    });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }
  render() {
    const style = {
      height: this.state.windowHeight,
    };
    return (
      <div className="wrapper">
        <Header />
        <main className="main" id="main" role="main" style={style}>
          <Content />
        </main>
      </div>
    );
  }
}
