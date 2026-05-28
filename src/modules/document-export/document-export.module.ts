import { Module } from "@nestjs/common";
import { DocumentExportService } from "./document-export.service";

@Module({
  providers: [DocumentExportService],
  exports: [DocumentExportService],
})
export class DocumentExportModule {}