export interface DriveFile {
  id: string;
  name: string;
  subtitle: string;
  sizeGB: number;
}

export const fileList: DriveFile[] = [
  { id: '1', name: '4K Movie.mp4', subtitle: 'Video file', sizeGB: 1 },
  { id: '2', name: 'AI Dataset.zip', subtitle: 'Compressed dataset', sizeGB: 10 },
  { id: '3', name: 'Research Archive.tar', subtitle: 'Research archive', sizeGB: 100 },
  { id: '4', name: 'Cloud Backup.iso', subtitle: 'Backup image', sizeGB: 500 },
];
