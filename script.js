// Array para armazenar os pedidos dos clientes
let pedidos = [];

// Função para registrar um pedido
function registrarPedido() {
    const nomeCliente = document.getElementById('nome').value;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    // Preços das pizzas
    const precos = {
        "Margherita": 30.00,
        "Pepperoni": 35.00,
        "Quattro Formaggi": 40.00,
        "Hawaiian": 38.00,
        "Veggie": 28.00
    };

    // Calculando o total do pedido
    let valorPedido = 0;
    const pizzasSelecionadas = [];

    checkboxes.forEach(checkbox => {
        pizzasSelecionadas.push(checkbox.value);
        valorPedido += precos[checkbox.value];
    });

    if (!nomeCliente || pizzasSelecionadas.length === 0) {
        alert('Por favor, preencha o nome do cliente e selecione pelo menos uma pizza.');
        return;
    }

    pedidos.push({ cliente: nomeCliente, pizzas: pizzasSelecionadas, valor: valorPedido });
    document.getElementById('mensagens').innerHTML += `<p>Pedido de ${pizzasSelecionadas.join(', ')} registrado para ${nomeCliente}!</p>`;
    
    // Limpar os campos após o registro
    document.getElementById('nome').value = '';
    checkboxes.forEach(checkbox => checkbox.checked = false); // Limpa as seleções
}

// Função para consultar pedidos
function consultarPedidos() {
    const mensagensDiv = document.getElementById('mensagens');
    mensagensDiv.innerHTML = '<h2>Pedidos Realizados:</h2>';
    
    if (pedidos.length === 0) {
        mensagensDiv.innerHTML += '<p>Nenhum pedido realizado até o momento.</p>';
    } else {
        let total = 0; // Variável para somar o total
        pedidos.forEach((pedido, index) => {
            mensagensDiv.innerHTML += `<p>${index + 1}. Cliente: ${pedido.cliente}, Pizzas: ${pedido.pizzas.join(', ')}, Total: R$ ${pedido.valor.toFixed(2)}</p>`;
            total += pedido.valor; // Soma o valor do pedido
        });
        mensagensDiv.innerHTML += `<p><strong>Total de Pedidos: R$ ${total.toFixed(2)}</strong></p>`;
    }
}

// Função para calcular troco
function calcularTroco() {
    const valorRecebido = parseFloat(document.getElementById('valorRecebido').value);
    
    const totalPedidos = pedidos.reduce((acc, pedido) => acc + pedido.valor, 0);
    
    if (isNaN(valorRecebido) || valorRecebido <= 0) {
        alert('Por favor, insira um valor recebido válido.');
        return;
    }
    
    const troco = valorRecebido - totalPedidos;
    
    if (troco < 0) {
        document.getElementById('troco').innerHTML = `Valor insuficiente! Faltam R$ ${Math.abs(troco).toFixed(2)} para cobrir o total.`;
    } else {
        document.getElementById('troco').innerHTML = `Troco: R$ ${troco.toFixed(2)}`;
    }
}
