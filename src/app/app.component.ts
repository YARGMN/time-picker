import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  httpUpdateDateTime: string = "http://bim.students.ecole-hexagone.com:9076/api/v1/endpoint/{ID}/update";

  contextUrl: string = "http://bim.students.ecole-hexagone.com:9076/api/v1/context/list";
  equipmentGroupUrl: string = "http://bim.students.ecole-hexagone.com:9076/api/v1/equipementsGroup/"
  controlEndpointUrl: string = "http://bim.students.ecole-hexagone.com:9076/api/v1/equipement/{ID Panneau systme [270545]}/control_endpoint_list"

  contextList: any;
  equipmentGroupList: any;
  controlEndpointList: any;

  timeID!: number;
  
  constructor(private http: HttpClient) {}

  async ngOnInit() {
    this.contextList = await this.http.get(this.contextUrl).toPromise();
    const equipmentID = this.contextList.find((context: any) => context.name === "Equipement").dynamicId;

    this.equipmentGroupList = await this.http.get(this.equipmentGroupUrl + equipmentID + "/tree").toPromise();
    const panneauSystemID = this.equipmentGroupList.children[1].children[0].children[0].dynamicId;

    this.controlEndpointList = await this.http.get(this.controlEndpointUrl.replace("{ID Panneau systme [270545]}", panneauSystemID)).toPromise();

    this.timeID = this.controlEndpointList[0].endpoints[0].dynamicId;
    console.log(this.timeID);
    
  }
  
  title = 'time-picker';

  async send(dateTimeValue: string) {

    const dateTime = new Date(dateTimeValue);
    let dateTimeStr!: string;

    try {
      dateTimeStr = dateTime.toISOString().replaceAll("T", " ").replaceAll("Z", "").replace(".000", "")
    } catch(error) {
      console.error(error);
      
    }
    
    const body  = {
      'newValue': dateTimeStr
    }
    if(dateTimeStr !== undefined) {
      await this.http.put(this.httpUpdateDateTime.replace("{ID}", this.timeID.toString()), body).toPromise();
      console.log(body.newValue);
    }
    
  }
}
