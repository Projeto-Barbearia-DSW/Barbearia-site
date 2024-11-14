import "./index.scss"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

export default function AgendamentosFeitos() {
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
        let resp = await axios.get(`${apiUrl}agendamentofeito`, {
            headers: { 'x-access-token': token }
        });
        setLista(resp.data);
    }

    async function excluir(id) {
        await axios.delete(`${apiUrl}agendamentofeito/${id}`);
        listarAgendamentos();
    }

    return (
        <div className="tabela">
            <table>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Data</th>
                    <th>Horario</th>
                    <th>Serviço</th>
                    <th>Excluir</th>
                </tr>
                </thead>

                <tbody>
                {lista.map(item =>
                    <tr key={item.id_agendamento_feito}>
                        <td>{item.nome_cliente}</td>
                        <td>{item.telefone_cliente}</td>
                        <td>{new Date((item.data_agendamento)).toLocaleDateString('pt-BR')}</td>
                        <td>{item.horario}</td>
                        <td>{item.nome_servico}</td>
                        <td>
                            <button onClick={() => excluir(item.id_agendamento_feito)} className="excluir">Excluir</button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}