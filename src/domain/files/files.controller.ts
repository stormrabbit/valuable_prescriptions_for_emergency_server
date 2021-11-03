import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import * as path from 'path';
import { execSync } from 'child_process';
@ApiTags('文件上传')
@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFiles(@UploadedFile() file) {
    // console.log(__dirname);
    // const savedPath = path.join(__dirname, '../../../static');
    // console.log(savedPath);
    // const { originalname = '' } = file || { originalname: '' };
    // console.log(file);
    // const filepath = `${savedPath}/${originalname}`;
    console.log(file);
    const filepath = path.join(__dirname, `../../../${file.path}`);
    console.log(filepath);
    const code = execSync('node -v', { stdio: 'inherit' });
    console.log(code);
    return { path: filepath };
  }
}
