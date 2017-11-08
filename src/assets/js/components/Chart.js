import React, { Component } from 'react';
import C3Chart from 'react-c3js';
// import 'c3/c3.css';

export default class Charts extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  BarGraph() {
    const countries = [];
    for (const i in this.state.csvData) {
      countries.push(this.state.csvData[i].country);
    }

    const values = Object.keys(this.state.csvData[0]).filter((v) => {
      return v !== 'country';
    });

    const data = {
      type: 'bar',
      json: this.state.csvData,
      keys: {
        value: values,
      },
    };

    const axis = {
      x: {
        type: 'category',
        categories: countries,
      },
    };

    const size = {
      width: window.innerWidth / 3.8,
      height: window.innerHeight / 3.4,
    };

    return (
      <C3Chart data={data} axis={axis} size={size} />
    );
  }
  DonutGraph() {
    const countries = [];
    const sums = [];
    for (const i in this.state.csvData) {
      countries.push(this.state.csvData[i].country);

      let amount = 0;

      Object.keys(this.state.csvData[i]).forEach((key) => {
        if (!isNaN(this.state.csvData[i][key])) {
          amount += Number(this.state.csvData[i][key]);
        }
      });
      sums.push(amount);
    }

    const values = [countries, sums];

    const data = {
      type: 'donut',
      rows: values,
    };

    const title = {
      title: 'Sum of commodity',
    };

    const size = {
      width: window.innerWidth / 3.2,
      height: window.innerHeight / 2.8,
    };

    return (
      <C3Chart data={data} donut={title} size={size} />
    );
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      csvData: nextProps['data-csv'],
    });
  }
  render() {
    return (
      <div className="chart">
        {this.state.csvData &&
          <div className="chart__container">
            <div className="chart__inner">
              {this.BarGraph()}
            </div>

            <div className="chart__inner">
              {this.DonutGraph()}
            </div>
          </div>
        }
      </div>
    );
  }
}
