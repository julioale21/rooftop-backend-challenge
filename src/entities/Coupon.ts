import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "coupons" })
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  expires_at: string;

  @Column()
  assigned_at: string;

  @Column()
  customer_email: string;
}
