import { Component, Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiError } from '../../model/api-error';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.css',
})

export class ErrorDialogComponent{
  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ApiError) { }

    ngOnInit(){
      console.log(new Date().toLocaleDateString());
    }
    close() {
    this.dialogRef.close();
    console.log("this item will be deleted!")
  }
}