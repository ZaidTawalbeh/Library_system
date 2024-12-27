import { Component } from '@angular/core';
import { BorrowedBooksService } from '../borrowed-books/borrowed-books.service';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { QUERYKEYS } from '../../queries';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BorrowedBook, Report, ReportResponse } from 'src/types';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent {
  reportType: string = 'ANNUAL'; // Default report type
  reportYear: string = '';
  reportMonth: string = '';
  reportsData = [] as Report[];
  constructor(private borrowedBooksService: BorrowedBooksService) {}

  reportsMutation = injectMutation((client) => ({
    mutationKey: [
      QUERYKEYS.report,
      this.reportType,
      this.reportYear,
      this.reportType === 'MONTHLY' ? this.reportMonth : '',
    ],
    mutationFn: async () => {
      const reports = await this.borrowedBooksService.getReports(
        this.reportType,
        this.reportYear,
        this.reportType === 'MONTHLY' ? this.reportMonth : ''
      );
      return reports;
    },
    onSuccess: (data) => {
      console.log('fetching succesfully');
      console.log(data);
      client.setQueryData(
        [
          QUERYKEYS.report,
          this.reportType,
          this.reportYear,
          this.reportType === 'MONTHLY' ? this.reportMonth : '',
        ],
        data
      );
    },
  }));

  options:any;

  async fetchReport() {
    try {
      const data = (await this.reportsMutation.mutateAsync()) as ReportResponse;
      this.reportsData = data.reports;
      this.options = {
        series: <ApexAxisChartSeries>[
          {
            name: "Sales",
            data: data.chartData.map(d => d.totalSalesAmount), // Monthly data from service
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
          categories: data.chartData.map(d => d.monthOrWeek), // Adjust as needed
          type: 'category',
        },
        title: <ApexTitleSubtitle>{
          text: `Sales Data`,
          align: "center",
        },
        dataLabels: {
          enabled: true, // Enable data labels
          formatter: (value: number) => `$${value}`, // Show dollar sign with values
        },
        tooltip: {
          y: {
            formatter: (value: number) => `$${value}`, // Show dollar sign in tooltip
          },
        },
      };
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  }
  async downloadPDF() {
    const dataElement = document.getElementById('reportTable');
    const chartElement = document.getElementById('chart'); // ID of the chart container
    
    if (dataElement && chartElement) {
      // Create a new jsPDF instance
      const pdf = new jsPDF();
  
      // Add the heading
      const heading =
        `${this.reportType} Report for ${this.reportYear}` +
        (this.reportType === 'MONTHLY' ? ` - ${this.reportMonth}` : '');
      pdf.setFontSize(20);
      pdf.text(heading, 10, 20); // Position (x, y) on the PDF
  
      // Use html2canvas to create a canvas of the table
      const tableCanvas = await html2canvas(dataElement, { backgroundColor: null });
      const imgWidth = 190; // PDF width in mm
      const imgHeight = (tableCanvas.height * imgWidth) / tableCanvas.width;
      const tableImageData = tableCanvas.toDataURL('image/png');
  
      // Add the table image to the PDF
      pdf.addImage(tableImageData, 'PNG', 10, 30, imgWidth, imgHeight);
  
      // Add a line break between table and chart
      const nextYPosition = 30 + imgHeight + 10; // Adjusted position for the chart
  
      // Use html2canvas to create a canvas of the chart
      const chartCanvas = await html2canvas(chartElement, { backgroundColor: null });
      const chartImgHeight = (chartCanvas.height * imgWidth) / chartCanvas.width;
      const chartImageData = chartCanvas.toDataURL('image/png');
  
      // Add the chart image to the PDF
      pdf.addImage(chartImageData, 'PNG', 10, nextYPosition, imgWidth, chartImgHeight);
  
      // Save the PDF
      pdf.save(`report_${this.reportType}_${this.reportYear}.pdf`);
    }
  }
  

  // get reportData() {
  //   console.log(this.reportsQuery.data());
  //   return this.reportsQuery.data() ?? [];
  // }
}
