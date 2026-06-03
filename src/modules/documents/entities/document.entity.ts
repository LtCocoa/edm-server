import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Status } from "../../database/entities/status.entity";
import { DocumentType } from "../enums/document-type.enum";

@Entity({
  name: 'documents',
})
export class Document {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  readonly id!: string;

  @Column('varchar', {
    length: 20,
  })
  title!: string;

  @Column('enum', {
    enum: DocumentType
  })
  type!: DocumentType;

  @ManyToOne(() => User, user => user.documents, {
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
  author!: User;
  
  @Column('timestamp', {
    name: 'created_at',
    default: new Date(),
  })
  createdAt!: Date;

  @Column('timestamp', {
    name: 'start_date',
    default: new Date(),
  })
  startDate!: Date;

  @Column('timestamp', {
    name: 'end_date',
    default: new Date(),
  })
  endDate!: Date;

  @ManyToOne(() => Status, {
    nullable: false,
  })
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  status!: Status;

  @ManyToOne(() => User, {
    nullable: false,
  })
  @JoinColumn({ name: 'reviewer_id', referencedColumnName: 'id' })
  reviewer!: User;

  @Column('timestamp', {
    name: 'reviewed_at',
    nullable: true,
  })
  reviewedAt!: Date;

  @Column('varchar', {
    length: 100,
    nullable: true,
  })
  comment!: string;

  constructor(partial?: Partial<Document>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
