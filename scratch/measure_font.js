const fs = require('fs');

const html = `<!DOCTYPE html>
<html>
<head>
<link rel='preconnect' href='https://fonts.googleapis.com'>
<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>
<link href='https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap' rel='stylesheet'>
<style>
  body { margin: 0; }
  .word { font-family: 'Bebas Neue', sans-serif; font-weight: 900; line-height: 0.78; letter-spacing: 0.02em; white-space: nowrap; display: inline-block; }
</style>
</head>
<body>
  <div id='d' class='word' style='font-size: 100px;'>DESIGN TO</div>
  <div id='t' class='word' style='font-size: 100px;'>THINK</div>
  <div id='b' class='word' style='font-size: 100px;'>BUILD</div>
  <div id='e' class='word' style='font-size: 100px;'>AND EVOLVE</div>
  <script>
    document.fonts.ready.then(() => {
      ['d', 't', 'b', 'e'].forEach(id => {
        const el = document.getElementById(id);
        const r = el.getBoundingClientRect();
        console.log(id, el.textContent, 'width at 100px:', r.width, 'height:', r.height);
      });
    });
  </script>
</body>
</html>`;

fs.writeFileSync('scratch/font_test.html', html);
console.log('Written scratch/font_test.html');
