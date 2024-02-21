document.addEventListener('DOMContentLoaded', function () {
    const nomeUsuario = sessionStorage.getItem('nomeUsuario');
    const elementoNomeUsuario = document.getElementById('link-usuario');
    const elementoNomeUsuario2 = document.getElementById('link-usuario2');

    elementoNomeUsuario.innerText = nomeUsuario;
    elementoNomeUsuario2.innerText = nomeUsuario;

    const usuarioId = sessionStorage.getItem('usuarioId');
    carregarItens(usuarioId, 1, 0, 0); // Adicione os parâmetros para mês e setor
    mostrarSaldoTotal(usuarioId, 0, 0);

    // Adicione o código para lidar com os filtros
    const filtroMes = document.getElementById('filtro-mes');
    const filtroSetor = document.getElementById('filtro-setor');

    filtroMes.addEventListener('change', function () {
        filtroMesSelecionado = parseInt(filtroMes.value);
        carregarItens(sessionStorage.getItem('usuarioId'), 1, filtroMesSelecionado, parseInt(filtroSetor.value));
        mostrarSaldoTotal(usuarioId, filtroMesSelecionado, parseInt(filtroSetor.value));
    });

    filtroSetor.addEventListener('change', function () {
        filtroSetorSelecionado = parseInt(filtroSetor.value);
        carregarItens(sessionStorage.getItem('usuarioId'), 1, parseInt(filtroMes.value), filtroSetorSelecionado);
        mostrarSaldoTotal(usuarioId, parseInt(filtroMes.value), filtroSetorSelecionado);
    });

  
});



let filtroMesSelecionado;
let filtroSetorSelecionado;
let totalPages = 0;
let currentPage = 1;
const itemsPerPage = 10; // Número de itens por página


function mostrarSaldoTotal(usuarioId, mes, setor) {
    const endpoint = `http://localhost:8080/item/saldo/${usuarioId}`;
    let queryParams = '';

    if (mes !== undefined && mes !== 0) {
        filtroMesSelecionado = mes;
        queryParams += `?mes=${mes}`;
    }
    if (setor !== undefined && setor !== 0) {
        filtroSetorSelecionado = setor;
        queryParams += `${queryParams ? '&' : '?'}setor=${setor}`;
    }

    const urlCompleta = `${endpoint}${queryParams}`;

    fetch(urlCompleta)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao obter saldo total: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data !== undefined) {
                const saldoTotalFormatted = parseFloat(data).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                document.getElementById('input-valor-total').value = `R$ ${saldoTotalFormatted}`;
            } else {
                throw new Error('Resposta do servidor não contém um valor definido.');
            }
        })
        .catch(error => {
            console.error('Erro:', error.message);
        });
}


// Função para carregar os itens na tabela
function carregarItens(usuarioId, page, mes, setor) {
    const tabelaCorpo = document.getElementById('tabelaCorpo');
    tabelaCorpo.innerHTML = '';
    let endpoint = `http://localhost:8080/item/usuario/${usuarioId}?page=${page - 1}&size=${itemsPerPage}`;

    if (mes !== undefined && mes !== 0) {
        endpoint += `&mes=${mes}`;
    }
    if (setor !== undefined && setor !== 0) {
        endpoint += `&setor=${setor}`;
    }
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
    const valorFormatted = parseFloat(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    novaLinha.innerHTML = `
                        <td id="td-produto"><input id="input-produto" type="text" class="form-control" value="${produto}" disabled></td>
                        <td id="td-data"><input id="input-data" type="text" class="form-control" value="${formatarData(data)}" disabled></td>
                        <td id="td-valor"><input id="input-valor" type="text" class="form-control" value="R$ ${valorFormatted}" disabled></td>
                        <td>
                          <div class="dropdown">
                             <div class="d-flex justify-content-center align-items-center">
                                <button class="botao-mais-descricao"
                                    data-bs-toggle="dropdown"><i id="icon-mais-descricao"
                                        class="bi bi-plus-circle"></i>
                                </button>
                                <ul id="dropdown-desc" class="dropdown-menu">
                                    <li>
                                        ${descricao || 'Não possui descrição'}
                                    </li>
                                    <li><button> Alterar Item</button>
                                   
                                    </li>
                                    <li>
                                    <button> Deletar Item</button>
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
    nextPageButton.style.cursor = currentPage === totalPages ? 'default' : 'pointer';

    nextPageButton.addEventListener('click', function (event) {
        event.preventDefault();

        if (currentPage < totalPages) {
            carregarItens(sessionStorage.getItem('usuarioId'), currentPage + 1, filtroMesSelecionado, filtroSetorSelecionado);
            currentPage += 1; // Atualiza a variável currentPage
            updateCursorStyle(); // Atualiza o estilo do cursor após mudar de página
        }
    });
}

const prevPageButton = document.getElementById('prev-page');
if (prevPageButton) {
    prevPageButton.disabled = currentPage === 1;
    prevPageButton.style.cursor = currentPage === 1 ? 'default' : 'pointer';

    prevPageButton.addEventListener('click', function (event) {
        event.preventDefault();

        if (currentPage > 1) {
            carregarItens(sessionStorage.getItem('usuarioId'), currentPage - 1, filtroMesSelecionado, filtroSetorSelecionado);
            currentPage -= 1; // Atualiza a variável currentPage
            updateCursorStyle(); // Atualiza o estilo do cursor após mudar de página
        }
    });
}

function updateCursorStyle() {
    const nextPageButton = document.getElementById('next-page');
    const prevPageButton = document.getElementById('prev-page');

    if (nextPageButton) {
        nextPageButton.disabled = currentPage === totalPages;
        nextPageButton.style.cursor = currentPage === totalPages ? 'default' : 'pointer';
    

    }

    if (prevPageButton) {
        prevPageButton.disabled = currentPage === 1;
        prevPageButton.style.cursor = currentPage === 1 ? 'default' : 'pointer';
       
    }
}

// FORMATA A DATA PARA APARECER CONFORME O EXEMPLO : 02/02/2024, COM "0" EM NÚMEROS UNITÁRIOS.
function formatarData(dataArray) {
    const [ano, mes, dia] = dataArray;
    const mesFormatado = mes.toString().padStart(2, '0');
    const diaFormatado = dia.toString().padStart(2, '0');

    // FORMATA A DATA PARA APARECER CONFORME O EXEMPLO: 02/02/24, SEM O "20" DO ANO.
    if (window.innerWidth <= 460) {
        // Formata a data para "DD/MM/YY"
        return `${diaFormatado}/${mesFormatado}/${ano.toString().slice(-2)}`;
        
    } else {
        return `${diaFormatado}/${mesFormatado}/${ano}`;
    }
       
}




// Função para verificar e ocultar o menu lateral em telas menores
function hideMenuOnSmallScreens() {
    var screenWidth = window.innerWidth;
    var menuLateral = document.getElementById('menuLateral');
    var menuSUPERIOR = document.getElementById('menuSUPERIOR');
    var reduzirDescricaoParaDesc = document.getElementById('reduzir-descricao-para-desc');


    if (screenWidth <= 460) { // Se a largura da tela for 460 pixels ou menos
        menuLateral.style.display = 'none'; // Oculta o menu lateral
        menuSUPERIOR.style.display = 'block';
        reduzirDescricaoParaDesc.innerText = 'Desc';


    } else {
        menuLateral.style.display = 'block'; // Exibe o menu lateral
        menuSUPERIOR.style.display = 'none';
        reduzirDescricaoParaDesc.innerText = 'Descrição';
    }
}

// Chama a função quando a página é carregada e quando a janela é redimensionada
window.onload = hideMenuOnSmallScreens;
window.onresize = hideMenuOnSmallScreens;

function stopPropagation(event) {
    event.stopPropagation();
}