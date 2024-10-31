import "./index.scss";
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

export default function ServicosFeitos() {
    const location = useLocation();
    const servicoFeito = location.state?.servicoFeito;
    const navigate = useNavigate();
    const [imagem, setImagem] = useState(servicoFeito ? `${apiUrl}${servicoFeito.imagem_servico_feito}` : '');
    const [nomeServicoFeito, setnomeServicoFeito] = useState(servicoFeito?.nome_servico_feito || '');
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

    async function adicionarServicoFeitos() {
        try {
            const formData = new FormData();
            formData.append('imagem', imagem);
            formData.append('nomeServicoFeito', nomeServicoFeito);

            if (servicoFeito) {
                const response = await axios.put(`${apiUrl}servicosfeitos/${servicoFeito.id_servico_feito}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert(`Serviço Feito alterado com sucesso! ID: ${response.data.linhasAfetadas}`);
                navigate('/admin/listarServicosFeitos');
            } else {
                const response = await axios.post(`${apiUrl}servicosfeitos`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert(`Serviço Feito adicionado com sucesso! ID: ${response.data.novoId}`);
                navigate('/admin/listarServicosFeitos');
            }
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
                        style={{ display: 'none' }}
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
                    value={nomeServicoFeito}
                    onChange={e => setnomeServicoFeito(e.target.value)}
                />
            </div>

            <button className="agendar-btn1" type="button" onClick={adicionarServicoFeitos}>
                {servicoFeito ? 'Atualizar Serviço Feito' : 'Adicionar Servico Feito'}
            </button>
            <Link to='/admin/listarServicosFeitos'>
                <button className="agendar-btn2" type="button">
                    Ver Serviço
                </button>
            </Link>
        </div>
    );
}
