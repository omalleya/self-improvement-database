import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Table from '../../Table';
import { getSpeakingActivities, getActivities, deleteSpeakingActivity, insertSpeakingActivity } from '../../../utils/apiCalls';

class Speaking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: [],
      activityDropdown: [],
      baseActivity: null,
      comfort: '',
    }
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    getActivities()
      .then(activityDropdown => {
        this.setState({ activityDropdown });
      });

    // get activities
    getSpeakingActivities()
      .then(activities => {
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
      comfort: this.state.comfort,
    };
    insertSpeakingActivity(activity)
      .then(res => {
        console.log(res);
        window.location.reload();
      });
  }

  render() {
    return (
      <div>
        <h1>Speaking Activities</h1>
        <div>
          <h3>Create Speaking Activity</h3>
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
              <label htmlFor="comfort">Comfort</label>
              <input type="number" id="comfort"
                onChange={(e) => this.setState({ comfort: e.target.value })}
                value={this.state.comfort}
              />
            </div>
            <input type="submit" />
          </form>
        </div>
        <div>
          <h3>Current Speaking Activities:</h3>
          <Table
            headers={[
              { html: 'id', prop: 'id'},
              { html: 'Name', prop: 'name' },
              { html: 'Comfort', prop: 'comfort' },
            ]}
            data={this.state.activities}
            delete={(id) => deleteSpeakingActivity(id)
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

export default Speaking;

