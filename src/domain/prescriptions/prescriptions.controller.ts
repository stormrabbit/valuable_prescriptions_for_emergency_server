import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create.dto';
import { PrescriptionsService } from './prescriptions.service';

@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}
  @Post('create')
  async createPrescription(@Body() creatDto: CreatePrescriptionDto) {
    return this.prescriptionsService.create(creatDto);
  }

  @Get('retrieve')
  async retrievePrescriptionsByCondition() {
    return this.prescriptionsService.retrieveByCondition();
  }

  @Put('update')
  async updatePrescriptionById() {
    return {};
  }

  @Delete('delete')
  async deletePrescriptionById() {
    return {};
  }
}
