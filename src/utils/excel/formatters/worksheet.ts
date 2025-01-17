import { utils, WorkSheet } from 'xlsx';
import { HEADERS, HEADER_ORDER } from '../config/headers';

export function formatWorksheet(worksheet: WorkSheet): void {
  applyHeaderStyles(worksheet);
  applyColumnWidths(worksheet);
  applyDataValidation(worksheet);
}

function applyHeaderStyles(worksheet: WorkSheet): void {
  const range = utils.decode_range(worksheet['!ref'] || 'A1:AE1');
  
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const address = utils.encode_cell({ r: 0, c: C });
    if (!worksheet[address]) continue;
    
    worksheet[address].s = {
      fill: { fgColor: { rgb: "FFFF00" } },
      font: { bold: true },
      alignment: { horizontal: "center", vertical: "center", wrapText: true }
    };
  }
}

function applyColumnWidths(worksheet: WorkSheet): void {
  worksheet['!cols'] = HEADER_ORDER.map(key => ({
    wch: HEADERS[key].width
  }));
}

function applyDataValidation(worksheet: WorkSheet): void {
  const range = utils.decode_range(worksheet['!ref'] || 'A1:AE1');
  
  // Add validation for period column (1-6)
  const periodCol = HEADER_ORDER.indexOf('period');
  if (periodCol >= 0) {
    for (let row = 1; row <= range.e.r; row++) {
      const address = utils.encode_cell({ r: row, c: periodCol });
      worksheet[address].v = {
        t: 'n',
        v: worksheet[address]?.v || 1,
        l: { t: 'n', op: 'between', min: 1, max: 6 }
      };
    }
  }
}