import axios from 'axios';

const ToDoItemsClient = axios.create({
  baseURL: process.env.REACT_APP_TODO_ITEMS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default ToDoItemsClient;