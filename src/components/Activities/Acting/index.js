import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Table from '../../Table';
import { getActivities, getActingActivities, deleteActingActivity, insertActingActivity } from '../../../utils/apiCalls';

class Acting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: [],
      activityDropdown: [],
      baseActivity: null,
      time: '',
      exertion: '',
    }
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    getActivities()
      .then(activityDropdown => {
        this.setState({ activityDropdown });
      });

    // get activities
    getActingActivities()
      .then(activities => {
        console.log(activities);
        this.setState({ activities });
      });
  }

  submit(e) {
    e.preventDefault();
    if (this.state.baseActivity === null) {
      return;
    }
    const activity = {
      aid: this.state.baseActivity,
      time: this.state.time,
      exertion: this.state.exertion,
    };
    insertActingActivity(activity)
      .then(res => {
        console.log(res);
        window.location.reload();
      });
  }

  render() {
    return (
      <div>
        <h1>Acting Activities</h1>
        <div>
          <h3>Create Acting Activity</h3>
          <form onSubmit={this.submit}>
            <div>
              <label htmlFor="baseActivity">Base Activity<span style={{ color: 'red' }}> *Required</span></label>
              <select
                id="baseActivity"
                onChange={(e) => this.setState({ baseActivity: e.target.value })}
                value={this.state.baseActivity}
              >
                <option value={null}></option>
                {
                  this.state.activityDropdown.map((el, i) => <option key={i} value={el.id}>{el.name}</option>)
                }
              </select>
            </div>
            <div>
              <label htmlFor="exertion">Exertion</label>
              <input type="number" id="exertion"
                onChange={(e) => this.setState({ exertion: e.target.value })}
                value={this.state.exertion}
              />
            </div>
            <div>
              <label htmlFor="time">Time (minutes)</label>
              <input type="number" id="time"
                onChange={(e) => this.setState({ time: e.target.value })}
                value={this.state.time}
              />
            </div>
            <input type="submit" />
          </form>
        </div>
        <div>
          <h3>Current Acting Activities:</h3>
          <Table
            headers={[
              { html: 'id', prop: 'id'},
              { html: 'Name', prop: 'name' },
              { html: 'Exertion', prop: 'exertion' },
              { html: 'Time (minutes)', prop: 'time' },
            ]}
            data={this.state.activities}
            delete={(id) => deleteActingActivity(id)
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

export default Acting;

