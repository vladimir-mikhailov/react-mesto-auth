import Popup from './Popup';

const InfoTooltip = ({ type, isOpen, onClose, message }) => {

  return (
    <Popup onClose={onClose} isOpen={isOpen} type='form'>
        <div
          className={`popup__image${type ? ` popup__image_type_${type}` : ''}`}
        />
        <p className='popup__message'>{message}</p>
    </Popup>
  );
};

export default InfoTooltip;
