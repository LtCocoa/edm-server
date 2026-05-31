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
    firstName: 'Admin',
    lastName: 'Adminov',
    middleName: 'Adminovich',
    positionName: 'Admin',
    roleId: 1
  });

  await userService.create({
    login: 'ddem',
    password: 'cocoa',
    firstName: 'Денис',
    lastName: 'Дементьев',
    middleName: 'Геннадьевич',
    positionName: 'Руководитель отдела',
    roleId: 2
  });

  await userService.create({
    login: 'pepega',
    password: 'mega',
    firstName: 'Иван',
    lastName: 'Иванов',
    middleName: 'Иванович',
    positionName: 'Работяга',
    roleId: 3
  });
  await app.close();
}

bootstrap();
