import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-customers-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './customers-list.html',
  styleUrl: './customers-list.css',
})

export class CustomersList{
  customers: Customer[] = [];
  updatingId: number | null = null; 

  constructor(private customerService: CustomerService, public authService: AuthService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((data: Customer[]) => {
      this.customers = data;
    });
  }
  startEdit(c: Customer) {
    this.updatingId = c.customerId;
  }
  cancelEdit() {
    this.updatingId = null;
  }
  customerForm = new FormGroup({
    customerName: new FormControl(''),
    dateOfBirth: new FormControl(''),
    gender: new FormControl(''),
  });
  
  createCustomer ()  {
    this.customerService.createCustomer(this.customerForm.value as Customer).subscribe(customer => {
      this.customers.push(customer);
      this.customerForm.reset();
    });
  }

  updateCustomer(customer: Customer) {
    this.customerService.updateCustomer(customer).subscribe(() => {
      const index = this.customers.findIndex(c => c.customerId === customer.customerId);
      if (index !== -1) {
        this.customers[index] = customer;
      }
    });
  }

  save(c: Customer) {
    this.customerService.updateCustomer(c).subscribe(() => {
        this.customers = this.customers.map(x => x.customerId === c.customerId ? { ...c } : x);
        this.updatingId = null;
    });
  }

  logout(): void {
  this.authService.logout();
}
}
