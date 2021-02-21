import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

import { staggerLinksReveal, staggerReveal, fadeInUp } from './animations';
import Dallas from '../../assets/dallas.webp';
import Austin from '../../assets/austin.webp';
import Beijing from '../../assets/beijing.webp';
import SF from '../../assets/sanfrancisco.webp';
import NY from '../../assets/newyork.webp';

const cities = [
  { name: 'Dallas', image: Dallas },
  { name: 'Austin', image: Austin },
  { name: 'New York', image: Beijing },
  { name: 'San Francisco', image: SF },
  { name: 'Beijing', image: NY },
];

const Hamburger = ({ state }) => {
  // Animation constants
  const menu = useRef(null);
  const revealMenu = useRef(null);
  const revealMenuBg = useRef(null);
  const cityBg = useRef(null);
  const line1 = useRef(null);
  const line2 = useRef(null);
  const line3 = useRef(null);
  const info = useRef(null);

  useEffect(() => {
    if (state.isClicked === false) {
      // close menu
      gsap.to([revealMenu.current, revealMenuBg.current], {
        duration: 0.8,
        height: 0,
        ease: 'power3.inOut',
        stagger: {
          amount: 0.07,
        },
      });
      gsap.to(menu.current, {
        duration: 1,
        css: {
          display: 'none',
        },
      });
    } else if (state.isClicked || (state.isClicked && state.initial === null)) {
      // open menu
      gsap.to(menu.current, {
        duration: 0,
        css: {
          display: 'block',
        },
      });
      gsap.to([revealMenuBg.current, revealMenu.current], {
        duration: 0,
        opacity: 1,
        height: '100%',
      });
      staggerReveal(revealMenuBg.current, revealMenu.current);
      fadeInUp(info.current);
      staggerLinksReveal(line1.current, line2.current, line3.current);
    }
  }, [state]);

  const handleCityHover = (city) => {
    gsap.to(cityBg.current, {
      duration: 0,
      background: `url(${city.image}) center center`,
    });
    gsap.to(cityBg.current, {
      duration: 0.4,
      opacity: 1,
      ease: 'power3.inOut',
    });
    gsap.from(cityBg.current, {
      duration: 0.4,
      skewY: 2,
      transformOrigin: 'right top',
    });
  };

  const handleCityUnhover = () => {
    gsap.to(cityBg.current, {
      duration: 0.4,
      opacity: 0,
    });
  };

  const linkHover = (e) => {
    gsap.to(e.target, {
      duration: 0.3,
      y: 3,
      skewX: 4,
      ease: 'power3.inOut',
    });
  };
  const linkHoveExit = (e) => {
    gsap.to(e.target, {
      duration: 0.3,
      y: -3,
      skewX: 0,
      ease: 'power3.inOut',
    });
  };

  return (
    <div ref={menu} className='hamburger-menu'>
      <div ref={revealMenuBg} className='menu-secondary-background-color'></div>
      <div ref={revealMenu} className='menu-layer'>
        <div ref={cityBg} className='menu-city-background'></div>
        <div className='container'>
          <div className='wrapper'>
            <div className='menu-links'>
              <nav>
                <ul>
                  <li>
                    <Link
                      ref={line1}
                      onMouseEnter={(e) => linkHover(e)}
                      onMouseOut={(e) => linkHoveExit(e)}
                      to='/opportunities'>
                      Opportunities
                    </Link>
                  </li>
                  <li>
                    <Link
                      onMouseEnter={(e) => linkHover(e)}
                      onMouseOut={(e) => linkHoveExit(e)}
                      ref={line2}
                      to='/solutions'>
                      Solutions
                    </Link>
                  </li>
                  <li>
                    <Link
                      onMouseEnter={(e) => linkHover(e)}
                      onMouseOut={(e) => linkHoveExit(e)}
                      ref={line3}
                      to='/contact-us'>
                      Contact us
                    </Link>
                  </li>
                </ul>
              </nav>
              <div ref={info} className='info'>
                <h3>Our Promise</h3>
                <p>
                  The passage experienced a surge in popularity during the 1960s
                  when Letraset used it on their dry-transfer sheets, and again
                  during the 90s as desktop publishers bundled the text with
                  their software.
                </p>
              </div>
              <div className='locations'>
                Locations:
                {cities.map((city) => {
                  return (
                    <span
                      key={city.name}
                      onMouseEnter={() => handleCityHover(city)}
                      onMouseOut={handleCityUnhover}>
                      {city.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
