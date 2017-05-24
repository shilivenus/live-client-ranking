import React, { Component } from 'react';
import { Button , Select , Table, Icon } from 'antd';
import 'antd/lib/select/style/css';
import 'antd/lib/table/style/css';
import 'antd/lib/button/style/css';
import _ from "lodash";
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";
import 'whatwg-fetch';

const Option = Select.Option;

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
            position={{ lat: parseFloat(marker.address[0].Latitude), lng: parseFloat(marker.address[0].Longitude) }}
            key={marker._id}
            onClick={onClick}
          >
            {marker.showInfo && (
            <InfoWindow onCloseClick={onCloseClick}>
              <div>
                <strong>{marker.name} {marker.ECN}</strong>
                <br />
                <em>Active Vans: {marker.activeVans} Account Balance: {marker.accountBalance}</em>
              </div>
            </InfoWindow>
          )}
          </Marker>
        );
      })}
    </MarkerClusterer>
  </GoogleMap>
));

const columns = [{
  title: 'Client Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'ECN',
  dataIndex: 'ECN',
  key: 'ECN',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
  render: address => `${address.Line1} ${address.Line2} ${address.Line3} ${address.Suburb} ${address.State} ${address.Country}`,
}];

class Map extends Component {
  state = {
      markers: [],
      top: 10,
      orderby: 'accountBalance'
    }

    handleMarkerClick = this.handleMarkerClick.bind(this);
    handleCloseClick = this.handleCloseClick.bind(this);
    handleTopChange = this.handleTopChange.bind(this);
    handleorderbyChange = this.handleorderbyChange.bind(this);
    handleButtonClick = this.handleButtonClick.bind(this);
    handleRowClick = this.handleRowClick.bind(this);

    componentDidMount() {
      fetch('http://localhost:3000/clients')
        .then(res => res.json())
        .then(data => {
          let markersWithShowInfo = Array.from(data);
          markersWithShowInfo.forEach(e =>{e.showInfo = false;});
          this.setState({ markers: markersWithShowInfo });
        });
    }

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

    handleTopChange(value) {
      this.setState({top: value});
    }

    handleorderbyChange(value) {
      this.setState({orderby: value});
    }

    handleButtonClick() {
      let url = 'http://localhost:3000/clients?top='+ this.state.top + '&orderby=' + this.state.orderby;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          let markersWithShowInfo = Array.from(data);
          markersWithShowInfo.forEach(e =>{e.showInfo = false;});
          this.setState({ markers: markersWithShowInfo });
        });
    }

    handleRowClick(record, index) {
      record.showInfo = true;
      let targetMarker = this.state.markers[index];
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

    render() {
      return (
        <div>
          <Select defaultValue="10" style={{ width: 120 }} onChange={this.handleTopChange}>
            <Option value="10">10</Option>
            <Option value="100">100</Option>
            <Option value="1000">1000</Option>
          </Select>
          <Select defaultValue="accountBalance" style={{ width: 120 }} onChange={this.handleorderbyChange}>
            <Option value="accountBalance">Balance</Option>
            <Option value="activeVans">Active Vans</Option>
          </Select>
          <Button type="primary" onClick={this.handleButtonClick}>Search</Button>
          <MarkerClustererGoogleMap
            containerElement={
              <div style={{ height: '500px' }} />
            }
            mapElement={
              <div style={{ height: '100%' }} />
            }
            markers={this.state.markers}
            onMarkerClick={this.handleMarkerClick}
            onCloseClick={this.handleCloseClick}
          />
          <Table columns={columns} onRowClick={this.handleRowClick} dataSource={this.state.markers} />
        </div>
    );
  }
}

export default Map;
