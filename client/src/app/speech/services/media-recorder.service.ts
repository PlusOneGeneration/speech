import {Injectable, NgZone} from "@angular/core";
import {Observable} from "rxjs/Observable";
import * as RecordRTC from  'recordrtc/RecordRTC.js';

@Injectable()
export class MediaRecorderService {
  constructor(private zone: NgZone) {
  }

  recordStart(recordOptions: any, mediaElementOptions: any = {audio: true}): Observable<{ recordRTC: RecordRTC, stream: MediaStream }> {
    return Observable.create((observer) => {
      navigator.mediaDevices
        .getUserMedia(mediaElementOptions)
        .then((mediaStream) => {
        //TODO @@@dr merge options recored type with other options
          let recordRTC = RecordRTC(mediaStream, {
            recorderType: RecordRTC.StereoAudioRecorder,
            mimeType: 'audio/wav;codecs=pcmrecordOptions',
            desiredSampRate: 16000,
            numberOfAudioChannels: 1
          });
          console.log('recordRTC =>>>', recordRTC);
          recordRTC.startRecording();

          this.zone.run(() => observer.next({recordRTC: recordRTC, stream: mediaStream}));
        })
        .catch((err) => console.error(err));
    });
  }

  // recordStop(recordRTC: RecordRTC, stream: MediaStream): Observable<string> {
  //TODO @@@dr need to check send recordRTC or not
  recordStop(recordRTC: RecordRTC, stream: MediaStream): Observable<any> {
    return Observable.create((observer) => {
      recordRTC.stopRecording((audioVideoWebMURL) => {

        this.zone.run(() => observer.next({recordRTC: recordRTC, audioVideoWebMURL: audioVideoWebMURL}));

        stream.getAudioTracks().forEach(track => track.stop());
        stream.getVideoTracks().forEach(track => track.stop());
      });
    });
  }

  download(recordRTC: RecordRTC, fileName: string, format: string = 'webm'): Observable<any> {
    return Observable.create((observer) => {
      try {
        recordRTC.save(`${fileName}.${format}`);
        observer.next();
      } catch (ex) {
        observer.error(ex);
      }
    });
  }
}
