import { HandleClickOnOverlayContext } from "../contexts/HandleClickOnOverlayContext";
import {useContext} from "react";

const InfoTooltip = (
  {
    type,
    isOpen,
    onClose,
    message
  }) => {
  const handleClickOnOverlay = useContext(HandleClickOnOverlayContext);


  return (
    <div
      className={`popup${isOpen ? ' popup_open' : ''}`}
      onClick={handleClickOnOverlay}
    >
      <div className='popup__container popup__container_type_form'>
        <button
          className='popup__button-close popup__button-close_mobile-centered'
          type='button'
          aria-label='Закрыть попап'
          onClick={onClose}
        />
        <div className={`popup__image${type ? ` popup__image_type_${type}` : ''}`}>

        </div>
        <p className='popup__message'>
          {message}
        </p>
      </div>
    </div>
  )
}

export default InfoTooltip;
