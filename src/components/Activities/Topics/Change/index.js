import React, { Component } from 'react';

import {
  getActivities,
  getTopics,
  getTopicsActivitiesRelations,
  updateTopicActivity,
} from '../../../../utils/apiCalls';

class ChangeTopicsActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      activities: [],
      topicsactivities: [],
      oldTid: props.location.state.tid,
      oldAid: props.location.state.aid,
      currentTopic: props.location.state.tid,
      currentActivity: props.location.state.aid,
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

    // get topic activities relations
    getTopicsActivitiesRelations()
      .then(topicsactivities => {
        this.setState({ topicsactivities });
      });
  }

  submit(e) {
    e.preventDefault();
    const data = {
      aid: this.state.currentActivity,
      tid: this.state.currentTopic,
      oldAid: this.state.oldAid,
      oldTid: this.state.oldTid,
    }
    updateTopicActivity(data)
      .then(res => {
        console.log(res);
        window.location.reload(true);
      });
  }

  render() {
    return (
      <div>
        <h1>Change Relationship</h1>
        <form onSubmit={this.submit}>
          <select name="activities" id="activities" value={this.state.currentActivity} onChange={(e) => this.setState({ currentActivity: e.target.value })}>
            {this.state.activities.map((activity, i) => <option key={i} value={activity.id}>{activity.name}</option>)}
          </select>
          <select name="topics" id="topics" value={this.state.currentTopic} onChange={(e) => this.setState({ currentTopic: e.target.value })}>
            {this.state.topics.map((topic, i) => <option key={i} value={topic.id}>{topic.name}</option>)}
          </select>
          <input type="submit" />
        </form>
      </div>
    );
  }
};

export default ChangeTopicsActivities;
