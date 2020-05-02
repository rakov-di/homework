if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful');
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });

    navigator.serviceWorker.onmessage = (e) => {
      const text = JSON.parse(e.data).text
      console.log(text);
      const informerCSS = `
        position: fixed; 
        left: 0; 
        bottom: 0; 
        width: 100%; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        background: #eee
      `;
      const html = `
        <div class="informer" style="${informerCSS}">
          <div class="informer__text">${text}</div>
          <a href="${location.href}">Обновить?</a>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', html)
    }

  });
} 