import { Request, Response, NextFunction } from "express";
import { IncomingMessage } from "http";

declare module "easy-formdata" {
  type obj<T> = {
    [key: string]: T;
  }

  interface File {
    /** the file name */
    filename: string;
    /** the encoding of the file  */
    encoding: string;
    /** the mimetype of the file */
    mimetype: string;
    /** the size of the file */
    size: number;
    /** the data of the file */
    data: Buffer;
  }

  export function expressParser(): (req: Request, res: Response, next: NextFunction) => void;
  export function parse(req: IncomingMessage, callback: (data: obj<string | File>) => void);
  export function isFile(obj: any): obj is File;
}