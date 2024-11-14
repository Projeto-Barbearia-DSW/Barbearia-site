import "./index.scss";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";

const apiUrl = process.env.REACT_APP_API_URL;

export default function ListarServicos() {
    const [lista, setLista] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('TOKEN')) {
            navigate('/');
        } else {
            listarServicos();
        }
    }, [navigate]);

    async function listarServicos() {
        try {
            let token = localStorage.getItem('TOKEN');
            let resp = await axios.get(`${apiUrl}servico`, {
                headers: { 'x-access-token': token }
            });
            setLista(resp.data);
        } catch (error) {
            console.error("Erro ao listar serviços:", error);
        }
    }

    async function excluir(id) {
        try {
            await axios.delete(`${apiUrl}servico/${id}`);
            toast.success('Serviço excluído com sucesso!');
            listarServicos();
        } catch (error) {
            toast.error('Erro ao excluir serviço');
        }
    }

    function alterar(servico) {
        navigate('/admin/servicos', { state: { servico } });
    }

    return (
        <div className="tabela">
            <Toaster position="top-center" reverseOrder={false} />
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Imagem Serviço</th>
                    <th>Nome Serviço</th>
                    <th>Valor Serviço</th>
                    <th>Tempo Serviço</th>
                    <th>Alterar</th>
                    <th>Excluir</th>
                </tr>
                </thead>
                <tbody>
                {lista.map(item => (
                    <tr key={item.id_servico}>
                        <td>{item.id_servico}</td>
                        <td>
                            <img src={`${apiUrl}${item.imagem_servico}`} alt={item.nome_servico} style={{ width: '50px', height: '50px' }} />
                        </td>
                        <td>{item.nome_servico}</td>
                        <td>{item.valor_servico}</td>
                        <td>{item.tempo_servico}</td>
                        <td>
                            <button onClick={() => alterar(item)} className="alterar">Alterar</button>
                        </td>
                        <td>
                            <button onClick={() => excluir(item.id_servico)} className="excluir">Excluir</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
