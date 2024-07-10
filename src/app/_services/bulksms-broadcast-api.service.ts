import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BulkSmsBroadcastAPIService {

  constructor(private http: HttpClient) { }

  postBulkSmsBoradcast(data:any){
    console.log('iiiiiiiiiiiiii', data)
    return this.http.post<any>("http://localhost:3000/bulkSmsBroadcast/", data)
  }
  getBulkSmsBoradcast(){
    return this.http.get<any>("http://localhost:3000/bulkSmsBroadcast/");
  }
  putBulkSmsBoradcast(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/bulkSmsBroadcast/"+id, data)
  }
  deleteBulkSmsBoradcast(id:number){
    return this.http.delete<any>("http://localhost:3000/bulkSmsBroadcast/"+id)
  }
}
