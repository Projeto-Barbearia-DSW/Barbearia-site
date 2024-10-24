import "./index.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Agendamento() {
    const [listaServicos, setListaServicos] = useState([]);
    const [listaHorarios, setListaHorarios] = useState([]);
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [servico, setServico] = useState('');
    const [horario, setHorario] = useState('');
    const [dataAgendamento, setDataAgendamento] = useState('');
    const navigate = useNavigate();

    async function listarServicos() {
        try {
            let resp = await axios.get('http://localhost:3010/servico');
            setListaServicos(resp.data);
        } catch (error) {
            console.error('Erro ao listar serviços:', error);
        }
    }

    async function listarHoras() {
        try {
            let resp = await axios.get('http://localhost:3010/horas');
            setListaHorarios(resp.data);
        } catch (error) {
            console.error('Erro ao listar horários:', error);
        }
    }

    async function agendar() {
        let body = {
            'nomeCliente': nome,
            'telefoneCliente': telefone,
            'dataAgendamento': dataAgendamento,
            'idHorario': horario,
            'idServico': servico
        };

        try {
            let resp = await axios.post('http://localhost:3010/agendamento', body);
            alert('Agendamento realizado com sucesso: ' + resp.data.idAgendamento);
            navigate('/');
        } catch (error) {
            console.error('Erro ao realizar o agendamento:', error);
            alert('Erro ao agendar. Verifique os dados e tente novamente.');
        }
    }

    useEffect(() => {
        listarServicos();
        listarHoras();
    }, []);

    return (
        <div className='pagina-ag-agendamento'>
            <h1>Agendar Horário</h1>

            <div className="form-group">
                <label>Nome Completo</label>
                <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Telefone</label>
                <input
                    type="text"
                    placeholder="Digite seu telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Data do Agendamento</label>
                <input
                    type="date"
                    value={dataAgendamento}
                    onChange={(e) => setDataAgendamento(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Selecione o serviço</label>
                <select value={servico} onChange={(e) => setServico(e.target.value)}>
                    <option value="">Selecione um serviço</option>
                    {listaServicos.map((item) => (
                        <option key={item.id_servico} value={item.id_servico}>
                            {item.nome_servico} - R$ {item.valor_servico}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Selecione um horário</label>
                <div className="button-group">
                    {listaHorarios.map((item) => (
                        <button
                            key={item.id_horario}
                            onClick={() => setHorario(item.id_horario)}
                            className={horario === item.id_horario ? 'active' : ''}
                        >
                            {item.horario}
                        </button>
                    ))}
                </div>
            </div>

            <button className="agendar-btn" type="button" onClick={agendar}>
                Agendar Horário
            </button>
        </div>
    );
}
