import React, { Component } from 'react';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import 'react-select/dist/react-select.css';
import { getActivity, updateActivity, getLocations, getSources } from '../../../utils/apiCalls';

class UpdateActivity extends Component {
  constructor(props) {
    super(props);

    console.log(props.location.state.id);

    this.state = {
      sources: [],
      locations: [],
      activity: {
        name: '',
        date: '',
        source: '',
        location: '',
        p1: '',
        p2: '',
        p3: '',
      },
    }
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    getActivity(this.props.location.state.id)
      .then(array => {
        const activity = array[0];
        activity.date = activity.date.slice(0, 10);
        console.log(activity);
        this.setState({ activity });
      });

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
  }

  submit(e) {
    e.preventDefault();
    const activity = this.state.activity;
    updateActivity(activity)
      .then(res => {
        console.log(res);
        window.location.reload();
      });
  }

  render() {
    return (
      <div>
        <h1>Activities</h1>
        <div>
          <h3>Update Activity</h3>
          <form onSubmit={this.submit}>
            <div>
              <div><label htmlFor="name">Activity Name</label></div>
              <input
                type="text"
                id="name"
                onChange={(e) => {
                  const activity = this.state.activity;
                  activity.name = e.target.value;
                  this.setState({ activity });
                }}
                value={this.state.activity.name}
              ></input>
            </div>
            <div>
              <div><label htmlFor="date">Date activity was done</label></div>
              <input
                type="date"
                id="date"
                onChange={(e) => {
                  const activity = this.state.activity;
                  activity.date = e.target.value;
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
                  const activity = this.state.activity;
                  activity.sid = e.target.value;
                  this.setState({ activity });
                }}
                value={this.state.activity.sid}
              >
                <option value="NULL">NULL</option>
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
                  const activity = this.state.activity;
                  activity.lid = e.target.value;
                  this.setState({ activity });
                }}
                value={this.state.activity.lid}
              >
                <option value="NULL">NULL</option>
                {this.state.locations.map((location, i) => (
                  <option key={i} value={location.id}>{location.name}</option>
                ))}
              </select>
            </div>
            <div>
              <div><label htmlFor="p1">What did you learn?</label></div>
              <textarea name="p1" id="p1" cols="30" rows="10"
                onChange={(e) => {
                  const activity = this.state.activity;
                  activity.p1 = e.target.value;
                  this.setState({ activity });
                }} 
                value={this.state.activity.p1}></textarea>
            </div>
            <div>
              <div><label htmlFor="p2">How can you apply this knowledge?</label></div>
              <textarea name="p2" id="p2" cols="30" rows="10"
                onChange={(e) => {
                  const activity = this.state.activity;
                  activity.p2 = e.target.value;
                  this.setState({ activity });
                }}
                value={this.state.activity.p2}></textarea>
            </div>
            <div>
              <div><label htmlFor="p3">What new topics would you like to study after experiencing this activity?</label></div>
              <textarea name="p3" id="p3" cols="30" rows="10"
                onChange={(e) => {
                  const activity = this.state.activity;
                  activity.p3 = e.target.value;
                  this.setState({ activity });
                }}
                value={this.state.activity.p3}></textarea>
            </div>
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(UpdateActivity);

