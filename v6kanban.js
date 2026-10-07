/**
 * Função para organizar a lista de tarefas do Zeev em formato Kanban
 * Baseado na data de expiração presente na tabela.
 */
function custom_organizarKanbanTarefas() {
    const corpoTabela = document.getElementById("taskListBody");
    const containerTabela = document.querySelector(".crud-list-table");

    if (!corpoTabela || !containerTabela) {
        return; // Sai da função se os elementos base não existirem
    }

    const tarefas = corpoTabela.querySelectorAll(".task-card");
    
    // Criar o container do Kanban
    const kanbanContainer = document.createElement("div");
    kanbanContainer.className = "row kanban-wrapper g-3 mt-3";
    kanbanContainer.innerHTML = `
        <div class="col-md-4"><div class="p-3 bg-light rounded shadow-sm"><h6>Vencidas</h6><div id="col-vencidas"></div></div></div>
        <div class="col-md-4"><div class="p-3 bg-light rounded shadow-sm"><h6>Vencendo Hoje</h6><div id="col-hoje"></div></div></div>
        <div class="col-md-4"><div class="p-3 bg-light rounded shadow-sm"><h6>A Vencer</h6><div id="col-futuro"></div></div></div>
    `;

    const colVencidas = kanbanContainer.querySelector("#col-vencidas");
    const colHoje = kanbanContainer.querySelector("#col-hoje");
    const colFuturo = kanbanContainer.querySelector("#col-futuro");

    // Data de Hoje (zerada)
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    tarefas.forEach(tarefa => {
        const campoData = tarefa.querySelector(".task-expire-date");
        if (!campoData) return;

        // Converter dd/mm/aaaa para Date
        const partesData = campoData.textContent.trim().split("/");
        const dataExpira = new Date(partesData[2], partesData[1] - 1, partesData[0]);
        dataExpira.setHours(0, 0, 0, 0);

        // Criar o card estilizado a partir da TR
        const card = document.createElement("div");
        card.className = "card mb-2 shadow-sm border-start border-4";
        card.style.fontSize = "0.85rem";
        
        // Estilização baseada no prazo
        if (dataExpira < hoje) {
            card.classList.add("border-danger");
            card.innerHTML = tarefa.innerHTML;
            colVencidas.appendChild(card);
        } else if (dataExpira.getTime() === hoje.getTime()) {
            card.classList.add("border-warning");
            card.innerHTML = tarefa.innerHTML;
            colHoje.appendChild(card);
        } else {
            card.classList.add("border-success");
            card.innerHTML = tarefa.innerHTML;
            colFuturo.appendChild(card);
        }
    });

    // Ocultar tabela original e inserir Kanban
    const tabelaOriginal = containerTabela.querySelector("table");
    if (tabelaOriginal) tabelaOriginal.style.display = "none";
    
    containerTabela.appendChild(kanbanContainer);
    
    // Ajustar visual: removemos classes de tabela dos cards para não quebrar o layout
    kanbanContainer.querySelectorAll("td").forEach(td => {
        td.style.display = "block";
        td.style.width = "100%";
        td.style.border = "none";
        td.style.padding = "5px 10px";
    });
}

// Execução ao carregar o DOM
document.addEventListener("DOMContentLoaded", custom_organizarKanbanTarefas);
