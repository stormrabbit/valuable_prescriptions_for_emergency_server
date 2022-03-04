import { Injectable } from '@nestjs/common';
import { Files } from '../../entities/Files';
import { CreateFileDTO } from './dto/create.files.dto';
import { UpdateFileDTO } from './dto/update.files.dto';
import { QueryDTO } from './dto/query.files.dto';
import dayjs = require('dayjs');
@Injectable()
export class FilesService {
  async retrieveFilesByConditions(query: QueryDTO) {
    const take = query.page_size || 10;
    const page = (query.page || 1) - 1;
    const fileName = query.fileName || '';
    const skip = page >= 0 ? page : 0;
  }

  async retrieveFileByCondition(condition): Promise<Files> {
    return null;
  }

  async createFile(createDTO: CreateFileDTO) {
    return null;
  }

  async updateFile(id: number, updateDto: UpdateFileDTO) {
    return null;
  }

  async deleteFileById(id: any) {
    return null;
  }
}
