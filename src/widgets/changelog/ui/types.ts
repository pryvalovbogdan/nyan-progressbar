export type ChangeType = 'new' | 'fix' | 'improvement' | 'perf';

export interface IChangeEntry {
  type: ChangeType;
  text: string;
}

export interface IVersionEntry {
  version: string;
  date: string;
  latest?: boolean;
  changes: IChangeEntry[];
}

export interface IChangelogSectionProps {
  heading: string;
  viewAllLabel: string;
}
