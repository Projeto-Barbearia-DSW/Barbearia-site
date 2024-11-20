import "./index.scss";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import InputMask from 'react-input-mask';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Agendamento() {
    const location = useLocation();
    const agendamento = location.state?.agendamento;
    const [listaServicos, setListaServicos] = useState([]);
    const [listaHorarios, setListaHorarios] = useState([]);
    const [nome, setNome] = useState(agendamento?.nome_cliente || '');
    const [telefone, setTelefone] = useState(agendamento?.telefone_cliente || '');
    const [servico, setServico] = useState(agendamento?.id_servico || '');
    const [horario, setHorario] = useState(agendamento?.id_horario || '');
    const [dataAgendamento, setDataAgendamento] = useState(agendamento?.data_agendamento ? new Date(agendamento.data_agendamento) : new Date());
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef(null);
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
            'dataAgendamento': dataAgendamento.toISOString().split('T')[0],
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


    const startDrag = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - e.currentTarget.offsetLeft);
        setScrollLeft(e.currentTarget.scrollLeft);
    };

    const onDrag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - e.currentTarget.offsetLeft;
        const walk = (x - startX) * 2;
        e.currentTarget.scrollLeft = scrollLeft - walk;
    };

    const endDrag = () => {
        setIsDragging(false);
    };

    const getMinDate = () => {
        return new Date();
    };

    const tileDisabled = ({ date, view }) => {
        const now = new Date();
        if (view === 'month') {
            return date < now.setHours(0, 0, 0, 0) || date.getDay() === 0;
        }
        return false;
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleDateChange = (date) => {
        setDataAgendamento(date);
        setShowCalendar(false);
    };

    const handleClickOutside = (event) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target)) {
            setShowCalendar(false);
        }
    };

    useEffect(() => {
        if (showCalendar) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCalendar]);

    return (
        <div className='pagina-agendamento'>
            <Toaster position="top-center" reverseOrder={false}/>

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
                    type="text"
                    value={formatDate(dataAgendamento)}
                    readOnly
                    onClick={() => setShowCalendar(!showCalendar)}
                />
                {showCalendar && (
                    <div ref={calendarRef}>
                        <Calendar
                            onChange={handleDateChange}
                            value={dataAgendamento}
                            tileDisabled={tileDisabled}
                            minDate={getMinDate()}
                            className="calendar-overlay"

                        />
                    </div>
                )}
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
                <div
                    className="button-group"
                    onMouseDown={startDrag}
                    onMouseMove={onDrag}
                    onMouseUp={endDrag}
                    onMouseLeave={endDrag}
                >
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