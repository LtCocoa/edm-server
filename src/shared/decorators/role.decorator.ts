import { Reflector } from "@nestjs/core";
import { UserRoleKey } from "../enums/user-role-key.enum";

export const RequireRole = Reflector.createDecorator<UserRoleKey>();