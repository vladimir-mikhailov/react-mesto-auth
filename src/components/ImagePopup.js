import { HandleClickOnOverlayContext } from '../contexts/HandleClickOnOverlayContext';
import { useContext } from 'react';

function ImagePopup({ card, isOpen, onClose }) {
  const handleClickOnOverlay = useContext(HandleClickOnOverlayContext);

  return (
    <div
      className={`popup popup_type_big-picture${isOpen ? ' popup_open' : ''}`}
      onClick={handleClickOnOverlay}
    >
      <div className='popup__container'>
        <button
          className='popup__button-close'
          type='button'
          aria-label='Закрыть попап'
          onClick={onClose}
        />
        <figure className='figure'>
          <img src={card.link} alt={card.name} className='big-image' />
          <figcaption className='big-image-caption'>{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
