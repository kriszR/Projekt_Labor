
-- AlterTable
ALTER TABLE "Prices" DROP COLUMN "store",
ADD COLUMN     "store_id" INTEGER;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "category",
ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "store_id" INTEGER;

-- CreateTable
CREATE TABLE "Stores" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Stores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stores_name_key" ON "Stores"("name");

-- AddForeignKey
ALTER TABLE "Prices" ADD CONSTRAINT "Prices_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
