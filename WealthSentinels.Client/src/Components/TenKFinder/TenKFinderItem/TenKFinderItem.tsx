import React from 'react';
import { CompanyTenK } from '../../../company'

type Props = {
  tenK: CompanyTenK;
}

const TenKFinderItem = ({ tenK }: Props) => {
  const year = tenK.year || 'N/A';

  const handleClick = () => {
    // Open a new window with the formatted financial data
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>10-K Report - ${tenK.symbol} - ${year}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              background-color: #f5f5f5;
            }
            h1 {
              color: #333;
              border-bottom: 2px solid #4CAF50;
              padding-bottom: 10px;
            }
            .section {
              background: white;
              padding: 20px;
              margin: 20px 0;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .section-title {
              font-size: 1.3em;
              font-weight: bold;
              color: #2c3e50;
              margin-bottom: 15px;
              border-bottom: 1px solid #eee;
              padding-bottom: 8px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 10px 0;
            }
            th, td {
              padding: 12px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #4CAF50;
              color: white;
              font-weight: bold;
            }
            tr:hover {
              background-color: #f5f5f5;
            }
            code {
              background-color: #f4f4f4;
              padding: 2px 6px;
              border-radius: 3px;
              font-family: monospace;
            }
          </style>
        </head>
        <body>
          <h1>10-K Financial Report: ${tenK.symbol} - ${year}</h1>
          <p><strong>Period:</strong> ${tenK.period}</p>
          ${formatTenKData(tenK)}
        </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  const formatTenKData = (data: CompanyTenK): string => {
    let html = '';

    // Iterate through all keys except symbol, period, and year
    Object.keys(data).forEach(key => {
      if (key !== 'symbol' && key !== 'period' && key !== 'year') {
        const value = data[key];
        html += `<div class="section">`;
        html += `<div class="section-title">${key}</div>`;

        if (Array.isArray(value)) {
          html += formatArray(value);
        } else if (typeof value === 'object' && value !== null) {
          html += formatObject(value);
        } else {
          html += `<p>${value}</p>`;
        }

        html += `</div>`;
      }
    });

    return html || '<p>No financial data available</p>';
  };

  const formatArray = (arr: any[]): string => {
    let html = '<table><tbody>';
    arr.forEach((item, index) => {
      if (typeof item === 'object') {
        html += formatObjectAsTable(item);
      } else {
        html += `<tr><td><strong>Item ${index + 1}</strong></td><td>${item}</td></tr>`;
      }
    });
    html += '</tbody></table>';
    return html;
  };

  const formatObject = (obj: any): string => {
    let html = '<table><tbody>';
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (Array.isArray(value)) {
        html += `<tr><td><strong>${key}</strong></td><td>${value.join(', ')}</td></tr>`;
      } else if (typeof value === 'object' && value !== null) {
        html += `<tr><td><strong>${key}</strong></td><td><code>${JSON.stringify(value, null, 2)}</code></td></tr>`;
      } else {
        html += `<tr><td><strong>${key}</strong></td><td>${value}</td></tr>`;
      }
    });
    html += '</tbody></table>';
    return html;
  };

  const formatObjectAsTable = (obj: any): string => {
    let html = '';
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (Array.isArray(value)) {
        html += `<tr><td><strong>${key}</strong></td><td>${value.join(', ')}</td></tr>`;
      } else {
        html += `<tr><td><strong>${key}</strong></td><td>${value}</td></tr>`;
      }
    });
    return html;
  };

  return (
    <button
      onClick={handleClick}
      type='button'
      className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-lightGreen border border-gray-200 rounded-l-lg hover:bg-gray-100 
      hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white 
      dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white'
    >
      10K - {tenK.symbol} - {year}
    </button>
  );
}

export default TenKFinderItem;