import axios from 'axios';
import { BASE_URL } from '~/constants/envs';

const api = axios.create({
  baseURL: BASE_URL,
});

export { api };
