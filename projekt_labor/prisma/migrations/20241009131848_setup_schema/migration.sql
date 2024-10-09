-- CreateTable
CREATE TABLE "Prices" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "price" REAL,
    "currency" VARCHAR,
    "store" VARCHAR,
    "user_id" INTEGER,

    CONSTRAINT "Prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "category" VARCHAR,
    "description" VARCHAR,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingListItems" (
    "id" SERIAL NOT NULL,
    "shopping_list_id" INTEGER,
    "product_id" INTEGER,
    "quantity" INTEGER,

    CONSTRAINT "ShoppingListItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingLists" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "user_id" INTEGER,

    CONSTRAINT "ShoppingLists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR,
    "role" VARCHAR,
    "password" VARCHAR,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Prices" ADD CONSTRAINT "Prices_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Prices" ADD CONSTRAINT "Prices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ShoppingListItems" ADD CONSTRAINT "ShoppingListItems_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ShoppingListItems" ADD CONSTRAINT "ShoppingListItems_shopping_list_id_fkey" FOREIGN KEY ("shopping_list_id") REFERENCES "ShoppingLists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ShoppingLists" ADD CONSTRAINT "ShoppingLists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
