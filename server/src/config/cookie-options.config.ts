import { CookieOptions } from 'express';

export const cookieOption = (JWT_COOKIE_EXPIRE_IN: number): CookieOptions => {
  // Cookie expiration date
  const expires = Date.now() + JWT_COOKIE_EXPIRE_IN * 24 * 60 * 60 * 1000;

  // Save the token in cookies
  const cookieOptions = {
    expires: new Date(expires),
    secure: true, // The cookie will only be sent in encrypted connection Only https
    httpOnly: true, // So cookie can't be access or modify by browser
    path: '/', // cookie valid for all backend routes
    partitioned: true, // This for Firefox warning
  };

  return cookieOptions;
};
