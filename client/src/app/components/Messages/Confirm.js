import {createConfirmation} from 'react-confirm';
import ConfirmationMessage from './ConfirmationMessage.js';

const defaultConfirmation = createConfirmation(ConfirmationMessage);

export function confirm(confirmation, options = {}) {
  return defaultConfirmation({confirmation, ...options});
}
