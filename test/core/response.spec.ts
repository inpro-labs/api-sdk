import { Response } from '../../lib/core/response';

describe('Response', () => {
  describe('ok', () => {
    it('should return a success response with data and default statusCode 201', () => {
      const data = { id: '123', name: 'Maxwell' };
      const result = Response.ok(data);

      expect(result).toEqual({
        success: true,
        statusCode: 201,
        data,
      });
    });

    it('should allow overriding statusCode in success response', () => {
      const data = { id: '123' };
      const result = Response.ok(data, 200);

      expect(result).toEqual({
        success: true,
        statusCode: 200,
        data,
      });
    });
  });

  describe('err', () => {
    it('should return an error response with message and default statusCode 500', () => {
      const result = Response.err('Something went wrong');

      expect(result).toEqual({
        success: false,
        statusCode: 500,
        message: 'Something went wrong',
      });
    });

    it('should allow setting custom statusCode and code in error response', () => {
      const result = Response.err('User not found', 'USER_NOT_FOUND', 404);

      expect(result).toEqual({
        success: false,
        statusCode: 404,
        message: 'User not found',
        code: 'USER_NOT_FOUND',
      });
    });
  });
});
