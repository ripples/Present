import React from 'react';

export default class TimeRange extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <label style={{display: 'inline'}}>Time: </label>
        <input type='time' style={{display: 'inline'}} name='sTime' onChange={this.props.handleChange.bind(this, 'sTime')}></input>
        <p style={{display: 'inline'}}> - </p>
        <input type='time' style={{display: 'inline'}} name='eTime' onChange={this.props.handleChange.bind(this, 'eTime')}></input>
      </div>
    );
  }
}
