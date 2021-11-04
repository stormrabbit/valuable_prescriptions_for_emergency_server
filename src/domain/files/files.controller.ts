import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import * as path from 'path';
import { FilesService } from './files.service';
import { QueryDTO } from './dto/query.files.dto';
import { CreateFileDTO } from './dto/create.files.dto';
import dayjs = require('dayjs');
// import { exec } from '../../utils/cmd';
@ApiTags('文件上传')
@Controller('files')
export class FilesController {
  constructor(private fileService: FilesService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFiles(@UploadedFile() file) {
    // console.log(__dirname);
    // const savedPath = path.join(__dirname, '../../../static');
    // console.log(savedPath);
    // const { originalname = '' } = file || { originalname: '' };
    // console.log(file);
    // const filepath = `${savedPath}/${originalname}`;
    const filepath = path.join(__dirname, `../../../${file.path}`);
    // exec('node -v');
    const fileDto = new CreateFileDTO();
    fileDto.fileName = file.originalname;
    fileDto.fileUrl = filepath;
    fileDto.createDate = dayjs().format('YYYY-MM-DD HH:mm');
    return this.fileService.createFile(fileDto);
  }

  @Get('info/list')
  async retrieveFilesByConditions(@Query() query: QueryDTO) {
    return this.fileService.retrieveFilesByConditions(query);
  }
}
