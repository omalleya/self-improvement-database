import React, { Component } from 'react';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import 'react-select/dist/react-select.css';

import {
  getActivities,
  getLocations,
  getSources,
  getTopics,
  insertActivity,
  deleteActivity,
  getActivitiesLid,
  getTopicNames,
} from '../../utils/apiCalls';

import Table from '../Table';

class Activities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
      activities: [],
      sources: [],
      locations: [],
      filter: 0,
      currentTopic: null,
      activity: {
        name: '',
        date: '',
        sid: 1,
        lid: 1,
        p1: '',
        p2: '',
        p3: '',
      }
    }
    this.submit = this.submit.bind(this);
    this.filter = this.filter.bind(this);
  }

  componentWillMount() {
    // get activities
    getActivities()
      .then(activities => {
        this.setState({ activities });
      })
      .then(() => {
        const promises = this.state.activities.map(activity => {
          return getTopicNames(activity.id)
            .then(array => {
              activity.topics = array.map(el => el.name).join(', ');
              return activity;
            });
        });
        return Promise.all(promises);
      })
      .then(activities => this.setState({ activities }));

    // get locations
    getLocations()
      .then(locations => {
        this.setState({ locations });
      });

    // get sources
    getSources()
      .then(sources => {
        this.setState({ sources });
      });

    // get topics
    getTopics()
      .then(topics => {
        this.setState({ topics });
      });
  }

  submit(e) {
    e.preventDefault();
    if (this.state.activity.name === ''
      || this.state.activity.date === ''
    ) {
      return;
    }
    const activity = this.state.activity;
    console.log(activity);
    insertActivity(activity)
      .then(res => {
        console.log(res);
        window.location.reload(true);
      });
  }

  filter(lid) {
    if(lid === '0') {
      // get all activities
      getActivities()
        .then(activities => {
          this.setState({ activities });
        })
        .then(() => {
          const promises = this.state.activities.map(activity => {
            return getTopicNames(activity.id)
              .then(array => {
                activity.topics = array.map(el => el.name).join(', ');
                return activity;
              });
          });
          return Promise.all(promises);
        })
        .then(activities => this.setState({ activities }));
    } else {
      getActivitiesLid(lid)
        .then(activities => {
          this.setState({ activities });
        })
        .then(() => {
          const promises = this.state.activities.map(activity => {
            return getTopicNames(activity.id)
              .then(array => {
                activity.topics = array.map(el => el.name).join(', ');
                return activity;
              });
          });
          return Promise.all(promises);
        })
        .then(activities => this.setState({ activities }));
    }
  }

  render() {
    let activities = JSON.parse(JSON.stringify(this.state.activities));
    if (this.state.sources.length > 0
      && this.state.locations.length > 0
      && this.state.activities.length > 0
    ) {
      activities = activities.map(activity => {
        const source = this.state.sources.find(el => el.id === activity.sid);
        const location = this.state.locations.find(el => el.id === activity.lid);
        activity.lid = location ? location.name : 'NULL';
        activity.sid = source ? source.name : 'NULL';
        return activity;
      });
    }
    return (
      <div>
        <h1>Activities</h1>
        <div>
          <h3>Create Activity</h3>
          <form onSubmit={this.submit}>
            <div>
              <div><label htmlFor="name">Activity Name<span style={{ color: 'red' }}> *Required</span></label></div>
              <input
                type="text"
                id="name"
                onChange={(e) => {
                  const value = e.target.value;
                  const activity = this.state.activity;
                  activity.name = value;
                  this.setState({ activity });
                }}
                value={this.state.activity.name}
              ></input>
            </div>
            <div>
              <div><label htmlFor="date">Date activity was done<span style={{ color: 'red' }}> *Required</span></label></div>
              <input
                type="date"
                id="date"
                onChange={(e) => {
                  const value = e.target.value;
                  const activity = this.state.activity;
                  activity.date = value;
                  this.setState({ activity });
                }}
                value={this.state.activity.date}
              ></input>
            </div>
            <div>
              <div><label htmlFor="source">Source</label></div>
              <select
                id="source"
                onChange={(e) => {
                  const value = e.target.value;
                  const activity = this.state.activity;
                  activity.source = value;
                  this.setState({ activity });
                }}
                value={this.state.activity.source}
              >
                {this.state.sources.map((source, i) => (
                  <option key={i} value={source.id}>{source.name}</option>
                ))}
              </select>
            </div>
            <div>
              <div><label htmlFor="location">Location</label></div>
              <select
                id="location"
                onChange={(e) => {
                  const value = e.target.value;
                  const activity = this.state.activity;
                  activity.location = value;
                  this.setState({ activity });
                }}
                value={this.state.activity.location}
              >
                {this.state.locations.map((location, i) => (
                  <option key={i} value={location.id}>{location.name}</option>
                ))}
              </select>
            </div>
            <div>
              <div><label htmlFor="p1">What did you learn?</label></div>
              <textarea name="p1" id="p1" cols="30" rows="10"
                onChange={(e) => {
                  const value = e.target.value;
                  const activity = this.state.activity;
                  activity.p1 = value;
                  this.setState({ activity });
                }}
                value={this.state.activity.p1}
              ></textarea>
            </div>
            <div>
              <div><label htmlFor="p2">How can you apply this knowledge?</label></div>
              <textarea name="p2" id="p2" cols="30" rows="10"
                onChange={(e) => {
                  const value = e.target.value;
                  const activity = this.state.activity;
                  activity.p2 = value;
                  this.setState({ activity });
                }}
                value={this.state.activity.p2} 
              ></textarea>
            </div>
            <div>
              <div><label htmlFor="p3">What new topics would you like to study after experiencing this activity?</label></div>
              <textarea name="p3" id="p3" cols="30" rows="10"
                onChange={(e) => {
                  const value = e.target.value;
                  const activity = this.state.activity;
                  activity.p3 = value;
                  this.setState({ activity });
                }}
                value={this.state.activity.p3}
              ></textarea>
            </div>
            <input type="submit" />
          </form>
        </div>
        <div>
          <h3>Current Activities:</h3>
          <label htmlFor="filter">Filter By Location:</label>
          <select id="filter" value={this.state.filter}
            onChange={(e) => {
              this.setState({ filter: e.target.value });
              this.filter(e.target.value);
            }}>
            <option value={0}>ALL</option>
            {this.state.locations.map((location, i) => (
              <option key={i} value={location.id}>{location.name}</option>
            ))}
          </select>
          <Table
            headers={[
              { html: 'id', prop: 'id'},
              { html: 'Name', prop: 'name' },
              { html: 'Date', prop: 'date' },
              { html: 'Source', prop: 'sid' },
              { html: 'Location', prop: 'lid' },
              { html: 'Topics', prop: 'topics' },
            ]}
            data={activities}
            update={(id) => this.props.history.push('/update', { id })}
            delete={(id) => deleteActivity(id)
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

export default  withRouter(Activities);

