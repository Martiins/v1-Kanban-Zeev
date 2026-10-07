/**
 * Função para transformar a lista de tarefas em Kanban.
 * Força a visualização de elementos de tabela em blocos.
 */
function custom_aplicarLayoutKanban() {
    const corpoTabela = document.getElementById("taskListBody");
    const containerPrincipal = document.querySelector(".crud-list-table");

    if (!corpoTabela) return;

    const tarefas = corpoTabela.querySelectorAll(".task-card");
    
    // Se não houver tarefas ainda, aguarda o carregamento do Zeev
    if (tarefas.length === 0) return;

    // Para a execução do intervalo uma vez que as tarefas foram encontradas
    clearInterval(janelaBuscaTarefas);

    // Criar a estrutura das colunas
    const kanbanRow = document.createElement("div");
    kanbanRow.className = "row g-3";
    kanbanRow.innerHTML = `
        <div class="col-md-4"><h6 class="text-danger fw-bold">Vencidas</h6><div id="kanban-vencidas"></div></div>
        <div class="col-md-4"><h6 class="text-primary fw-bold">Hoje</h6><div id="kanban-hoje"></div></div>
        <div class="col-md-4"><h6 class="text-success fw-bold">A Vencer</h6><div id="kanban-futuro"></div></div>
    `;
    containerPrincipal.appendChild(kanbanRow);

    const colVencidas = document.getElementById("kanban-vencidas");
    const colHoje = document.getElementById("kanban-hoje");
    const colFuturo = document.getElementById("kanban-futuro");

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    tarefas.forEach(tarefa => {
        const spanData = tarefa.querySelector(".task-expire-date");
        if (!spanData) return;

        const partes = spanData.textContent.trim().split("/");
        const dataExpira = new Date(partes[2], partes[1] - 1, partes[0]);
        dataExpira.setHours(0, 0, 0, 0);

        // --- ESTILIZAÇÃO CRÍTICA ---
        // Força a TR e TD a se comportarem como um Card de DIV
        tarefa.style.display = "block";
        tarefa.style.marginBottom = "15px";
        tarefa.style.backgroundColor = "#fff";
        tarefa.style.border = "1px solid #dee2e6";
        tarefa.style.borderRadius = "8px";
        tarefa.style.padding = "10px";
        tarefa.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";

        tarefa.querySelectorAll("td").forEach(td => {
            // Esconde colunas vazias ou de seleção para limpar o card
            if (td.classList.contains("task-cell--select") || td.classList.contains("text-end")) {
                td.style.display = "none";
            } else {
                td.style.display = "block";
                td.style.width = "100%";
                td.style.padding = "2px 0";
                td.style.border = "none";
            }
        });

        // Distribuição
        if (dataExpira < hoje) {
            tarefa.style.borderLeft = "5px solid #dc3545";
            colVencidas.appendChild(tarefa);
        } else if (dataExpira.getTime() === hoje.getTime()) {
            tarefa.style.borderLeft = "5px solid #ffc107";
            colHoje.appendChild(tarefa);
        } else {
            tarefa.style.borderLeft = "5px solid #198754";
            colFuturo.appendChild(tarefa);
        }
    });

    // Remove o que sobrou da tabela (cabeçalho)
    const tabelaOriginal = containerPrincipal.querySelector("table");
    if (tabelaOriginal) tabelaOriginal.remove();
}

// Criamos um intervalo para verificar quando o Zeev termina de carregar as tarefas na tela
const janelaBuscaTarefas = setInterval(custom_aplicarLayoutKanban, 1000);

// Fallback para parar a busca após 10 segundos caso não haja tarefas
setTimeout(() => clearInterval(janelaBuscaTarefas), 10000);
