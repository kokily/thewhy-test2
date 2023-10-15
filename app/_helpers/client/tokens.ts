import jwt, { type JwtPayload } from 'jsonwebtoken';

interface SignOptions {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOptions = {
  expiresIn: '1h',
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOptions = DEFAULT_SIGN_OPTION,
) {
  const secretKey = process.env.JWT_SECRET!;
  const token = jwt.sign(payload, secretKey, options);

  return token;
}

export function verifyJwt(token: string) {
  try {
    const secretKey = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secretKey);

    return decoded as JwtPayload;
  } catch (err: any) {
    console.log(err);
    return null;
  }
}
