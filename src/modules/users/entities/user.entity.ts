import { Exclude, Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Document } from '../../documents/entities/document.entity';

@Entity({
  name: 'User'
})
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_id',
    comment: 'Идентификатор',
  })
  readonly userId!: string;

  @Column('varchar', {
    comment: 'Имя',
    length: 20,
  })
  name!: string;

  @Column('varchar', {
    comment: 'Логин',
    nullable: false,
    unique: true,
    length: 20,
  })
  login!: string;

  @Column('varchar', {
    comment: 'Пароль',
    nullable: false,
    length: 20,
  })
  @Exclude({ toPlainOnly: true })
  password!: string;

  @Column('varchar', {
    comment: 'Хеш пароля'
  })
  @Exclude({ toPlainOnly: true })
  passwordHash!: string;

  @Column('varchar', {
    comment: 'Соль пароля',
  })
  @Exclude({ toPlainOnly: true })
  passwordSalt!: string;

  @OneToMany(() => Document, (document) => document.user)
  documents!: Document[];

  constructor(partial?: Partial<User>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
