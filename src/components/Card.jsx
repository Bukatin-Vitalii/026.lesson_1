import React, { useState } from 'react';
import './styles.scss'

const Card = ({ title, message, image, handleDeleteCard, handleSaveChanges }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(title);
	const [editedMessage, setEditedMessage] = useState(message);

	const handleEditCard = () => {
		setIsEditing(true);
		setEditedTitle(title);
		setEditedMessage(message);
	}

	const handleSave = () => {
		const params = {
			title: editedTitle,
			message: editedMessage
		}
    handleSaveChanges(params);
    setIsEditing(false);
  };

	const handleCancel = () => {
    setEditedTitle(title);
    setEditedMessage(message);
    setIsEditing(false);
  };

	const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleMessageChange = (e) => {
    setEditedMessage(e.target.value);
  };

	return (
		<div className="card">
			<div className="card__content">
				{ isEditing ? (
					<>
						<input 
							className="card__title card__input"
							type="text" 
							value={editedTitle} 
							onChange={handleTitleChange} 
						/>
						<textarea
							className="card__message card__input card__textarea" 
							type="text" 
							value={editedMessage} 
							onChange={handleMessageChange} 
						/>
					</>
				) : (
					<>
						<h2 className="card__title">{title}</h2>
						<p className="card__message">{message}</p>
					</>
				)}
			</div>
			<img className="card__image" src={image} alt="card" />
			<div className="card__buttons">
				{isEditing ? (
					<>
						<button onClick={handleSave} className="card__button" type="button">✅</button>
						<button onClick={handleCancel} className="card__button" type="button">❎</button>
					</>
				) : (
					<>
						<button onClick={handleEditCard} className="card__button" type="button">✏️</button>
						<button onClick={handleDeleteCard} className="card__button" type="button">❌</button>
					</>
				)}
			</div>
		</div>
	);
}

export default Card;
