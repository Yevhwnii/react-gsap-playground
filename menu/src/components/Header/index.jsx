import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Hamburger from '../Hamburger';

const Header = ({ history }) => {
  const [state, setState] = useState({
    initial: false,
    isClicked: null,
    menuName: 'Menu',
  });

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    history.listen(() => {
      setState({ isClicked: false, menuName: 'Menu' });
    });
  }, [history]);

  const handleToggle = () => {
    disableMenu();
    if (state.initial === false) {
      setState({
        initial: null,
        isClicked: true,
        menuName: 'Close',
      });
    } else if (state.isClicked) {
      setState({
        isClicked: !state.isClicked,
        menuName: 'Menu',
      });
    } else if (!state.isClicked) {
      setState({
        isClicked: !state.isClicked,
        menuName: 'Close',
      });
    }
  };

  // deterrmine if menu should be disabled
  const disableMenu = () => {
    setDisabled(!disabled);
    setTimeout(() => {
      setDisabled(false);
    }, 1200);
  };

  return (
    <header>
      <div className='container'>
        <div className='wrapper'>
          <div className='inner-header'>
            <div className='logo'>
              <Link to='/'>HAMBRG.</Link>
            </div>
            <div className='menu'>
              <button disabled={disabled} onClick={handleToggle}>
                {state.menuName}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Hamburger state={state} />
    </header>
  );
};

export default withRouter(Header);
