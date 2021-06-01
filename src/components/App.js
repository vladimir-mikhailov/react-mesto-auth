import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import auth from '../utils/auth';
import translateError from '../utils/translateError';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupDeleteCard from './PopupDeleteCard';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});
  const [infoTooltipType, setInfoTooltipType] = useState('');
  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(true);
  const [userData, setUserData] = useState({
    email: '',
    id: '',
  });

  const history = useHistory();

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
    const handleEscClose = e => {
      e.key === 'Escape' && closeAllPopups();
    };

    document.addEventListener('keydown', handleEscClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkTokenAndGetUserData = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth
        .getUserData(jwt)
        .then(res => {
          if (res) {
            setLoggedIn(true);
            setUserData({ id: res.data._id, email: res.data.email });
          }
        })
        .catch(err => {
          console.log(err);
          setLoggedIn(false);
        });
    } else {
      setLoggedIn(false);
    }
  };

  // eslint-disable-next-line
  useEffect(() => checkTokenAndGetUserData(), []);

  const resetInfoTooltip = () => {
    setInfoTooltipType('');
    setInfoTooltipMessage('');
  };

  const handleRegister = userData => {
    setIsSaving(true);
    auth
      .register(userData)
      .then(res => {
        if (res) {
          setIsSaving(false);
          setInfoTooltipType('success');
          setInfoTooltipMessage('Вы успешно зарегистрировались!');
          setIsInfoTooltipPopupOpen(true);
          setTimeout(() => {
            history.push('/sign-in');
            closeAllPopups();
          }, 5000);

          // можно сразу залогинить и отправить на главную
          //handleLogin(userData);
          //history.push('/');
        }
      })
      .catch(err => {
        if (err) {
          setIsSaving(false);
          setInfoTooltipType('error');
          setInfoTooltipMessage(`${err.error || err.message}.
          Попробуйте ещё раз.`);
          setIsInfoTooltipPopupOpen(true);
        }
      });
  };

  const handleLogin = ({ email, password }) => {
    setIsSaving(true);
    auth
      .login({ email, password })
      .then(res => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          checkTokenAndGetUserData();
          setIsSaving(false);
        }
      })
      .catch(err => {
        setIsSaving(false);
        setInfoTooltipType('error');
        setInfoTooltipMessage(translateError(err.error || err.message));
        setIsInfoTooltipPopupOpen(true);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserData({
      email: '',
      id: '',
    });
    history.push('/sign-in');
  };

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
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
    resetInfoTooltip();
    setTimeout(() => setIsSaving(false), 300);
  }

  const closeInfoTooltipPopup = isSuccess => {
    isSuccess && history.push('/sign-in');
    closeAllPopups();
  };

  const handleUpdateUser = user => {
    setIsSaving(true);
    api
      .setUserInfo(user)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  const handleUpdateAvatar = userData => {
    setIsSaving(true);
    api
      .updateUserAvatar(userData)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  const handleCardLike = card => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => console.log(err));
  };

  const handleCardDelete = card => {
    setIsSaving(true);
    api
      .deleteCard(card._id)
      .then(res => {
        setCards(cards.filter(item => item._id !== card._id));
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  const handleAddPlaceSubmit = newCard => {
    setIsSaving(true);
    api
      .addCard(newCard)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          handleLogout={handleLogout}
          userEmail={userData.email}
          loggedIn={loggedIn}
        />
        <Switch>
          <ProtectedRoute
            exact
            path='/'
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
            cards={cards}
          />
          <Route path='/sign-up'>
            <Register
              handleRegister={handleRegister}
              isSaving={isSaving}
              isPopup={false}
            />
          </Route>
          <Route path='/sign-in'>
            {loggedIn && <Redirect to='/' />}
            <Login
              handleLogin={handleLogin}
              isSaving={isSaving}
              isPopup={false}
            />
          </Route>
          <Route path='*'>
            <Redirect to={loggedIn ? '/' : '/sign-in'} />
          </Route>
        </Switch>
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
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeInfoTooltipPopup}
          type={infoTooltipType}
          message={infoTooltipMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
