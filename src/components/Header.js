function Header() {
  return (
    <header className='header section section_centered'>
      <a href='/' target='_self'>
        <div
          className='header__logo'
          aria-label='Логотип'
          title='Mesto Russia'
        />
      </a>
    </header>
  );
}

export default Header;
