import './index.scss';
import {Link, useNavigate} from 'react-router-dom';
import { useEffect } from 'react'

export default function Admin() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('TOKEN') === null || localStorage.getItem('TOKEN') === undefined) {
            navigate('/');
        }
    }, []);

    function logoff() {
        localStorage.removeItem('TOKEN');
        navigate('/');
    }



    return (
        <div className="pagina-home">
            <button onClick={logoff}> Sair</button>
            <h1 className="titulo">Faculdade</h1>

            <div className="opcoes-container">
                <Link to='/admin/agendamentos' className="opcao">
                    <span>Agendamentos</span>
                </Link>
            </div>
        </div>
    );
}
