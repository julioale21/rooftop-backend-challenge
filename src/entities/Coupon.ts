import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "coupons", schema: "rooftop-backend-challenge" })
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  expires_at: Date;

  @Column()
  assigned_at: number;

  @Column()
  customer_email: string;
}
