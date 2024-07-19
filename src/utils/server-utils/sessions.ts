import {
  NativeAuthDecoded,
  NativeAuthResult,
  NativeAuthServer
} from '@multiversx/sdk-native-auth-server';
import { cookies } from 'next/headers';
import { authConfig } from './constants';

const cache: Map<string, { result: NativeAuthResult | null; expiry: number }> =
  new Map();

export const verifyToken = async (
  authToken: string
): Promise<null | NativeAuthResult> => {
  const cacheEntry = cache.get(authToken);

  if (cacheEntry && cacheEntry.expiry > Date.now()) {
    return cacheEntry.result;
  }

  try {
    const server = new NativeAuthServer(authConfig);
    const valid = await server.validate(authToken);
    cache.set(authToken, { result: valid, expiry: Date.now() + 5 * 60 * 1000 }); // Cache for 5 minutes
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
