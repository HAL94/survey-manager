import MessageResponse from './message-response.interface';

export default interface OperationResponse<T = unknown> extends MessageResponse {
  success?: boolean;
  result?: T | undefined | null;
  error?: any;
}
