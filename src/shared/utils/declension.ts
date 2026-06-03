import petrovich from 'petrovich';
import { type User } from '../../modules/users/entities/user.entity';

export interface DeclensionOutput {
  first: string;
  last: string;
  middle: string;
  gender: string;
}

export function toDative(user: User): DeclensionOutput {
  return petrovich({
    first: user.firstName,
    last: user.lastName,
    middle: user.middleName,
  }, 'dative');
}

export function toGenitive(user: User): DeclensionOutput {
  return petrovich({
    first: user.firstName,
    last: user.lastName,
    middle: user.middleName,
  }, 'genitive');
}
