import {Link, useLocation} from "react-router-dom";
import {useState} from "react";

function Header({handleLogout, userEmail, loggedIn}) {
  const {pathname} = useLocation();
  const [burgerIsOpen, setBurgerIsOpen] = useState(false)

  const handleClick = () => {
    burgerIsOpen
      ? setBurgerIsOpen(false)
      : loggedIn && setBurgerIsOpen(true)
  }

  const handleBurgerLogout = () => {
    setBurgerIsOpen(false);
    handleLogout();
  }

  return (
    <header className='header section section_centered'>
      {loggedIn && burgerIsOpen && (
        <div className={`header__menu-container`}>
          <span className={`header__user-email desktop-hidden`}>{userEmail}</span>
          <Link
            to='./sign-in'
            onClick={handleBurgerLogout}
            className={`header__user-auth-link header__user-auth-link_gray header__user-auth-link_burger desktop-hidden`}
          >
            Выйти
          </Link>
        </div>
      )
      }
      <div className="header__main-container">
        <Link
          to={loggedIn ? '/' : './sign-in'}
          className='header__logo'
          aria-label='Логотип'
          title='Mesto Russia'
        />
        <div
          className={`header__user-container${loggedIn ? burgerIsOpen ? ' button-close button-close_desktop-hidden' : ' header__burger-menu' : ''}`}
          onClick={handleClick}
        >
          {loggedIn
            ? (
              <>
                <span className={`header__user-email mobile-hidden`}>{userEmail}</span>
                <Link
                  to='./sign-in'
                  onClick={handleLogout}
                  className={`header__user-auth-link header__user-auth-link_gray mobile-hidden`}
                >
                  Выйти
                </Link>
              </>
            )
            : (
              <>
                <Link
                  to={`${pathname === '/sign-in' ? './sign-up' : './sign-in'}`}
                  className='header__user-auth-link'
                >
                  {`${pathname === '/sign-in' ? 'Регистрация' : 'Вход'}`}
                </Link>
              </>
            )
          }
        </div>
      </div>

    </header>
  );
}

export default Header;
