document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key === "Enter") {
    if (typeof window.onCtrlEnter === "function") {
      window.onCtrlEnter(event);
    }
  }
});



// console.log("Key event:", key);

if (!window.__hotkeyHintInitialized) {
  window.__hotkeyHintInitialized = true;

  document$.subscribe(() => {
    if (!document.querySelector(".hotkey-hint")) {
      const hotkeyToggle = document.createElement("div");
      hotkeyToggle.className = "hotkey-hint";
      hotkeyToggle.innerHTML = `
        <div class="hotkey-icon" tabindex="0" title="Горячие клавиши">⌨️</div>
        <div class="hotkey-popup md-typeset">
          <strong>Горячие клавиши:</strong>
         
          <p><span class="keys"><kbd class="key-control">Ctrl</kbd><span>+</span><kbd class="key-alt">Alt</kbd><span>+</span><kbd class="key-delete">Del</kbd></span> - тест</p>
          <p><span class="keys"><kbd class="key-control">Ctrl</kbd><span>+</span><kbd class="key-alt">Alt</kbd><span>+</span><kbd class="key-delete">Del</kbd></span> - тест</p>
           
        </div>
      `;
      document.body.appendChild(hotkeyToggle);
    }
  });
}