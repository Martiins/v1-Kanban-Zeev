document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#taskListBody");
  if (!tbody) return;

  const tarefas = [...tbody.querySelectorAll("tr.task-card")];
  if (!tarefas.length) return;

  const kanban = document.createElement("div");
  kanban.id = "taskKanban";
  kanban.innerHTML = `
    <div class="kanban-col">
      <h3>A fazer</h3>
      <div data-status="todo"></div>
    </div>
    <div class="kanban-col">
      <h3>Em andamento</h3>
      <div data-status="doing"></div>
    </div>
    <div class="kanban-col">
      <h3>Concluído</h3>
      <div data-status="done"></div>
    </div>
  `;

  const style = document.createElement("style");
  style.textContent = `
    #taskKanban{
      display:grid;
      grid-template-columns:repeat(3,1fr);
      gap:16px;
      width:100%;
    }
    .kanban-col{
      background:#f5f6f8;
      border-radius:8px;
      padding:12px;
      min-height:300px;
    }
    .kanban-col h3{
      margin:0 0 12px;
      font-size:16px;
    }
    .kanban-card{
      background:#fff;
      border-radius:8px;
      padding:12px;
      margin-bottom:10px;
      box-shadow:0 1px 4px #0002;
    }
    .kanban-card h4{margin:0 0 6px}
    .kanban-card small{display:block;margin-top:4px}
  `;

  document.head.appendChild(style);
  tbody.parentElement.replaceWith(kanban);

  tarefas.forEach(tr => {
    const titulo = tr.querySelector(".task-title")?.textContent.trim() || "";
    const app = tr.querySelector(".task-app-title")?.textContent.trim() || "";
    const numero = tr.querySelector(".task-number")?.textContent.trim() || "";
    const recebido = tr.querySelector(".task-received-date")?.textContent.trim() || "";
    const expira = tr.querySelector(".task-expire-date")?.textContent.trim() || "";
    const abrir = tr.querySelector(".task-open-link,.task-open-button")?.href || "#";

    const card = document.createElement("div");
    card.className = "kanban-card";
    card.innerHTML = `
      <h4>${titulo}</h4>
      <small>${numero}</small>
      <small>${app}</small>
      <small>Recebido: ${recebido}</small>
      <small>Expira: ${expira}</small>
      <a href="${abrir}" target="_blank">Abrir</a>
    `;

    kanban.querySelector('[data-status="todo"]').appendChild(card);
  });
});
