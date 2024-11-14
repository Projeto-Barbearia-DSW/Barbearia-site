import "./index.scss"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

export default function Agendamentos() {
    const [lista, setLista] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('TOKEN') === null || localStorage.getItem('TOKEN') === undefined) {
            navigate('/');
        }
        listarAgendamentos();
    }, [navigate]);

    async function listarAgendamentos() {
        let token = localStorage.getItem('TOKEN');
        let resp = await axios.get(`${apiUrl}agendamento`, {
            headers: { 'x-access-token': token }
        });
        setLista(resp.data);
    }

    async function excluir(id) {
        await axios.delete(`${apiUrl}agendamento/${id}`);
        listarAgendamentos();
    }

    async function alterar(agendamento) {
        navigate('/agendamento', { state: { agendamento } });
    }

    async function concluir(agendamento) {
        try {
            const formattedAgendamento = {
                ...agendamento,
                data_agendamento: new Date(agendamento.data_agendamento).toISOString().split('T')[0], // Format date to 'YYYY-MM-DD'
                valor_servico: agendamento.valor_servico
            };
            await axios.post(`${apiUrl}agendamentofeito`, formattedAgendamento);
            await axios.delete(`${apiUrl}agendamento/${agendamento.id_agendamento}`);
            listarAgendamentos();
        } catch (error) {
            console.error('Error completing the appointment:', error.response.data);
        }
    }

    return (
        <div className="tabela">
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Data</th>
                    <th>Horario</th>
                    <th>Serviço</th>
                    <th>Valor</th>
                    <th>Concluir</th>
                    <th>Alterar</th>
                    <th>Excluir</th>
                </tr>
                </thead>

                <tbody>
                {lista.map(item =>
                    <tr key={item.id}>
                        <td>{item.id_agendamento}</td>
                        <td>{item.nome_cliente}</td>
                        <td>{item.telefone_cliente}</td>
                        <td>{new Date((item.data_agendamento)).toLocaleDateString('pt-BR')}</td>
                        <td>{item.horario}</td>
                        <td>{item.nome_servico}</td>
                        <td>{item.valor_servico}</td>
                        <td>
                            <button onClick={() => concluir(item)} className="concluido">Concluido</button>
                        </td>
                        <td>
                            <button onClick={() => alterar(item)} className="alterar">Alterar</button>
                        </td>
                        <td>
                            <button onClick={() => excluir(item.id_agendamento)} className="excluir">Excluir</button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}