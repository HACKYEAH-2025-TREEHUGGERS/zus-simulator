import { Request, Response } from 'express';
import { exportService, RetirementCalculationResult } from '../services/export.service';
import { calculateRetirementSchema } from '../schemas';

class ExportController {
  /**
   * Generate and download PDF report
   */
  public async generatePDF(req: Request, res: Response): Promise<void> {
    const input = calculateRetirementSchema.parse(req.body);

    // Prepare the data - you can extend this with actual calculation results
    const data: RetirementCalculationResult = {
      input,
      expectedRetirementAge: input.estimatedRetirementAge,
      // Add more calculated fields here as your calculation logic evolves
    };

    const pdfBuffer = await exportService.generatePDF(data);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=raport-emerytalny.pdf');
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);
  }

  /**
   * Generate and download Excel report
   */
  public async generateExcel(req: Request, res: Response): Promise<void> {
    const input = calculateRetirementSchema.parse(req.body);

    // Prepare the data - you can extend this with actual calculation results
    const data: RetirementCalculationResult = {
      input,
      expectedRetirementAge: input.estimatedRetirementAge,
      // Add more calculated fields here as your calculation logic evolves
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
