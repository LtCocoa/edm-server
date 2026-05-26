import { Reflector } from "@nestjs/core";

type RoleName = 'admin' | 'employee' | 'manager';

export const RequireRole = Reflector.createDecorator<RoleName>();