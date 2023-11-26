import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ConfigModule, } from "@nestjs/config";
import { config } from "./config/server";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import 'dotenv/config'
@Module({
  imports: [
   MongooseModule.forRoot(process.env.DATABASE_URI),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env'],
      load: [config],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
