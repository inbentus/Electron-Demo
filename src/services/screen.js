import { SCREEN, SECOND_DURATION } from '@/constants/general';
import * as RecordRTC from 'recordrtc';

const DEFAULT_RECORDING_PARAMS = {
  type: 'video',
  mimeType: `video/webm;codecs=h264`,
  videoBitsPerSecond: 20480 * SECOND_DURATION,
};

export class ScreenHandler {
  constructor() {
    this.recording = false;
    this.takingScreenshot = false;
  }

  setSource(source) {
    this.source = source;
  }

  /**
   * Request screen recording to navigator and saves its stream
   */
  async requestRecording() {
    if (!this.source) {
      throw new Error("No streaming source detected. Can't request recording");
    }

    const constraints = {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: this.source,
        },
      },
    };

    this.stream = await navigator.mediaDevices.getUserMedia(constraints);
  }

  /**
   *
   * @param params Video type and encoding options
   * @returns A Blob representing the recorded video
   */
  async createRecording(params = DEFAULT_RECORDING_PARAMS) {
    if (!this.stream) {
      throw new Error('Error recording screen. Request recording first.');
    }

    this.recorder = new RecordRTC.RecordRTCPromisesHandler(
      this.stream ,
      params,
    );

    this.startRecording();
  }

  /**
   * Begins the recording
   */
  startRecording() {
    this.recording = true;
    this.recorder.startRecording();
  }

  /**
   * Stops the recording
   * @returns A Blob representing the recorded video
   */
  async stopRecording() {
    await this.recorder.stopRecording();
    this.recording = false;

    const blob = await this.recorder.getBlob();
    this.recorder.destroy();

    return blob;
  }

  /**
   * Releases the video stream
   */
  async releaseRecording() {
    try {
      this.stream.getVideoTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error('Error releasing recording resources');
    }
  }

  /**
   * Takes a screenshot of the current screen
   * @returns An URL representing the screenshot
   */
  async takeScreenshot() {
    this.takingScreenshot = true;
    let base64URL = null;
    const html2canvas = await require('html2canvas');
    await html2canvas(document.body, {
      allowTaint: true,
      width: SCREEN.WIDTH,
      height: SCREEN.HEIGHT,
    }).then(function (canvas) {
      document.body.appendChild(canvas);

      // Get base64URL
      base64URL = canvas
        .toDataURL('image/jpg')
        .replace('image/jpg', 'image/octet-stream');
    });

    this.takingScreenshot = false;
    return base64URL;
  }
}

export const schInstance = new ScreenHandler();