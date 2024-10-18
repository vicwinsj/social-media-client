import { login } from './login.js';
import * as storage from '../../storage/save.js';

global.fetch = jest.fn();

beforeEach(() => {
  global.localStorage = {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };

  fetch.mockClear();
  jest.clearAllMocks();
});

describe('login function', () => {
  beforeEach(() => {
    fetch.mockClear();
    jest.clearAllMocks();
  });

  it('succeeds with valid credentials', async () => {
    const mockProfile = { name: 'Ola Nordmann', accessToken: 'valid-token' };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProfile,
    });

    const saveSpy = jest.spyOn(storage, 'save');

    const result = await login('ola@nordmann.com', 'ola123');

    expect(result).toEqual({ name: 'Ola Nordmann' });
    expect(storage.save).toHaveBeenCalledWith('token', 'valid-token');
    expect(storage.save).toHaveBeenCalledWith('profile', {
      name: 'Ola Nordmann',
    });
    expect(saveSpy).toHaveBeenCalledTimes(2);
  });

  it('fails with invalid credentials', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Unauthorized',
    });

    await expect(login('ola@nordmann.com', 'ola124')).rejects.toThrow(
      'Unauthorized',
    );
  });
});
