import { v4 as uuidv4 } from 'uuid';

export const addToQue = async () => {
    const userId = uuidv4();
    const response = await fetch('/api/addtoque', {
      method: 'POST',
      body: JSON.stringify({ userId: userId }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())

    console.log(response);
    return userId;
}

export const popFromQue = async () => {
    const response = await fetch('/api/popfromque', {
      method: 'POST',
       body: JSON.stringify({ msg: 'ok' }),
       headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())

    console.log(response);
    return response?.userId;
}

export const getQueSize = async () => {
    const response = await fetch('/api/getqueposition', {
      method: 'POST',
      body: JSON.stringify({ msg: 'ok' }),
       headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      console.error('Failed to get queue size');
      return;
    }

    const data = await response.json();
    console.log(data);
    return data.queueSize;
}