const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');

const app = express();
const port = 14925;

var connection = mysql.createConnection({
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_omalleya',
    password: '6922',
    database: 'cs340_omalleya',
});

connection.connect();

app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({
  extended: true
})); 

//this is to get routing to work correctly on refresh
app.get('/*', function(req, res, next) {
  if (req.url.includes('api')) {
    next();
  } else {
    res.sendFile(path.join(__dirname, 'dist/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    });
  }
});

/* SELECTS */

// endpoint for getting everything related to activities
app.get('/api/activity/:id', function(req, res) {
  connection.query(`SELECT * FROM activities where id=${req.param('id')};`, function(err, result) {
    res.json(result);
  });
});

// endpoint for getting everything related to activities
app.get('/api/activities', function(req, res) {
  connection.query('SELECT * FROM activities;', function(err, result) {
    res.json(result);
  });
});

// endpoint for getting activities filtered by location
app.get('/api/activities/:id', function(req, res) {
  connection.query(`select * from activities where lid=${req.param('id')};`, function(err, result) {
    res.json(result);
  });
});

// endpoint for getting everything related to topics activities relationship
app.get('/api/topicsactivities', function(req, res) {
  connection.query('select * from topics_activities_relation;', function(err, result) {
    res.json(result);
  });
});

// endpoint for getting everything related to topics activities relationship
app.get('/api/topicsactivities/:id', function(req, res) {
  connection.query(`select * from topics_activities_relation where aid=${req.param('id')};`, function(err, result) {
    res.json(result);
  });
});

// endpoint for getting activities and their ids
app.get('/api/activitiesDropdown', function(req, res) {
  connection.query('select id, name from activities;', function(err, result) {
    res.json(result);
  });
});

// endpoint for getting necessities for sources dropdown
app.get('/api/sourcesDropdown', function(req, res) {
  connection.query('select id, name from sources;', function(err, result) {
    res.json(result);
  });
});

// endpoint for getting necessities for locations dropdown
app.get('/api/locationsDropdown', function(req, res) {
  connection.query('select id, name from locations;', function(err, result) {
    res.json(result);
  });
});

// endpoint for getting necessities for topics dropdown
app.get('/api/topicsDropdown', function(req, res) {
  connection.query('select id, name from topics;', function(err, result) {
    res.json(result);
  });
});

// endpoint for getting everything related to reading activities including the normal activity fields
app.get('/api/reading', function(req, res) {
  connection.query('SELECT reading.id, reading.aid, activities.name, activities.date, activities.sid, activities.lid, reading.beginning_page, reading.ending_page FROM reading INNER JOIN activities ON activities.id=reading.aid;', function(err, result) {
    res.json(result);
  });
});

// endpoint for getting everything related to reading activities including the normal activity fields
app.get('/api/acting', function(req, res) {
  connection.query('SELECT acting.id, acting.aid, activities.name, acting.exertion, acting.time, activities.date, activities.sid, activities.lid FROM acting INNER JOIN activities ON activities.id=acting.aid;', function(err, result) {
    res.json(result);
  });
});

// endpoint for getting everything related to reading activities including the normal activity fields
app.get('/api/listening', function(req, res) {
  connection.query('SELECT listening.id, listening.aid, activities.name, listening.link, listening.interest, activities.date, activities.sid, activities.lid FROM listening INNER JOIN activities ON activities.id=listening.aid;', function(err, result) {
    res.json(result);
  });
});

// endpoint for getting everything related to reading activities including the normal activity fields
app.get('/api/speaking', function(req, res) {
  connection.query('SELECT speaking.id, speaking.aid, activities.name, activities.date, activities.lid, activities.sid, speaking.comfort FROM speaking INNER JOIN activities ON activities.id=speaking.aid;', function(err, result) {
    res.json(result);
  });
});

app.get('/api/topicNames/:id', function(req, res) {
  connection.query(`SELECT topics.name FROM topics_activities_relation join topics on topics.id=topics_activities_relation.tid WHERE topics_activities_relation.aid=${req.param('id')};`, function(err, result) {
    res.json(result);
  });
});

/* DELETES */

// endpoint for deleting activities
app.get('/api/deleteActivity/:id', function(req, res) {
  connection.query(`DELETE FROM activities WHERE id=${req.param('id')};`, function(err, result) {
    res.json(result);
  });
});

app.get('/api/deleteSource/:id', function(req, res) {
  connection.query(`DELETE FROM sources WHERE id=${req.param('id')};`, function(err, result) {
    res.json(result);
  });
});

app.get('/api/deleteLocation/:id', function(req, res) {
  connection.query(`DELETE FROM locations WHERE id=${req.param('id')};`, function(err, result) {
    res.json(result);
  });
});

app.get('/api/deleteTopic/:id', function(req, res) {
  connection.query(`DELETE FROM topics WHERE id=${req.param('id')};`, function(err, result) {
    res.json(result);
  });
});

app.get('/api/deleteActingActivity/:id', function(req, res) {
  connection.query(`DELETE FROM acting WHERE id=${req.param('id')};`, function(err, result) {
    res.json(result);
  });
});

app.get('/api/deleteListeningActivity/:id', function(req, res) {
  connection.query(`DELETE FROM listening WHERE id=${req.param('id')};`, function(err, result) {
    res.json(result);
  });
});

app.get('/api/deleteReadingActivity/:id', function(req, res) {
  connection.query(`DELETE FROM reading WHERE id=${req.param('id')};`, function(err, result) {
    res.json(result);
  });
});

app.get('/api/deleteSpeakingActivity/:id', function(req, res) {
  connection.query(`DELETE FROM speaking WHERE id=${req.param('id')};`, function(err, result) {
    res.json(result);
  });
});

app.get('/api/deleteTopicActivity/:id', function(req, res) {
  const tid = req.param('id').split('-')[0];
  const aid = req.param('id').split('-')[1];
  connection.query(`Delete from topics_activities_relation where aid=${aid} AND tid=${tid};`, function(err, result) {
    res.json(result);
  });
});

/* INSERTS */

app.post('/api/insertLocation', function(req, res) {
  const location = req.body;
  connection.query(`insert into locations (name) values ("${location.name}");`, function(err, result) {
    res.json(result);
  });
});

app.post('/api/insertTopic', function(req, res) {
  const topic = req.body;
  connection.query(`insert into topics (name) values ("${topic.name}");`, function(err, result) {
    res.json(result);
  });
});

app.post('/api/insertSource', function(req, res) {
  const source = req.body;
  connection.query(`insert into sources (name) values ("${source.name}");`, function(err, result) {
    res.json(result);
  });
});

app.post('/api/insertActivity', function(req, res) {
  const activity = req.body;
  connection.query(`insert into activities (name, date, sid, lid, p1, p2, p3) values ("${activity.name}", "${activity.date}", ${activity.sid}, ${activity.lid}, "${activity.p1}", "${activity.p2}", "${activity.p3}");`, function (err, result) {
    res.json(result);
  });
});

app.post('/api/insertTopicActivity', function(req, res) {
  connection.query(`insert into topics_activities_relation (aid, tid) values (${req.body.aid}, ${req.body.tid});`, function (err, result) {
    res.json(result); 
  });
});

app.post('/api/insertReadingActivity', function(req, res) {
  connection.query(`insert into reading (aid, beginning_page, ending_page) values (${req.body.aid}, ${req.body.beginning_page}, ${req.body.ending_page});`, function (err, result) {
    res.json(result);
  });
});

app.post('/api/insertActingActivity', function(req, res) {
  connection.query(`insert into acting (aid, exertion, time) values (${req.body.aid}, ${req.body.exertion}, ${req.body.time});`, function (err, result) {
    res.json(result);
  });
});

app.post('/api/insertListeningActivity', function(req, res) {
  connection.query(`insert into listening (aid, link, interest) values (${req.body.aid}, "${req.body.link}", ${req.body.interest});`, function (err, result) {
    res.json(result);
  });
});

app.post('/api/insertSpeakingActivity', function(req, res) {
  connection.query(`insert into speaking (aid, comfort) values (${req.body.aid}, ${req.body.comfort});`, function (err, result) {
    res.json(result);
  });
});

/* UPDATES */

app.post('/api/updateTopicActivity', function(req, res) {
  connection.query(`UPDATE topics_activities_relation SET tid=${req.body.tid}, aid=${req.body.aid} WHERE aid=${req.body.oldAid} AND tid=${req.body.oldTid};`, function (err, result) {
    res.json(result);
  });
});

app.post('/api/updateActivity', function(req, res) {
  connection.query(`update activities set name="${req.body.name}", date="${req.body.date}", sid=${req.body.sid}, lid=${req.body.lid}, p1="${req.body.p1}", p2="${req.body.p2}", p3="${req.body.p3}" where id=${req.body.id};`, function (err, result) {
    res.json(result);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
