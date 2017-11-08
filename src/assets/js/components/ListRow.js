import React, { Component } from 'react';

import NumericInput from './NumericInput';

export default class ListRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.countryData || '',
    };
  }
  handleInputBlur = (newValue, key) => {
    this.props.countryData[key] = newValue;
    this.props.onEditRow(key, newValue);
  }
  inputType(value, object) {
    if (!isNaN(value)) {
      return (
        <NumericInput
          object = {object}
          value = {Number(value)}
          onBlur = {this.handleInputBlur}
        />
      );
    } else {
      return (
        <span>{value}</span>
      );
    }
  }
  render() {
    return (
      <tr>
        {Object.keys(this.props.countryData).map((key, n) => {
          return (
            <td key={n}>
              {this.inputType(this.props.countryData[key], key)}
            </td>
          );
        })}
      </tr>
    );
  }
}

ListRow.propTypes = {
  countryData: React.PropTypes.object.isRequired,
  countryName: React.PropTypes.string.isRequired,
};
