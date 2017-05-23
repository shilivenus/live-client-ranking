import React, { Component } from 'react';

class ClientDetails extends Component {
  state = {
    clientId: 0,
    clientName: null
  }

  componentDidMount(){
    var url = 'https://' + this.props.match.params.id;
    fetch(url)
    .then(res => res.json())
    .then(data =>{
      this.setState({clientId: data.clientId, clientName: data.clientName});
    });
  }

  render(){
    return (
      <div>
        <div>{this.state.clientId}</div>
        <div>{this.state.clientName}</div>
      </div>
    );
  }
}

export default ClientDetails;
