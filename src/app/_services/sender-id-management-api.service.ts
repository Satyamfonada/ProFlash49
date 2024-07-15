import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SenderIdManagementAPIService {
  private apiUrl: string;

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }
 
  postSenderIdManagement(data:any){
    const url = `${this.apiUrl}/smsplatform/sender/createSender`;
     const session = JSON.parse(sessionStorage.getItem('user')!);
     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Cookie': 'SERVER=web2',
       'Authorization': `Bearer ${session ? session.result.token : null}`
     });
 
     return this.http.post<any>(url, data, { headers });
  }

  updatwSenderIdManagement(data:any){
    const url = `${this.apiUrl}/smsPlatform/sender/updateSender`;
     const session = JSON.parse(sessionStorage.getItem('user')!);
     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Cookie': 'SERVER=web2',
       'Authorization': `Bearer ${session ? session.result.token : null}`
     });
 
     return this.http.post<any>("http://fuat.flash49.com/smsplatform/sender/updateSender", data, { headers });
  }


  getSenderIdManagement() {
    const session = JSON.parse(sessionStorage.getItem('user')!);
    const token = session?.result?.token;
    const userId = session?.userId;

    if (!userId || !token) {
      throw new Error("User ID or token is missing from session storage.");
    }

    const url = `${this.apiUrl}/smsplatform/sender/findAllSenderByUserId?userId=${userId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cookie': 'SERVER=web2',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(url, { headers });
  }
  putSenderIdManagement(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/senderIdManagement/"+id, data)
  }
  deleteSenderIdManagement(id:number){
    return this.http.delete<any>("http://localhost:3000/senderIdManagement/"+id)
  }
}
