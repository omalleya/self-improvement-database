import React, { Component } from 'react';

import {
  getActivities,
  getTopics,
  getTopicsActivitiesRelations,
  insertTopicActivity,
  deleteTopicActivity
} from '../../../utils/apiCalls';
import Table from '../../Table';

class TopicsActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      activities: [],
      topicsactivities: [],
      tid: null,
      aid: null,
    }
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    getActivities()
      .then(activities => {
        this.setState({ activities });
      });
    
    getTopics()
      .then(topics => {
        this.setState({ topics });
      });

    getTopicsActivitiesRelations()
      .then(topicsactivities => {
        this.setState({ topicsactivities });
      });
  }

  submit(e) {
    e.preventDefault();
    if (this.state.tid === null || this.state.aid === null) {
      return;
    }
    const data = {
      tid: this.state.tid,
      aid: this.state.aid,
    }
    insertTopicActivity(data)
      .then(res => {
        console.log(res);
        window.location.reload(true);
      });
  }

  render() {
    let topicsactivitiesArray = [];
    if (this.state.topicsactivities.length > 0
      && this.state.activities.length > 0
      && this.state.topics.length > 0
    ) {
      topicsactivitiesArray = this.state.topicsactivities.map(relation => (
        {
          id: `${relation.tid}-${relation.aid}`,
          activity: this.state.activities[this.state.activities.findIndex((el) => el.id === relation.aid)].name,
          topic: this.state.topics[this.state.topics.findIndex((el) => el.id === relation.tid)].name,
        }
      ));
    }

    return (
      <div>
        <h1>Attach Topics to Activities</h1>
        <form onSubmit={this.submit}>
          <select name="activities" id="activities"
            onChange={(e) => {
              const value = e.target.value;
              this.setState({ aid: value });
            }}
            value={this.state.aid}
          >
            <option value={null}></option>
            {this.state.activities.map((activity, i) => <option key={i} value={activity.id}>{activity.name}</option>)}
          </select>
          <select name="topics" id="topics"
            onChange={(e) => {
              const value = e.target.value;
              this.setState({ tid: value });
            }}
            value={this.state.tid}
          >
            <option value={null}></option>
            {this.state.topics.map((topic, i) => <option key={i} value={topic.id}>{topic.name}</option>)}
          </select>
          <input type="submit" />
        </form>
        <div>
          <h3>Current Relations</h3>
          <Table
            headers={[
              { html: 'Activity', prop: 'activity' },
              { html: 'Topic', prop: 'topic' },
            ]}
            data={topicsactivitiesArray}
            delete={(id) => deleteTopicActivity(id)
              .then(res => {
                console.log(res);
                window.location.reload(true);
              })
            }
            update={(id) => this.props.history.push('/topicactivitychange', { tid: id.split('-')[0], aid: id.split('-')[1] })}
          />
        </div>
      </div>
    );
  }
};

export default TopicsActivities;
