import React, { Component } from 'react';
import _ from "lodash";
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
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
      {props.markers.map(marker =>{
        const onClick = () => props.onMarkerClick(marker);
        const onCloseClick = () => props.onCloseClick(marker);

        return (
          <Marker
            position={{ lat: marker.latitude, lng: marker.longitude }}
            key={marker.photo_id}
            onClick={onClick}
          >
            {marker.showInfo && (
            <InfoWindow onCloseClick={onCloseClick}>
              <div>
                <strong>{marker.owner_name}</strong>
                <br />
                <em>The contents of this InfoWindow are actually ReactElements.</em>
              </div>
            </InfoWindow>
          )}
          </Marker>
        );
      })}
    </MarkerClusterer>
  </GoogleMap>
));


class Map extends Component {
  state = {
      markers: []
    }

    handleMarkerClick = this.handleMarkerClick.bind(this);
    handleCloseClick = this.handleCloseClick.bind(this);


    componentDidMount() {
      fetch('https://gist.githubusercontent.com/farrrr/dfda7dd7fccfec5474d3/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json')
        .then(res => res.json())
        .then(data => {
          let markersWithShowInfo = Array.from(data.photos);
          markersWithShowInfo.forEach(e =>{e.showInfo = false;});
          this.setState({ markers: markersWithShowInfo });
          console.log(this.state.markers[1]);
        });
    }

    // handleMarkerClick(targetMarker) {
    //   let url = '/map/' + targetMarker.photo_id;
    //   window.location = url;
    // }

    handleMarkerClick(targetMarker) {
      this.setState({
        markers: this.state.markers.map(marker => {
          if (marker === targetMarker) {
            return {
              ...marker,
              showInfo: true,
            };
          }
          return marker;
        }),
      });
    }

    handleCloseClick(targetMarker) {
      this.setState({
        markers: this.state.markers.map(marker => {
          if (marker === targetMarker) {
            return {
              ...marker,
              showInfo: false,
            };
          }
          return marker;
        }),
      });
    }


    render() {
      return (
        <div>
          <MarkerClustererGoogleMap
            containerElement={
              <div style={{ height: '1500px', width: '1800px' }} />
            }
            mapElement={
              <div style={{ height: '100%' }} />
            }
            markers={this.state.markers}
            onMarkerClick={this.handleMarkerClick}
            onCloseClick={this.handleCloseClick}
          />
        </div>
    );
  }
}

export default Map;
