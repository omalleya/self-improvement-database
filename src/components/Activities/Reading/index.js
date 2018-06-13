import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Table from '../../Table';
import { deleteReadingActivity, insertReadingActivity, getActivities, getReadingActivities } from '../../../utils/apiCalls';

class Reading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      activityDropdown: [],
      baseActivity: null,
      beginningPage: '',
      endingPage: '',
    }
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    getActivities()
      .then(activityDropdown => {
        this.setState({ activityDropdown });
      });

    getReadingActivities()
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
      beginning_page: this.state.beginningPage,
      ending_page: this.state.endingPage,
    };
    insertReadingActivity(activity)
      .then(res => {
        console.log(res);
        window.location.reload();
      });
  }

  render() {
    return (
      <div>
        <h1>Reading Activities</h1>
        <div>
          <h3>Create Reading Activity</h3>
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
              <label htmlFor="beginningPage">Beginning Page</label>
              <input type="number" id="beginningPage"
                onChange={(e) => this.setState({ beginningPage: e.target.value })}
                value={this.state.beginningPage}
              />
            </div>
            <div>
              <label htmlFor="endingPage">Ending Page</label>
              <input type="number" id="endingPage"
                onChange={(e) => this.setState({ endingPage: e.target.value })}
                value={this.state.endingPage}
              />
            </div>
            <input type="submit" />
          </form>
        </div>
        <div>
          <h3>Current Reading Activities:</h3>
          <Table
            headers={[
              { html: 'id', prop: 'id'},
              { html: 'Name', prop: 'name' },
              { html: 'Beginning Page', prop: 'beginning_page' },
              { html: 'Ending Page', prop: 'ending_page' },
            ]}
            data={this.state.activities}
            delete={(id) => deleteReadingActivity(id)
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

export default Reading;

