import React, { useCallback, useEffect, useState } from 'react';
import './styles.scss';
import Card from '../components/Card';
import ModalWindow from '../components/ModalWindow';
import { congratulationCards } from '../api';

const Main = () => {
	const [userMessage, setUserMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [congratulationsArray, setCongratulationsArray] = useState([]);
  const [shownCongratulations, setShownCongratulations] = useState([]);
  const [currentCongratulation, setCurrentCongratulation] = useState();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleUserMessage = (message) => {
		setUserMessage(message);
		setTimeout(() => {
			setUserMessage('');
		}, 2000);
	}

	const fetchCongratulationCards = useCallback(async () => {
		try {
			setIsLoading(true);
			const { data } = await congratulationCards.get();
			setCongratulationsArray(data);
			handleUserMessage('Congratulation! cards were loaded')
		} catch (error) {
			handleUserMessage(error.message)
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchCongratulationCards();
	}, []);

  const generateCongratulation = () => {
    const remainingCongratulations = congratulationsArray.filter(
      (congratulation) => !shownCongratulations.includes(congratulation.id)
    );
		const randomIndex = Math.floor(Math.random() * remainingCongratulations.length);

    if (remainingCongratulations.length > 0) {
      const randomCongratulation = remainingCongratulations[randomIndex];
      setShownCongratulations([...shownCongratulations, randomCongratulation.id]);
      setCurrentCongratulation(randomCongratulation);
    } else {
      setShownCongratulations([]);
      setCurrentCongratulation(congratulationsArray[randomIndex]);
    }
  };

	const showModal = () => {
		setIsModalOpen(true);
	}

	const handleModalClose = (formData) => {
    setIsModalOpen(false);
		if (!formData) return;
		addNewCongratulation(formData);
  };

	const addNewCongratulation = async (formData) => {
		const newCongratulation = {
			id: congratulationsArray.length + 1,
			...formData
		};

		try {
			setIsLoading(true);
			const { data } = await congratulationCards.post(newCongratulation);
			setCongratulationsArray([...congratulationsArray, data]);
			setCurrentCongratulation(data);
			handleUserMessage('Congratulation! card was created');
		} catch (error) {
			handleUserMessage(error.message);
		} finally {
			setIsLoading(false);
		}
	}

	const handleDeleteCard = async (id) => {
		try {
			setIsLoading(true);
			await congratulationCards.delete(id);
			setCongratulationsArray(congratulationsArray.filter((congratulation) => congratulation.id !== id));
			setCurrentCongratulation(null);
			handleUserMessage('Congratulation! card was deleted');
		} catch (error) {
			handleUserMessage(error.message);
		} finally {
			setIsLoading(false);
		}
	}

	const handleSaveChanges = async (id, params) => {
		try {
			setIsLoading(true);
			const { data } = await congratulationCards.put(id, params);
			setCongratulationsArray(congratulationsArray.map((congratulation) => congratulation.id === id ? data : congratulation));
			setCurrentCongratulation(data);
			handleUserMessage('Congratulation! card was updated');
		} catch (error) {
			handleUserMessage(error.message);
		} finally {
			setIsLoading(false);
		}
	}

  return (
    <main className="main">
			{userMessage && (
				<div className="user-message">
					<p className="user-message__text">
						{userMessage}
					</p>
				</div>
			)}
			{isLoading && (
					<div className="loader">
						<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
					</div>
			)}
      <div className="main__container">
        <div className="main__buttons">
          <button onClick={generateCongratulation} type="button" className="main__button">
            Generate Congratulation
          </button>
          <button onClick={showModal} type="button" className="main__button">
            Create New Congratulation
          </button>
        </div>
        {currentCongratulation && (
          <Card
            title={currentCongratulation.title}
            message={currentCongratulation.message}
            image={currentCongratulation.image}
						handleDeleteCard={() => handleDeleteCard(currentCongratulation.id)}
						handleSaveChanges={(params) => handleSaveChanges(currentCongratulation.id, params)}
          />
        )}
				{isModalOpen && <ModalWindow onClose={handleModalClose} />}
      </div>
    </main>
  );
};

export default Main;
