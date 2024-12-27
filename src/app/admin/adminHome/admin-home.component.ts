import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { AdminhomeService } from './adminhome.service';

import { injectQuery } from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from 'src/app/queries';
import { ApexChart, ApexXAxis } from 'ng-apexcharts';


// Register required Chart.js components



@Component({
  selector: 'app-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit, AfterViewInit {
  adminHomeService = inject(AdminhomeService);

  // Fetching paid fees dynamically
  paidFeesQuery = injectQuery(() => ({
    queryKey: [QUERYKEYS.paidfees],
    queryFn: () => this.adminHomeService.getTotalFees(),
  }));
  totalIncomeQuery = injectQuery(() => ({
    queryKey: [QUERYKEYS.totalincome],
    queryFn: () => this.adminHomeService.getTotalIncome(),
  }));
  librariesSalesQuery = injectQuery(() => ({
    queryKey: [QUERYKEYS.librariesSales],
    queryFn: () => this.adminHomeService.getLibrariesSales(),
  }));
  CountOfBorrowingQuery  = injectQuery(() => ({
    queryKey: [QUERYKEYS.CountOfBorrowing],
    queryFn: () => this.adminHomeService.getCountOfBorrowing(),
  })); 
  CountOfRegisterUserQuery  = injectQuery(() => ({
    queryKey: [QUERYKEYS.CountOfRegisterUser],
    queryFn: () => this.adminHomeService.getCountOfRegisterUser(),
  })); 
  CountOfLibraryQuery  = injectQuery(() => ({
    queryKey: [QUERYKEYS.CountOfLibrary],
    queryFn: () => this.adminHomeService.getCountOfLibrary(),
  })); 

  get paidFees() {
    return this.paidFeesQuery.data();
  }

  // Get the paid fees data
  get last5Fees() {
    const fees = this.paidFeesQuery.data()?.slice(0, 5);
    return fees;
  }

  get totalIncome() {
    return this.totalIncomeQuery.data();
  }

  get librariesSales() {
    return this.librariesSalesQuery.data();
  }

  get CountOfBorrowing() {
    return this.CountOfBorrowingQuery.data();
  }

  get CountOfRegisterUser() {
    return this.CountOfRegisterUserQuery.data();
  }

  get CountOfLibrary() {
    return this.CountOfLibraryQuery.data();
  }

  // Calculate monthly income from the paid fees
  get monthlyIncome() {
    if (!this.paidFees) return {};
    const data = this.adminHomeService.calculateMonthlyIncome(this.paidFees);
    return data;
  }

  get totalFees() {
    const paidFees = this.paidFeesQuery.data();
    const totalIncome = paidFees?.reduce((acc, fee) => acc + fee.feeamount!, 0);
    return totalIncome;
  }
  options: any = {};

  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1; // Get current month (1-based)
  previousYear = this.currentYear - 1;
  months = [
    { value: "01", name: "January" },
    { value: "02", name: "February" },
    { value: "03", name: "March" },
    { value: "04", name: "April" },
    { value: "05", name: "May" },
    { value: "06", name: "June" },
    { value: "07", name: "July" },
    { value: "08", name: "August" },
    { value: "09", name: "September" },
    { value: "10", name: "October" },
    { value: "11", name: "November" },
    { value: "12", name: "December" }
  ];

  monthOptions: { value: string, name: string }[] = [];
  selectedMonth: string = ""; // Dynamically set below in `ngOnInit`

  

  

  ngOnInit(): void {
    this.generateMonthOptions();
    this.setDefaultSelectedMonth();
    let currentDate = new Date();
   
    this.adminHomeService.getMonthlyChart(currentDate.getMonth() + 1, currentDate.getFullYear()).then((statistics: any[]) => {
      this.options = {
        series: <ApexAxisChartSeries>[
          {
            name: "Sales",
            data: statistics.map(data => data.totalSalesAmount), // Monthly data from service
          },
        ],
        chart: <ApexChart>{
          type: "line",
          height: 350,
          zoom: {
            enabled: false,
          },
          toolbar: {
            tools: {
              download: true,
              zoom: false,
              zoomin: false,
              zoomout: false,
            
            }
          },
        },
        stroke: <ApexStroke>{
          curve: 'smooth',
        },
        markers: {
          size: 5, // Add dots to each marker
        },
        xaxis: <ApexXAxis>{
          categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Adjust as needed
          type: 'category',
        },
        title: <ApexTitleSubtitle>{
          text: `${this.getMonthName(currentDate.getMonth() + 1)} Sales Data`,
          align: "center",
        },
        dataLabels: {
          enabled: true, // Enable data labels
          formatter: (value: number) => `$${value} Week Income`, // Show dollar sign with values
        },
        tooltip: {
          y: {
            formatter: (value: number) => `$${value} Week Income`, // Show dollar sign in tooltip
          },
        },
      };
    });
    
  }

  generateMonthOptions() {
    this.monthOptions = [
      ...this.months.map((month) => ({
        value: `${this.currentYear}-${month.value}`,
        name: `${month.name} ${this.currentYear}`
      }))
    ];
  }

  setDefaultSelectedMonth() {
    const formattedMonth = this.currentMonth < 10 ? `0${this.currentMonth}` : `${this.currentMonth}`;
    this.selectedMonth = `${this.currentYear}-${formattedMonth}`; // Set to current month
  }
  ngAfterViewInit(): void {
    // Initial chart rendering
    
  }

  updateChart() {
    // Convert the selectedMonth string to a Date object
    const [year, month] = this.selectedMonth.split("-").map(Number);
    const selectedDate = new Date(year, month - 1); // Month is 0-indexed in Date

    console.log("Selected Month (String):", this.selectedMonth);
    console.log("Converted Date Object:", selectedDate);

    this.adminHomeService.getMonthlyChart(selectedDate.getMonth() + 1, selectedDate.getFullYear()).then((statistics: any[]) => {
      this.options = {
        series: <ApexAxisChartSeries>[
          {
            name: "Sales",
            data: statistics.map(data => data.totalSalesAmount), // Monthly data from service
          },
        ],
        chart: <ApexChart>{
          type: "line",
          height: 350,
          zoom: {
            enabled: false,
          },
          toolbar: {
            tools: {
              download: true,
              zoom: false,
              zoomin: false,
              zoomout: false,
            
            }
          },
        },
        stroke: <ApexStroke>{
          curve: 'smooth',
        },
        markers: {
          size: 5, // Add dots to each marker
        },
        xaxis: <ApexXAxis>{
          categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Adjust as needed
          type: 'category',
        },
        title: <ApexTitleSubtitle>{
          text: `${this.getMonthName(selectedDate.getMonth() + 1)} Sales Data`,
          align: "center",
        },
        dataLabels: {
          enabled: true, // Enable data labels
          formatter: (value: number) => `$${value} Week Income`, // Show dollar sign with values
        },
        tooltip: {
          y: {
            formatter: (value: number) => `$${value} Week Income`, // Show dollar sign in tooltip
          },
        },
      };
    });

    // Use `selectedDate` to fetch data or update your chart
  }
  getMonthName(monthNumber: number): string {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    if (monthNumber < 1 || monthNumber > 12) {
      throw new Error("Invalid month number. Please provide a value between 1 and 12.");
    }
  
    return months[monthNumber - 1];
  }
  
}
