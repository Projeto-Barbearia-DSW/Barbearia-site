import './index.scss';

export default function Servicos(props) {
    // Verifica se a prop `valor` foi passada
    const hasValor = props.valor !== undefined;

    return (
        <div className="pagina-servico">
            <div className="imagem-container">
                <img src={props.imagem} alt={props.titulo} />
            </div>

            {hasValor ? (
                // Caso `props.valor` esteja presente, separa o conteúdo
                <div className="info-container distribuido">
                    <h2 className="titulo-servico">{props.titulo}</h2>
                    <div className="valor-servico">
                        <span>{props.valor}</span>
                    </div>
                </div>
            ) : (
                // Caso `props.valor` não esteja presente, centraliza o conteúdo
                <div className="info-container centralizado">
                    <h2 className="titulo-servico">{props.titulo}</h2>
                </div>
            )}
        </div>
    );
}