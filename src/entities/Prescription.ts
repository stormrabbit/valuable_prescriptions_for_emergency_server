import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import dayjs = require('dayjs');
import { Document, Types } from 'mongoose';

@Schema()
export class Prescription extends Document {
  @Prop({ required: true })
  prescriptionName: string;

  @Prop()
  disease: string[];

  @Prop()
  symptom: string[];

  @Prop()
  treatment: string[];

  @Prop()
  detail: string;

  @Prop({ default: 0 })
  status: number;

  @Prop({ default: dayjs().format('YYYY-MM-DD HH:mm:ss') })
  createAt: string;
  @Prop({ default: dayjs().format('YYYY-MM-DD HH:mm:ss') })
  updateAt: string;
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);
