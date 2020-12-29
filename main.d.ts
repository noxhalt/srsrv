/// <reference types="node" />
import { OutgoingHttpHeaders } from "http";
export declare class Srsrv {
    start: (port: number) => import("http").Server;
    route: (path: string, file: string, header?: OutgoingHttpHeaders | undefined) => number;
    private routes;
    private serve;
}
