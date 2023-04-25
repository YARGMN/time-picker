import { AfterContentInit, AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {
  httpUpdateDateTime: string = "http://bim.students.ecole-hexagone.com:9076/api/v1/endpoint/{ID}/update";

  contextUrl: string = "http://bim.students.ecole-hexagone.com:9076/api/v1/context/list";
  equipmentGroupUrl: string = "http://bim.students.ecole-hexagone.com:9076/api/v1/equipementsGroup/"
  controlEndpointUrl: string = "http://bim.students.ecole-hexagone.com:9076/api/v1/equipement/{ID Panneau_systeme}/control_endpoint_list"

  contextList: any;
  equipmentGroupList: any;
  controlEndpointList: any;

  timeID!: number;
  dateTime!: any;

  panneauSystemeId!: number;

  @ViewChild('picker') picker: any;

  public date: moment.Moment | undefined;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate!: moment.Moment;
  public maxDate!: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  
  constructor(private http: HttpClient) {}

  async ngOnInit() {
    this.contextList = await this.http.get(this.contextUrl).toPromise();
    const equipmentID = this.contextList.find((context: any) => context.name === "Equipement").dynamicId;

    this.equipmentGroupList = await this.http.get(this.equipmentGroupUrl + equipmentID + "/tree").toPromise();
    const panneauSystemID = this.equipmentGroupList.children[1].children[0].children[0].dynamicId;
    this.panneauSystemeId = panneauSystemID;
    this.controlEndpointList = await this.http.get(this.controlEndpointUrl.replace("{ID Panneau_systeme}", panneauSystemID)).toPromise();

    this.timeID = this.controlEndpointList[0].endpoints[0].dynamicId;
    this.dateTime = this.controlEndpointList[0].endpoints[0].currentValue;
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("on change");
    
    
  }
  
  async send(dateTimeValue: string) {

    const dateTime = new Date(dateTimeValue);
    let dateTimeStr!: string;

    try {
      dateTimeStr = dateTime.toLocaleString()
    } catch(error) {
      console.error(error);
    }    
    
    const body  = {
      'newValue': dateTimeStr
    }
    
    console.log(dateTime);
    

    if(dateTime.getDate() == dateTime.getDate()) {
      await this.http.put(this.httpUpdateDateTime.replace("{ID}", this.timeID.toString()), body).toPromise();
      this.controlEndpointList = await this.http.get(this.controlEndpointUrl.replace("{ID Panneau_systeme}", this.panneauSystemeId.toString())).toPromise();
      console.log(this.controlEndpointList);
      
    this.dateTime = this.controlEndpointList[0].endpoints[0].currentValue;
    }
    
  }
}
