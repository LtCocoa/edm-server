import { Reflector } from "@nestjs/core";

type RoleName = 'admin' | 'employee' | 'manager';

export const Role = Reflector.createDecorator<RoleName>();