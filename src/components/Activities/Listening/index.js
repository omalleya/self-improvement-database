import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Table from '../../Table';
import { getActivities, getListeningActivities, insertListeningActivity, deleteListeningActivity } from '../../../utils/apiCalls';

class Listening extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: [],
      activityDropdown: [],
      baseActivity: null,
      link: '',
      interest: '',
    }
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    getActivities()
      .then(activityDropdown => {
        this.setState({ activityDropdown });
      });

    // get activities
    getListeningActivities()
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
      link: this.state.link,
      interest: this.state.interest,
    };
    insertListeningActivity(activity)
      .then(res => {
        console.log(res);
        window.location.reload();
      });
  }

  render() {
    return (
      <div>
        <h1>Listening Activities</h1>
        <div>
          <h3>Create Listening Activity</h3>
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
              <label htmlFor="link">Link</label>
              <input type="text" id="link"
                onChange={(e) => this.setState({ link: e.target.value })}
                value={this.state.link}
              />
            </div>
            <div>
              <label htmlFor="interest">Interest</label>
              <input type="number" id="interest"
                onChange={(e) => this.setState({ interest: e.target.value })}
                value={this.state.interest}
              />
            </div>
            <input type="submit" />
          </form>
        </div>
        <div>
          <h3>Current Listening Activities:</h3>
          <Table
            headers={[
              { html: 'id', prop: 'id'},
              { html: 'Name', prop: 'name' },
              { html: 'Link', prop: 'link' },
              { html: 'Interest', prop: 'interest' },
            ]}
            data={this.state.activities}
            delete={(id) => deleteListeningActivity(id)
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

export default Listening;

