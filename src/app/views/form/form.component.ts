import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  CardModule,
  GridModule,
  TableModule,
  ButtonModule,
  FormModule
} from '@coreui/angular';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    GridModule,
    TableModule,
    ButtonModule,
    FormModule
  ]
})

export class FormComponent {

  role: string = '';

  // Clerk fields
  jointName: string = '';
  jointCategory: string = '';
  jointMaterial: string = '';

  // Admin fields
  submissionId: number | null = null;
  jointStatus: string = ''; // date
  approvalStatus: string = '';

  submittedData: any[] = [];

  constructor() {

    const token = localStorage.getItem("token");

    if (token) {
      try {

        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));

        console.log("Decoded Token:", decoded);

        // Normalize role
        this.role = decoded.role?.toUpperCase();

        console.log("Normalized Role:", this.role);

      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }

  // Convert API role to form role
  get formRole(): string {

    if (this.role === 'CLERK') {
      return 'clerk';
    }

    if (this.role === 'ADMIN' || this.role === 'QC_SUPERVISOR') {
      return 'admin';
    }

    return '';
  }

  submitForm() {

    if (this.formRole === 'clerk') {

      if (!this.jointName || !this.jointCategory || !this.jointMaterial) {
        alert("Please fill all fields");
        return;
      }

      this.submittedData.push({
        role: 'Clerk',
        jointName: this.jointName,
        jointCategory: this.jointCategory,
        jointMaterial: this.jointMaterial
      });

      // reset
      this.jointName = '';
      this.jointCategory = '';
      this.jointMaterial = '';
    }

    else if (this.formRole === 'admin') {

      if (this.submissionId === null || !this.jointStatus || !this.approvalStatus) {
        alert("Please fill all fields");
        return;
      }

      this.submittedData.push({
        role: 'Admin',
        submissionId: this.submissionId,
        jointStatus: this.jointStatus,
        approvalStatus: this.approvalStatus
      });

      // reset
      this.submissionId = null;
      this.jointStatus = '';
      this.approvalStatus = '';
    }

  }

}