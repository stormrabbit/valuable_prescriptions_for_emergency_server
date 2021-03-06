import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePrescriptionDto {
  @IsNotEmpty()
  @IsString()
  readonly prescriptionName: string;
  readonly disease: string;
  readonly symptom: string;
  readonly treatment: string;
  readonly detail: string;
}
