import {RecordFile} from "./RecordFile";

export class Record {
  _id?: string;
  title: string;
  transcription: string;
  file?: RecordFile;
  tmpFile?: File;
  speechType: string;
  date: Date;

  constructor() {
  }
}
