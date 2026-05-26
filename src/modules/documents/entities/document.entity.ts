import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DocumentType } from "./document_types";
import { User } from "../../users/entities/user.entity";
import { Status } from "../../database/entities/status.entity";

@Entity({
  name: 'documents',
})
export class Document {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  readonly id!: string;

  @ManyToOne(() => User, user => user.documents, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  author!: User;

  @Column('varchar', {
    name: 'title',
    length: 20,
  })
  title!: string;

  @Column('enum', {
    enum: DocumentType
  })
  type!: DocumentType

  @ManyToOne(() => Status, {
    nullable: false,
  })
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  status!: Status;

  constructor(partial?: Partial<Document>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
