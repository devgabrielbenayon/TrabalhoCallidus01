import React from 'react';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';
import 'react-tooltip/dist/react-tooltip.css';

const TabelaLivros = ({livros, removerLivro}) => {

  const confirmarRemocao = (livro)=>{
    if(window.confirm("Deseja realmente remover o livro?")){
        removerLivro(livro)
  }

  const tooltipStyle = {
    backgroundColor:"f9f9f9",
    color:"#333",
    border: "1px solid #ddd",
    padding: "8px 12px",
    fontSize:"0.85rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

  return (
    <div className='livros'>
        <h1>Tabela de livros</h1>
        {livros.length === 0 ?(
            <h2>Nenhum livro cadastrado!</h2>
        ):(
            <table className='tabela'>
                <thead>
                    <tr>
                        <th width="17%">ISBN</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th width="7%"></th>
                        <th width="9%"></th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro)=>(
                        <tr key={livro.isbn}>
                            <td>{livro.isbn}</td>
                            <td>{livro.titulo}</td>
                            <td>{livro.autor}</td>
                            <td>
                                <Link
                                    to={`/editar/${livro.isbn}`}
                                    className='botao editar'
                                    data-tooltip-id={`tooltip-editar-${livro.id}`}
                                    data-tooltip-content="Editar informações do livro"
                                >
                                    Editar
                                </Link>
                                <Tooltip
                                    id={`tooltip-editar-${livro.id}`}
                                    place='top'
                                    style={tooltipStyle}
                                />
                            </td>
                            <td>
                                <button
                                    className='botao remover'
                                    data-tooltip-id={`tooltip-remover-${livro.id}`}
                                    data-tooltip-content="Remover este livro da lista"
                                    onClick={()=>confirmarRemocao(livro)}
                                >
                                    Remover
                                </button>
                                <Tooltip
                                    id={`tooltip-remover-${livro.id}`}
                                    place='top'
                                    style={tooltipStyle}
                                />
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
        )}      
    </div>
  );
};
}

export default TabelaLivros;