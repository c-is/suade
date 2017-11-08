import React, { Component } from 'react';
import ListRow from './ListRow';

export default class List extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   csvData: this.props['data-csv'] || '',
    // };
  }
  renderListRows() {
    return this.props['data-csv'].map((data, index) => {
      return (
        <ListRow
          key={index}
          countryName={data.country}
          countryData={data}
          onEditRow={this.props.onEditRow}
        />
      );
    });
  }
  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   csvData: nextProps['data-csv'],
    // });
  }
  render() {
    return (
      <div className="list clear">
        <nav className="list__nav"></nav>
        <div className="list__table">
          {this.props['data-csv'] &&
            <table>
              <thead>
                <tr>
                  {Object.keys(this.props['data-csv'][0]).map((el, i) => {
                    return (
                      <th key={i}>{el}</th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {this.renderListRows()}
              </tbody>
            </table>
          }
        </div>
      </div>
    );
  }
}
