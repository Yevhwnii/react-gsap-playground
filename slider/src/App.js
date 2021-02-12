import React, { useEffect, useRef, useState } from 'react';
import { gsap, Power3 } from 'gsap';

import leftArrow from './assets/arrow-left.svg';
import rightArrow from './assets/arrow-right.svg';

import 'reset-css';
import './App.scss';

const testimonials = [
  {
    name: 'Julia Cameron',
    title: 'Creative Director, VISA',
    image: require('./assets/image3.jpg').default,
    quote:
      "It's all good. I was amazed at the quality of the Design. We've seen amazing results already.",
  },
  {
    name: 'Mark Jacobs',
    title: 'Tech Lead, Google',
    image: require('./assets/image.jpg').default,
    quote:
      'The rebranding has really helped our business. Definitely worth the investment.',
  },
  {
    name: 'Lisa Bearings',
    title: 'Brand Coordinator, Facebook',
    image: require('./assets/image2.jpg').default,
    quote:
      'The service was excellent. Absolutely wonderful! A complete redesign did it for us.',
  },
];

function App() {
  const imageList = useRef(null);
  const testomonialsList = useRef(null);

  const [state, setState] = useState({
    isActive1: true,
    isActive2: false,
    isActive3: false,
  });

  useEffect(() => {
    gsap.to(testomonialsList.current.children[0], {
      duration: 0,
      opacity: 1,
    });
  }, []);

  const imageWidth = 340;

  const slideLeft = (index, duration, multiplied = 1, delay = 0) => {
    gsap.to(imageList.current.children[index], {
      duration: duration,
      x: -imageWidth * multiplied,
      delay: delay,
      ease: Power3.easeOut,
    });
  };
  const slideRight = (index, duration, multiplied = 1, delay = 0) => {
    gsap.to(imageList.current.children[index], {
      duration: duration,
      x: imageWidth * multiplied,
      delay: delay,
      ease: Power3.easeOut,
    });
  };
  const scale = (index, duration) => {
    gsap.from(imageList.current.children[index], {
      delay: 0.2,
      duration: duration,
      scale: 1.2,
      ease: Power3.easeOut,
    });
  };

  const fadeOut = (index, duration) => {
    gsap.to(testomonialsList.current.children[index], {
      duration: duration,
      opacity: 0,
    });
  };
  const fadeIn = (index, duration) => {
    gsap.to(testomonialsList.current.children[index], {
      duration: duration,
      opacity: 1,
    });
  };
  const nextSlide = () => {
    if (state.isActive1) {
      setState({
        ...state,
        isActive1: false,
        isActive2: true,
      });

      //Image transition
      slideLeft(0, 1);
      slideLeft(1, 1);
      scale(1, 1);
      slideLeft(2, 1);
      slideLeft(2, 0);
      fadeOut(0, 1);
      fadeIn(1, 1);
    } else if (state.isActive2) {
      setState({ ...state, isActive2: false, isActive3: true });
      //Image transition
      slideRight(0, 1);
      slideLeft(1, 1, 2);
      slideLeft(2, 1, 2);
      scale(2, 1);
      //content transition
      fadeOut(1, 1);
      fadeIn(2, 1);
    } else if (state.isActive3) {
      setState({ ...state, isActive3: false, isActive1: true });
      //Image transition
      slideLeft(2, 1, 3);
      slideLeft(0, 1, 0);
      slideLeft(1, 0, 0);
      scale(0, 1);
      //content transition
      fadeOut(2, 1);
      fadeIn(0, 1);
    }
  };
  const prevSlide = () => {
    if (state.isActive1) {
      setState({
        ...state,
        isActive1: false,
        isActive3: true,
      });

      //Image transition
      slideLeft(2, 0, 3);
      slideLeft(2, 1, 2);
      scale(2, 1);
      slideRight(0, 1);
      slideRight(1, 1);
      //content transtion
      fadeOut(0, 1);
      fadeIn(2, 1);
    } else if (state.isActive2) {
      setState({ ...state, isActive2: false, isActive1: true });

      //Image transition
      slideLeft(0, 0);
      slideRight(0, 1, 0);
      slideRight(1, 1, 0);
      slideRight(2, 1, 2);
      scale(0, 1);
      //content transtion
      fadeOut(1, 1);
      fadeIn(0, 1);
    } else if (state.isActive3) {
      setState({ ...state, isActive3: false, isActive2: true });

      slideLeft(2, 1);
      slideLeft(1, 0, 2);
      slideLeft(1, 1);
      scale(1, 1);
      //content transtion
      fadeOut(2, 1);
      fadeIn(1, 1);
    }
  };

  return (
    <div className='testimonial-section'>
      <div className='testimonial-container'>
        <div onClick={prevSlide} className='arrows left'>
          <span>
            <img src={leftArrow} alt='left arrow' />
          </span>
        </div>
        <div className='inner'>
          <div className='t-image'>
            <ul ref={imageList}>
              <li className={state.isActive1 ? 'active' : ''}>
                <img src={testimonials[0].image} alt={testimonials[0].name} />
              </li>
              <li className={state.isActive2 ? 'active' : ''}>
                <img src={testimonials[1].image} alt={testimonials[1].name} />
              </li>
              <li className={state.isActive3 ? 'active' : ''}>
                <img src={testimonials[2].image} alt={testimonials[2].name} />
              </li>
            </ul>
          </div>
          <div className='t-content'>
            <ul ref={testomonialsList}>
              <li className={state.isActive1 ? 'active' : ''}>
                <div className='content-inner'>
                  <p className='quote'>{testimonials[0].quote}</p>
                  <h3 className='name'>{testimonials[0].name}</h3>
                  <h4 className='title'>{testimonials[0].title}</h4>
                </div>
              </li>
              <li className={state.isActive2 ? 'active' : ''}>
                <div className='content-inner'>
                  <p className='quote'>{testimonials[1].quote}</p>
                  <h3 className='name'>{testimonials[1].name}</h3>
                  <h4 className='title'>{testimonials[1].title}</h4>
                </div>
              </li>
              <li className={state.isActive3 ? 'active' : ''}>
                <div className='content-inner'>
                  <p className='quote'>{testimonials[2].quote}</p>
                  <h3 className='name'>{testimonials[2].name}</h3>
                  <h4 className='title'>{testimonials[2].title}</h4>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div onClick={nextSlide} className='arrows right'>
          <span>
            <img src={rightArrow} alt='right arrow' />
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
