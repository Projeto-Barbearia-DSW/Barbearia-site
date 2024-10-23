import './index.scss';
import Servicos from "../../components/servicos";

export default function Home() {
    return (
        <div className={"pagina-home"}>
            <div className={"cabecalho"}>
                <header>
                    <div className="logo">
                        <img src={"../../assets/logo.svg"} alt="Logo"/>
                    </div>
                    <nav className="nav-menu">
                        <ul>
                            <li><a>Inicio</a></li>
                            <li><a>Serviços</a></li>
                            <li><a>Serviços Feitos</a></li>
                            <li><a>Planos</a></li>
                            <li><a>Quimíca e coloração</a></li>
                            <li><a>Localização</a></li>
                            <li><a>Sobre</a></li>


                        </ul>
                    </nav>
                    <div className="action-button">
                        <button>Agendar Horário</button>
                    </div>
                </header>
            </div>

            <div className={"secao1"}>
                <section>
                    <div className="titulo">
                        <h1>ESTILO É UM REFLEXO DA SUA ATITUDE E SUA PERSONALIDADE</h1>
                    </div>
                    <div className="descricao">
                        <p>Horário de funcionamento: 09:00 ás 22:00</p>
                    </div>
                    <div className="action-button">
                        <button>Agendar Horário</button>
                    </div>
                </section>
            </div>

            <div className={"secao2"}>
                <section>
                    <div className="titulo">
                        <h1>NOSSOS SERVIÇOS</h1>
                    </div>
                    <div className="servicos">
                        <Servicos
                            titulo="Corte de Cabelo"
                            imagem="../../assets/corte-de-cabelo.svg"
                            valor="R$ 40,00"
                        />
                        <Servicos
                            titulo="Barba"
                            imagem="../../assets/barba.jpg"
                            valor="R$ 30,00"
                        />
                        <Servicos
                            titulo="Penteado"
                            imagem="../../assets/penteado.jpg"
                            valor="R$ 50,00"
                        />
                    </div>
                </section>
            </div>

            <div className={"secao3"}>
                <section>
                    <div className="titulo">
                        <h1>SERVIÇOS FEITOS</h1>
                    </div>
                    <div className="servicos">
                        <Servicos
                            titulo="Corte de Cabelo"
                            imagem="src/assets/corte-de-cabelo.svg"
                        />
                        <Servicos
                            titulo="Barba"
                            imagem="../../assets/barba.jpg"
                        />
                        <Servicos
                            titulo="Penteado"
                            imagem="../../assets/penteado.jpg"
                        />
                    </div>
                </section>
            </div>

            <div className={"secao4"}>
                <section>
                    <div className="titulo">
                        <h1>PLANOS</h1>
                    </div>
                    <div className="descricao">
                        <p>Na nossa barbearia, cada cliente é especial e queremos que você tenha a melhor experiência possível.
                            Por isso, oferecemos uma variedade de planos fixos. Confira presencialmente em nossa loja e escolha a opção que melhor se
                            adapta às suas necessidades. Estamos ansiosos para recebê-lo e ajudar você a encontrar o plano perfeito!.
                        </p>
                    </div>
                    <div className="servicos">
                        <Servicos
                            valor="R$ 40,00"
                            imagem="src/assets/corte-de-cabelo.svg"
                        />
                        <Servicos
                            valor="R$ 30,00"
                            imagem="../../assets/barba.jpg"
                        />
                        <Servicos
                            valor="R$ 50,00"
                            imagem="../../assets/penteado.jpg"
                        />
                    </div>
                </section>
            </div>

            <div className={"secao5"}>
                <section>
                    <div className="titulo">
                        <h1>QUÍMICA E COLORAÇÃO</h1>
                    </div>
                    <div className="table-wrapper">
                        <table>
                            <thead>
                            <tr>
                                <th>Serviços</th>
                                <th>Valor</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Luzes</td>
                                <td>R$ 40,00</td>
                            </tr>
                            <tr>
                                <td>Alisamento</td>
                                <td>R$ 30,00</td>
                            </tr>
                            <tr>
                                <td>Progressiva</td>
                                <td>R$ 50,00</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            <div className={"secao6"}>
                <section>
                    <div className="titulo">
                        <h1>Localização</h1>
                    </div>
                    <div className="descricao">
                        <p>Estamos localizados no coração da cidade,
                            em um espaço aconchegante que combina tradição e modernidade.
                            Nossa barbearia fica na Av. Eng. Eusébio Stevaux,
                            823 em SP capital, um lugar de fácil acesso e com estacionamento próximo.</p>
                    </div>

                </section>
            </div>

            <div className={"secao7"}>
                <section>
                    <div className={"imagens"}>
                        <img src="../../assets/barbeiro1.svg" alt="Barbeiro 1"/>
                        <img src="../../assets/barbeiro2.svg" alt="Barbeiro 2"/>
                    </div>
                    <div className={"textos"}>
                        <div className="titulo">
                            <h1>Sobre</h1>
                        </div>
                        <div className="descricao">
                            <p>Bem-vindo à nossa barbearia, onde estilo e tradição se encontram!</p>

                            <p>Desde o nosso início, temos nos dedicado a criar um espaçoacolhedor.
                                Nossa equipe é composta por barbeiros experientes, cada um trazendo seu próprio estilo e
                                expertise.
                                Aqui, acreditamos que um bom corte ou um barbear bem feito vai além da estética—é um
                                ritual
                                de cuidado e autoestima.
                            </p>

                            <p>Acreditamos que cada cliente é único, e por isso, oferecemos um atendimento
                                personalizado.
                                Nossa abordagem vai além dos serviços; buscamos entender suas necessidades e
                                preferências,
                                garantindo que você saia da nossa barbearia não apenas satisfeito, mas verdadeiramente
                                renovado.
                            </p>

                            <p>Estamos sempre prontos para recebê-lo de braços abertos! Se você procura um lugar onde
                                tradição e inovação andam lado a lado,
                                a nossa barbearia é o seu destino. Junte-se a nós e descubra o prazer de um bom corte e
                                um
                                atendimento excepcional.
                                Esperamos vê-lo em breve!
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <div className={"rodape"}>
                <footer>
                    <div className="footer-container">
                        <div className="footer-column">
                            <h3>Contato</h3>
                            <p>(11) 98765-4321</p>
                            <p>brunaocareca@gmail.com</p>
                        </div>
                        <div className="footer-column logo-column">
                            <img src="../../assets/logo.svg" alt="Logo Barbearia" className="footer-logo"/>
                            <div className="social-icons">
                                <img src="" alt="Icone 1"/>
                                <img src="" alt="Icone 2"/>
                                <img src="" alt="Icone 3"/>
                            </div>
                            <p>Rua Exemplo, 123, Cidade</p>
                        </div>
                        <div className="footer-column">
                            <h3>Horário</h3>
                            <p>Segunda a Sábado</p>
                            <p>09:00 às 22:00</p>
                        </div>
                    </div>
                </footer>

            </div>

        </div>
    );
}