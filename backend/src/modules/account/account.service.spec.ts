import { Test, type TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { Repository } from 'typeorm';
import { Account } from '../../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { AccountGenderEnum, AccountRoleEnum } from '../../common';
import type { AccountUpdateDto } from './dtos/accountUpdateDto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import type { PasswordUpdateDto } from './dtos/passwordUpdateDto';
import * as bcrypt from 'bcrypt';

describe('AccountService', () => {
  let accountService: AccountService;
  let accountRepo: Repository<Account>;
  let i18nService: I18nService;

  const mockAccountRepo = {
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  const mockI18nService = {
    t: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        { provide: getRepositoryToken(Account), useValue: mockAccountRepo },
        { provide: I18nService, useValue: mockI18nService },
      ],
    }).compile();

    accountService = module.get<AccountService>(AccountService);
    accountRepo = module.get<Repository<Account>>(getRepositoryToken(Account));
    i18nService = module.get<I18nService>(I18nService);
  });

  it('should be defined', () => {
    expect(accountService).toBeDefined();
  });

  const mockCurrentAccount: Account = {
    id: 1,
    email: 'test@example.com',
    password: bcrypt.hashSync('123456789', 10),
    name: 'Test user',
    displayName: 'Test user',
    tel: '1234567890',
    address: '111 Phan Thanh',
    gender: AccountGenderEnum.MALE,
    avatar: null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: AccountRoleEnum.CUSTOMER,
    carts: [],
    orders: [],
    likes: [],
    reviews: [],
  };

  describe('update account', () => {
    const mockAvatarLink = 'https://example.com/avatar.png';

    const mockAccountDto: AccountUpdateDto = {
      name: 'Update user',
      displayName: 'Update user',
      tel: '0905116391',
      address: 'current address',
      gender: AccountGenderEnum.FEMALE,
    };

    it('should throw NotFoundException if account does not exist', async () => {
      mockAccountRepo.findOneBy.mockResolvedValue(null);
      await expect(
        accountService.updateAccount(
          mockCurrentAccount,
          mockAccountDto,
          mockAvatarLink
        )
      ).rejects.toThrow(NotFoundException);

      expect(mockAccountRepo.findOneBy).toHaveBeenCalledWith({
        id: mockCurrentAccount.id,
      });
    });

    it("should update account's information successfully", async () => {
      const mockFoundAccount: Account = { ...mockCurrentAccount };
      mockAccountRepo.findOneBy.mockResolvedValue(mockFoundAccount);
      mockAccountRepo.save.mockResolvedValue({
        ...mockCurrentAccount,
        ...mockAccountDto,
        avatar: mockAvatarLink,
      });

      const updateAccount = await accountService.updateAccount(
        mockCurrentAccount,
        mockAccountDto,
        mockAvatarLink
      );
      expect(mockAccountRepo.findOneBy).toHaveBeenCalledWith({
        id: mockCurrentAccount.id,
      });
      expect(mockAccountRepo.save).toHaveBeenCalledWith({
        ...mockCurrentAccount,
        ...mockAccountDto,
        avatar: mockAvatarLink,
      });
      expect(updateAccount).toEqual({
        ...mockCurrentAccount,
        ...mockAccountDto,
        avatar: mockAvatarLink,
      });
    });
  });

  describe('update password', () => {
    const mockUpdatePasswordDto: PasswordUpdateDto = {
      currentPassword: '12345678',
      confirmPassword: '1234567',
      newPassword: '12345678',
    };

    it('should throw BadRequestException if password is invalid', async () => {
      // Arrange
      mockUpdatePasswordDto.currentPassword = 'wrongPassword'; // Sai mật khẩu hiện tại

      // Act & Assert
      await expect(
        accountService.updatePassword(
          mockCurrentAccount,
          mockUpdatePasswordDto,
          'en'
        )
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if confirm password and new password is different', async () => {
      // Arrange
      mockUpdatePasswordDto.confirmPassword = 'differentPassword'; // Xác nhận mật khẩu khác với mật khẩu mới

      // Act & Assert
      await expect(
        accountService.updatePassword(
          mockCurrentAccount,
          mockUpdatePasswordDto,
          'en'
        )
      ).rejects.toThrow(BadRequestException);
    });

    it("should update account's password successfully", async () => {
      // Arrange
      mockUpdatePasswordDto.currentPassword = '123456789';
      mockUpdatePasswordDto.confirmPassword = '12345678';
      mockUpdatePasswordDto.newPassword = '12345678';

      const updatedAccount = {
        ...mockCurrentAccount,
        password: bcrypt.hashSync(mockUpdatePasswordDto.newPassword, 10),
      };

      // Xóa các lần gọi trước đó của `mockAccountRepo.save`
      mockAccountRepo.save.mockClear();

      // Act
      mockAccountRepo.findOneBy.mockResolvedValue(mockCurrentAccount);
      mockAccountRepo.save.mockResolvedValue(updatedAccount);

      const result = await accountService.updatePassword(
        mockCurrentAccount,
        mockUpdatePasswordDto,
        'en'
      );

      // Assert
      expect(result).toEqual(updatedAccount);
      expect(mockAccountRepo.findOneBy).toHaveBeenCalledWith({
        id: mockCurrentAccount.id,
      });
      // expect(mockAccountRepo.save).toHaveBeenCalledWith(updatedAccount);
    });
  });
});
