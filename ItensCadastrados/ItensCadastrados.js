document.addEventListener('DOMContentLoaded', function () {
    const nomeUsuario = sessionStorage.getItem('nomeUsuario');
    const elementoNomeUsuario = document.getElementById('link-usuario');
    const elementoNomeUsuario2 = document.getElementById('link-usuario2');

    elementoNomeUsuario.innerText = nomeUsuario;
    elementoNomeUsuario2.innerText = nomeUsuario;

    const usuarioId = sessionStorage.getItem('usuarioId');
    carregarItens(usuarioId);

});


// Função para carregar os itens na tabela
function carregarItens(usuarioId) {
    const tabelaCorpo = document.getElementById('tabelaCorpo');

    // Substitua 'SEU_ENDPOINT_AQUI' pelo seu endpoint real
    const endpoint = `http://localhost:8080/item/usuario/${usuarioId}`;

    // Faz uma solicitação HTTP GET para obter os itens do usuário
    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível obter os dados dos itens.');
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then(itens => {
            // Limpa a tabela
            tabelaCorpo.innerHTML = '';

            // Preenche a tabela com os dados dos itens
            itens.forEach(item => {
                const novaLinha = document.createElement('tr');
                novaLinha.innerHTML = `
                    <td><input type="text" class="form-control" value="${item.produto}" disabled></td>
                    <td><input type="text" class="form-control" value="${formatarData(item.dataCompra)}" disabled></td>
                    <td><input type="text" class="form-control" value="${item.valor}" disabled></td>
                   
                    <td>
                      <div class="dropdown" >
                                         
                         <div class="d-flex justify-content-center align-items-center">
                            <button class="botao-mais-descricao"
                                data-bs-toggle="dropdown"><i id="icon-mais-descricao"
                                    class="bi bi-plus-circle"></i>
                            </button>
                            <ul class="dropdown-menu" id="teste-botao">
                                <li>
                                    ${item.descricao || ''}
                                </li>
                            </ul>
                        </div> 
                     </div> 
                    </td>
                            
                    
                `;

                tabelaCorpo.appendChild(novaLinha);
            });
        })
        .catch(error => {
            console.error('Ocorreu um erro ao tentar obter os itens:', error.message);
        });
}

function formatarData(dataArray) {
    const [ano, mes, dia] = dataArray;
    // Adiciona zeros à esquerda para garantir dois dígitos para mês e dia
    const mesFormatado = mes.toString().padStart(2, '0');
    const diaFormatado = dia.toString().padStart(2, '0');
    return `${diaFormatado}/${mesFormatado}/${ano}`;
}

// Função para verificar e ocultar o menu lateral em telas menores
function hideMenuOnSmallScreens() {
    var screenWidth = window.innerWidth;
    var menuLateral = document.getElementById('menuLateral');
    var menuSUPERIOR = document.getElementById('menuSUPERIOR');


    if (screenWidth <= 460) { // Se a largura da tela for 460 pixels ou menos
        menuLateral.style.display = 'none'; // Oculta o menu lateral
        menuSUPERIOR.style.display = 'block';

    } else {
        menuLateral.style.display = 'block'; // Exibe o menu lateral
        menuSUPERIOR.style.display = 'none';
    }
}

// Chama a função quando a página é carregada e quando a janela é redimensionada
window.onload = hideMenuOnSmallScreens;
window.onresize = hideMenuOnSmallScreens;

function stopPropagation(event) {
    event.stopPropagation();
}

