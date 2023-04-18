const webdav = require('webdav-server').v2;
const express = require('express');

const server = new webdav.WebDAVServer();
const app = express();
const port = 3000

// Mount the WebDAVServer instance
app.use(webdav.extensions.express('/webdav', server));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`)
})

// app.listen(3000); // Start the Express server

// const webdav = require('webdav-server').v2;
//
// const server = new webdav.WebDAVServer({
//     port: 3000
// });
//
// server.start(() => console.log('READY'));
