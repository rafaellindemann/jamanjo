
let filtrados = vacinas // mostra os recursos que atendem os filtros aplicados

let filtros = []

function limparTodosFiltros(){
    filtros = []
    document.getElementById('btCurso Youtube').setAttribute('class','botao')
    document.getElementById('btCanal Youtube').setAttribute('class','botao')
    document.getElementById('btCurso').setAttribute('class','botao')
    document.getElementById('btSites').setAttribute('class','botao')
    document.getElementById('btCarreira').setAttribute('class','botao')
    document.getElementById('btJogos').setAttribute('class','botao')
    document.getElementById('btRepositórios').setAttribute('class','botao')
    document.getElementById('btImagens').setAttribute('class','botao')
    document.getElementById('btFerramentas').setAttribute('class','botao')
    document.getElementById('btLivros').setAttribute('class','botao')
    document.getElementById('btExercícios').setAttribute('class','botao')
    document.getElementById('btFóruns').setAttribute('class','botao')
    document.getElementById('btPodcasts').setAttribute('class','botao')
    document.getElementById('btRedes').setAttribute('class','botao')
    document.getElementById('btBalaio').setAttribute('class','botao')


    //att tela?
}

function tratarCliqueCategorias(clicado){ 
    if(filtros.length == 0){ 
        filtros.push(clicado)
        document.getElementById('bt' + clicado).setAttribute('class','botaoClicado')

    }else if(filtros.includes(clicado)){
        limparTodosFiltros();
    }else if(!filtros.includes(clicado)){
        limparTodosFiltros()
        filtros.push(clicado)
        document.getElementById('bt' + clicado).setAttribute('class','botaoClicado')
    }

    if(filtros.length > 0){
        filtrados = vacinas.filter( (reg) => reg.categoria == filtros[0])
    }else{
        filtrados = vacinas
    }
    escreverRegistrosNaTela()
}

function escreverRegistro(reg){
    // document.getElementById('mainRegistros').innerHTML += reg
    // {nome: '', categoria: '', descricao: '', link: '', tags: []},
    let main = document.getElementById('mainRegistros')

    let texto = document.createTextNode(reg.nome)
    let nome = document.createElement('h2')
    nome.appendChild(texto)

    texto = document.createTextNode('Categoria: ' + reg.categoria)
    let categoria = document.createElement('p')
    categoria.appendChild(texto)
    
    texto = document.createTextNode(reg.descricao)
    let descricao = document.createElement('p')
    descricao.appendChild(texto)

    texto = document.createTextNode('Acessar recurso')
    let link = document.createElement('a')
    link.appendChild(texto)
    link.setAttribute('href', reg.link)
    link.setAttribute('class', 'linkRecurso')
    link.setAttribute('target', '_blank')

    texto = document.createTextNode('#: ' + reg.tags.join(', '))
    let tags = document.createElement('p')
    tags.appendChild(texto)
    tags.setAttribute('class', 'tags')

    let baixo = document.createElement('div')
    baixo.appendChild(tags)
    baixo.appendChild(link)
    baixo.setAttribute('class', 'tagLink')
    
    let artigo = document.createElement('article')
    artigo.appendChild(nome)
    artigo.appendChild(descricao)
    artigo.appendChild(categoria)
    artigo.appendChild(baixo)
    artigo.setAttribute('class', 'artigo')

    main.appendChild(artigo)
}

function escreverRegistrosNaTela(){
    atualizarFiltrosAplicados();
    document.getElementById('mainRegistros').innerHTML = ''
    filtrados.map((vacina) => escreverRegistro(vacina))

    document.getElementById('divStats').innerHTML = filtrados.length + '/' + vacinas.length
}

function aplicarFiltroCategorias(){
    filtrados = filtrados.filter( (reg) => reg.categoria == filtros[0])
}

function atualizarFiltrosAplicados(){
    if(filtros.length == 0){
        filtrados = vacinas
    }else{
        aplicarFiltroCategorias()
    }
}

function mostrarModal(){
    document.getElementById('modContribuicao').showModal();
}

function fecharModal(){
    document.getElementById('modContribuicao').close();
}

function carregarHome(){
    limparTodosFiltros();
    escreverRegistrosNaTela();
}

window.onload = escreverRegistrosNaTela()