import { AppRequest } from '../models';

/**
 * @param {AppRequest} request
 * @returns {string}
 */
export function getUserIdFromRequest(request: AppRequest): string {
  return (request.user && request.user.id) ?? 'b3209f52-9fc6-416e-81d7-f786c447f11f';
}
