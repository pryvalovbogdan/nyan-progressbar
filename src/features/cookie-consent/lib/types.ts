export type ConsentValue = 'granted' | 'denied';

export interface ConsentSignal {
  ad_storage: ConsentValue;
  ad_user_data: ConsentValue;
  ad_personalization: ConsentValue;
  analytics_storage: ConsentValue;
  personalization_storage: ConsentValue;
  functionality_storage: ConsentValue;
  security_storage: ConsentValue;
}
