import { Document } from "../../documents/entities/document.entity";
import { DocumentType } from "../../documents/enums/document-type.enum";

export function getTemplateFileName(document: Document) {
  switch (document.type) {
    case DocumentType.VACATION:
      return 'vacation.docx';
    case DocumentType.DISMISSAL:
      return 'dismissal.docx';
  }
}