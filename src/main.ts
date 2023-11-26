import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Logger, ValidationPipe } from "@nestjs/common";
import { createAgent } from '@forestadmin/agent';
import { createMongooseDataSource } from '@forestadmin/datasource-mongoose';
import { connection } from "mongoose";
async function bootstrap() {
  
    const agent = createAgent({
      authSecret: process.env.FOREST_AUTH_SECRET,
      envSecret: process.env.FOREST_ENV_SECRET,
      isProduction: process.env.NODE_ENV === 'production',
      typingsPath: './typings.ts',
      typingsMaxDepth: 5,
  
    }).addDataSource(createMongooseDataSource(connection, {
      flattenMode: 'auto',
    }));
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>("port");
  const environment = configService.get<string>("NODE_ENV");
  app.useGlobalPipes(new ValidationPipe());
  await agent.mountOnNestJs(app).start();
  await app.listen(port);
  console.log('%cmain.ts line:23  environment', 'color: #007acc;', environment);

  Logger.log(
    `~${ process.env.NODE_ENV}  Application is running on: ${await app.getUrl()}`
  );
}
bootstrap();
