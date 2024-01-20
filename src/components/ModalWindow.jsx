import React, {useState} from 'react';
import closeImage from '../assets/svg/close-circle.svg';
import './styles.scss'

const ModalWindow = ({ onClose }) => {

	const [formData, setFormData] = useState({
		title: '',
		message: '',
		image: ''
	});

	const [errors, setErrors] = useState({
		title: '',
		message: '',
		image: ''
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value 
		});
		setErrors({
			...errors,
			[name]: ''
		});
	}

	const handleSubmit = (e) => {
		if (validateForm()) onClose(formData);
	}

	const handleModalClose = (e) => {
		onClose();
	}

	const stopPropagation = (e) => {
		e.stopPropagation();
	}

	const validateForm = () => {
		let isValid = true;
		const newErrors = {
			title: '',
			message: '',
			image: ''
		};

		if (!formData.title) {
			newErrors.title = 'Please enter title';
			isValid = false;
		}

		if (!formData.message) {
			newErrors.message = 'Please enter message';
			isValid = false;
		}

		if (!formData.image) {
			newErrors.image = 'Please enter image url';
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	}

	return (
		<div onClick={handleModalClose} className="modal__blur">
			<div onClick={stopPropagation} className="modal__window">
				<div className="modal__content">
					<button onClick={handleModalClose} className='modal__close' type='button'>
						<img src={closeImage} alt="X" className='modal__close--img' />
					</button>
					<h2 className="modal__title">Create New Congratulation</h2>
					<div className="input-wrapper">
						<label className="modal__label" htmlFor="title">Title</label>
						<input onChange={handleChange} className="modal__input" type="text" id="title" name="title" />
						{errors.title && <p className="modal__error">{errors.title}</p>}
					</div>
					<div className="input-wrapper">
						<label className="modal__label" htmlFor="message">Message</label>
						<textarea onChange={handleChange} className="modal__textarea" name="message" id="message" cols="30" rows="5"></textarea>
						{errors.message && <p className="modal__error">{errors.message}</p>}
					</div>
					<div className="input-wrapper">
						<label className="modal__label" htmlFor="image">Image URL</label>
						<input onChange={handleChange} className="modal__input" type="text" id="image" name="image" />
						{errors.image && <p className="modal__error">{errors.image}</p>}
					</div>
					<button onClick={handleSubmit} className="modal__button" type="button">Create</button>
				</div>
			</div>
		</div>
	)
};

export default ModalWindow;
