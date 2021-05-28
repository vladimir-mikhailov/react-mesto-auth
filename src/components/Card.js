import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className='element'>
      <div
        style={{ backgroundImage: `url(${card.link})` }}
        className='element__image'
        onClick={handleCardClick}
      />
      {isOwn && (
        <button
          className='trash-button'
          type='button'
          aria-label='Удалить'
          name='delete'
          onClick={handleDeleteClick}
        />
      )}
      <div className='element__bottom-container'>
        <h2 className='element__title'>{card.name}</h2>
        <div className='element__like-container'>
          <button
            className={`element__like-button${
              isLiked ? ' element__like-button_active' : ''
            }`}
            type='button'
            aria-label='Мне нравится'
            name='like'
            onClick={handleLikeClick}
          />
          <span
            className={`element__like-counter ${
              card.likes.length === 0 && 'element__like-counter_hidden'
            }`}
          >
            {card.likes.length}
          </span>
        </div>
      </div>
    </li>
  );
}

export default Card;
