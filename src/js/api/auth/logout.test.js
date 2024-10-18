import { logout } from './logout';
import { remove } from '../../storage/index';

jest.mock('../../storage/index', () => ({
  remove: jest.fn(),
}));

describe('logout', () => {
  it('should remove both "token" and "profile" from storage', () => {
    logout();

    expect(remove).toHaveBeenCalledWith('token');
    expect(remove).toHaveBeenCalledWith('profile');
    expect(remove).toHaveBeenCalledTimes(2);
  });
});
