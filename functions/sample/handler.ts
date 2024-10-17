import { Handler } from 'aws-lambda';

// Parameters the lambda function receives(you can pass these parameters when you invoke the function)
type Event = {
  key1: string;
};

export const handler: Handler = async (event, context) => {
  console.log('value1 =', event.key1);
  return { key1: event.key1 };
};
