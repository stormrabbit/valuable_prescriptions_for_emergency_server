import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Prescription } from 'src/entities/Prescription';
import { Model } from 'mongoose';
import { CreatePrescriptionDto } from './dto/create.dto';
import { UpdatePrescriptionDto } from './dto/update.dto';
import { PrescriptionsQueryDto } from './dto/query.dto';
import dayjs = require('dayjs');
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

  async retrieveByCondition(query: PrescriptionsQueryDto) {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 10;
    const total = await this.prescriptionsModel.countDocuments({ status: 0 });
    console.log(query);
    const prescriptions = await this.prescriptionsModel
      .find({ status: 0 })
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .sort({ updateAt: -1 })
      .exec();
    return { list: prescriptions, totalPage: Math.floor(total / pageSize) + 1 };
  }
  async retrieveById(id: string) {
    const result = await this.prescriptionsModel.findById(id).exec();
    return result.toObject();
  }
  async updateById(id: string, updateDto: UpdatePrescriptionDto) {
    console.log(updateDto);
    const existPrescription = await this.prescriptionsModel.findByIdAndUpdate(
      id,
      { ...updateDto, updateAt: dayjs().format('YYYY-MM-DD HH:mm:ss') },
    );
    return existPrescription.toObject();
  }
  async removeById(id: string) {
    const existPrescription = await this.prescriptionsModel.findById(id);
    existPrescription.status = -1;
    existPrescription.updateAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
    return await this.prescriptionsModel.findByIdAndUpdate(
      id,
      existPrescription,
    );
  }
}
