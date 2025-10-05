import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';
import path from 'path';
import { CalculateRetirementInput } from '../schemas';

export interface RetirementCalculationResult {
  input: CalculateRetirementInput;
  expectedRetirementAge: number | null;
  estimatedMonthlyPension?: number;
  totalContributions?: number;
  retirementDate?: string;
}

export class ExportService {
  public async generatePDF(data: RetirementCalculationResult): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const chunks: Buffer[] = [];

        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        const fontPath = path.join(__dirname, '../../assets/fonts');
        doc.registerFont('DejaVu', path.join(fontPath, 'DejaVuSans.ttf'));
        doc.registerFont('DejaVu-Bold', path.join(fontPath, 'DejaVuSans-Bold.ttf'));

        doc
          .fontSize(24)
          .font('DejaVu-Bold')
          .text('Raport Emerytalny', { align: 'center' })
          .moveDown(0.5);

        doc
          .fontSize(10)
          .font('DejaVu')
          .text(`Data wygenerowania: ${new Date().toLocaleDateString('pl-PL')}`, {
            align: 'center',
          })
          .moveDown(2);

        doc
          .fontSize(16)
          .font('DejaVu-Bold')
          .text('Dane wejściowe', { underline: true })
          .moveDown(0.5);

        doc.fontSize(12).font('DejaVu');

        const genderText = data.input.gender === 'male' ? 'Mężczyzna' : 'Kobieta';
        doc.text(`Płeć: ${genderText}`);
        doc.text(`Wiek: ${data.input.age} lat`);
        doc.text(`Wynagrodzenie brutto: ${data.input.grossSalary.toFixed(2)} PLN`);
        doc.text(`Data rozpoczęcia pracy: ${data.input.workStartDate}`);
        doc.text(`Szacowany wiek emerytalny: ${data.input.estimatedRetirementAge} lat`);

        if (data.input.zusFunds) {
          doc.text(`Fundusze ZUS: ${data.input.zusFunds.toFixed(2)} PLN`);
        }

        if (data.input.initialCapital) {
          doc.text(`Kapitał początkowy: ${data.input.initialCapital.toFixed(2)} PLN`);
        }

        doc.text(`Uwzględnij zwolnienia lekarskie: ${data.input.includeSickLeave ? 'Tak' : 'Nie'}`);
        doc.moveDown(2);

        doc
          .fontSize(16)
          .font('DejaVu-Bold')
          .text('Wyniki obliczeń', { underline: true })
          .moveDown(0.5);

        doc.fontSize(12).font('DejaVu');

        if (data.expectedRetirementAge !== null) {
          doc.text(`Oczekiwany wiek emerytalny: ${data.expectedRetirementAge} lat`);
        }

        if (data.retirementDate) {
          doc.text(`Przewidywana data emerytury: ${data.retirementDate}`);
        }

        if (data.estimatedMonthlyPension) {
          doc.text(
            `Szacowana emerytura miesięczna: ${data.estimatedMonthlyPension.toFixed(2)} PLN`
          );
        }

        if (data.totalContributions) {
          doc.text(`Łączne składki: ${data.totalContributions.toFixed(2)} PLN`);
        }

        doc
          .moveDown(3)
          .fontSize(8)
          .font('DejaVu')
          .text(
            'Niniejszy raport ma charakter informacyjny i nie stanowi oficjalnej prognozy emerytury.',
            { align: 'center' }
          );

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  public async generateExcel(data: RetirementCalculationResult): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'System Emerytalny';
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('Raport Emerytalny');

    worksheet.columns = [{ width: 30 }, { width: 25 }];

    worksheet.mergeCells('A1:B1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = 'Raport Emerytalny';
    titleCell.font = { size: 18, bold: true };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getRow(1).height = 30;

    worksheet.mergeCells('A2:B2');
    const dateCell = worksheet.getCell('A2');
    dateCell.value = `Data wygenerowania: ${new Date().toLocaleDateString('pl-PL')}`;
    dateCell.alignment = { horizontal: 'center' };
    worksheet.addRow([]);

    const inputHeaderRow = worksheet.addRow(['Dane wejściowe', '']);
    inputHeaderRow.font = { bold: true, size: 14 };
    inputHeaderRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD9E1F2' },
    };
    inputHeaderRow.getCell(2).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD9E1F2' },
    };

    const genderText = data.input.gender === 'male' ? 'Mężczyzna' : 'Kobieta';
    worksheet.addRow(['Płeć', genderText]);
    worksheet.addRow(['Wiek', `${data.input.age} lat`]);
    worksheet.addRow(['Wynagrodzenie brutto', `${data.input.grossSalary.toFixed(2)} PLN`]);
    worksheet.addRow(['Data rozpoczęcia pracy', data.input.workStartDate]);
    worksheet.addRow(['Szacowany wiek emerytalny', `${data.input.estimatedRetirementAge} lat`]);

    if (data.input.zusFunds) {
      worksheet.addRow(['Fundusze ZUS', `${data.input.zusFunds.toFixed(2)} PLN`]);
    }

    if (data.input.initialCapital) {
      worksheet.addRow(['Kapitał początkowy', `${data.input.initialCapital.toFixed(2)} PLN`]);
    }

    worksheet.addRow([
      'Uwzględnij zwolnienia lekarskie',
      data.input.includeSickLeave ? 'Tak' : 'Nie',
    ]);

    worksheet.addRow([]);

    const resultsHeaderRow = worksheet.addRow(['Wyniki obliczeń', '']);
    resultsHeaderRow.font = { bold: true, size: 14 };
    resultsHeaderRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD9E1F2' },
    };
    resultsHeaderRow.getCell(2).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD9E1F2' },
    };

    if (data.expectedRetirementAge !== null) {
      worksheet.addRow(['Oczekiwany wiek emerytalny', `${data.expectedRetirementAge} lat`]);
    }

    if (data.retirementDate) {
      worksheet.addRow(['Przewidywana data emerytury', data.retirementDate]);
    }

    if (data.estimatedMonthlyPension) {
      worksheet.addRow([
        'Szacowana emerytura miesięczna',
        `${data.estimatedMonthlyPension.toFixed(2)} PLN`,
      ]);
    }

    if (data.totalContributions) {
      worksheet.addRow(['Łączne składki', `${data.totalContributions.toFixed(2)} PLN`]);
    }

    worksheet.eachRow({ includeEmpty: false }, row => {
      row.eachCell({ includeEmpty: false }, cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }
}

export const exportService = new ExportService();
