import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlManagementAPIService {

  constructor(private http: HttpClient) { }

  postUrlManagement(data:any){
    return this.http.post<any>("http://localhost:3000/urlManagement/", data)
  }
  getUrlManagement(){
    return this.http.get<any>("http://localhost:3000/urlManagement/");
  }
  putUrlManagement(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/urlManagement/"+id, data)
  }
  deleteUrlManagement(id:number){
    return this.http.delete<any>("http://localhost:3000/urlManagement/"+id)
  }
}
