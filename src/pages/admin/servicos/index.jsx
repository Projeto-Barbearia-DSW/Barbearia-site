import "./index.scss";
import axios from 'axios';
import { useState } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

export default function Servicos() {
    const [imagem, setImagem] = useState(null);
    const [nomeServico, setNomeServico] = useState('');
    const [valorServico, setValorServico] = useState('');
    const [tempoServico, setTempoServico] = useState('');

    async function adicionarServico() {
        try {
            const formData = new FormData();
            formData.append('imagem', imagem);
            formData.append('nomeServico', nomeServico);
            formData.append('valorServico', valorServico);
            formData.append('tempoServico', tempoServico);

            const response = await axios.post(`${apiUrl}servico`, formData, {
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
        <div className='pagina-ag-agendamento'>
            <h1>Adicionar Serviços</h1>

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

            <button className="agendar-btn" type="button" onClick={adicionarServico}>
                Adicionar Serviço
            </button>
            <button className="agendar-btn" type="button">
                Ver Serviço
            </button>
        </div>
    );
}
