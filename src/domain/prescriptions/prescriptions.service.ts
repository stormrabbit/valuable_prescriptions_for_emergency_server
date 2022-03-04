import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Prescription } from 'src/entities/Prescription';
import { Model } from 'mongoose';
import { CreatePrescriptionDto } from './dto/create.dto';
@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectModel(Prescription.name)
    private readonly prescriptionsModel: Model<Prescription>,
  ) {}

  async create(createDto: CreatePrescriptionDto) {
    const newPrescription = this.prescriptionsModel.create(createDto);
    return (await newPrescription).save();
  }

  async retrieveByCondition() {
    const prescriptions = await this.prescriptionsModel.find().exec();
    return prescriptions;
  }
}
