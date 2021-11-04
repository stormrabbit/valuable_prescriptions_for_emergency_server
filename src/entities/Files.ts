import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('files', { schema: 'gengar' })
export class Files {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'file_name', length: 100 })
  fileName: string;

  @Column('varchar', { name: 'file_url', length: 200 })
  fileUrl: string;

  @Column('tinyint', { name: 'status', default: () => "'0'" })
  status: number;

  @Column('timestamp', {
    name: 'create_date',
    nullable: true,
    // default: () => 'CURRENT_TIMESTAMP',
  })
  createDate: any;
}
