import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { CustserviceService } from '../../service/custservice.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatDialog } from '@angular/material';
import { UserDetailComponent } from '../../modal/user-detail/user-detail.component';
import { OtpDetailComponent } from '../../modal/otp-detail/otp-detail.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.component.html',
  styleUrls: ['./fingerprint.component.css']
})
export class FingerprintComponent implements OnInit {

	@ViewChild('content', {static: false}) content: ElementRef;

	@Output() valueChange = new EventEmitter();

	counter = 0;
	chartData: any = [];
	tabtitle = "";
	questions;
	fingerData: any = {};
	fingerData1: any = {};
	fingerData2: any = {};
	fingerData3: any = {};
	fingerData4: any = {};
	prevtabtitle;
	selectedIndex;
	prevSelectedIndex;
	userInputData: boolean;
	screenwidth: number;
	lastStep: boolean;

	formData:any = {};

	public canvasWidth = 255;
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

	constructor(private service: CustserviceService, private router: Router, public dialog: MatDialog) {}

	ngOnInit() {
		this.screenwidth = (window.screen.width - 30)/5 - 12.2;
		this.canvasWidth = this.screenwidth;
		console.log(this.screenwidth);
		this.lastStep = false;
		this.tabtitle = "Identify";
		this.getQuestion(this.tabtitle);
		this.userInputData = true;
		this.chartData.push(
			{
				"needleValue": 0,
				"name": "Identify",
				"bottomLabel": '0',
				"options": [{"needleStartValue" : 0}]
			},{
				"needleValue": 0,
				"name": "Protect",
				"bottomLabel": '0',
				"options": [{"needleStartValue" : 0}]
			},{
				"needleValue": 0,
				"name": "Detect",
				"bottomLabel": '0',
				"options": [{"needleStartValue" : 0}]
			},{
				"needleValue": 0,
				"name": "Respond",
				"bottomLabel": '0',
				"options": [{"needleStartValue" : 0}]
			},{
				"needleValue": 0,
				"name": "Recover",
				"bottomLabel": '0',
				"options": [{"needleStartValue" : 0}]
			}
		)
	}

	selectionChange(event){
		console.log(event);
		this.tabtitle = event.selectedStep.label;
		this.prevtabtitle = event.previouslySelectedIndex;
		this.selectedIndex = event.selectedIndex;
		this.prevSelectedIndex = event.previouslySelectedStep.label;
		this.getQuestion(this.tabtitle);
	}

	getQuestion(title){
		this.service.getFingerprintQuestion()
		.subscribe((res: any) => {
			for(var i=0; i<res.data.length; i++){
				if(res.data[i].screenType == title){
					this.questions = res.data[i].questions;
				}
			}
		});
	}


	finalAnswers: any = [];

	unique: any = [];


	onClickSubmit(data){
		console.log('Simply checking');
		console.log(data);
		let formData: any = [];
		// for(var key in this.fingerData){
		// 	if(this.fingerData.hasOwnProperty(key)){
		// 	formData.push({'value': key, 'selectedAnswer': this.fingerData[key], 'screenType': this.tabtitle, 'prevSelectedIndex': this.prevtabtitle, 'selectedIndex': this.selectedIndex});
		// 	}
		// }

		for(var key in data){
			if(data.hasOwnProperty(key)){
			let answer = data[key].split(';');
			formData.push({'value': key, 'selectedValue': answer[0], 'selectedAnswer': answer[1], 'screenType': this.tabtitle, 'prevSelectedIndex': this.prevtabtitle, 'selectedIndex': this.selectedIndex, 'prevSelected' : this.prevSelectedIndex});
			}
		}

		console.log(formData);

		for(i=0; i< formData.length; i++){
			let question = formData[i].value.split('.')
			console.log({'question' : formData[i].value, 'answer' : formData[i].selectedAnswer, 'screen': formData[i].prevSelected});
			this.finalAnswers.unshift({'question' : question[1], 'answer' : formData[i].selectedAnswer, 'screen': formData[i].prevSelected});
		}
		//this.finalAnswers.push(formData);

		console.log(this.finalAnswers);

		this.unique = this.finalAnswers.filter((set => f => !set.has(f.question) && set.add(f.question))(new Set));
		console.log(this.unique);

		sessionStorage.setItem('unique', JSON.stringify(this.unique));

		let graphValue = 0;
		for(var i=0; i<formData.length; i++){
			console.log(formData[i].selectedValue);
            graphValue += Math.round(JSON.parse(formData[i].selectedValue) * 100);
		}

		console.log(graphValue);

		if(this.prevtabtitle != 0 && this.prevtabtitle != 1 && this.prevtabtitle != 2 && this.prevtabtitle != 3){
			this.chartData[formData[0].selectedIndex].needleValue = graphValue;
			this.chartData[formData[0].selectedIndex].options[0].needleStartValue = graphValue;
			this.chartData[formData[0].selectedIndex].bottomLabel = graphValue;
			this.chartData = this.chartData;
			sessionStorage.setItem('chartData', JSON.stringify(this.chartData));
		}else{
			this.chartData[formData[0].prevSelectedIndex].needleValue = graphValue;
			this.chartData[formData[0].prevSelectedIndex].options[0].needleStartValue = graphValue;
			this.chartData[formData[0].prevSelectedIndex].bottomLabel = graphValue;
			this.chartData = this.chartData;
			sessionStorage.setItem('chartData', JSON.stringify(this.chartData));
		}
	}

	onClickSubmit1(data){
		this.lastStep = true;
		console.log('Will check with DOne');
		let formData: any = [];
		// for(var key in this.fingerData){
		// 	if(this.fingerData.hasOwnProperty(key)){
		// 	formData.push({'value': key, 'selectedAnswer': this.fingerData[key], 'screenType': this.tabtitle, 'prevSelectedIndex': this.prevtabtitle, 'selectedIndex': this.selectedIndex});
		// 	}
		// }

		for(var key in data){
			if(data.hasOwnProperty(key)){
				let answer = data[key].split(';');
				formData.push({'value': key, 'selectedValue': answer[0], 'selectedAnswer': answer[1], 'screenType': this.tabtitle, 'prevSelectedIndex': this.prevtabtitle, 'selectedIndex': this.selectedIndex, 'prevSelected' : this.prevSelectedIndex});
			}
		}
		console.log(formData);

		for(i=0; i< formData.length; i++){
			let question = formData[i].value.split('.');
			console.log({'question' : formData[i].value, 'answer' : formData[i].selectedAnswer, 'screen': formData[i].prevSelected});
			this.finalAnswers.unshift({'question' : question[1], 'answer' : formData[i].selectedAnswer, 'screen': formData[i].screenType})
		}

		//this.finalAnswers.push(formData);

		console.log(this.finalAnswers);

		this.unique = this.finalAnswers.filter((set => f => !set.has(f.question) && set.add(f.question))(new Set));
		console.log(this.unique);

		sessionStorage.setItem('unique', JSON.stringify(this.unique));

		let graphValue = 0;
		for(var i=0; i<formData.length; i++){
			console.log(formData[i].selectedValue);
            graphValue += Math.round(JSON.parse(formData[i].selectedValue) * 100);
		}

		console.log(graphValue);

		if(this.prevtabtitle == 3){
			this.chartData[formData[0].selectedIndex].needleValue = graphValue;
			this.chartData[formData[0].selectedIndex].options[0].needleStartValue = graphValue;
			this.chartData[formData[0].selectedIndex].bottomLabel = graphValue;
			this.chartData = this.chartData;
			sessionStorage.setItem('chartData', JSON.stringify(this.chartData));
		}

		this.userInputData = false;
	}

	goback(){
		this.userInputData = true;
		this.lastStep = false;
	}

	restart(){
		window.location.reload();
	}

    download() {
		alert('Report Download');
	}

	downloadPFD(){
		this.router.navigate(['./fingerprintreport']);
		// html2canvas(document.querySelector("body")).then(canvas => {
		// 	var imgData = canvas.toDataURL('image/png');
		// 	var doc = new jsPDF('p', 'mm');
		// 	doc.addImage(imgData, 'PNG', 0, 0, 210, 297);
		// 	doc.save('sample.pdf');
		// });

	}

	sendDownloadData(){
		// tslint:disable-next-line: indent
		console.log(this.formData);
		//$("#myModal").modal("hide");
		// this.service.getDowloadInfo(this.formData).subscribe(
		// 	(res) => {
		// 		console.log(res);
		// 	},
		// 	(err) => console.log(err)
		// )
	}
    name;
	downloadReport(){
		const dialogRef = this.dialog.open(UserDetailComponent, {
			maxWidth: '60vw',
			minWidth: '60vw',
			height: '450px'
		});

		dialogRef.afterClosed().subscribe(result =>{
            console.log('Calling email service');
            this.name = result.firstName;
            this.service.sendEmail(result).subscribe(
                (res) => {
                    console.log(res);
                },
                (err) => console.log(err)
            )
			this.getotp()
		})
	}

    getotp() {
		const dialogRef = this.dialog.open(OtpDetailComponent, {
			maxWidth: '50vw',
			minWidth: '50vw',
			height: '250px'
		});

		dialogRef.afterClosed().subscribe(result =>{
            var optJson = {
                "otp": result.otp,
                "name":this.name
            }
            this.service.validateOTPService(optJson).subscribe(
                (res) => {
                    if (res == true) {
                        this.router.navigate(['./fingerprintreport']);
                    } else {
                        this.getotp()
                        alert('Incorrect OTP. Please try again');

                    }

                }
            )

		})
	}

}
