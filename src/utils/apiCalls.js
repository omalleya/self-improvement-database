const apiGet = (path) =>
  fetch(path)
    .then(res => res.json())
    .catch(err => err);

export const getSources = () =>
  apiGet('/api/sourcesDropdown');

export const deleteSource = (id) =>
  apiGet(`/api/deleteSource/${id}`);
  
export const getLocations = () =>
  apiGet('/api/locationsDropdown');

export const deleteLocation = (id) =>
  apiGet(`/api/deleteLocation/${id}`);
  
export const getTopics = () =>
  apiGet('/api/topicsDropdown');

export const deleteTopic = (id) =>
  apiGet(`/api/deleteTopic/${id}`);

export const getActivities = () =>
  apiGet('/api/activities');

export const getActivitiesLid = (lid) =>
  apiGet(`/api/activities/${lid}`);

export const getTopicNames = (aid) =>
  apiGet(`/api/topicNames/${aid}`);

export const getActivity = (id) =>
  apiGet(`/api/activity/${id}`);

export const deleteActivity = (id) =>
  apiGet(`/api/deleteActivity/${id}`);

export const getActingActivities = () =>
  apiGet('/api/acting');

export const deleteActingActivity = (id) =>
  apiGet(`/api/deleteActingActivity/${id}`);

export const getListeningActivities = () =>
  apiGet('/api/listening');

export const deleteListeningActivity = (id) =>
  apiGet(`/api/deleteListeningActivity/${id}`);

export const getReadingActivities = () =>
  apiGet('/api/reading');

export const deleteReadingActivity = (id) =>
  apiGet(`/api/deleteReadingActivity/${id}`);

export const getSpeakingActivities = () =>
  apiGet('/api/speaking');

export const deleteSpeakingActivity = (id) =>
  apiGet(`/api/deleteSpeakingActivity/${id}`);

export const getTopicsActivitiesRelations = () =>
  apiGet('/api/topicsactivities');

export const deleteTopicActivity = (id) =>
  apiGet(`/api/deleteTopicActivity/${id}`);

const apiPost = (url, data) => {
  console.log(url, data);
  return fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const insertLocation = (data) =>
  apiPost('/api/insertLocation', data);

export const insertTopic = (data) =>
  apiPost('/api/insertTopic', data);

export const insertSource = (data) =>
  apiPost('/api/insertSource', data);

export const insertActivity = (data) =>
  apiPost('/api/insertActivity', data);

export const insertTopicActivity = (data) =>
  apiPost('/api/insertTopicActivity', data);

export const insertActingActivity = (data) =>
  apiPost('/api/insertActingActivity', data);

export const insertListeningActivity = (data) =>
  apiPost('/api/insertListeningActivity', data);

export const insertSpeakingActivity = (data) =>
  apiPost('/api/insertSpeakingActivity', data);

export const insertReadingActivity = (data) =>
  apiPost('/api/insertReadingActivity', data);

export const updateActivity = (data) =>
  apiPost('/api/updateActivity', data);

export const updateTopicActivity = (data) =>
  apiPost('/api/updateTopicActivity', data);

