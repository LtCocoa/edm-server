import { Injectable, InternalServerErrorException } from "@nestjs/common";
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import path from "path";
import { readFileSync } from "fs";
import { Document } from "../documents/entities/document.entity";
import { getDocumentFileAnchors } from "./utils/create-anchors";
import { getFileName } from "./utils/get-file-name";
import { getTemplateFileName } from "./utils/get-template-file-name";

@Injectable()
export class DocumentExportService {
  async generate(document: Document): Promise<[string, Buffer<ArrayBufferLike>]> {
    try {
      const templateFileName = getTemplateFileName(document);

      const content = readFileSync(
        path.resolve(path.join(
          __dirname,
          'templates',
          templateFileName
        )),
        'binary'
      );

      const zip = new PizZip(content);
      const tmpl = new Docxtemplater(zip);

      const data = getDocumentFileAnchors(document);

      tmpl.render(data);

      const fileName = getFileName(document);
      const buf = tmpl.toBuffer();

      return [fileName, buf];
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(`Could not generate file for document with id ${document.id}`);
    }
  }
}