document.addEventListener('DOMContentLoaded', function () {
    const nomeUsuario = sessionStorage.getItem('nomeUsuario');
    const elementoNomeUsuario = document.getElementById('link-usuario');
    const elementoNomeUsuario2 = document.getElementById('link-usuario2');

    elementoNomeUsuario.innerText = nomeUsuario;
    elementoNomeUsuario2.innerText = nomeUsuario;

    const usuarioId = sessionStorage.getItem('usuarioId');
    carregarItens(usuarioId, 1);
});

let totalPages = 0;
let currentPage = 1;
const itemsPerPage = 10; // Número de itens por página


// Função para carregar os itens na tabela
function carregarItens(usuarioId, page) {
    const tabelaCorpo = document.getElementById('tabelaCorpo');
    tabelaCorpo.innerHTML = '';
    const endpoint = `http://localhost:8080/item/usuario/${usuarioId}?page=${page - 1}&size=${itemsPerPage}`;

    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível obter os dados dos itens.');
            }
            return response.json();
        })

        .then(data => {
            // Verifique se o objeto data possui uma propriedade chamada 'content'
            if (data.hasOwnProperty('content')) {
                const itens = data.content;

                // Agora você pode iterar sobre os itens
                itens.forEach(item => {
                    tabelaCorpo.appendChild(adicionarLinha(item.produto, item.dataCompra, item.valor, item.descricao));
                });

                totalPages = data.totalPages;
                currentPage = page;
                document.getElementById('page-number').innerText = currentPage;


            } else {
                console.error("Resposta da API não possui a propriedade 'content'.");
            }
        })
        .catch(error => {
            console.error('Ocorreu um erro ao tentar obter os itens:', error.message);
        });
}

function adicionarLinha(produto, data, valor, descricao) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
                        <td><input type="text" class="form-control" value="${produto}" disabled></td>
                        <td><input type="text" class="form-control" value="${formatarData(data)}" disabled></td>
                        <td><input type="text" class="form-control" value="${valor}" disabled></td>
                        <td>
                          <div class="dropdown" >
                             <div class="d-flex justify-content-center align-items-center">
                                <button class="botao-mais-descricao"
                                    data-bs-toggle="dropdown"><i id="icon-mais-descricao"
                                        class="bi bi-plus-circle"></i>
                                </button>
                                <ul class="dropdown-menu" id="teste-botao">
                                    <li>
                                        ${descricao || 'Não possui descrição'}
                                    </li>
                                </ul>
                            </div> 
                         </div> 
                        </td> 
                    `;
    return novaLinha;
}

const nextPageButton = document.getElementById('next-page');
if (nextPageButton) {
    nextPageButton.disabled = currentPage === totalPages;
    nextPageButton.addEventListener('click', function (event) {
        event.preventDefault();

        if (currentPage < totalPages) { // Verifica se há uma próxima página
            carregarItens(sessionStorage.getItem('usuarioId'), currentPage + 1);
        }

    });
}


const prevPageButton = document.getElementById('prev-page');
if (prevPageButton) {

    prevPageButton.disabled = currentPage === 1;
    prevPageButton.addEventListener('click', function (event) {
        event.preventDefault();

        if (currentPage > 1) { // Verifica se há uma página anterior
            carregarItens(sessionStorage.getItem('usuarioId'), currentPage - 1);
        }

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

