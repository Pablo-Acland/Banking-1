import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './cliente/clients.module';


@Module({
  imports: [
    ClientsModule,
    ConfigModule.forRoot({
    envFilePath: `${process.cwd()}/environment/.env`,
    isGlobal: true,
  }),

  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: "mysql",
      host: configService.get<string>("DB_HOST"),
      port: configService.get<number>("DB_PORT"),
      username: configService.get<string>("DB_USER"),
      password: configService.get<string>("DB_PASSWORD"),
      database: configService.get<string>("DB_DATABASE"),
      // entities: [],
      autoLoadEntities: true,
      synchronize: true,
      logging: process.env.SCOPE === "production" ? false : true,
    }),
  }),
],
  controllers: [],
  providers: [],
})
export class AppModule {}
