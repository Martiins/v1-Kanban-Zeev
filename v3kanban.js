/**
 * Função para transformar a lista de tarefas padrão do Zeev em visualização Kanban
 * Organizada por prazos: Vencido, Hoje e Futuro.
 */
function custom_gerarKanbanPrazos() {
    // Seletores dos elementos originais
    const tabelaOriginal = document.querySelector(".task-list");
    const corpoTarefas = document.getElementById("taskListBody");
    const containerPai = document.querySelector(".crud-list-table");

    if (!corpoTarefas || !containerPai) return;

    // Oculta a tabela original para dar lugar ao Kanban
    if (tabelaOriginal) tabelaOriginal.style.display = "none";

    // Criar a estrutura do Kanban Container
    const kanbanWrapper = document.createElement("div");
    kanbanWrapper.id = "custom_kanban_wrapper";
    kanbanWrapper.style.display = "flex";
    kanbanWrapper.style.gap = "15px";
    kanbanWrapper.style.padding = "20px";
    kanbanWrapper.style.overflowX = "auto";
    kanbanWrapper.style.alignItems = "flex-start";

    // Definição das colunas
    const colunas = [
        { id: "vencidas", titulo: "Vencidas", cor: "#dc3545" },
        { id: "hoje", titulo: "Vence Hoje", cor: "#ffc107" },
        { id: "futuro", titulo: "Futuro", cor: "#28a745" }
    ];

    const elementosColunas = {};

    // Criar as colunas no DOM
    colunas.forEach(col => {
        const colDiv = document.createElement("div");
        colDiv.className = "kanban-col";
        colDiv.style.flex = "1";
        colDiv.style.minWidth = "300px";
        colDiv.style.backgroundColor = "#f4f5f7";
        colDiv.style.borderRadius = "8px";
        colDiv.style.padding = "10px";
        colDiv.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";

        const header = document.createElement("h5");
        header.innerText = col.titulo;
        header.style.borderBottom = `4px solid ${col.cor}`;
        header.style.paddingBottom = "10px";
        header.style.marginBottom = "15px";
        header.style.textAlign = "center";

        const cardContainer = document.createElement("div");
        cardContainer.id = `col-${col.id}`;
        cardContainer.style.minHeight = "100px";

        colDiv.appendChild(header);
        colDiv.appendChild(cardContainer);
        kanbanWrapper.appendChild(colDiv);
        
        elementosColunas[col.id] = cardContainer;
    });

    // Processar cada linha de tarefa
    const tarefas = corpoTarefas.querySelectorAll(".task-card");
    
    tarefas.forEach(tr => {
        // Identificar o destino pelo badge de perigo/aviso/sucesso
        let destino = "futuro";
        if (tr.querySelector(".badge-danger")) destino = "vencidas";
        else if (tr.querySelector(".badge-warning")) destino = "hoje";

        // Extração de dados da linha
        const nProcesso = tr.querySelector(".task-number")?.innerText || "";
        const tituloTarefa = tr.querySelector(".task-title")?.innerText || "";
        const appTitle = tr.querySelector(".task-app-title")?.innerText || "";
        const expiraEm = tr.querySelector(".task-expire-date")?.innerText || "";
        const infoAtraso = tr.querySelector(".text-danger.small")?.innerText || "";
        
        // Elementos de ação (preservando eventos originais)
        const btnAbrir = tr.querySelector(".task-open-button");
        const menuAcoes = tr.querySelector(".task-action-dropdown");

        // Criar o Card
        const card = document.createElement("div");
        card.style.backgroundColor = "#fff";
        card.style.marginBottom = "12px";
        card.style.padding = "15px";
        card.style.borderRadius = "5px";
        card.style.boxShadow = "0 1px 3px rgba(0,0,0,0.12)";
        card.style.borderLeft = `5px solid ${destino === 'vencidas' ? '#dc3545' : (destino === 'hoje' ? '#ffc107' : '#28a745')}`;

        card.innerHTML = `
            <div style="font-size: 0.8rem; color: #666; margin-bottom: 5px;">${nProcesso} - <strong>${appTitle}</strong></div>
            <div style="font-weight: bold; margin-bottom: 10px; color: #333;">${tituloTarefa}</div>
            <div style="font-size: 0.85rem; color: #555;">
                <wc-icon icon="clock" size="sm"></wc-icon> Expira: ${expiraEm}
                <br><span style="color: #dc3545; font-weight: bold;">${infoAtraso}</span>
            </div>
            <hr style="margin: 10px 0;">
            <div class="card-footer-actions" style="display: flex; justify-content: space-between; align-items: center;"></div>
        `;

        const footer = card.querySelector(".card-footer-actions");
        
        // Movemos os botões originais para o card para manter os eventos de clique
        if (btnAbrir) footer.appendChild(btnAbrir);
        if (menuAcoes) footer.appendChild(menuAcoes);

        // Adiciona o card na coluna correspondente
        elementosColunas[destino].appendChild(card);
    });

    // Injeta o Kanban no container original
    containerPai.appendChild(kanbanWrapper);
}

// Executa ao carregar o DOM
document.addEventListener("DOMContentLoaded", custom_gerarKanbanPrazos);
