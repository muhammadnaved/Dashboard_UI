import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserDetailComponent>) { }

  formData:any = {};

  modelTitle: string = "Please provide the below information to receieve the report with recommendations"

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  sendDownloadData(data){
    //console.log(this.formData);
    var formData = this.formData;
    this.dialogRef.close(formData);
    this.formData.resetForm;
  }

}
