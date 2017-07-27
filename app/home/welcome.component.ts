import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, Component, ElementRef, ViewChild, OnInit }    from '@angular/core';
import { Http, Response,HttpModule, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BrowserModule }          from '@angular/platform-browser';
//import { ChartModule }            from 'angular2-highcharts'; 
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import {ModalComponent} from 'ng2-bs3-modal/ng2-bs3-modal';
import { AmChartsService, AmChartsModule } from "@amcharts/amcharts3-angular";
import { oilAmChartComponent } from '../charts/oilAmChart.component';

@Component({
    selector: 'welcome',
    templateUrl: 'app/home/welcome.component.html',
    styleUrls : ['app/home/welcome.component.css']
   //  providers : [AmChartsService]

})
export class WelcomeComponent implements OnInit {

    @ViewChild('modal') modal : ModalComponent
    jsonlist:any[];
    loading: boolean;
    datalist: any;
    cosmoList : {};
    cb1 : boolean = true;
    flowratesp : any;
    tanklevelsp : any;
    flowratesp1 : any;
    tanklevelsp1 : any;
    pumpStatusBoolean : boolean;
    editMode: boolean = false;
   // _http1:any;
    data: any;
    constructor(public _http: Http) {
        /* another api
      Observable.interval(2000).flatMap(() => {
          return this._http.get('http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpVals')
          })
          .subscribe((response)=>{
             this.jsonlist = response.json();
             console.log("json list is " + this.jsonlist);
        });
        */
Observable.interval(1000).flatMap(() => {
          return this._http.get('http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo')
          })
          .subscribe((response)=>{
             this.jsonlist = response.json();
//console.log(response);
                this.datalist = this.jsonlist[0];
                this.pumpStatusBoolean = (this.datalist.pumpstatus == "ON") ? true : false;
             this.flowratesp = this.jsonlist[0].flowratesp;
            this.tanklevelsp = this.jsonlist[0].tanklevelsp;
             //console.log("json list is " + this.jsonlist);
           //  this.cb1 = (this.jsonlist[0].pumpstatus == 'ON') ? true : false;
             
             //this.flowratesp = this.jsonlist[0].flowratesp;
            // this.tanklevelsp = this.jsonlist[0].tanklevelsp;

            // console.log(this.jsonlist[0].tanklevel,this.jsonlist[0].flowrate);
            // console.log("running status" + this.cb1);
        });
/*
        setTimeout(() => {this.loadUser()},2000);
  */
        /*
      Observable.interval(2000).flatMap( () => {
          return this._http.request('http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpVals')
      }).subscribe((res: Response) => {
                this.data = res.json();
                // this.datalist = JSON.parse(this.data);
               console.log("type of data " + typeof this.data[0]);


                //console.log(" stored data list is " + this.datalist);
       } )*/
                
                /*
      this.datalist = ():any[] => {
        this.loading = true;
        this._http.request('http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo')
            .subscribe(
                this.loading = false;
               // console.log(this.data[0]);
                return this.data[0];
                */

}
    /* method used for first api */
  /*    
    findObjFromArray(type) {
        if (this.jsonlist) {

                /*
           return this.jsonlist.find(obj => {
               console.log("obj['dName'] is " + obj[type]);
             return obj['dName'] === type;
            })
            
           * / 
            return this.jsonlist[0];
        }
        return {};
    }
*/

/*
    getUser() {
    return this._http.get(`http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/GetRodPumpCosmo`)
    .map((res:Response) => res.json());
  }
loadUser(){
  this.getUser().subscribe(data => this.cosmoList = data);
  console.log("type of cosmolist is " + typeof (this.cosmoList));
}
*/

/* Updates Database with tanklevel high and high */
setHighPoints(tankLevelHigh, tankLevelHighHigh) {
    //url : string = 'http://nextapi-xto.azurewebsites.net/api/RodPumpDemo/PostSPs'
    
    let headers = new Headers();
headers.append('Content-Type', 'application/json');
// let data = {flowratesp,tanklevelsp};
 //let data = {"tankLevelHigh":tankLevelHigh, "tankLevelHighHigh": tankLevelHighHigh};
 let data = {"tanklevelsp":tankLevelHigh, "flowratesp": tankLevelHighHigh};
 this.editMode = false;

 let options = new RequestOptions({ headers: headers });
     return this._http.post('https://nextapi-xto.azurewebsites.net/api/RodPumpDemo/PostSPs', data, options)
         .subscribe((response:Response) => {
            //  console.log(data);
            //  console.log(response);
             //this.modal.close();
         })
         
   
}

/* Toggle Button changing pumpstatus */
pumpBooleanChange(pumpStatusBoolean){
    this.datalist.pumpstatus = (pumpStatusBoolean== true) ? 'ON': 'OFF';
    console.log(this.datalist.pumpstatus);
}

// User Email and Phone no details submission on pageload
userDetailsForm(emailId, phoneNo) {
    
    let headers = new Headers();
headers.append('Content-Type', 'application/json');
 let userData = {"emailaddress": emailId, "phonenumber": phoneNo};
// console.log(JSON.stringify(userData));
 

 let options = new RequestOptions({ headers: headers });
     return this._http.post('https://nextapi-xto.azurewebsites.net/api/RodPumpDemo/PostUserInfo', userData, options)
         .subscribe((response:Response) => {
             this.modal.close();
         })
  
}

/*OnClick Edit */
editingMode():void{
    this.editMode = true;
    this.flowratesp1  = this.jsonlist[0].flowratesp;
    this.tanklevelsp1  = this.jsonlist[0].tanklevelsp;
}

/* on Click Configure Set Points, Open Modal
openLoginDialog(){
   // this.flowratesp = this.jsonlist[0].flowratesp;
   //  this.tanklevelsp = this.jsonlist[0].tanklevelsp;
     console.log("when open dialog" + this.flowratesp + " and " + this.tanklevelsp);
     return this.modal.open();
}
*/
ngOnInit(){
    this.modal.open();
}

}