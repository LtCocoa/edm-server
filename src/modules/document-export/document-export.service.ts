import { Injectable } from "@nestjs/common";
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { readFileSync } from "fs";
import path from "path";
import { Document } from "../documents/entities/document.entity";

@Injectable()
export class DocumentExportService {
  async generate(document: Document) {
    try {
      const content = readFileSync(
        path.resolve(path.join(__dirname, 'templates', 'vacation.docx')),
        'binary'
      );

      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip);

      doc.render({
        name: document.author.name
      });

      const buf = doc.toBuffer();

      return buf;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}