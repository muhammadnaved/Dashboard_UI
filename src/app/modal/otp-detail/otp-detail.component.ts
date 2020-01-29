import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-otp-detail',
  templateUrl: './otp-detail.component.html',
  styleUrls: ['./otp-detail.component.css']
})
export class OtpDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OtpDetailComponent>) { }

  formData:any = {};

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  sendOTPData(data){
    //console.log(this.formData);
    var formData = this.formData;
    this.dialogRef.close(formData);
    this.formData.resetForm;
  }

}
