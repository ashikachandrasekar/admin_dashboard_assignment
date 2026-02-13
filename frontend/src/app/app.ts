import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html'
})
export class App {
  myname = '';
  mypass = '';
  myrole = 'user';
  islogged = false;
  issignup = false;
  role = '';
  currentname = '';
  allusers: any[] = [];
  msg = '';
  chart: any;

  constructor(private http: HttpClient) {}

  doregister() {
    const data = { name: this.myname, pass: this.mypass, role: this.myrole };
    this.http.post('http://localhost:5000/register', data).subscribe({
      next: () => {
        this.msg = "account created";
        this.issignup = false;
      },
      error: () => { this.msg = "user already there"; }
    });
  }

  dologin() {
    const data = { name: this.myname, pass: this.mypass };
    this.http.post('http://localhost:5000/login', data).subscribe({
      next: (res: any) => {
        this.islogged = true;
        this.role = res.role;
        this.currentname = res.name;
        this.msg = "";
        this.getdata();
      },
      error: () => { this.msg = "wrong login"; }
    });
  }

  getdata() {
    this.http.get('http://localhost:5000/users').subscribe((res: any) => {
      this.allusers = res;
      if (this.role === 'admin') {
        setTimeout(() => { this.makechart(); }, 300);
      }
    });
  }

  delete(id: string) {
    this.http.delete('http://localhost:5000/remove/' + id).subscribe(() => {
      this.getdata();
    });
  }

  makechart() {
    const on = this.allusers.filter(u => u.status === 'online').length;
    const off = this.allusers.length - on;

    if (this.chart) { this.chart.destroy(); }

    const ctx = document.getElementById('mychart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['online', 'offline'],
        datasets: [{
          data: [on, off],
          backgroundColor: ['#28a745', '#dc3545']
        }]
      }
    });
  }

  dologout() {
    this.http.post('http://localhost:5000/logout', { name: this.currentname }).subscribe(() => {
      this.islogged = false;
      this.myname = '';
      this.mypass = '';
    });
  }
}