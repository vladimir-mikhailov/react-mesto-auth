import PopupWithForm from './PopupWithForm';

function PopupDeleteCard({ isOpen, onClose, isSaving, card, onDelete }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDelete(card);
  }

  return (
    <PopupWithForm
      name='card-delete'
      title='Уверены?'
      isOpen={isOpen}
      isPopup={true}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSaving={isSaving}
      isFormValid={true}
      buttonValues={{ isSaving: 'Удаление...', default: 'Удалить' }}
    />
  );
}

export default PopupDeleteCard;
