import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import StatsView from './StatsView';

jest.mock('axios');
import axios from 'axios';

test('Render StatsView', () => {
  const meetings = { data: [
    {
      "padawansData": [
        {
          "username": "yugo",
          "timeInSec": 30,
          "_id":"5a9d290c7d5ae53752f9d61e"
        }
      ],
      "date": "2018-03-05T11:25:00.394Z",
      "_id":"5a9d290c7d5ae53752f9d61f",
      "timeout": 2,
      "timeInSec": 30,
      "__v":0
    }
  ]};

  const padawans = { data: [
      {
        "_id":"5a9be71049f4f7374e04c2f2",
        "name": "Yugo Sakamoto",
        "username": "yugo"
      }
  ]};

  axios.get.mockImplementation(url => {
    if(url.endsWith('/meeting')) {
      console.log('GET meeting');
      return new Promise((resolve, reject) => {
        resolve(meetings);
      });
    }
    else if(url.endsWith('/padawan')) {
      console.log('GET padawan');
      return new Promise((resolve, reject) => {
        resolve(padawans);
      });
    }
    return new Promise();
  });
  
  const div = document.createElement('div');
  ReactDOM.render(<StatsView />, div);
})
