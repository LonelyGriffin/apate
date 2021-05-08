import {Response, Request} from 'express'

export const createRequestStub = (overwrite: Partial<Request>): Request => {
  return ({
    path: '/some/path',
    ...overwrite
  } as any) as Request
}

export const createResponseStub = (overwrite: Partial<Response>): Response => {
  return ({
    path: '/some/path',
    send(body: any) {},
    ...overwrite
  } as any) as Response
}
