-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('High', 'Mid', 'Low');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('Pending', 'Pause', 'Complete');

-- CreateTable
CREATE TABLE "public"."User" (
    "User_Id" SERIAL NOT NULL,
    "First_Name" TEXT NOT NULL,
    "Last_Name" TEXT NOT NULL,
    "Username" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Profile_Pic_Url" TEXT NOT NULL,
    "Is_Active" BOOLEAN NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,
    "Last_Login" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("User_Id")
);

-- CreateTable
CREATE TABLE "public"."Note" (
    "Note_Id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,
    "User_Id" INTEGER NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("Note_Id")
);

-- CreateTable
CREATE TABLE "public"."Task" (
    "Task_Id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Details" TEXT NOT NULL,
    "Priority" "public"."Priority" NOT NULL,
    "Status" "public"."Status" NOT NULL,
    "Due_Date" TIMESTAMP(3) NOT NULL,
    "Created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_At" TIMESTAMP(3) NOT NULL,
    "Completed_At" TIMESTAMP(3) NOT NULL,
    "User_Id" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("Task_Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Username_key" ON "public"."User"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "public"."User"("Email");

-- AddForeignKey
ALTER TABLE "public"."Note" ADD CONSTRAINT "Note_User_Id_fkey" FOREIGN KEY ("User_Id") REFERENCES "public"."User"("User_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_User_Id_fkey" FOREIGN KEY ("User_Id") REFERENCES "public"."User"("User_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
