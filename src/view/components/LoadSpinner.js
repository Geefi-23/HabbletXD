import { forwardRef, useState } from 'react';

import '../../static/css/loadSpinner.css';

const LoadSpinner = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  
  ref.current = {
    startSpin: () => {
      setShow(true);
    },
    stopSpin: () => {
      setShow(false);
    }
  };

  return (
    <div className={`spinner ${show ? 'visible' : 'invisible'}`}>
      <div className="track"></div>
    </div>
  );
});

export default LoadSpinner;