const fs = require('fs');
const path = require('path');
const http = require('http');

(async function(){
  try {
    const filePath = path.join(__dirname, '..', 'public', 'dummy1.jpg');
    const fileName = path.basename(filePath);
    const fileBuf = fs.readFileSync(filePath);
    const boundary = '----node-multipart-' + Date.now();

    const header = Buffer.from(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="file"; filename="${fileName}"\r\n` +
      `Content-Type: image/jpeg\r\n\r\n`
    );
    const footer = Buffer.from(`\r\n--${boundary}--\r\n`);

    const bodyLength = header.length + fileBuf.length + footer.length;

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/upload',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data; boundary=' + boundary,
        'Content-Length': bodyLength,
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log('STATUS', res.statusCode);
        console.log('HEADERS', res.headers);
        console.log('BODY', data);
      });
    });

    req.on('error', (e) => {
      console.error('Request error', e);
    });

    // write parts
    req.write(header);
    req.write(fileBuf);
    req.write(footer);
    req.end();

  } catch (err) {
    console.error('Upload script error', err);
    process.exit(1);
  }
})();
