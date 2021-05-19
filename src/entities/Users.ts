import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users', { schema: 'gengar' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', length: 30 })
  name: string;

  @Column('varchar', { name: 'password', length: 60 })
  password: string;

  @Column('varchar', { name: 'salt', length: 20 })
  salt: string;

  @Column('tinyint', { name: 'status', default: () => "'0'" })
  status: number;
}
