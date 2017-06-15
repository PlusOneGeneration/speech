export class Record {
  _id?: string;
  title: string;
  transcription: string;
  filePath?: string;
  file ?: File;
  speechType: string;
  date: Date;

  constructor() {}
}
