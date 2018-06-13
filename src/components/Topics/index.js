import React, { Component } from 'react';

import Table from '../Table';
import { getTopics, insertTopic, deleteTopic } from '../../utils/apiCalls';

class Topics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      name: '',
    };
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    getTopics()
      .then(topics => {
        this.setState({ topics });
      });
  }

  submit(e) {
    e.preventDefault();
    if (this.state.name === '') {
      return;
    }
    console.log('submitting', this.state.name);
    const topicData = {
      name: this.state.name,
    }
    insertTopic(topicData)
      .then(res => {
        console.log(res);
        window.location.reload(true);
      });
  }

  render() {
    return (
      <div>
        <h1>Topics</h1>
        <div>
          <h3>Create Topic</h3>
          <form onSubmit={this.submit}>
            <label htmlFor="name">Topic Name<span style={{ color: 'red' }}> *Required</span></label>
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
          <h3>Current Topics:</h3>
          <Table
            headers={[
              { html: 'id', prop: 'id' }, 
              { html: 'name', prop: 'name' }]
            }
            data={this.state.topics}
            delete={(id) => deleteTopic(id)
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

export default Topics;
