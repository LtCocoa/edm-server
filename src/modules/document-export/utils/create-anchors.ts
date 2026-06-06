import { toGenitive } from "../../../shared/utils/declension";
import { Document } from "../../documents/entities/document.entity";
import { DocumentType } from "../../documents/enums/document-type.enum";
import { formatDate, formatStartEndDates } from "../../../shared/utils/format-date";
import { formatNameShort, formatUserNameShort } from "../../../shared/utils/format-name";

export interface DocumentAnchors {
  [key: string]: string;
}

export function getDocumentFileAnchors(document: Document): DocumentAnchors {
  switch (document.type) {
    case DocumentType.VACATION:
    {
      const createdAt = formatDate(document.createdAt);
      const [startDate, endDate] = formatStartEndDates(document.startDate, document.endDate);
      const nameShortGenitive = formatNameShort(toGenitive(document.author));
      const nameShortNominative = formatUserNameShort(document.author);

      return {
        created_at: createdAt,
        start_date: startDate,
        end_date: endDate,
        name_short_genitive: nameShortGenitive,
        name_short_nominative: nameShortNominative,
      }
    }
    case DocumentType.DISMISSAL:
    {
      const nameShortNominative = formatUserNameShort(document.author);
      const nameShortGenitive = formatNameShort(toGenitive(document.author));
      const createdAt = formatDate(document.createdAt);
      const dismissalDate = formatDate(document.startDate);

      return {
        name_short_nominative: nameShortNominative,
        name_short_genitive: nameShortGenitive,
        created_at: createdAt,
        dismissal_date: dismissalDate,
      }
    }
    default:
      return {
        default: 'def',
      }
  }
}