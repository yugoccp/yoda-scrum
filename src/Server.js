import axios from 'axios';

const apiServer = '';

export function getPadawans() {
  return axios.get(apiServer+'/padawan')
            .then((res) => res.data)
            .catch((err) => console.log(err));
}

export function getMeetings() {
  return axios.get(apiServer+'/meeting')
            .then((res) => res.data)
            .catch((err) => console.log(err));
}

export function saveMeeting(meeting) {
  return axios.post(apiServer+'/meeting', { meeting })
            .then((res) => res.status === 200)
            .catch((err) => console.log(err));
}
