import './index.scss';
import axios from 'axios'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;

    async function logar() {
        try {
            let body = {
                "email": email,
                "senha": senha
            }


            let resp = await axios.post(`${apiUrl}login`, body);

            localStorage.setItem('TOKEN', resp.data.token);

            navigate('/admin');
        }
        catch (err) {
            alert(err.message)
        }
    }

    return (
        <div className='pagina-ln-login'>

            <button className="home-btn" onClick={() => navigate('/')}>
                &larr; Home
            </button>

            <h1> Login </h1>

            <div className='form'>
                <div className="form-group">
                    <label>E-mail</label>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Senha</label>
                    <input type='password' value={senha} onChange={e => setSenha(e.target.value)}  />
                </div>

                <button className="logar-btn" type="button" onClick={logar}> Logar </button>

            </div>
        </div>
    )
}