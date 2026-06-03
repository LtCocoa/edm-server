import { Injectable } from "@nestjs/common";
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import path from "path";
import { readFileSync } from "fs";
import { Document } from "../documents/entities/document.entity";
import { getDocumentFileAnchors } from "./utils/create-anchors";

@Injectable()
export class DocumentExportService {
  async generate(document: Document) {
    try {
      const content = readFileSync(
        path.resolve(path.join(__dirname, 'templates', 'vacation.docx')),
        'binary'
      );

      const zip = new PizZip(content);
      const tmpl = new Docxtemplater(zip);

      const data = getDocumentFileAnchors(document);

      tmpl.render(data);

      const buf = tmpl.toBuffer();

      return buf;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}