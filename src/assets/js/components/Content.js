import React, { Component } from 'react';
import cx from 'classnames';
import csv from 'javascript-csv';

import List from './List';
import Charts from './Chart';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  editRow = (name, value) => {
    this.setState({
      countryName: name,
      targetVal: value,
    });
  }
  readData = () => {
    const file = document.getElementById('uploaded-file').files[0];
    const reader = new FileReader();


    reader.readAsText(file);
    reader.onload = (event) => {
      const csvData = event.target.result;
      const dataObj = csv.toObjects(csvData);

      this.uploadStyle = {
        opacity: 0,
        visibility: 'hidden',
      };

      this.setState({
        csv: dataObj,
      });
    };
    reader.onerror = () => {
      alert(`Unable to read${file.fileName}`);
    };
  }
  render() {
    return (
      <article className="content content--home" id="content">
        <div className="upload" style={this.uploadStyle}>
          <p>To see a data visialisation, start by selecting a data file </p>
          <input className="upload__button" type="file" id="uploaded-file" onChange={this.readData} />
          <label className="upload__label" htmlFor="uploaded-file">Choose a file</label>
        </div>
        <div className="content__inner">
          <section className="section section--list">
            <List data-csv={this.state.csv} onEditRow={this.editRow} />
          </section>
          <section className="section section--chart">
            <Charts data-csv={this.state.csv} />
          </section>
        </div>
      </article>
    );
  }
}
