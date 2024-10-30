import "./index.scss";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

export default function ListarServicosFeitos() {
    const [lista, setLista] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('TOKEN')) {
            navigate('/');
        } else {
            listarServicosFeitos();
        }
    }, [navigate]);

    async function listarServicosFeitos() {
        try {
            let token = localStorage.getItem('TOKEN');
            let resp = await axios.get(`${apiUrl}servicosFeitos`, {
                headers: { 'x-access-token': token }
            });
            setLista(resp.data);
        } catch (error) {
            console.error("Erro ao listar serviços:", error);
        }
    }

    async function excluir(id) {
        try {
            await axios.delete(`${apiUrl}servicosFeitos/${id}`);
            listarServicosFeitos();
        } catch (error) {
            console.error("Erro ao excluir serviço Feito:", error);
        }
    }

    function alterar(servf) {
        navigate('/admin/servicosFeitos', { state: { servf } });
    }

    return (
        <div className="tabela">
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Imagem Serviço Feito</th>
                    <th>Nome Serviço Feito</th>
                    <th>Alterar</th>
                    <th>Excluir</th>
                </tr>
                </thead>
                <tbody>
                {lista.map(item => (
                    <tr key={item.id_servico_feito}>
                        <td>{item.id_servico_feito}</td>
                        <td>
                            <img src={item.imagem_servico_feito} alt={item.nome_servico_feito} style={{ width: '50px', height: '50px' }} />
                        </td>
                        <td>{item.nome_servico_feito}</td>
                        <td>
                            <button onClick={() => alterar(item)} className="alterar">Alterar</button>
                        </td>
                        <td>
                            <button onClick={() => excluir(item.id_servico_feito)} className="excluir">Excluir</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
