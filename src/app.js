import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Home from './components/Home';
import Sources from './components/Sources';
import Locations from './components/Locations';
import Topics from './components/Topics';
import Activities from './components/Activities';
import ActingActivities from './components/Activities/Acting';
import ListeningActivities from './components/Activities/Listening';
import ReadingActivities from './components/Activities/Reading';
import SpeakingActivities from './components/Activities/Speaking';
import UpdateActivity from './components/Activities/Update';
import TopicsActivities from './components/Activities/Topics';
import ChangeTopicsActivities from './components/Activities/Topics/Change';
import configureStore from './configureReduxStore';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/sources">Sources</Link></li>
          <li><Link to="/locations">Locations</Link></li>
          <li><Link to="/topics">Topics</Link></li>
          <li><Link to="/activities">Activities</Link></li>
          <li><Link to="/topicsactivities">Topics Activities Relations</Link></li>
          <li><Link to="/acting">Acting Activities</Link></li>
          <li><Link to="/listening">Listening Activities</Link></li>
          <li><Link to="/reading">Reading Activities</Link></li>
          <li><Link to="/speaking">Speaking Activities</Link></li>
        </ul>
        <Route exact path="/" component={Home} />
        <Route path="/sources" component={Sources} />
        <Route path="/locations" component={Locations} />
        <Route path="/topics" component={Topics} />
        <Route path="/activities" component={Activities} />
        <Route path="/acting" component={ActingActivities} />
        <Route path="/listening" component={ListeningActivities} />
        <Route path="/reading" component={ReadingActivities} />
        <Route path="/speaking" component={SpeakingActivities} />
        <Route path="/update" component={UpdateActivity} />
        <Route path="/topicsactivities" component={TopicsActivities} />
        <Route path="/topicactivitychange" component={ChangeTopicsActivities} />
      </div>
    </Router>
  </ Provider>
);

ReactDOM.render(<App/>, document.getElementById('root'));
