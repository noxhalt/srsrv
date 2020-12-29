import {createServer, IncomingMessage, OutgoingHttpHeaders, ServerResponse} from "http";
import * as fs from "fs";

export class Srsrv {
    public start = (port: number) => createServer(this.serve).listen(port);

    public route = (path: string, file: string, header?: OutgoingHttpHeaders) =>
        this.routes.push(new Route(path, file, header));

    private routes: Route[] = [];

    private serve = (req: IncomingMessage, res: ServerResponse) => {
        const route = this.routes.find(route => route.url == req.url);

        // return 404
        if (route == null) {
            res.writeHead(404, "404 Not Found");
            res.write("404 Not Found");
            res.end();
            return;
        }

        // init header
        if (route.header == null) route.header = {};

        // add content-length
        const stat = fs.statSync(route.file);
        route.header["Content-Length"] = stat.size;

        // set header
        res.writeHead(200, route.header);

        // pipe file stream
        const stream = fs.createReadStream(route.file);
        stream.pipe(res);
    }

}

class Route {
    url: string;
    file: string;
    header?: OutgoingHttpHeaders;

    constructor(path: string, file: string, header?: OutgoingHttpHeaders) {
        this.url = path;
        this.file = file;
        this.header = header;
    }
}
