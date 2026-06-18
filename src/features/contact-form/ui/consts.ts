import type { FormState } from './ContactForm/types';

export const EMPTY: FormState = { name: '', email: '', category: null, message: '', attachment: null };
export const MAX_SIZE = 5 * 1024 * 1024;
