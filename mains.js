(() => {
    console.log("teste");
  const tbody = document.querySelector("#containerReport");
  if (!tbody) return;

  const rows = [...tbody.querySelectorAll("tr[data-href]")];

  const board = document.createElement("div");
  board.className = "kanban-board";

  const columns = {
    atrasadas: createColumn("Atrasadas"),
    hoje: createColumn("Hoje"),
    futuras: createColumn("Futuras")
  };

  rows.forEach(row => {
    const title = row.querySelector("h5")?.textContent.trim();
    const process = row.querySelector("h6")?.textContent.trim();
    const number = row.querySelector(".badge")?.textContent.trim();
    const date = [...row.querySelectorAll("td")][3]?.querySelector(".text-dark")?.textContent.trim();
    const client = [...row.querySelectorAll("td")][2]?.querySelector("div")?.textContent.trim();
    const responsible = row.querySelector(".user-content strong")?.textContent.trim();

    if (!title) return;

    const card = document.createElement("div");
    card.className = "kanban-card";
    card.innerHTML = `
      <strong>${number || ""}</strong>
      <h4>${title}</h4>
      <small>${process || ""}</small>
      <p>${client || ""}</p>
      <span>${date || ""}</span>
      <small>Responsável: ${responsible || ""}</small>
    `;

    card.onclick = () => row.click();

    const [d, m, y] = (date || "").split("/");
    const taskDate = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const column = taskDate < today
      ? columns.atrasadas
      : taskDate.getTime() === today.getTime()
        ? columns.hoje
        : columns.futuras;

    column.body.appendChild(card);
  });

  Object.values(columns).forEach(c => board.appendChild(c.el));
  tbody.closest("table")?.parentElement?.replaceWith(board);

  function createColumn(title) {
    const el = document.createElement("section");
    el.className = "kanban-column";
    el.innerHTML = `<h3>${title}</h3>`;
    const body = document.createElement("div");
    body.className = "kanban-cards";
    el.appendChild(body);
    return { el, body };
  }

  const style = document.createElement("style");
  style.textContent = `
    .kanban-board{display:flex;gap:16px;overflow:auto;padding:16px}
    .kanban-column{min-width:280px;flex:1;background:#f4f5f7;border-radius:8px;padding:12px}
    .kanban-column h3{margin:0 0 12px}
    .kanban-card{background:#fff;border-radius:6px;padding:12px;margin-bottom:10px;
      box-shadow:0 1px 3px #0002;cursor:pointer}
    .kanban-card h4{margin:6px 0;font-size:15px}
    .kanban-card p{margin:8px 0}
    .kanban-card small{display:block;color:#666}
    .kanban-card span{font-size:12px;color:#555}
  `;
  document.head.appendChild(style);
})();
