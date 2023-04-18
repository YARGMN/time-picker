import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private http: HttpClient) {}

  title = 'time-picker';

  contextList: any;
  
  httpUpdateDateTime: string = "http://bim.students.ecole-hexagone.com:9076/api/v1/endpoint/88210896/update";
  contextUrl: string = "http://bim.students.ecole-hexagone.com:9076/api/v1/context/list";

  optional!: String;

  getContext(): Observable<any> {
    return this.http.get(this.contextUrl).pipe(map(res => {
      console.log(res);
      this.optional = res.toString();
      return res;
    })); 
  }

  send(dateTimeValue: string) {

    const dateTime = new Date(dateTimeValue);

    const string = dateTime.getFullYear + "-" + dateTime.getMonth + "-" + dateTime.getDay + " " + dateTime.getHours + ":" + dateTime.getMinutes + ":" + dateTime.getSeconds + ":" + dateTime.getMilliseconds

    const finalJson  = {
      'newValue': string
    }
    this.http.put(this.httpUpdateDateTime, finalJson)
    
  }
}
