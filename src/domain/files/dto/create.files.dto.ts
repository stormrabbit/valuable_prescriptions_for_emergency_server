import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDTO {
  @ApiProperty({
    name: '文件名',
    description: '上传 sketch 文件名',
  })
  fileName: string;
  @ApiProperty({
    name: '文件路径',
    description: '上传 sketch 文件的保存路径',
  })
  fileUrl: string;
  createDate: any;
}
