import { formatDate } from "../../../shared/utils/format-date";
import { formatUserNameShort } from "../../../shared/utils/format-name";
import { Document } from "../../documents/entities/document.entity";
import { DocumentType } from "../../documents/enums/document-type.enum";

export function getFileName(document: Document) {
  const typeName = getTypeName(document.type);
  const createdAt = formatDate(document.createdAt);
  const userName = formatUserNameShort(document.author);

  return `${typeName} ${userName} ${createdAt}`.replace(' ', '_');
}

function getTypeName(type: DocumentType) {
  switch (type) {
    case DocumentType.DISMISSAL:
      return 'Заявление об увольнении';
    case DocumentType.VACATION:
      return 'Заявление об отпуске';
    default:
      return 'Заявление';
  }
}