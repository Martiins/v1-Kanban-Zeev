/**
 * Função para organizar tarefas em modelo Kanban.
 * Extrai dados da tabela original e reconstrói cards visíveis.
 */
function custom_gerarKanbanVisual() {
    const corpoTabela = document.getElementById("taskListBody");
    const containerPrincipal = document.querySelector(".crud-list-table");

    // Validação básica: se não encontrar a tabela, encerra
    if (!corpoTabela || !containerPrincipal) return;

    const tarefasExistentes = corpoTabela.querySelectorAll(".task-card");
    
    // Se a tabela ainda estiver vazia (carregamento assíncrono), tenta novamente em 1 segundo
    if (tarefasExistentes.length === 0) {
        setTimeout(custom_gerarKanbanVisual, 1000);
        return;
    }

    // Criar container do Kanban se ainda não existir
    let kanbanWrapper = document.getElementById("kanban-custom-wrapper");
    if (!kanbanWrapper) {
        kanbanWrapper = document.createElement("div");
        kanbanWrapper.id = "kanban-custom-wrapper";
        kanbanWrapper.className = "row g-3 mt-3";
        kanbanWrapper.innerHTML = `
            <div class="col-md-4"><div class="card bg-light"><div class="card-header bg-secondary text-white">Vencidas</div><div class="card-body" id="col-vencidas"></div></div></div>
            <div class="col-md-4"><div class="card bg-light"><div class="card-header bg-primary text-white">Vencendo Hoje</div><div class="card-body" id="col-hoje"></div></div></div>
            <div class="col-md-4"><div class="card bg-light"><div class="card-header bg-success text-white">A Vencer</div><div class="card-body" id="col-futuro"></div></div></div>
        `;
        containerPrincipal.appendChild(kanbanWrapper);
    }

    const colVencidas = document.getElementById("col-vencidas");
    const colHoje = document.getElementById("col-hoje");
    const colFuturo = document.getElementById("col-futuro");

    // Data atual para comparação
    const dataHoje = new Date();
    dataHoje.setHours(0, 0, 0, 0);

    tarefasExistentes.forEach(tarefaRow => {
        // Extração de dados da linha da tabela
        const numero = tarefaRow.querySelector(".task-number")?.textContent || "";
        const titulo = tarefaRow.querySelector(".task-title")?.textContent || "Sem título";
        const app = tarefaRow.querySelector(".task-app-title")?.textContent || "";
        const dataStr = tarefaRow.querySelector(".task-expire-date")?.textContent.trim() || "";
        const linkAbrir = tarefaRow.querySelector(".task-open-link")?.getAttribute("href") || "#";

        if (!dataStr) return;

        // Conversão da data dd/mm/aaaa
        const [dia, mes, ano] = dataStr.split("/").map(Number);
        const dataExpira = new Date(ano, mes - 1, dia);
        dataExpira.setHours(0, 0, 0, 0);

        // Montagem do Card Kanban
        const card = document.createElement("div");
        card.className = "card mb-3 shadow-sm border-0";
        card.innerHTML = `
            <div class="card-body p-3">
                <div class="d-flex justify-content-between mb-2">
                    <span class="badge bg-dark">${numero}</span>
                    <small class="fw-bold">${dataStr}</small>
                </div>
                <h6 class="card-title mb-1">${titulo}</h6>
                <p class="text-muted small mb-3">${app}</p>
                <a href="${linkAbrir}" class="btn btn-sm btn-outline-info w-100">Abrir Tarefa</a>
            </div>
        `;

        // Distribuição nas colunas
        if (dataExpira < dataHoje) {
            card.classList.add("border-start", "border-danger", "border-4");
            colVencidas.appendChild(card);
        } else if (dataExpira.getTime() === dataHoje.getTime()) {
            card.classList.add("border-start", "border-warning", "border-4");
            colHoje.appendChild(card);
        } else {
            card.classList.add("border-start", "border-success", "border-4");
            colFuturo.appendChild(card);
        }
    });

    // Ocultar a tabela original para dar foco ao Kanban
    const tabelaOriginal = containerPrincipal.querySelector("table");
    if (tabelaOriginal) tabelaOriginal.style.display = "none";
}

// Inicia a execução
document.addEventListener("DOMContentLoaded", () => {
    // Timeout para garantir que o Zeev renderizou a lista inicial
    setTimeout(custom_gerarKanbanVisual, 500);
});
