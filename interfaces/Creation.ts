import Task from '../interfaces/Task';

interface Creation {
  _id: string;
  key: string;
  user: string;
  createdAt: string;
  task: Task;
  address: string;
  uri: string;
  timestamp: string;
  prompt: string;
  status: string;
  generator: string;
  width: number;
  height: number;
}

export default Creation;
