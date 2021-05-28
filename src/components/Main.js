import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className='main'>
      <section className='profile section section_centered'>
        <div className='profile__avatar-container' onClick={onEditAvatar}>
          <div
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            className='profile__avatar'
          />
        </div>

        <div className='profile__info'>
          <div className='profile__name-container'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button
              className='profile__edit-button'
              type='button'
              aria-label='Редактировать профиль'
              onClick={onEditProfile}
            />
          </div>
          <p className='profile__description'>{currentUser.about}</p>
        </div>
        <button
          className='profile__add-button'
          type='button'
          aria-label='Добавить фото'
          name='add-card'
          onClick={onAddPlace}
        />
      </section>
      <section
        className='section section_centered'
        aria-label='Фотографии пользователя'
      >
        <ul className='elements'>
          {cards.map(item => (
            <Card
              key={item._id}
              card={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
