const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    let filePath = path.join(__dirname, '..', req.url === '/' ? 'web/index.html' : req.url);

    if (req.url.startsWith("/info")) {
        filePath = path.join(__dirname, '../web/info.html');
    }

    if (req.url.startsWith('/data/')) {
        filePath = path.join(__dirname, '..', req.url);
    }

    if (req.url.startsWith('/assets/')) {
        filePath = path.join(__dirname, '..', 'web', req.url);
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        default:
            contentType = 'text/html';
            break;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {

                fs.readFile(path.join(__dirname, '..', 'web', '404.html'), (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(8080, () => {});
import('open').then(openModule => {
    openModule.default(`http://localhost:8080`).then();
})