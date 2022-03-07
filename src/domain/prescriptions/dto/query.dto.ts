export class PrescriptionsQueryDto {
  pageSize = 10;
  page: number;
  prescriptionName = '';
  disease = '';
  symptom = '';
  treatment = '';
}
