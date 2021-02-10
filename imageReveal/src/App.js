import React, { useRef, useEffect } from 'react';
import './App.scss';
import People from './assets/image.webp';

// CSS plugin allows to access any CSS pseudo elements
import CssRulePlugin from 'gsap/CSSRulePlugin';
import { Power2, gsap, CSSPlugin } from 'gsap';
gsap.registerPlugin(CssRulePlugin, CSSPlugin);

function App() {
  let container = useRef(null);
  let img = useRef(null);
  let imageReveal = CssRulePlugin.getRule('.img-container:after');

  const tl = gsap.timeline({ repeat: 0 });

  useEffect(() => {
    tl.to(container.current, {
      duration: 0,
      css: { visibility: 'visible' },
    })
      .to(imageReveal, { duration: 1.4, width: '0%', ease: Power2.easeInOut })
      .from(img.current, {
        duration: 1.4,
        scale: 1.6,
        ease: Power2.easeInOut,
        delay: -1.6,
      });
  }, [tl, imageReveal]);

  return (
    <section className='main'>
      <div ref={container} className='container'>
        <>
          <div className='img-container'>
            <img ref={img} alt='People' src={People} />
          </div>
        </>
      </div>
    </section>
  );
}

export default App;
