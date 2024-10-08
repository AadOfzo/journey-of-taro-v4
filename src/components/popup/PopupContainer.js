import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessMessage from '../messaging/SuccessMessage';
import ErrorMessage from '../messaging/ErrorMessage';
import {
    PopupButton,
    PopupContainerWrapper,
    Overlay,
    PopupContent
} from './styles.PopUp'; // Import the styled components

const PopupContainer = () => {
    const [showPopup, setShowPopup] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleStartClick = () => {
        setShowPopup(false);
        navigate('/signup'); // Navigate to UserForm3
    };

    const handleBrowseClick = () => {
        setShowPopup(false);
        navigate('/'); // Navigate to home page
    };

    const handleSuccessClick = () => {
        setSuccessMessage('');
    };

    const handleErrorClick = () => {
        setErrorMessage('');
    };

    return (
        <PopupContainerWrapper>
            {showPopup && (
                <Overlay show={showPopup}>
                    <PopupContent>
                        <h3>Welcome! Would you like to start the tour or browse the application?</h3>
                        <PopupButton onClick={handleStartClick}>Start Tour</PopupButton>
                        <PopupButton onClick={handleBrowseClick}>Browse Application</PopupButton>
                    </PopupContent>
                </Overlay>
            )}
            {successMessage && <SuccessMessage message={successMessage} onClick={handleSuccessClick} />}
            {errorMessage && <ErrorMessage message={errorMessage} onClick={handleErrorClick} />}
        </PopupContainerWrapper>
    );
};

export default PopupContainer;
