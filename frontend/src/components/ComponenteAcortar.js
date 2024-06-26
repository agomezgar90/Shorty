import React, { useEffect, useState } from 'react'
import axios from "axios";

const ComponenteBorrar = ({ setUrls }) => {

    const fetchUrlAndSetUrl = async () => {
        const result = await axios.get("http://localhost:3333/app");
        console.log(result.data);
        setUrls(result.data);
    };

    const [url, setUrl] = useState([]);
    const [urlSingular, setUrlSingular] = useState([]);

    useEffect(() => {
        console.log(urlSingular)

    }, [urlSingular])

    const onSubmit = (e) => {
        e.preventDefault();
        if (!url) {
            alert("please enter something");
            return;
        }
        axios
            .post("http://localhost:3333/short", { urlOriginal: url })
            .then(res => {
                fetchUrlAndSetUrl();
            })
            .catch(err => {
                console.log(err.message);
            });
        setUrl("")
    }

    

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
                            onChange={e => setUrl(e.target.value)}
                        />
                        <div className="d-grid gap-3 col-6 mx-auto">
                            <button type="submit" className="btn btn-success m-5">
                                Acortar
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default ComponenteBorrar;