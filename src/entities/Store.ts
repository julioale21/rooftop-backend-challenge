import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "stores", schema: "rooftop-backend-challenge" })
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;
}
