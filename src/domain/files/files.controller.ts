import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import * as path from 'path';
@ApiTags('文件上传')
@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFiles(@UploadedFile() file) {
    console.log(__dirname);
    const savedPath = path.join(__dirname, '../../../static');
    console.log(savedPath);
    return { file };
  }
}
