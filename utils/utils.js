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
      method: 'GET',
    }).then((res) => res.json())

    console.log(response);
    return response?.userId;
}

export const getQueSize = async () => {
    const response = await fetch('/api/getqueposition', {
      method: 'GET',
    })

    if (!response.ok) {
      console.error('Failed to get queue size');
      return;
    }

    console.log(response);
    const data = await response.json();
    return data.queueSize;
}