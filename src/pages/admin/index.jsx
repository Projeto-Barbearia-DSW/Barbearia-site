import './index.scss';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

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
        <div className={"pagina-home-admin"}>
            <div className={"cabecalho"}>
                <header>
                    <div className="imagenzinha">
                        <img src="/assets/logo.svg" alt="Logo"/>
                    </div>
                    <nav className="nav-menu-adm">
                        <ul>
                            <li><a href="#agendamentos" onClick={() => setIframeSrc('/admin/agendamentos')}>Agendamentos</a></li>
                            <li><a href="#servicos" onClick={() => setIframeSrc('/admin/servicos')}>Serviços</a></li>
                            <li><a href="#servicos-feitos" onClick={() => setIframeSrc('/admin/servicosfeitos')}>Serviços
                                Feitos</a></li>
                        </ul>
                    </nav>
                    <div className="action-button">
                        <button onClick={logoff}> Sair</button>
                    </div>
                </header>
            </div>
            <iframe src={iframeSrc} title="Admin Content" className="iframe-content"/>
        </div>
    );
}
