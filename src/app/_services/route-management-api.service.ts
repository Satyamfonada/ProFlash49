import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteManagementApiService {
  constructor(private http: HttpClient) { }

  postRouteManagement(data:any){
    return this.http.post<any>("http://localhost:3000/routeManagement/", data)
  }
  getRouteManagement(){
    return this.http.get<any>("http://localhost:3000/routeManagement/");
  }
  putRouteManagement(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/routeManagement/"+id, data)
  }
  deleteRouteManagement(id:number){
    return this.http.delete<any>("http://localhost:3000/routeManagement/"+id)
  }
}
