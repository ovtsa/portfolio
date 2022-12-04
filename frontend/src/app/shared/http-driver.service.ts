import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { Byte } from '@angular/compiler/src/util';

class ResumeDto {
  binaryData: string;
  extension: string;
  id: string;
  name: string;
}

class DownloadedResume {
  binaryData: Blob;
  fileName: string;
}

@Injectable()
export class HttpDriver {
  constructor(private http: HttpClient) { }
  private static readonly routeTemplates: string[];

  getResume(): Byte[] {
    let resumeBytes: Byte[] = null;
    this.http.get("https://localhost:7121/resume").subscribe((response: ResumeDto) => {
      if (response != null) {
        let blob = this.base64ToBlob(response.binaryData, 'text/plain');
        saveAs(blob, "resume.docx");
      }
    });
    return null;
  }

  private base64ToBlob(b64Data: string, contentType: string = '', sliceSize: number = 512): Blob {
    b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {type: contentType});
  }
}