import petrovich from 'petrovich';
import { type User } from '../../modules/users/entities/user.entity';

export function toDative(user: User) {
  return petrovich({
    first: 'Петр',
    last: 'Чайковский',
    middle: 'Ильич',
  }, 'dative');
}