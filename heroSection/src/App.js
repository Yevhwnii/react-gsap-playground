import React, { useEffect, useRef, useState } from 'react';
import { gsap, Power3 } from 'gsap';

import ArrowIcon from './assets/arrow-right.svg';
import GirlImage from './assets/girl.webp';
import BoyImage from './assets/boy.webp';
import 'reset-css';
import './App.scss';

function App() {
  const tl = gsap.timeline({ delay: 0.8 });
  const app = useRef(null);
  const images = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    const girlImage = images.current.firstElementChild;
    const boyImage = images.current.lastElementChild;

    const headline1 = content.current.children[0].children[0];
    const headline2 = headline1.nextSibling;
    const headline3 = headline2.nextSibling;
    const contentP = content.current.children[1];
    const contentButton = content.current.children[2];

    gsap.to(app.current, { duration: 0, css: { visibility: 'visible' } });

    // Images anims
    tl.from(
      girlImage,
      {
        duration: 1.2,
        y: 1280,
        ease: Power3.easeOut,
      },
      'Start'
    )
      .from(
        girlImage.firstElementChild,
        {
          duration: 2,
          scale: 1.6,
          ease: Power3.easeOut,
        },
        0.2
      )
      .from(
        boyImage,
        {
          duration: 1.2,
          y: 1280,
          ease: Power3.easeOut,
        },
        0.2
      )
      .from(
        boyImage.firstElementChild,
        {
          duration: 2,
          scale: 1.6,
          ease: Power3.easeOut,
        },
        0.2
      );

    // Content anims
    tl.staggerFrom(
      [headline1.children, headline2.children, headline3.children],
      1,
      {
        y: 44,
        ease: Power3.easeOut,
        delay: 0.8,
      },
      0.15,
      'Start'
    )
      .from(
        contentP,
        { duration: 1, y: 20, opacity: 0, ease: Power3.easeOut },
        1.4
      )
      .from(
        contentButton,
        { duration: 1, y: 20, opacity: 0, ease: Power3.easeOut },
        1.6
      );
  }, [tl]);
  return (
    <div ref={app} className='hero'>
      <div className='container'>
        <div className='hero-inner'>
          <div className='hero-content'>
            <div ref={content} className='hero-content-inner'>
              <h1>
                <div className='hero-content-line'>
                  <div className='hero-content-line-inner'>
                    Relieving the burden
                  </div>
                </div>
                <div className='hero-content-line'>
                  <div className='hero-content-line-inner'>
                    of disease caused
                  </div>
                </div>
                <div className='hero-content-line'>
                  <div className='hero-content-line-inner'>by behaviors.</div>
                </div>
              </h1>
              <p>
                Better treats serious cardiometabolic diseases to transform
                lives and reduce healthcare utilization through the use of
                digital therapeutics.
              </p>
              <div className='btn-row'>
                <button className='explore-button'>
                  Explore
                  <div className='arrow-icon'>
                    <img src={ArrowIcon} alt='arrow' />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className='hero-images'>
            <div ref={images} className='hero-images-inner'>
              <div className='hero-image girl'>
                <img src={GirlImage} alt='girl' />
              </div>
              <div className='hero-image boy'>
                <img src={BoyImage} alt='boy' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
