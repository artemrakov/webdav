const webdav = require('webdav-server').v2;
const express = require('express');

// const server = new webdav.WebDAVServer();
// const app = express();

const server = new webdav.WebDAVServer({
    port: 3000
});

server.beforeRequest((arg, next) => {
    // filter requests
    if(arg.request.uri.includes('vtt')) {
        next();
    }
});


server.afterRequest((arg, next) => {
    // Display the method, the URI, the returned status code and the returned message
    console.log('>>', arg.request.method, arg.requested.uri, '>', arg.response.statusCode, arg.response.statusMessage);
    // If available, display the body of the response
    console.log(arg.responseBody);
    next();
});

server.setFileSystem('/webdav', new webdav.PhysicalFileSystem('/home/ubuntu/output'), (success) => {

    server.start(() => console.log('READY'));
})

// Mount the WebDAVServer instance
// app.use(webdav.extensions.express('/webdav', server));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(3000, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// app.listen(3000); // Start the Express server

// const webdav = require('webdav-server').v2;
//
// const server = new webdav.WebDAVServer({
//     port: 3000
// });
//
// server.start(() => console.log('READY'));
