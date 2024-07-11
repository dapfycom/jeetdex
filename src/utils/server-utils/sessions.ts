import {
  NativeAuthDecoded,
  NativeAuthResult,
  NativeAuthServer
} from '@multiversx/sdk-native-auth-server';
import { cookies } from 'next/headers';
import { authConfig } from './constants';

export const verifyToken = async (
  authToken: string
): Promise<null | NativeAuthResult> => {
  try {
    const server = new NativeAuthServer(authConfig);
    const valid = await server.validate(authToken);
    return valid;
  } catch (error) {
    return null;
  }
};
export const decodeToken = async (
  authToken: string
): Promise<NativeAuthDecoded> => {
  try {
    const server = new NativeAuthServer(authConfig);
    const result = await server.decode(authToken);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const getSession = async (): Promise<NativeAuthDecoded> => {
  const authTokenCookie = cookies().get('auth-token');

  if (!authTokenCookie?.value) {
    return null;
  }

  // verify the token
  const valid = await verifyToken(authTokenCookie.value);
  // if invalid, return null
  if (!valid) {
    return null;
  }
  // else, return the session
  return decodeToken(authTokenCookie.value);
};

export const removeSession = () => {
  cookies().delete('auth-token');
};
