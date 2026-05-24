import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DocumentType } from "./document_types";
import { User } from "../../users/entities/user.entity";

@Entity({
  name: 'Document',
})
export class Document {
  @PrimaryGeneratedColumn('uuid', {
    name: 'document_id',
  })
  readonly documentId!: string;

  @ManyToOne(() => User, user => user.documents, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user!: User;

  @Column('varchar', {
    name: 'title',
    length: 20,
  })
  title!: string;

  @Column('enum', {
    enum: DocumentType
  })
  type!: DocumentType

  constructor(partial?: Partial<Document>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
