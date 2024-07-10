import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserManagementApiService {
  constructor(private http: HttpClient) { }

  postUserManagement(data:any){
    return this.http.post<any>("http://localhost:3000/userManagement/", data)
  }
  getUserManagement(){
    return this.http.get<any>("http://localhost:3000/userManagement/");
  }
  putUserManagement(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/userManagement/"+id, data)
  }
  deleteUserManagement(id:number){
    return this.http.delete<any>("http://localhost:3000/userManagement/"+id)
  }
}
