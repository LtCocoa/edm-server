import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

describe('UsersService', () => {
  let service: UsersService;

  const validUserData = {
    firstName: 'Denis',
    lastName: 'Dementyev',
    middleName: 'Gennadyevich',
    login: 'ddem',
    password: 'pepega',
    positionName: 'Director',
    roleId: 1,
  } as const;

  const mockUsersRepository = {
    findUserById: jest.fn(),
    findUserByLogin: jest.fn(),
    createUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find user by id', async () => {
    mockUsersRepository.findUserById.mockResolvedValue({
      id: '1',
      firstName: 'Иван',
    });

    const result = await service.findOneById('1');

    expect(result?.id).toBe('1');
    expect(result?.firstName).toBe('Иван');
  });

  it('should return null', async () => {
    mockUsersRepository.findUserById.mockResolvedValue(null);

    const result = await service.findOneById('1');

    expect(result).toBe(null);
  });

  it('should create a new user', async () => {
    mockUsersRepository.findUserByLogin.mockResolvedValue(null);
    mockUsersRepository.createUser.mockResolvedValue({
      ...validUserData
    });

    const user = await service.create({
      ...validUserData
    });

    expect(user?.firstName).toBe('Denis');
    expect(user?.login).toBe('ddem');
  });
});
