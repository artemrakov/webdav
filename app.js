const webdav = require("webdav-server").v2;
const express = require("express");

// const server = new webdav.WebDAVServer();
// const app = express();

class FileNameFilterPrivilegeManager extends webdav.PrivilegeManager {
    constructor(allowedFileNames) {
        super();
        this.allowedFileNames = allowedFileNames;
    }

    can(user, path, rights, callback) {
        // const fileName = path.fileName();
        console.log("fileName", path)
        // if (this.allowedFileNames.includes(fileName)) {
            super.can(user, path, rights, callback);
        // } else {
        //     callback(null, false);
        // }
    }
}

const server = new webdav.WebDAVServer({
    port: 3000,
    privilegeManager: new FileNameFilterPrivilegeManager(["vtt"]),
});

server.afterRequest((arg, next) => {
    // Display the method, the URI, the returned status code and the returned message
    console.log(
        ">>",
        arg.request.method,
        arg.requested.uri,
        ">",
        arg.response.statusCode,
        arg.response.statusMessage
    );
    // If available, display the body of the response
    console.log(arg.responseBody);
    next();
});

server.setFileSystem(
    "/webdav",
    new webdav.PhysicalFileSystem("/home/ubuntu/output"),
    (success) => {
        server.start((s) => {
            const port = s.address().port;
            console.log("Ready on port", port);
        });
    }
);

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
