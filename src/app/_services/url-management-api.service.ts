import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlManagementAPIService {

  private apiUrl: string;
  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }

  postUrlManagement(data:any){


    const url = `${this.apiUrl}/smsplatform/longUrl/createLongUrl`;
    const session = JSON.parse(sessionStorage.getItem('user')!);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cookie': 'SERVER=web2',
      'Authorization': `Bearer ${session ? session.result.token : null}`
    });
    return this.http.post<any>(url, data, { headers });

  }
  getUrlManagement(){

    const session = JSON.parse(sessionStorage.getItem('user')!);
    const token = session?.result?.token;
    const userId = session?.userId;
    if (!userId || !token) {
      throw new Error("User ID or token is missing from session storage.");
    }
    const url = `${this.apiUrl}/smsplatform/longUrl/findAllTrackingList?clientId=${userId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cookie': 'SERVER=web2',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(url, { headers });


  }
  updateUrlStatus(trackingId: number, status: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/smsplatform/longUrl/deleteByTrackingId`, {
      params: {
        trackingId: trackingId.toString(),
        status: status.toString()
      }
    });
  }




  putUrlManagement(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/urlManagement/"+id, data)
  }
  deleteUrlManagement(id:number){
    return this.http.delete<any>("http://localhost:3000/urlManagement/"+id)
  }
}
