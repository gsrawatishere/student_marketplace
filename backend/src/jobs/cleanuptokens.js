import cron from "node-cron";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

cron.schedule("0 2 * * *",async ()=>{
    try {
         const result = await prisma.refreshToken.deleteMany({
            where : {
                expiry : {lt : new Date()}
            }
         });
         console.log(`🧹 Deleted ${result.count} expired refresh tokens`);

    } catch (error) {
        console.error("Error cleaning up expired tokens:", error);
    }
})