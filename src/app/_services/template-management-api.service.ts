import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplateManagementAPIService {

  
  constructor(private http: HttpClient) { }

  postTemplateManagement(data:any){
    return this.http.post<any>("http://localhost:3000/templateManagement/", data)
  }
  getTemplateManagement(){
    return this.http.get<any>("http://localhost:3000/templateManagement/");
  }
  putTemplateManagement(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/templateManagement/"+id, data)
  }
  deleteTemplateManagement(id:number){
    return this.http.delete<any>("http://localhost:3000/templateManagement/"+id)
  }
}
