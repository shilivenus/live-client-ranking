import React, { Component } from 'react';
import _ from "lodash";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";
import 'whatwg-fetch';

const MarkerClustererGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={3}
    defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          position={{ lat: marker.latitude, lng: marker.longitude }}
          key={marker.photo_id}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));


class Map extends Component {
  state = {
      markers: [],
    }

    componentDidMount() {
      fetch('https://gist.githubusercontent.com/farrrr/dfda7dd7fccfec5474d3/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json')
        .then(res => res.json())
        .then(data => {
          this.setState({ markers: data.photos });
        });
    }

    render() {
      return (
        <MarkerClustererGoogleMap
          containerElement={
            <div style={{ height: '1500px', width: '1800px' }} />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          markers={this.state.markers}
        />
    );
  }
}

export default Map;
