import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RepositoryApiService {

  constructor(private http: HttpClient) { }

  postRepositoryList(data:any){
    return this.http.post<any>("http://localhost:3000/repositoryList/", data)
  }
  getRepositoryList(){
    return this.http.get<any>("http://localhost:3000/repositoryList/");
  }
  putRepositoryList(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/repositoryList/"+id, data)
  }
  deleteRepositoryList(id:number){
    return this.http.delete<any>("http://localhost:3000/repositoryList/"+id)
  }

  postUploadUserBaseCSV(csvData:any){
    return this.http.post<any>("http://localhost:3000/upload/", csvData)
  }
  getUploadUserBaseCSV(){
    return this.http.get<any>("http://localhost:3000/upload/")
  }

  postNewEntry(data:any){
    return this.http.post<any>("http://localhost:3000/newEntryAdded/", data)
  }
  getNewEntry(){
    return this.http.get<any>("http://localhost:3000/newEntryAdded/");
  }
  putNewEntry(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/newEntryAdded/"+id, data)
  }
  deleteNewEntry(id:number){
    return this.http.delete<any>("http://localhost:3000/newEntryAdded/"+id)
  }
  deleteAllRows(data:any){
    return this.http.delete<any>("http://localhost:3000/newEntryAdded/", data)
  }
}
