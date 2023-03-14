import Task from '../interfaces/Task';
import Config from '../interfaces/Config';

interface Creation {
  _id: string;
  key: string;
  task: Task;
  config: Config;
  user: string;
  createdAt: string;
  address: string;
  uri: string;
  timestamp: string;
  prompt: string;
  status: string;
  thumbnail: string;
}

export default Creation;
