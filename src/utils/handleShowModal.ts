import { useState } from 'react';

const useHandleShowModal = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    return { showModal, handleShowModal };
};

export default useHandleShowModal;