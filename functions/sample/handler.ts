import { Handler } from 'aws-lambda';
import axios from 'axios';

// Parameters the lambda function receives(you can pass these parameters when you invoke the function)
type Event = {
  key1: string;
};

export const handler: Handler = async (event, context) => {
  console.log('value1 =', event.key1);
  const users = await axios.get('https://jsonplaceholder.typicode.com/users');
  console.log(users.data);
  return { key1: event.key1 };
};
