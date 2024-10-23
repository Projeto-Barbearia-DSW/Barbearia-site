import './index.scss';

export default function Servicos(props) {
    return (
        <div className="pagina-servico">
            <div className="imagem-container">
                <img src={props.imagem} alt={props.titulo} />
            </div>
            <div className="info-container">
                <h2 className="titulo-servico">{props.titulo}</h2>
                <div className="valor-servico">
                    <span>R$ {props.valor}</span>
                </div>
            </div>
        </div>
    );
}
