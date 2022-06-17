import { useEffect, useRef } from 'react';
import api from '../static/js/api';

const useServerApi = (request, action, queryParams, callback) => {
  useEffect(() => {
    api[request](action, queryParams, {credentials: 'include'})
    .then(callback);
  }, []);
};

export default useServerApi;