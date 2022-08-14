/*
 Navicat Premium Data Transfer

 Source Server         : Database(CSE216)Project
 Source Server Type    : Oracle
 Source Server Version : 190000
 Source Host           : localhost:1521
 Source Schema         : PROJECT

 Target Server Type    : Oracle
 Target Server Version : 190000
 File Encoding         : 65001

 Date: 14/08/2022 15:39:30
*/


-- ----------------------------
-- Table structure for Cart
-- ----------------------------
DROP TABLE "PROJECT"."Cart";
CREATE TABLE "PROJECT"."Cart" (
  "user_id" NUMBER VISIBLE NOT NULL,
  "medicine_id" NUMBER VISIBLE,
  "medicine_name" VARCHAR2(255 BYTE) VISIBLE,
  "medicine_quantity" NUMBER VISIBLE,
  "medicine_price" NUMBER VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of Cart
-- ----------------------------

-- ----------------------------
-- Table structure for Medicine
-- ----------------------------
DROP TABLE "PROJECT"."Medicine";
CREATE TABLE "PROJECT"."Medicine" (
  "medicine_id" NUMBER(10,0) VISIBLE NOT NULL,
  "medicine_name" VARCHAR2(255 BYTE) VISIBLE NOT NULL,
  "medicine_price" NUMBER(10,0) VISIBLE NOT NULL,
  "medicine_sale_price" NUMBER(10,0) VISIBLE,
  "medicine_quantity" NUMBER(10,0) VISIBLE,
  "medicine_image" VARCHAR2(255 BYTE) VISIBLE NOT NULL,
  "medicine_category" VARCHAR2(255 BYTE) VISIBLE NOT NULL,
  "disease" VARCHAR2(255 BYTE) VISIBLE,
  "shop_id" NUMBER(10,0) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of Medicine
-- ----------------------------
INSERT INTO "PROJECT"."Medicine" VALUES ('1', 'Power Gel', '120', NULL, '10', '1.png', 'Fish', 'Protin Based Gel', '1');
INSERT INTO "PROJECT"."Medicine" VALUES ('2', 'BKC', '180', NULL, '25', '2.png', 'Fish', 'Heavy Moisture Bleeding', '1');
INSERT INTO "PROJECT"."Medicine" VALUES ('3', 'AmmoFix', '150', NULL, '20', '3.png', 'Fish', 'Ammonia Reducer', '1');
INSERT INTO "PROJECT"."Medicine" VALUES ('4', 'Citrix-100', '220', NULL, '50', '4.png', 'Fish', 'Vitamin-C', '1');
INSERT INTO "PROJECT"."Medicine" VALUES ('5', 'Enrocin(vet)', '100', NULL, '13', '5.png', 'Poultry', 'Bacterial Disease', '1');
INSERT INTO "PROJECT"."Medicine" VALUES ('6', 'Zesup-vet', '330', NULL, '17', '6.png', 'Poultry', 'Diarrhea', '1');

-- ----------------------------
-- Table structure for Shop
-- ----------------------------
DROP TABLE "PROJECT"."Shop";
CREATE TABLE "PROJECT"."Shop" (
  "shop_id" NUMBER(10,0) VISIBLE NOT NULL,
  "shop_name" VARCHAR2(255 BYTE) VISIBLE NOT NULL,
  "shop_address" VARCHAR2(255 BYTE) VISIBLE,
  "manager_id" NUMBER(10,0) VISIBLE NOT NULL,
  "shop_contact_no" NUMBER(15,0) VISIBLE,
  "shop_email" VARCHAR2(255 BYTE) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of Shop
-- ----------------------------
INSERT INTO "PROJECT"."Shop" VALUES ('1', 'Medigreen', 'Mogra Bazar,Akhaura,Brahmanbaria', '1', '1819921219', 'medigreen020@gmail.com

medigreen@gmail.com');

-- ----------------------------
-- Table structure for User
-- ----------------------------
DROP TABLE "PROJECT"."User";
CREATE TABLE "PROJECT"."User" (
  "user_id" NUMBER(10,0) VISIBLE NOT NULL,
  "user_name" VARCHAR2(255 BYTE) VISIBLE NOT NULL,
  "user_address" VARCHAR2(255 BYTE) VISIBLE,
  "user_identity" VARCHAR2(255 BYTE) VISIBLE,
  "user_email" VARCHAR2(255 BYTE) VISIBLE,
  "user_phone_no" NUMBER(11,0) VISIBLE,
  "user_password" VARCHAR2(255 BYTE) VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of User
-- ----------------------------
INSERT INTO "PROJECT"."User" VALUES ('1', 'Kabir Bhuiyan', 'Village:Nilakhad', 'Customer', NULL, NULL, '123');
INSERT INTO "PROJECT"."User" VALUES ('2', 'Emon Mia', 'Village:Mogra', 'Manager', NULL, NULL, '123');
INSERT INTO "PROJECT"."User" VALUES ('3', 'Mamon Bhuiyan', 'Village:Nilakhad', 'Customer', NULL, NULL, '123');

-- ----------------------------
-- Table structure for expert
-- ----------------------------
DROP TABLE "PROJECT"."expert";
CREATE TABLE "PROJECT"."expert" (
  "expert_id" NUMBER VISIBLE NOT NULL,
  "expert_name" VARCHAR2(255 BYTE) VISIBLE,
  "expert_email_id" NUMBER VISIBLE,
  "shop_id" NUMBER VISIBLE,
  "expertise" VARCHAR2(255 BYTE) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of expert
-- ----------------------------

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE "PROJECT"."order";
CREATE TABLE "PROJECT"."order" (
  "user_id" NUMBER VISIBLE NOT NULL,
  "medicine_id" NUMBER VISIBLE,
  "medicine_quantity" NUMBER VISIBLE,
  "date" VARCHAR2(255 BYTE) VISIBLE,
  "order_id" NUMBER VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO "PROJECT"."order" VALUES ('1', NULL, NULL, NULL, '1');

-- ----------------------------
-- Table structure for regester
-- ----------------------------
DROP TABLE "PROJECT"."regester";
CREATE TABLE "PROJECT"."regester" (
  "user_id" NUMBER(10,0) VISIBLE NOT NULL,
  "user_name" VARCHAR2(255 BYTE) VISIBLE NOT NULL,
  "user_password" VARCHAR2(255 BYTE) VISIBLE,
  "user_email" VARCHAR2(255 BYTE) VISIBLE,
  "user_mobile_no" VARCHAR2(255 BYTE) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of regester
-- ----------------------------
INSERT INTO "PROJECT"."regester" VALUES ('4', 'Bijoy Ahmed', '123', NULL, '01717573850');
INSERT INTO "PROJECT"."regester" VALUES ('3', 'Kabir Bhuiyan', '123', 'kabir@gmail.com', '01717573856');
INSERT INTO "PROJECT"."regester" VALUES ('2', 'Emon Mia', '123', 'emon@gmail.com', '01717573857');
INSERT INTO "PROJECT"."regester" VALUES ('1', 'Mamon Bhuiyan', '123', 'mamon@gmail.com', '01717573858');

-- ----------------------------
-- Table structure for worker
-- ----------------------------
DROP TABLE "PROJECT"."worker";
CREATE TABLE "PROJECT"."worker" (
  "worker_id" NUMBER VISIBLE NOT NULL,
  "worker_name" VARCHAR2(255 BYTE) VISIBLE NOT NULL,
  "shop_id" NUMBER VISIBLE NOT NULL,
  "worker_joining_date" DATE VISIBLE,
  "worker_salary" NUMBER VISIBLE,
  "worker_phone_no" NUMBER(11,0) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Records of worker
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table Cart
-- ----------------------------
ALTER TABLE "PROJECT"."Cart" ADD CONSTRAINT "SYS_C007895" PRIMARY KEY ("user_id");

-- ----------------------------
-- Checks structure for table Cart
-- ----------------------------
ALTER TABLE "PROJECT"."Cart" ADD CONSTRAINT "SYS_C007894" CHECK ("user_id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table Medicine
-- ----------------------------
ALTER TABLE "PROJECT"."Medicine" ADD CONSTRAINT "SYS_C007670" PRIMARY KEY ("medicine_id");

-- ----------------------------
-- Checks structure for table Medicine
-- ----------------------------
ALTER TABLE "PROJECT"."Medicine" ADD CONSTRAINT "SYS_C007667" CHECK ("medicine_id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."Medicine" ADD CONSTRAINT "SYS_C007668" CHECK ("medicine_name" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."Medicine" ADD CONSTRAINT "SYS_C007669" CHECK ("medicine_price" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."Medicine" ADD CONSTRAINT "SYS_C007671" CHECK ("medicine_image" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."Medicine" ADD CONSTRAINT "SYS_C007672" CHECK ("medicine_category" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."Medicine" ADD CONSTRAINT "SYS_C007695" CHECK ("medicine_id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."Medicine" ADD CONSTRAINT "SYS_C007696" CHECK ("medicine_name" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."Medicine" ADD CONSTRAINT "SYS_C007697" CHECK ("medicine_price" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."Medicine" ADD CONSTRAINT "SYS_C007698" CHECK ("medicine_image" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."Medicine" ADD CONSTRAINT "SYS_C007699" CHECK ("medicine_category" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table Shop
-- ----------------------------
ALTER TABLE "PROJECT"."Shop" ADD CONSTRAINT "SYS_C007676" PRIMARY KEY ("shop_id");

-- ----------------------------
-- Checks structure for table Shop
-- ----------------------------
ALTER TABLE "PROJECT"."Shop" ADD CONSTRAINT "SYS_C007673" CHECK ("shop_id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."Shop" ADD CONSTRAINT "SYS_C007674" CHECK ("shop_name" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."Shop" ADD CONSTRAINT "SYS_C007675" CHECK ("manager_id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."Shop" ADD CONSTRAINT "SYS_C007706" CHECK ("shop_id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."Shop" ADD CONSTRAINT "SYS_C007707" CHECK ("shop_name" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."Shop" ADD CONSTRAINT "SYS_C007708" CHECK ("manager_id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table User
-- ----------------------------
ALTER TABLE "PROJECT"."User" ADD CONSTRAINT "SYS_C007891" PRIMARY KEY ("user_id");

-- ----------------------------
-- Checks structure for table User
-- ----------------------------
ALTER TABLE "PROJECT"."User" ADD CONSTRAINT "SYS_C007677" CHECK ("user_id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."User" ADD CONSTRAINT "SYS_C007678" CHECK ("user_name" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."User" ADD CONSTRAINT "SYS_C007713" CHECK ("user_id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."User" ADD CONSTRAINT "SYS_C007714" CHECK ("user_name" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."User" ADD CONSTRAINT "SYS_C007893" CHECK ("user_password" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table expert
-- ----------------------------
ALTER TABLE "PROJECT"."expert" ADD CONSTRAINT "SYS_C007761" PRIMARY KEY ("expert_id");

-- ----------------------------
-- Checks structure for table expert
-- ----------------------------
ALTER TABLE "PROJECT"."expert" ADD CONSTRAINT "SYS_C007760" CHECK ("expert_id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table order
-- ----------------------------
ALTER TABLE "PROJECT"."order" ADD CONSTRAINT "SYS_C007899" PRIMARY KEY ("user_id", "order_id");

-- ----------------------------
-- Checks structure for table order
-- ----------------------------
ALTER TABLE "PROJECT"."order" ADD CONSTRAINT "SYS_C007896" CHECK ("user_id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."order" ADD CONSTRAINT "SYS_C007898" CHECK ("order_id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table regester
-- ----------------------------
ALTER TABLE "PROJECT"."regester" ADD CONSTRAINT "SYS_C007757" PRIMARY KEY ("user_id");

-- ----------------------------
-- Checks structure for table regester
-- ----------------------------
ALTER TABLE "PROJECT"."regester" ADD CONSTRAINT "SYS_C007755" CHECK ("user_id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."regester" ADD CONSTRAINT "SYS_C007756" CHECK ("user_name" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table worker
-- ----------------------------
ALTER TABLE "PROJECT"."worker" ADD CONSTRAINT "SYS_C007759" PRIMARY KEY ("worker_id");

-- ----------------------------
-- Checks structure for table worker
-- ----------------------------
ALTER TABLE "PROJECT"."worker" ADD CONSTRAINT "SYS_C007758" CHECK ("worker_id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."worker" ADD CONSTRAINT "SYS_C007887" CHECK ("worker_name" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."worker" ADD CONSTRAINT "SYS_C007888" CHECK ("shop_id" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table Cart
-- ----------------------------
ALTER TABLE "PROJECT"."Cart" ADD CONSTRAINT "MEDICINE_ID_FK" FOREIGN KEY ("medicine_id") REFERENCES "PROJECT"."Medicine" ("medicine_id") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "PROJECT"."Cart" ADD CONSTRAINT "USER_ID_FK" FOREIGN KEY ("user_id") REFERENCES "PROJECT"."User" ("user_id") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table Medicine
-- ----------------------------
ALTER TABLE "PROJECT"."Medicine" ADD CONSTRAINT "SHOP_ID_FK1" FOREIGN KEY ("shop_id") REFERENCES "PROJECT"."Shop" ("shop_id") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table expert
-- ----------------------------
ALTER TABLE "PROJECT"."expert" ADD CONSTRAINT "EXPERT_ID_FK" FOREIGN KEY ("shop_id") REFERENCES "PROJECT"."Shop" ("shop_id") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table order
-- ----------------------------
ALTER TABLE "PROJECT"."order" ADD CONSTRAINT "USER_ID_FK2" FOREIGN KEY ("user_id") REFERENCES "PROJECT"."User" ("user_id") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table worker
-- ----------------------------
ALTER TABLE "PROJECT"."worker" ADD CONSTRAINT "WORKER_ID_FK" FOREIGN KEY ("shop_id") REFERENCES "PROJECT"."Shop" ("shop_id") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
