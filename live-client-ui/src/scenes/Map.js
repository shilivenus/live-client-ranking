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

const columns = [{
  title: 'Client Name',
  dataIndex: 'photo_title',
  key: 'photo_title',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'ECN',
  dataIndex: 'photo_id',
  key: 'photo_id',
}, {
  title: 'Address',
  dataIndex: 'owner_name',
  key: 'owner_name',
}];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    this.handleMarkerClick(selected);
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

class Map extends Component {
  state = {
      markers: [],
      top: 10,
      rankBy: 'balance'
    }

    handleMarkerClick = this.handleMarkerClick.bind(this);
    handleCloseClick = this.handleCloseClick.bind(this);
    handleChange = this.handleChange.bind(this);
    handleButtonClick = this.handleButtonClick.bind(this);
    //selectTop = this.selectTop.bind(this);


    componentDidMount() {
      fetch('https://gist.githubusercontent.com/farrrr/dfda7dd7fccfec5474d3/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json')
        .then(res => res.json())
        .then(data => {
          let markersWithShowInfo = Array.from(data.photos);
          markersWithShowInfo.forEach(e =>{e.showInfo = false;});
          this.setState({ markers: markersWithShowInfo });
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

    handleChange(value) {
      this.setState({top: value});
    }

    handleButtonClick() {
      console.log(this.state.top);
      console.log(this.state.rankBy);
    }

    render() {
      return (
        <div>
          <Select defaultValue="10" style={{ width: 120 }} onChange={this.handleChange}>
            <Option value="10">10</Option>
            <Option value="100">100</Option>
            <Option value="1000">1000</Option>
          </Select>
          <Select defaultValue="balance" style={{ width: 120 }} allowClear disabled>
            <Option value="balance">Balance</Option>
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
          <Table columns={columns} rowSelection={rowSelection} dataSource={this.state.markers} />
        </div>
    );
  }
}

export default Map;
