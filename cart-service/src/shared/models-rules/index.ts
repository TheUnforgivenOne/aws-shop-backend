import { AppRequest } from '../models';

/**
 * @param {AppRequest} request
 * @returns {string}
 */
export function getUserIdFromRequest(request: AppRequest): string {
  return (request.user && request.user.id) ?? '5f557a9c-d6af-4cda-bc07-19df20c22914';
}
