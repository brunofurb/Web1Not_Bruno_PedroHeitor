// --- DADOS DO SISTEMA ---
// Pega os dados ou cria um array vazio se não tiver nada
var dadosSalvos = localStorage.getItem('gymrutz_dados');
var exercicios = [];

if (dadosSalvos != null) {
    exercicios = JSON.parse(dadosSalvos);
}

// --- NAVEGAÇÃO (JEITO MAIS SIMPLES) ---
function trocarTela(idDaTela) {
    // Pega todas as telas e esconde
    var todasAsTelas = document.querySelectorAll('.tela');
    for (var i = 0; i < todasAsTelas.length; i++) {
        todasAsTelas[i].style.display = 'none';
    }
    // Mostra só a que eu cliquei
    document.getElementById(idDaTela).style.display = 'block';
    
    // Atualiza os desenhos na tela
    desenharTabelas();
    fazerResumoCards();
}

// Configura os cliques dos botões do menu
var botoes = document.querySelectorAll('.link-menu');
for (var j = 0; j < botoes.length; j++) {
    botoes[j].onclick = function() {
        var secao = this.getAttribute('data-section');
        if (secao) {
            trocarTela('section-' + secao);
        }
    };
}

// --- SALVAR EXERCÍCIO (O CORAÇÃO DO SISTEMA) ---
document.getElementById('btnSalvar').onclick = function() {
    var nomeInput = document.getElementById('nome').value;
    var grupoInput = document.getElementById('grupo').value;
    var seriesInput = document.getElementById('series').value;
    var repsInput = document.getElementById('reps').value;
    var pesoInput = document.getElementById('peso').value;
    var idEdicao = document.getElementById('editId').value;

    if (nomeInput == "" || grupoInput == "") {
        alert("Preencha o nome e o grupo pelo menos!");
        return;
    }

    // Objeto do exercício
    var ex = {
        id: idEdicao ? idEdicao : Math.random(), // id maluco pra não repetir
        nome: nomeInput,
        grupo: grupoInput,
        series: seriesInput,
        reps: repsInput,
        peso: parseFloat(pesoInput) || 0
    };

    if (idEdicao != "") {
        // Se tem ID, eu procuro e substituo (EDIÇÃO)
        for (var k = 0; k < exercicios.length; k++) {
            if (exercicios[k].id == idEdicao) {
                exercicios[k] = ex;
            }
        }
        document.getElementById('editId').value = "";
    } else {
        // Se não tem ID, é NOVO
        exercicios.push(ex);
    }

    // Salva no navegador
    localStorage.setItem('gymrutz_dados', JSON.stringify(exercicios));
    
    // Limpa os campos
    document.getElementById('nome').value = "";
    document.getElementById('series').value = "";
    document.getElementById('reps').value = "";
    document.getElementById('peso').value = "";

    alert("Salvo com sucesso!");
    trocarTela('section-exercicios'); // Volta pra lista
};

// --- DESENHAR AS TABELAS ---
function desenharTabelas() {
    var tabelaHome = document.getElementById('homeTableBody');
    var tabelaLista = document.getElementById('mainTableBody');
    
    tabelaHome.innerHTML = "";
    tabelaLista.innerHTML = "";

    for (var i = 0; i < exercicios.length; i++) {
        var item = exercicios[i];
        
        // Coloca na tabela principal de exercícios
        var linha = "<tr>" +
            "<td>" + item.nome + "</td>" +
            "<td>" + item.grupo + "</td>" +
            "<td>" + item.series + "</td>" +
            "<td>" + item.reps + "</td>" +
            "<td>" + item.peso + "kg</td>" +
            "<td>" +
                "<button onclick='editarExercicio(" + item.id + ")'>Editar</button>" +
                "<button onclick='apagarExercicio(" + item.id + ")'>X</button>" +
            "</td>" +
        "</tr>";
        
        tabelaLista.innerHTML += linha;

        // Se for um dos últimos 3, bota na Home também
        if (i >= exercicios.length - 3) {
            tabelaHome.innerHTML += linha;
        }
    }
}

// --- CARDS DE STATUS (DASHBOARD) ---
function fazerResumoCards() {
    document.getElementById('statTotal').innerHTML = exercicios.length;
    
    var maiorPeso = 0;
    for (var i = 0; i < exercicios.length; i++) {
        if (exercicios[i].peso > maiorPeso) {
            maiorPeso = exercicios[i].peso;
        }
    }
    document.getElementById('statMaxPeso').innerHTML = maiorPeso + "kg";
}

// --- APAGAR E EDITAR ---
function apagarExercicio(id) {
    if (confirm("Vai apagar mesmo?")) {
        var novaLista = [];
        for (var i = 0; i < exercicios.length; i++) {
            if (exercicios[i].id != id) {
                novaLista.push(exercicios[i]);
            }
        }
        exercicios = novaLista;
        localStorage.setItem('gymrutz_dados', JSON.stringify(exercicios));
        desenharTabelas();
    }
}

function editarExercicio(id) {
    for (var i = 0; i < exercicios.length; i++) {
        if (exercicios[i].id == id) {
            var e = exercicios[i];
            document.getElementById('nome').value = e.nome;
            document.getElementById('grupo').value = e.grupo;
            document.getElementById('series').value = e.series;
            document.getElementById('reps').value = e.reps;
            document.getElementById('peso').value = e.peso;
            document.getElementById('editId').value = e.id;
            
            trocarTela('section-novo');
        }
    }
}

// Inicia o sistema
trocarTela('section-home');