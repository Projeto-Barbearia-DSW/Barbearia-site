import './index.scss';
import axios from 'axios'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function logar() {
        try {
            let body = {
                "email": email,
                "senha": senha
            }


            let resp = await axios.post('http://localhost:3010/login', body);

            localStorage.setItem('TOKEN', resp.data.token);

            navigate('/home');
        }
        catch (err) {
            alert(err.message)
        }
    }

    return (
        <div className='pagina-ln-login'>
            <h1> Login </h1>

            <div className='form'>
                <div>
                    <label>E-mail ou Usuario</label>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Senha</label>
                    <input type='text' value={senha} onChange={e => setSenha(e.target.value)}  />
                </div>

                <div>
                    <button onClick={logar}> Logar </button>
                </div>
            </div>
        </div>
    )
}