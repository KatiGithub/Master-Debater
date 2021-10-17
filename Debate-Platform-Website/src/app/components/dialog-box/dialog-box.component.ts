import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  type:string
  user:string
  
  constructor(
    private dialogRef: MatDialogRef<DialogBoxComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data) {
      this.type = data.type;
      this.user = data.user;
    }

  ngOnInit(): void {
    
  }

  cancel(){
    this.dialogRef.close()
  }
  
  remove(){

  }
  
  start(){
    this.router.navigate['redirect'];
  }

}
