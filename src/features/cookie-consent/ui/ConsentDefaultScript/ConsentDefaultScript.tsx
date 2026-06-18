import { buildDefaultConsentScript } from '../../lib/consentMode';
import type { IConsentDefaultScriptProps } from './types';

export function ConsentDefaultScript({ storageKey }: IConsentDefaultScriptProps) {
  return <script dangerouslySetInnerHTML={{ __html: buildDefaultConsentScript(storageKey) }} />;
}
