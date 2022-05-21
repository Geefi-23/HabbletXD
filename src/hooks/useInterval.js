import { useEffect, useRef } from 'react';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  //remembers the last callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback])

  //set up the interval
  useEffect(() => {
    if (delay !== null){
      const id = setInterval(() => {
        savedCallback.current();
      }, delay);

      return () => {
        clearInterval(id);
      };
    }
  }, [callback, delay]);
};

export default useInterval;