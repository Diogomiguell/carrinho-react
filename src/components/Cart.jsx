import React, { useState } from 'react';
import '../assets/style.css';

const Cart = () => {
    const [carrinho, setCarrinho] = useState([]);
    const [nomeItem, setNomeItem] = useState('');
    const [quantidadeItem, setQuantidadeItem] = useState(1);
    const [precoItem, setPrecoItem] = useState(0);
    const [codigoDesconto, setCodigoDesconto] = useState('');
    const [total, setTotal] = useState(0);

    const adicionarItem = () => {
      const itemExistente = carrinho.find(item => item.nome === nomeItem);
      if (itemExistente) {
        itemExistente.quantidade += quantidadeItem;
        setCarrinho([...carrinho]);
      } else {
        const novoItem = { nome: nomeItem, quantidade: quantidadeItem, preco: precoItem };
        setCarrinho([...carrinho, novoItem]);
      }
      setNomeItem('');
      setQuantidadeItem(1);
      setPrecoItem(0);
      atualizarTotal();
    };

    const removerItem = (index) => {
      const novosItens = carrinho.filter((_, i) => i !== index);
      setCarrinho(novosItens);
      atualizarTotal();
    };

    const atualizarTotal = async () => {
      let novoTotal = carrinho.reduce((acc, item) => acc + item.quantidade * item.preco, 0);
      if (codigoDesconto === 'DESC10') {
        novoTotal *= 0.9;
      } else if (codigoDesconto === 'DESC20') {
        novoTotal *= 0.8;
      }
      setTotal(novoTotal);
    };

    const aplicarDesconto = () => {
      atualizarTotal();
    };

    return (
      <div className="container">
        <h1>Carrinho de Compras</h1>

        <div>
          <h2>Adicionar Item</h2>
          <input
            type="text"
            value={nomeItem}
            onChange={(e) => setNomeItem(e.target.value)}
            placeholder="Nome do produto"
          />
          <input
            type="number"
            value={quantidadeItem}
            onChange={(e) => setQuantidadeItem(Number(e.target.value))}
            placeholder="Quantidade"
            min="1"
          />
          <input
            type="number"
            value={precoItem}
            onChange={(e) => setPrecoItem(Number(e.target.value))}
            placeholder="Preço unitário"
          />
          <button onClick={adicionarItem}>Adicionar</button>
        </div>

        <div>
          <h2>Aplicar Desconto</h2>
          <input
            type="text"
            value={codigoDesconto}
            onChange={(e) => setCodigoDesconto(e.target.value)}
            placeholder="Código do desconto"
          />
          <button onClick={aplicarDesconto}>Aplicar Desconto</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço Unitário</th>
              <th>Subtotal</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody>
            {carrinho.map((item, index) => (
              <tr key={index}>
                <td>{item.nome}</td>
                <td>{item.quantidade}</td>
                <td>{item.preco}</td>
                <td>{item.quantidade * item.preco}</td>
                <td>
                  <button id="btnRemove" onClick={() => removerItem(index)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Total: R$ {total.toFixed(2)}</h3>
      </div>
    );
}

export default Cart;