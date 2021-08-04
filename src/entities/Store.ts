import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "coupons" })
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  addess: string;
}
