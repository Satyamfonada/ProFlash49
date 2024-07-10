import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterManagementApiService {
  constructor(private http: HttpClient) { }

  postFilterManagement(data:any){
    return this.http.post<any>("http://localhost:3000/filterManagement/", data)
  }
  getFilterManagement(){
    return this.http.get<any>("http://localhost:3000/filterManagement/");
  }
  putFilterManagement(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/filterManagement/"+id, data)
  }
  deleteFilterManagement(id:number){
    return this.http.delete<any>("http://localhost:3000/filterManagement/"+id)
  }
}
