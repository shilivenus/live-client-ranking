import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class Map extends Component {
  constructor() {
    super();
    this.state = {
      center: {lat: 59.95, lng: 30.33},
      zoom: 11
    };
  }
  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
      >
        <div />
      </GoogleMapReact>
    );
  }
}

export default Map;
