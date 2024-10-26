import './index.scss';
import Servicos from "../../components/servicos";
import {Link} from 'react-router-dom';

export default function Home() {

    return (
        <div className={"pagina-home"}>
            <div className={"cabecalho"}>
                <header>
                    <div className="logo">
                        <Link to='/Login' className="login">
                            <img src={"/assets/logo.svg"} alt="Logo"/>
                        </Link>
                    </div>
                    <nav className="nav-menu">
                        <ul>
                            <li><a href="#inicio">Início</a></li>
                            <li><a href="#servicos">Serviços</a></li>
                            <li><a href="#servicos-feitos">Serviços Feitos</a></li>
                            <li><a href="#planos">Planos</a></li>
                            <li><a href="#quimica-coloracao">Química e Coloração</a></li>
                            <li><a href="#localizacao">Localização</a></li>
                            <li><a href="#sobre">Sobre</a></li>
                        </ul>
                    </nav>
                    <div className="action-button">
                        <Link to='/Agendamento' className="opcao">
                            <button>Agendar Horário</button>
                        </Link>
                    </div>
                </header>
            </div>

            <div className={"secao1"} id="inicio">
                <section>
                    <div className="titulo">
                        <h1>ESTILO É UM REFLEXO DA SUA ATITUDE E SUA PERSONALIDADE</h1>
                    </div>
                    <div className="descricao">
                        <p>Horário de funcionamento: 09:00 às 22:00</p>
                    </div>
                    <div className="action-button">
                        <button>Agendar Horário</button>
                    </div>
                </section>
            </div>

            <div className={"secao2"} id="servicos">
                <section>
                    <div className="titulo">
                        <h1>Serviços</h1>
                    </div>
                    <div className="servicos">
                        <Servicos
                            titulo="Corte de Cabelo"
                            imagem="/assets/corte-de-cabelo.svg"
                            valor="R$ 40,00"
                        />
                        <Servicos
                            titulo="Barba"
                            imagem="/assets/penteado.svg"
                            valor="R$ 30,00"
                        />
                        <Servicos
                            titulo="Penteado"
                            imagem="/assets/barba.svg"
                            valor="R$ 50,00"
                        />
                    </div>
                </section>
            </div>

            <div className={"secao3"} id="servicos-feitos">
                <section>
                    <div className="titulo">
                        <h1>Serviços Feitos</h1>
                    </div>
                    <div className="servicos">
                        <Servicos
                            titulo="Corte de Cabelo"
                            imagem="/assets/corte-de-cabelo.svg"
                        />
                        <Servicos
                            titulo="Barba"
                            imagem="/assets/barba.svg"
                        />
                        <Servicos
                            titulo="Penteado"
                            imagem="/assets/penteado.svg"
                        />
                    </div>
                </section>
            </div>

            <div className="secao4" id="planos">
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
                            titulo="R$ 40,00"
                            imagem="/assets/promocao-1.svg"
                        />
                        <Servicos
                            titulo="R$ 30,00/mês"
                            imagem="/assets/promocao-2.svg"
                        />
                        <Servicos
                            titulo="R$ 115,00/mês"
                            imagem="/assets/promocao-2.svg"
                        />
                    </div>
                </section>
            </div>

            <div className={"secao5"} id="quimica-coloracao">
                <section>
                    <div className="titulo">
                        <h1>Química e Coloração</h1>
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
                                <td>R$ 60,00</td>
                            </tr>
                            <tr>
                                <td>Alisamento ou relaxante</td>
                                <td>R$ 25,00</td>
                            </tr>
                            <tr>
                                <td>Botox</td>
                                <td>R$ 70,00</td>
                            </tr>
                            <tr>
                                <td>Progressiva</td>
                                <td>R$ 70,00</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            <div className={"secao6"} id="localizacao">
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

                    <div className="mapa">
                        <iframe
                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Centro%20Universitario%20Senac&zoom=15&maptype=roadmap"
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen="false"
                            loading="lazy"
                            draggable="false"
                            tabIndex="0"
                            title="Mapa da Localização da Barbearia"
                        ></iframe>
                    </div>
                </section>
            </div>

            <div className={"secao7"} id="sobre">
                <section>
                    <div className={"imagens"}>
                        <img className={"barber1"} src="/assets/barbeiro1.svg" alt="Barbeiro 1" />
                        <img className={"barber2"} src="/assets/barbeiro2.svg" alt="Barbeiro 2" />
                        <img className={"barber3"} src="/assets/barbeiro3.svg" alt="Barbeiro 3" />
                    </div>
                    <div className={"textos"}>
                        <div className="titulo">
                            <h1>Sobre</h1>
                        </div>
                        <div className="descricao">
                            <p>Bem-vindo à nossa barbearia, onde estilo e tradição se encontram!</p>

                            <p>Desde o nosso início, temos nos dedicado a criar um espaço acolhedor.
                                Nossa equipe é composta por barbeiros experientes, cada um trazendo seu próprio estilo e
                                expertise. Aqui, acreditamos que um bom corte ou um barbear bem feito vai além da estética; é um ritual
                                de cuidado e autoestima.
                            </p>

                            <p>Acreditamos que cada cliente é único, e por isso, oferecemos um atendimento personalizado.
                                Nossa abordagem vai além dos serviços; buscamos entender suas necessidades e preferências,
                                garantindo que você saia da nossa barbearia não apenas satisfeito, mas verdadeiramente renovado.
                            </p>

                            <p>Estamos sempre prontos para recebê-lo de braços abertos! Se você procura um lugar onde
                                tradição e inovação andam lado a lado,
                                a nossa barbearia é o seu destino. Junte-se a nós e descubra o prazer de um bom corte e um
                                atendimento excepcional.
                                Esperamos vê-lo em breve!
                            </p>
                            <div className="horario">
                                <p><strong>Horário de funcionamento: 09:00 às 22:00</strong></p>
                                <img src={"/assets/whatsapp.svg"} alt={"logo Whatsapp"} />
                            </div>
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
                            <img src="/assets/logo.svg" alt="Logo Barbearia" className="footer-logo" />
                            <div className="social-icons">
                                <img src="/assets/whatsapp-f.svg" alt="Icone 1"/>
                                <img src="/assets/instagram-f.svg" alt="Icone 2"/>
                                <img src="/assets/facebook-f.svg" alt="Icone 3"/>
                            </div>
                            <p>Av. Eng. Eusébio Stevaux, 823 - Santo Amaro, São Paulo - SP, 04696-000</p>
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