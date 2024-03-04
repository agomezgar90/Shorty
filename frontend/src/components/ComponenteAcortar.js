import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

const AddUrlComponent = () => {
    const [url, setUrl] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!url) {
            alert('Por favor, introduce una URL.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3333/short', { urlOriginal: url });
            console.log(response);
            const shortUrl = response.data.shortUrl;
            console.log(shortUrl);
            const uniqueCookieName = `shortUrl_${uuidv4()}`;
            // Almacena la URL acortada en las cookies del usuario
            Cookies.set(uniqueCookieName, shortUrl);
            console.log('URL acortada:', shortUrl);
        } catch (error) {
            console.error('Error al acortar la URL:', error);
        }
        setUrl('');
    };

    return (
        <div>
            <main>
                <section className="w-100 d-flex flex-column justify-content-center align-items-center">
                    <h1 className="mb-5 fs-1">Shorty</h1>
                    <form className="w-50" onSubmit={onSubmit}>
                        <input
                            className="w-100 border border-primary p-2 mb-1 fs-3 h-25"
                            type="text"
                            placeholder="Escribe la dirección web"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        <div class="d-grid gap-3 col-6 mx-auto">
                            <button type="submit" className="btn btn-success m-5">
                                Acortar
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default AddUrlComponent;
