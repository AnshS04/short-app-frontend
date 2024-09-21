import React from 'react';
import Form from '../components/Form';

const ShortenURL = () => {
    return (
        <div
            className="min-h-[calc(100vh-64px)] flex justify-center items-center"
            style={{ backgroundImage: `url('/duplo24.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <Form />
        </div>
    );
};

export default ShortenURL;
