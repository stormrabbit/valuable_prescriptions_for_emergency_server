import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users", { schema: "gengar" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 30 })
  name: string;

  @Column("varchar", { name: "pwd", nullable: true, length: 60 })
  pwd: string | null;

  @Column("tinyint", { name: "status", default: () => "'0'" })
  status: number;
}
