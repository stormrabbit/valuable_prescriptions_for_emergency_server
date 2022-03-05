// import { PartialType } from '@nestjs/swagger';
// import { CreatePrescriptionDto } from './create.dto';

// export class UpdatePrescriptionDto extends PartialType(CreatePrescriptionDto) {}

import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePrescriptionDto {
  @IsNotEmpty()
  @IsString()
  readonly prescriptionName: string;
  readonly disease: string;
  readonly symptom: string;
  readonly treatment: string;
  readonly detail: string;
}
