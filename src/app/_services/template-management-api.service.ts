import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TemplateManagementAPIService {
  private apiUrl: string;
  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }
  postTemplateManagement(data:any){
    const url = `${this.apiUrl}/smsplatform/template/createTemplate`;
    const session = JSON.parse(sessionStorage.getItem('user')!);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cookie': 'SERVER=web2',
      'Authorization': `Bearer ${session ? session.result.token : null}`
    });
    return this.http.post<any>(url, data, { headers });
  }
  updateTemplet(data:any){
    const url = `${this.apiUrl}/smsplatform/template/updateTemplate`;
    const session = JSON.parse(sessionStorage.getItem('user')!);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cookie': 'SERVER=web2',
      'Authorization': `Bearer ${session ? session.result.token : null}`
    });
    return this.http.post<any>(url, data, { headers });
  }

  getTemplateManagement(){
    const session = JSON.parse(sessionStorage.getItem('user')!);
    const token = session?.result?.token;
    const userId = session?.userId;
    if (!userId || !token) {
      throw new Error("User ID or token is missing from session storage.");
    }
    const url = `${this.apiUrl}/smsplatform/template/findAllTemplateByUserId?userId=${userId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cookie': 'SERVER=web2',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(url, { headers });
  }


  updateTemplateStatus(templateId: number, status: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/smsplatform/template/deactivateSenderByTemplateId`, {
      params: {
        templateId: templateId.toString(),
        status: status.toString()
      }
    });
  }

  putTemplateManagement(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/templateManagement/"+id, data)
  }
  deleteTemplateManagement(id:number){
    return this.http.delete<any>("http://localhost:3000/templateManagement/"+id)
  }
}
