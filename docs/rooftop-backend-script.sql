

ALTER TABLE "rooftop-backend-challenge".coupons
ADD COLUMN created_at DATE;

ALTER TABLE "rooftop-backend-challenge".coupons
ADD COLUMN deleted_at DATE;

ALTER TABLE "rooftop-backend-challenge".coupons
ADD COLUMN count INTEGER NOT NULL DEFAULT 1;

ALTER TABLE "rooftop-backend-challenge".stores
ADD COLUMN deleted_at DATE;

update "rooftop-backend-challenge".coupons set created_at = '20200203' where id < 15
update "rooftop-backend-challenge".coupons set created_at = '20200303' where id > 15 and id <25
update "rooftop-backend-challenge".coupons set created_at = '20200403' where id > 25 and id <30
update "rooftop-backend-challenge".coupons set created_at = '20210101' where id > 30 and id <50
update "rooftop-backend-challenge".coupons set created_at = '20210103' where id > 50 and id <65
update "rooftop-backend-challenge".coupons set created_at = '20210203' where id > 65 and id <90
update "rooftop-backend-challenge".coupons set created_at = '20210204' where id > 90 and id <93
update "rooftop-backend-challenge".coupons set created_at = '20210704' where id > 93 
