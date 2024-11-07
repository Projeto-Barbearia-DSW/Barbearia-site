import "./index.scss";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

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
    const [errors, setErrors] = useState({});
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

    const validate = () => {
        const newErrors = {};
        if (!nome) newErrors.nome = 'Nome é obrigatório';
        if (!telefone) newErrors.telefone = 'Telefone é obrigatório';
        if (!dataAgendamento) newErrors.dataAgendamento = 'Data do agendamento é obrigatória';
        if (!servico) newErrors.servico = 'Serviço é obrigatório';
        if (!horario) newErrors.horario = 'Horário é obrigatório';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function agendar() {
        if (!validate()) return;

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
                alert('Agendamento atualizado com sucesso ');
                navigate('/admin/agendamentos');
            } else {
                await axios.post(`${apiUrl}agendamento`, body);
                alert('Agendamento realizado com sucesso ');
                navigate('/');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.erro || 'Erro ao agendar. Verifique os dados e tente novamente.';
            alert(errorMessage);
        }
    }

    useEffect(() => {
        listarServicos();
        listarHoras();
    }, [listarServicos, listarHoras]);

    return (
        <div className='pagina-agendamento'>

            <h1>{agendamento ? 'Editar Agendamento' : 'Agendar Horário'}</h1>

            <div className="form-group">
                <label>Nome Completo</label>
                <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                {errors.nome && <span className="error">{errors.nome}</span>}
            </div>

            <div className="form-group">
                <label>Telefone</label>
                <input
                    type="text"
                    placeholder="Digite seu telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                />
                {errors.telefone && <span className="error">{errors.telefone}</span>}
            </div>

            <div className="form-group">
                <label>Data do Agendamento</label>
                <input
                    type="date"
                    value={dataAgendamento}
                    onChange={(e) => setDataAgendamento(e.target.value)}
                />
                {errors.dataAgendamento && <span className="error">{errors.dataAgendamento}</span>}
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
                {errors.servico && <span className="error">{errors.servico}</span>}
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
                {errors.horario && <span className="error">{errors.horario}</span>}
            </div>

            <button className="agendar-btn" type="button" onClick={agendar}>
                {agendamento ? 'Atualizar Agendamento' : 'Agendar Horário'}
            </button>
        </div>
    );
}