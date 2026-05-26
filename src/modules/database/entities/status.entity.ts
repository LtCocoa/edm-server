import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'statuses'
})
export class Status {
  @PrimaryGeneratedColumn('increment', {
    name: 'id'
  })
  readonly id!: number;

  @Column('varchar', {
    name: 'name',
    length: 20,
  })
  name!: string;

  @Column('varchar', {
    name: 'key',
    length: 20,
    unique: true,
  })
  key!: string;
}