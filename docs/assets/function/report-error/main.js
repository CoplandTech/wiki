document$.subscribe(() => {
  let tooltip = null;
  let modal = null;
  let selectedText = "";

  function clearTooltip() {
    if (tooltip) {
      tooltip.remove();
      tooltip = null;
    }
  }

  function clearModal() {
    if (modal) {
      modal.remove();
      modal = null;
      document.body.style.overflow = "";
    }
  }

  document.addEventListener("mouseup", (event) => {
    selectedText = window.getSelection().toString().trim();
    clearTooltip();

    if (selectedText.length > 0) {
      setTimeout(() => {
        tooltip = document.createElement("div");
        tooltip.className = "report-tooltip";
        tooltip.innerText = "Нажмите Ctrl+Enter для отправки отчета";

        tooltip.style.position = "fixed";
        tooltip.style.top = `${event.clientY + 10}px`;
        tooltip.style.left = `${event.clientX + 10}px`;
        tooltip.style.pointerEvents = "none";
        tooltip.style.zIndex = "9999";

        document.body.appendChild(tooltip);

        setTimeout(clearTooltip, 5000);
        document.addEventListener("mousedown", clearTooltip, { once: true });
      }, 150);
    }
  });

  window.onCtrlEnter = function (event) {
    if (selectedText.length > 0 && !modal) {
      event.preventDefault();
      clearTooltip();
      showModal(selectedText);
      return true;
    }
    return false;
  };

  function showModal(text) {
    document.body.style.overflow = "hidden";

    modal = document.createElement("div");
    modal.className = "report-modal";
    modal.innerHTML = `
      <div class="modal-content">
        <h2>Сообщить об ошибке</h2>
        <label>Выделенный фрагмент:</label>
        <textarea readonly>${text}</textarea>
        <label>Комментарий:</label>
        <textarea id="report-comment" placeholder="Что не так?"></textarea>
        <div class="modal-buttons">
          <button id="send-report">Отправить</button>
          <button id="cancel-report">Отмена</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById("cancel-report").onclick = clearModal;

    document.getElementById("send-report").onclick = () => {
      const comment = document.getElementById("report-comment").value;
      const mailto = `mailto:your-email@example.com?subject=Ошибка в документации&body=${encodeURIComponent(`Фрагмент:\n${text}\n\nКомментарий:\n${comment}`)}`;
      window.location.href = mailto;
      clearModal();
    };
  }
});