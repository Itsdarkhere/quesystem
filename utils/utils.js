import { v4 as uuidv4 } from 'uuid';

export const addToQue = async () => {
    const response = await fetch('/api/addtoque', {
      method: 'POST',
      body: JSON.stringify({ userId: uuidv4() }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())

    console.log(response);
}

export const popFromQue = async () => {
    const response = await fetch('/api/popfromque', {
      method: 'GET',
    }).then((res) => res.json())

    console.log(response);
}

export const getQueSize = async () => {
    const response = await fetch('/api/getqueposition', {
      method: 'GET',
    })

    if (!response.ok) {
      console.error('Failed to get queue size');
      return;
    }

    const data = await response.json();
    return data.queueSize;
}