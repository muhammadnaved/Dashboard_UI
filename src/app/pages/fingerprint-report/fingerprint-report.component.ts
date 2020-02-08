import { Component, OnInit, AfterViewInit} from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material';

@Component({
  selector: 'app-fingerprint-report',
  templateUrl: './fingerprint-report.component.html',
  styleUrls: ['./fingerprint-report.component.css']
})
export class FingerprintReportComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, public snackBar: MatSnackBar) { }

  verticalPosition: MatSnackBarVerticalPosition = 'top';
  chartData: any = [];
  unique: any = [];
  screenwidth: number;

  public canvasWidth;
	public centralLabel = ''
  public options = {
		hasNeedle: true,
		needleColor: 'gray',
		needleUpdateSpeed: 1000,
		arcColors: ['rgb(245, 101, 101)', 'rgb(255, 191, 1)', 'rgb(101, 202, 126)'],
		arcDelimiters: [50, 75],
		rangeLabel: ['0', '100'],
		//needleStartValue: 50,
  }

  showDownload:boolean;
  showfingerprint:boolean;
  highlevelrecommend;
  recommended:any = [];
  data: any = [];

  ngOnInit() {
    this.screenwidth = (window.screen.width - 30)/5 - 12.2;
    console.log(window.screen.width);
    this.canvasWidth = this.screenwidth;
    console.log(this.canvasWidth);
    this.chartData = JSON.parse(sessionStorage.chartData);
    this.unique = JSON.parse(sessionStorage.unique);
    console.log(this.unique);
    this.showDownload = true;
    this.showfingerprint = false;
    this.data = JSON.parse(sessionStorage.unique);
    this.recommended = JSON.parse(sessionStorage.recomend);
    //this.getRecomended(this.unique);
    this.highlevelrecommend = [
      {'value' : 'Organization should implement centralized IAM solutions'},
      {'value' : 'Organization should implement CMDB'},
      {'value' : 'Organization should identify and designate BISOs in the respective Business Units'},
      {'value' : 'Develop data security strategy'}
    ]
  }

  ngAfterViewInit(){
    // this.chartData = JSON.parse(sessionStorage.chartData);
    // this.unique = JSON.parse(sessionStorage.unique);
    // console.log(this.unique);
    // this.getRecomended();
  }



  getRecomended(data){
    var mydata = data;
    for(var i=0; mydata.length; i++){
      console.log(mydata[i]);
      // if(data[i].recommededOption != " "){
      //   this.recommended.push(data[i].recommededOption);
      // }
    }
    console.log(this.recommended);
  }

  downloadPFD(){
    this.showDownload = false;
    setTimeout(function(){
      html2canvas(document.querySelector("body")).then(canvas => {
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        var imgData = canvas.toDataURL('image/png');
        var doc = new jsPDF('p', 'mm', 'a4');
        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        doc.save('fingerprintreport.pdf');
        sessionStorage.clear();
      });
    }, 2000);
    //this.showFingerprint();
    //this.successAlert("Report downloaded successfully", "Ok");
  }

  // showFingerprint(){
  //   this.showfingerprint = true;
  // }

  successAlert(message: string, action: string){
    const alertRef = this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: this.verticalPosition,
      panelClass: 'alert-success'
    });
    alertRef.afterDismissed().subscribe(()=> {
      console.log("Alert closed");
      this.router.navigate(['./fingerprint']);
    })
  }

  // backfingerprint(){
  //   setTimeout(function(){
  //     this.router.navigate(['./fingerprint']);
  //   }, 3000);
  // }

}
