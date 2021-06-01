import Popup from './Popup';

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <Popup onClose={onClose} isOpen={isOpen} type='big-image'>
      <figure className='figure'>
        <img src={card.link} alt={card.name} className='big-image' />
        <figcaption className='big-image-caption'>{card.name}</figcaption>
      </figure>
    </Popup>
  );
}

export default ImagePopup;
