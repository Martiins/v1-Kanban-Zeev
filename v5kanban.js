(function(){
  function criarKanban(){
    const tbody=document.querySelector("#taskListBody");
    if(!tbody)return false;

    const tarefas=[...tbody.querySelectorAll("tr.task-card")];
    if(!tarefas.length)return false;

    if(document.querySelector("#customKanban"))return true;

    const kanban=document.createElement("div");
    kanban.id="customKanban";

    const colunas=[
      ["A Fazer","todo"],
      ["Em andamento","doing"],
      ["Concluído","done"]
    ];

    colunas.forEach(c=>{
      const col=document.createElement("div");
      col.className="kb-col";
      col.innerHTML=`<div class="kb-title">${c[0]}<span>0</span></div>
                     <div class="kb-list" data-status="${c[1]}"></div>`;
      kanban.appendChild(col);
    });

    const style=document.createElement("style");
    style.textContent=`
      #customKanban{
        display:grid;
        grid-template-columns:repeat(3,minmax(280px,1fr));
        gap:16px;width:100%;padding:10px 0
      }
      .kb-col{
        background:#f5f6f8;border-radius:8px;
        padding:12px;min-height:300px
      }
      .kb-title{
        display:flex;justify-content:space-between;
        font-size:16px;font-weight:600;margin-bottom:12px
      }
      .kb-title span{
        background:#ddd;border-radius:20px;
        padding:2px 8px;font-size:12px
      }
      .kb-list{
        display:flex;flex-direction:column;gap:10px
      }
      .kb-card{
        display:block!important;width:100%!important;
        background:#fff;border:1px solid #ddd;
        border-radius:8px;padding:12px!important;
        box-sizing:border-box;position:relative
      }
      .kb-card td{
        display:block!important;width:100%!important;
        padding:3px!important;border:0!important
      }
      .kb-card .task-cell--select{
        position:absolute;right:8px;top:8px;
        width:auto!important
      }
      .kb-card .task-cell--desktop{
        display:block!important
      }
      .kb-card .task-number-tablet{
        display:none!important
      }
      .kb-card .task-open-link{
        display:block;text-align:right
      }
    `;

    document.head.appendChild(style);

    tarefas.forEach((t,i)=>{
      const lista=kanban.querySelectorAll(".kb-list")[i%3];
      lista.appendChild(t);
      lista.previousElementSibling?.querySelector("span");
    });

    kanban.querySelectorAll(".kb-list").forEach(lista=>{
      const contador=lista.previousElementSibling.querySelector("span");
      contador.textContent=lista.children.length;
    });

    const tabela=tbody.closest("table");
    if(tabela)tabela.replaceWith(kanban);
    else tbody.replaceWith(kanban);

    return true;
  }

  function iniciar(){
    if(criarKanban())return;
    setTimeout(iniciar,500);
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",iniciar);
  }else{
    iniciar();
  }
})();
