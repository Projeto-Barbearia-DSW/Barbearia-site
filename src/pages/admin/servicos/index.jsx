import "./index.scss";
import axios from 'axios';
import React, { useState } from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

export default function Servicos() {

    const location = useLocation();
    const servico = location.state?.servico;
    const navigate = useNavigate();
    const [imagem, setImagem] = useState(servico ?`${apiUrl}${servico.imagem_servico}` : '');
    const [nomeServico, setNomeServico] = useState(servico?.nome_servico || '');
    const [valorServico, setValorServico] = useState(servico?.valor_servico || '');
    const [tempoServico, setTempoServico] = useState(servico?.tempo_servico || '');
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setImagem(file);
        }
        setIsDragOver(false);
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagem(file);
        }
    };

    async function adicionarServico() {
        try {
            const formData = new FormData();
            formData.append('imagem', imagem);
            formData.append('nomeServico', nomeServico);
            formData.append('valorServico', valorServico);
            formData.append('tempoServico', tempoServico);

            if (servico) {
                await axios.put(`${apiUrl}servico/${servico.id_servico}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                alert(`Serviço alterado com sucesso!`);
                navigate('/admin/listarServicos');
            } else {
                await axios.post(`${apiUrl}servico`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                alert(`Serviço adicionado com sucesso!`);
            }
            navigate('/admin/listarServicos');
        } catch (err) {
            console.error('Erro ao adicionar serviço:', err);
            alert('Erro ao adicionar serviço');
        }
    }

    return (
        <div className='pagina-add-servico-admin'>

            <h1>Adicionar Serviços</h1>

            <div className="form-group">
                <label>Imagem</label>
                <div
                    className={`drop-zone ${isDragOver ? 'drag-over' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {imagem ? (
                        <img src={imagem instanceof File ? URL.createObjectURL(imagem) : imagem} alt="Preview"
                             className="image-preview"/>
                    ) : (
                        <p>Arraste e solte uma imagem aqui ou clique para selecionar.</p>
                    )}
                    <input
                        type="file"
                        onChange={handleChange}
                        style={{display: 'none'}}
                        id="file-input"
                    />
                    <label htmlFor="file-input" className="file-label">Selecionar Imagem</label>
                </div>
            </div>

            <div className="form-group">
                <label>Nome do Serviço</label>
                <input
                    type="text"
                    placeholder="Digite o nome do serviço"
                    value={nomeServico}
                    onChange={e => setNomeServico(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Valor do Serviço</label>
                <input
                    type="text"
                    placeholder="Digite valor do serviço"
                    value={valorServico}
                    onChange={e => setValorServico(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Tempo do Serviço</label>
                <input
                    type="text"
                    placeholder="Digite o tempo do serviço"
                    value={tempoServico}
                    onChange={e => setTempoServico(e.target.value)}
                />
            </div>

            <button className="agendar-btn1" type="button" onClick={adicionarServico}>
                {servico ? 'Atualizar Serviço' : 'Adicionar Servico'}
            </button>

            <Link to='/admin/listarServicos'>
                <button className="agendar-btn2" type="button">
                    Ver Serviço
                </button>
            </Link>

        </div>
    );
}