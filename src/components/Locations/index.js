import React, { Component } from 'react';

import Table from '../Table';
import { getLocations, insertLocation, deleteLocation } from '../../utils/apiCalls';

class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      name: '',
    };

    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    getLocations()
      .then(locations => {
        this.setState({ locations });
      });
  }

  submit(e) {
    e.preventDefault();
    if (this.state.name === '') {
      return;
    }
    console.log('submitting', this.state.name);
    const locationData = {
      name: this.state.name,
    }
    insertLocation(locationData)
      .then(res => {
        console.log(res);
        window.location.reload(true);
      });
  }

  render() {
    return (
      <div>
        <h1>Locations</h1>
        <div>
          <h3>Create Location</h3>
          <form>
            <label htmlFor="name">Location Name<span style={{ color: 'red' }}> *Required</span></label>
            <input type="text" id="name" onChange={e => this.setState({ name: e.target.value })} />
            <input onClick={(e) => this.submit(e)} type="submit" />
          </form>
        </div>
        <div>
          <h3>Current Locations:</h3>
          <Table
            headers={[
              { html: 'id', prop: 'id' }, 
              { html: 'name', prop: 'name' }]
            }
            data={this.state.locations}
            delete={(id) => deleteLocation(id)
              .then(res => {
                console.log(res);
                window.location.reload(true);
              })
            }
          />
        </div>
      </div>
    );
  }
}

export default Locations;
