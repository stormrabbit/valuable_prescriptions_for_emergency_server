import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Prescription extends Document {
  @Prop()
  prescriptionName: string;

  @Prop()
  disease: string[];

  @Prop()
  symptom: string[];

  @Prop()
  treatment: string[];

  @Prop()
  detail: string;
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);
