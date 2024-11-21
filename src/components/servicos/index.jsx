import './index.scss';

export default function Servicos(props) {
    const hasValor = props.valor !== undefined;

    return (
        <div className="pagina-servico">
            <div className="imagem-container">
                <img src={props.imagem} alt={props.titulo} />
            </div>

            {hasValor ? (
                <div className="info-container distribuido">
                    <h2 className="titulo-servico">{props.titulo}</h2>
                    <div className="valor-servico">
                        <span>{props.valor}</span>
                    </div>
                </div>
            ) : (
                <div className="info-container centralizado">
                    <h2 className="titulo-servico">{props.titulo}</h2>
                </div>
            )}
        </div>
    );
}