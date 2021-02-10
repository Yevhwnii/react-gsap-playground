import React, { useRef, useEffect, useState } from 'react';
import './App.css';

import { TweenMax, Power3 } from 'gsap';

function App() {
  let app = useRef(null);
  let circleY = useRef(null);
  let circleR = useRef(null);
  let circleB = useRef(null);

  const [circleClicked, setCircleClicked] = useState(false);

  useEffect(() => {
    TweenMax.to(app.current, 0, { css: { visibility: 'visible' } });
    TweenMax.staggerFrom(
      [circleY.current, circleR.current, circleB.current],
      0.8,
      {
        opacity: 0,
        x: 40,
        ease: Power3.easeOut,
      },
      0.2
    );
  }, []);

  const handleExpand = () => {
    if (!circleClicked) {
      TweenMax.to(circleR.current, 0.8, {
        width: 200,
        height: 200,
        ease: Power3.easeOut,
      });
      setCircleClicked(true);
    } else {
      TweenMax.to(circleR.current, 0.8, {
        width: 75,
        height: 75,
        ease: Power3.easeOut,
      });
      setCircleClicked(false);
    }
  };

  return (
    <div ref={app} className='App'>
      <header className='App-header'>
        <div className='circle-container'>
          <div ref={circleY} className='circle'></div>
          <div
            ref={circleR}
            onClick={handleExpand}
            className='circle red'></div>
          <div ref={circleB} className='circle blue'></div>
        </div>
      </header>
    </div>
  );
}

export default App;
