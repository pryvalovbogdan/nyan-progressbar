export interface CustomizerLabels {
  adjustPosition: string;
  height: string;
  topOffset: string;
}

export interface PreviewLabels {
  label: string;
  player: string;
}

export interface ICustomizerPanelProps {
  labels: CustomizerLabels;
  previewLabels: PreviewLabels;
  isMainPage: boolean;
}
