import { toGenitive } from "../../../shared/utils/declension";
import { Document } from "../../documents/entities/document.entity";
import { DocumentType } from "../../documents/enums/document-type.enum";
import { formatDate, formatStartEndDates } from "../../../shared/utils/format-date";
import { formatNameShort } from "../../../shared/utils/format-name";
import { VacationRequestAnchors } from "./interfaces/anchors";

export interface DocumentAnchors {
  [key: string]: string;
}

export function getDocumentFileAnchors(document: Document): DocumentAnchors {
  switch (document.type) {
    case DocumentType.VACATION:
      const createdAt = formatDate(document.createdAt);
      const [startDate, endDate] = formatStartEndDates(document.startDate, document.endDate);
      const { first, last, middle } = toGenitive(document.author);
      const nameShortGenitive = formatNameShort({ first, last, middle });
      const nameShortNominative = formatNameShort({
        first: document.author.firstName,
        last: document.author.lastName,
        middle: document.author.middleName,
      });

      return {
        created_at: createdAt,
        start_date: startDate,
        end_date: endDate,
        name_short_genitive: nameShortGenitive,
        name_short_nominative: nameShortNominative,
      }
    default:
      return {
        default: 'def',
      }
  }
}