import "./index.scss";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import InputMask from 'react-input-mask';

export default function Agendamento() {
    const location = useLocation();
    const agendamento = location.state?.agendamento;
    const [listaServicos, setListaServicos] = useState([]);
    const [listaHorarios, setListaHorarios] = useState([]);
    const [nome, setNome] = useState(agendamento?.nome_cliente || '');
    const [telefone, setTelefone] = useState(agendamento?.telefone_cliente || '');
    const [servico, setServico] = useState(agendamento?.id_servico || '');
    const [horario, setHorario] = useState(agendamento?.id_horario || '');
    const [dataAgendamento, setDataAgendamento] = useState(agendamento?.data_agendamento ? new Date(agendamento.data_agendamento).toISOString().split('T')[0] : '');
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;

    const listarServicos = useCallback(async () => {
        try {
            let resp = await axios.get(`${apiUrl}servico`);
            setListaServicos(resp.data);
        } catch (error) {
            console.error('Erro ao listar serviços:', error);
        }
    }, [apiUrl]);

    const listarHoras = useCallback(async () => {
        try {
            let resp = await axios.get(`${apiUrl}horas`);
            setListaHorarios(resp.data);
        } catch (error) {
            console.error('Erro ao listar horários:', error);
        }
    }, [apiUrl]);

    async function agendar() {
        let body = {
            'nomeCliente': nome,
            'telefoneCliente': telefone,
            'dataAgendamento': dataAgendamento,
            'idHorario': horario,
            'idServico': servico
        };

        try {
            if (agendamento) {
                await axios.put(`${apiUrl}agendamento/${agendamento.id_agendamento}`, body);
                toast.success('Agendamento atualizado com sucesso.');
                setTimeout(() => {
                    navigate('/admin/agendamentos');
                }, 1000);
            } else {
                await axios.post(`${apiUrl}agendamento`, body);
                toast.success('Agendamento realizado com sucesso.');
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.erro || 'Erro ao agendar. Verifique os dados e tente novamente.';
            toast.error(errorMessage);
        }
    }

    useEffect(() => {
        listarServicos();
        listarHoras();
    }, [listarServicos, listarHoras]);

    const getMinDate = () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
    };

    const getMaxDate = () => {
        const now = new Date();
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${lastDay}`;
    };

    return (
        <div className='pagina-agendamento'>
            <Toaster position="top-center" reverseOrder={false} />

            <h1>{agendamento ? 'Editar Agendamento' : 'Agendar Horário'}</h1>

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
                <InputMask
                    mask="+55 (99) 99999-9999"
                    placeholder="Digite seu telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="input-mask"
                />
            </div>

            <div className="form-group">
                <label>Data do Agendamento</label>
                <input
                    type="date"
                    value={dataAgendamento}
                    onChange={(e) => setDataAgendamento(e.target.value)}
                    min={getMinDate()}
                    max={getMaxDate()}
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
                {agendamento ? 'Atualizar Agendamento' : 'Agendar Horário'}
            </button>
        </div>
    );
}
