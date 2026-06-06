import { User } from "../../modules/users/entities/user.entity";

export function formatNameShort(name: { first: string, last: string, middle: string }) {
  return `${name.last} ${name.first.charAt(0)}.${name.middle.charAt(0)}`;
}

export function formatUserNameShort(user: User) {
  return formatNameShort({
    first: user.firstName,
    last: user.lastName,
    middle: user.middleName,
  });
}