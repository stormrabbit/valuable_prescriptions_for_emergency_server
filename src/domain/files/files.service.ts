import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Files } from '../../entities/Files';
import { CreateFileDTO } from './dto/create.files.dto';
import { UpdateFileDTO } from './dto/update.files.dto';
import { QueryDTO } from './dto/query.files.dto';
import dayjs = require('dayjs');
@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files)
    private readonly fileRepostory: Repository<Files>,
  ) {}

  async retrieveFilesByConditions(query: QueryDTO) {
    const take = query.page_size || 10;
    const page = (query.page || 1) - 1;
    const fileName = query.fileName || '';
    const skip = page >= 0 ? page : 0;
    const [result, total] = await this.fileRepostory.findAndCount({
      where: {
        status: 0,
        fileName: Like('%' + fileName + '%'),
      },
      order: {
        id: 'DESC',
      },
      take,
      skip: skip * take,
    });
    const totalPage = Math.ceil(total / take);
    return {
      list:
        page > totalPage - 1
          ? []
          : result.map((rt) =>
              Object.assign({}, rt, {
                createDate: dayjs(rt.createDate).format('YYYY-MM-DD HH:mm'),
              }),
            ),
      total_page: totalPage,
      page: page + 1,
      page_size: take,
    };
  }

  async retrieveFileByCondition(condition): Promise<Files> {
    return await this.fileRepostory.findOne({
      where: condition,
    });
  }

  async createFile(createDTO: CreateFileDTO) {
    // const existFile = await this.fileRepostory.findOne({
    //   where: {
    //     name: createDTO.fileName,
    //   },
    // });
    // if (existFile) {
    //   return { errorMsg: '用户已存在' };
    // }
    const file = this.fileRepostory.create(createDTO);
    return await this.fileRepostory.save(file);
  }

  async updateFile(id: number, updateDto: UpdateFileDTO) {
    try {
      const { affected } = await this.fileRepostory.update(id, updateDto);
      return { message: affected === 1 ? '修改成功' : '未修改成功' };
    } catch (error) {
      return { errorMsg: `${error}` };
    }
  }

  async deleteFileById(id: any) {
    try {
      const { affected } = await this.fileRepostory.update(id, { status: 1 });
      return { message: affected === 1 ? '删除成功' : '未删除成功' };
    } catch (error) {
      return { errorMsg: `${error}` };
    }
  }
}
