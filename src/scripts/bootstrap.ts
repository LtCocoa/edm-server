import { NestFactory } from "@nestjs/core"
import { AppModule } from "../app.module"
import { UsersService } from "../modules/users/users.service";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const config = app.get(ConfigService);

  const login = config.get('ADMIN_LOGIN');
  const password = config.get('ADMIN_PASSWORD');

  if (login == '' || password == '') {
    return;
  }

  const userService = app.get(UsersService);

  const admin = await userService.findOneByLogin('admin');
  if (admin) {
    return;
  }

  await userService.create({
    login,
    password,
    name: 'Admin',
    roleId: 1
  });
  await app.close();
}

bootstrap();
