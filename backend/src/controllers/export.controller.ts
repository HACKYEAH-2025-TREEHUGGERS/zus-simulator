import { Request, Response } from 'express';
import { exportService, RetirementCalculationResult } from '../services/export.service';
import { calculateRetirementSchema } from '../schemas';

class ExportController {
  public async generatePDF(req: Request, res: Response): Promise<void> {
    const input = calculateRetirementSchema.parse(req.body);

    const data: RetirementCalculationResult = {
      input,
      expectedRetirementAge: input.expectedRetirementYear,
    };

    const pdfBuffer = await exportService.generatePDF(data);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=raport-emerytalny.pdf');
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);
  }

  public async generateExcel(req: Request, res: Response): Promise<void> {
    const input = calculateRetirementSchema.parse(req.body);

    const data: RetirementCalculationResult = {
      input,
      expectedRetirementAge: input.expectedRetirementYear,
    };

    const excelBuffer = await exportService.generateExcel(data);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=raport-emerytalny.xlsx');
    res.setHeader('Content-Length', excelBuffer.length);
    res.send(excelBuffer);
  }
}

export const exportController = new ExportController();
