import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Document } from '../../documents/entities/document.entity';
import { Role } from '../../database/entities/role.entity';

@Entity({
  name: 'users'
})
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  readonly id!: string;

  @Column('varchar', {
    name: 'first_name',
    comment: 'Имя',
    length: 20,
  })
  firstName!: string;

  @Column('varchar', {
    name: 'last_name',
    comment: 'Фамилия',
    length: 20,
  })
  lastName!: string;

  @Column('varchar', {
    name: 'middle_name',
    comment: 'Отчество',
    length: 20,
  })
  middleName!: string;

  @Column('varchar', {
    name: 'position_name',
    comment: 'Название должности',
    length: 20
  })
  positionName!: string;

  @ManyToOne(() => Role, {
    nullable: false,
  })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role!: Role;

  @Column('varchar', {
    comment: 'Логин',
    unique: true,
    length: 20,
  })
  login!: string;

  @Column('varchar', {
    comment: 'Хеш пароля',
    name: 'password_hash',
  })
  @Exclude({ toPlainOnly: true })
  passwordHash!: string;

  @Column('varchar', {
    comment: 'Соль пароля',
    name: 'password_salt',
  })
  @Exclude({ toPlainOnly: true })
  passwordSalt!: string;

  @OneToMany(() => Document, (document) => document.author)
  documents!: Document[];

  @OneToMany(() => Document, (document) => document.reviewer)
  reviewDocuments!: Document[];

  constructor(partial?: Partial<User>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
