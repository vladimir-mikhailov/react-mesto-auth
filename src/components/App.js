import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupDeleteCard from './PopupDeleteCard';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then(res => {
        setCards(res);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    function handleEscClose(evt) {
      evt.key === 'Escape' && closeAllPopups();
    }
    document.addEventListener('keydown', handleEscClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDeleteCardClick(card) {
    setCardToDelete(card);
    setIsDeleteCardPopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({});
    setTimeout(() => setIsSaving(false), 300);
  }

  function handleUpdateUser(user) {
    setIsSaving(true);
    api
      .setUserInfo(user)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(userData) {
    setIsSaving(true);
    api
      .updateUserAvatar(userData)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    setIsSaving(true);
    api
      .deleteCard(card._id)
      .then(res => {
        setCards(cards.filter(item => item._id !== card._id));
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    setIsSaving(true);
    api
      .addCard(newCard)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardClick}
          cards={cards}
        />
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isSaving={isSaving}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isSaving={isSaving}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isSaving={isSaving}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <PopupDeleteCard
          isOpen={isDeleteCardPopupOpen}
          onDelete={handleCardDelete}
          card={cardToDelete}
          onClose={closeAllPopups}
          isSaving={isSaving}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
