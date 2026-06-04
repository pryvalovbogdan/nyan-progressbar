export interface PreviewLabels {
  label: string;
  player: string;
}

export interface IScrubberPreviewProps {
  labels: PreviewLabels;
  disabled?: boolean;
}
