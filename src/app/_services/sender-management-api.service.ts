import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenderManagementApiService {
  constructor(private http: HttpClient) { }

  postSenderManagement(data:any){
    return this.http.post<any>("http://localhost:3000/senderManagement/", data)
  }
  getSenderManagement(){
    return this.http.get<any>("http://localhost:3000/senderManagement/");
  }
  putSenderManagement(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/senderManagement/"+id, data)
  }
  deleteSenderManagement(id:number){
    return this.http.delete<any>("http://localhost:3000/senderManagement/"+id)
  }
}
