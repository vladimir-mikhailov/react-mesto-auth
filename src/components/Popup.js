const Popup = ({ children, isOpen, onClose, type }) => {
  const handleClickOnOverlay = e => {
    e.target === e.currentTarget && onClose();
  };

  return (
    <div
      className={`popup popup_type_${type}${isOpen ? ' popup_open' : ''}`}
      onClick={handleClickOnOverlay}
    >
      <div className={`popup__container popup__container_type_${type}`}>
        <button
          className='popup__button-close popup__button-close_mobile-centered'
          type='button'
          aria-label='Закрыть попап'
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Popup;
