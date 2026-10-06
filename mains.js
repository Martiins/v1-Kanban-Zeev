/**
 * Função para gerar uma visão Kanban genérica baseada nos dados do relatório
 * @author Programador Javascript Sênior
 */
function custom_gerarVisualizacaoKanban() {
    const corpoTabela = document.getElementById("containerReport");
    if (!corpoTabela) return;

    // Criar container do Kanban
    const containerKanban = document.createElement("div");
    containerKanban.style = "display: flex; gap: 20px; padding: 20px; overflow-x: auto; background: #f4f7f6; font-family: sans-serif;";
    
    const linhas = corpoTabela.querySelectorAll("tr");
    
    // Criar uma coluna genérica de "Tarefas Pendentes"
    const coluna = document.createElement("div");
    coluna.style = "min-width: 300px; background: #ebedf0; border-radius: 4px; padding: 10px;";
    coluna.innerHTML = `<h3 style="margin-top:0; color:#444;">Lista de Tarefas (${linhas.length})</h3>`;

    linhas.forEach(linha => {
        // Extração dos dados baseada na estrutura HTML do Zeev
        const codigo = linha.querySelector(".badge")?.innerText || "N/A";
        const titulo = linha.querySelector("h5")?.innerText || "Sem título";
        const cliente = linha.querySelector(".muted.small")?.innerText || "";
        const dataPrazo = linha.querySelector(".d-template-expand-xxl-table-cell div")?.innerText || "";

        // Criação do card
        const card = document.createElement("div");
        card.style = "background: #fff; margin-bottom: 10px; padding: 15px; border-radius: 5px; box-shadow: 0 1px 3px rgba(0,0,0,0.12); border-left: 5px solid #dc3545;";
        
        card.innerHTML = `
            <small style="color: #666; font-weight: bold;">${codigo}</small>
            <div style="font-weight: bold; margin: 5px 0; color: #333;">${titulo}</div>
            <div style="font-size: 0.85em; color: #555;">${cliente}</div>
            <hr style="border:0; border-top:1px solid #eee; margin: 10px 0;">
            <div style="font-size: 0.8em; text-align: right; color: #d9534f;">📅 ${dataPrazo}</div>
        `;
        coluna.appendChild(card);
    });

    containerKanban.appendChild(coluna);
    // Insere o Kanban antes da tabela de relatório
    corpoTabela.closest("table").parentElement.insertBefore(containerKanban, corpoTabela.closest("table"));
}

// Execução ao carregar a página
document.addEventListener("DOMContentLoaded", custom_gerarVisualizacaoKanban);
