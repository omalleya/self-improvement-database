import React, { Component } from 'react';

import Table from '../Table';
import { getSources, insertSource, deleteSource } from '../../utils/apiCalls';

class Sources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: [],
      name: '',
    };
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    getSources()
      .then(sources => {
        this.setState({ sources });
      });
  }

  submit(e) {
    e.preventDefault();
    if (this.state.name === '') {
      return;
    }
    console.log('submitting', this.state.name);
    const sourceData = {
      name: this.state.name,
    }
    insertSource(sourceData)
      .then(res => {
        console.log(res);
        window.location.reload(true);
      });
  }

  render() {
    return (
      <div>
        <h1>Sources</h1>
        <div>
          <h3>Create Source</h3>
          <form onSubmit={this.submit}>
            <label htmlFor="name">Source Name<span style={{ color: 'red' }}> *Required</span></label>
            <input
              type="text"
              id="name"
              onChange={(e) => this.setState({ name: e.target.value })}
              value={this.state.name}
            />
            <input type="submit" />
          </form>
        </div>
        <div>
          <h3>Current Sources:</h3>
          <Table
            headers={[
              { html: 'id', prop: 'id' }, 
              { html: 'name', prop: 'name' }]
            }
            data={this.state.sources}
            delete={(id) => deleteSource(id)
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

export default Sources;
