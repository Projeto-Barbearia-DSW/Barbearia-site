import "./index.scss";
import axios from 'axios';
import React, { useState } from 'react';
import {Link} from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

export default function ServicosFeitos() {
    const [imagem, setImagem] = useState(null);
    const [nomeServicoFeito, setnomeServicoFeito] = useState('');
    async function adicionarServicoFeitos() {
        try {
            const formData = new FormData();
            formData.append('imagem', imagem);
            formData.append('nomeServicoFeito', nomeServicoFeito);

            const response = await axios.post(`${apiUrl}servicosfeitos`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert(`Serviço adicionado com sucesso! ID: ${response.data.novoId}`);
        } catch (err) {
            console.error('Erro ao adicionar serviço:', err);
            alert('Erro ao adicionar serviço');
        }
    }

    return (
        <div className='pagina-servico-admin'>

            <h1>Adicionar Serviços Feitos</h1>

            <div className="form-group">
                <label>Imagem</label>
                <input
                    type="file"
                    onChange={e => setImagem(e.target.files[0])}
                />
            </div>

            <div className="form-group">
                <label>Nome do Serviço</label>
                <input
                    type="text"
                    placeholder="Digite o nome do serviço"
                    value={nomeServicoFeito}
                    onChange={e => setnomeServicoFeito(e.target.value)}
                />
            </div>

            <button className="agendar-btn1" type="button" onClick={adicionarServicoFeitos}>
                Adicionar Serviços Feitos
            </button>
            <Link to='/admin/listarServicosFeitos'>
                <button className="agendar-btn2" type="button">
                    Ver Serviço
                </button>
            </Link>
        </div>
    );
}
