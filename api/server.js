const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    const urlPath = req.url.split('?')[0];

    let filePath = path.join(__dirname, '..', urlPath === '/' ? 'web/index.html' : 'web' + urlPath);

    if (urlPath.startsWith("/info")) {
        filePath = path.join(__dirname, '../web/info.html');
    }else if (req.url.startsWith('/data/')) {
        filePath = path.join(__dirname, '..', req.url);
    }else if (req.url.startsWith('/assets/')) {
        filePath = path.join(__dirname, '..', 'web', req.url);
    }else if (req.url.startsWith('/api/')) {
        filePath = path.join(__dirname, '..', req.url);
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