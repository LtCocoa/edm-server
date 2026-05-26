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

  @ManyToOne(() => Role, {
    nullable: false,
  })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role!: Role;

  constructor(partial?: Partial<User>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
