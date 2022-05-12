import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeneralResponse, ImageInfo } from 'src/app/models/general';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private httpclient: HttpClient) {}
// I/Capacitor/Console: File: http://localhost/src_app_pages_menu_support-productive-families_support-productive-families_module_ts.js - Line 156 - Msg: taken image :http://localhost/_capacitor_file_/storage/emulated/0/Android/data/com.efada.qesaa/files/Pictures/JPEG_20220512_155644_6147056435962828767.jpg
// I/Capacitor/Console: File: http://localhost/src_app_pages_menu_support-productive-families_support-productive-families_module_ts.js - Line 210 - Msg: upload :    {"lang":"ar","image":"http://localhost/_capacitor_file_/storage/emulated/0/Android/data/com.efada.qesaa/files/Pictures/JPEG_20220512_155644_6147056435962828767.jpg"}
// D/Capacitor: Handling local request: http://localhost/_capacitor_file_/storage/emulated/0/Android/data/com.efada.qesaa/files/Pictures/JPEG_20220512_155644_6147056435962828767.jpg
// V/Capacitor/Plugin: To native (Capacitor plugin): callbackId: 22797756, pluginId: Network, methodName: addListener
// V/Capacitor: callback: 22797756, pluginId: Network, methodName: addListener, methodData: {"eventName":"networkStatusChange"}
// E/Capacitor/Console: File: http://localhost/vendor.js - Line 61226 - Msg: ERROR [object Object]
  uploadImage(data: ImageInfo): Observable<GeneralResponse> {
    // upload-image
console.log('upload :    '+  JSON.stringify(data))
    return this.httpclient.post<GeneralResponse>(
      `${environment.BASE_URL}upload-image`,
      data
    );
  }
}
