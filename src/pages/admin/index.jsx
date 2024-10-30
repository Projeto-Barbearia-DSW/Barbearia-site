import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Admin() {
    const navigate = useNavigate();
    const [iframeSrc, setIframeSrc] = useState('/admin/agendamentos');

    useEffect(() => {
        if (!localStorage.getItem('TOKEN')) {
            navigate('/');
        }
    }, [navigate]);

    function logoff() {
        localStorage.removeItem('TOKEN');
        navigate('/');
    }

    return (
        <div className="pagina-home">
            <div className="cabecalho">
                <header>
                    <div className="imagenzinha">
                        <Link to='/Login' className="login">
                            <img src="/assets/logo.svg" alt="Logo" />
                        </Link>
                    </div>
                    <nav className="nav-menu-adm">
                        <ul>
                            <button onClick={logoff}> Sair</button>
                            <li><a href="#agendamentos" onClick={() => setIframeSrc('/admin/agendamentos')}>Agendamentos</a></li>
                            <li><a href="#servicos" onClick={() => setIframeSrc('/admin/servicos')}>Serviços</a></li>
                            <li><a href="#servicos-feitos" onClick={() => setIframeSrc('/admin/servicosfeitos')}>Serviços Feitos</a></li>
                        </ul>
                    </nav>
                </header>
            </div>
            <h1 className="titulo">Faculdade</h1>

            <div className="opcoes-container">
                <Link to='/admin/agendamentos' className="opcao" onClick={() => setIframeSrc('/admin/agendamentos')}>
                    <span>Agendamentos</span>
                </Link>
                <Link to='/admin/servicos' className="opcao" onClick={() => setIframeSrc('/admin/servicos')}>
                    <span>Serviços</span>
                </Link>
                <Link to='/admin/servicosfeitos' className="opcao" onClick={() => setIframeSrc('/admin/servicosfeitos')}>
                    <span>Serviços Feitos</span>
                </Link>
            </div>

            <iframe src={iframeSrc} title="Admin Content" className="iframe-content" />
        </div>
    );
}
