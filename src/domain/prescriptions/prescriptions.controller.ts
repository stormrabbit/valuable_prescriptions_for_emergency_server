import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePrescriptionDto } from './dto/create.dto';
import { PrescriptionsQueryDto } from './dto/query.dto';
import { UpdatePrescriptionDto } from './dto/update.dto';
import { PrescriptionsService } from './prescriptions.service';

@ApiTags('药方')
@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}
  @Post('create')
  async createPrescription(@Body() creatDto: CreatePrescriptionDto) {
    return this.prescriptionsService.create(creatDto);
  }

  @Get('retrieveList')
  async retrievePrescriptionsByCondition(
    @Query() query: PrescriptionsQueryDto,
  ) {
    const data = await this.prescriptionsService.retrieveByCondition(query);
    return data;
  }

  @Get('retrieve/:id')
  async retrievePrescriptionsById(@Param('id') id: string) {
    return await this.prescriptionsService.retrieveById(id);
  }

  @Put('update/:id')
  async updatePrescriptionById(
    @Param('id') id: string,
    @Body() updateDto: UpdatePrescriptionDto,
  ) {
    return this.prescriptionsService.updateById(id, updateDto);
  }

  @Delete('remove/:id')
  async removePrescriptionById(@Param('id') id: string) {
    return this.prescriptionsService.removeById(id);
  }
}
