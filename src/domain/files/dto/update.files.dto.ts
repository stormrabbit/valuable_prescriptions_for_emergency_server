import { ApiProperty } from '@nestjs/swagger';

export class UpdateFileDTO {
  @ApiProperty({
    name: '文件名',
    description: '希望更新成的文件',
  })
  readonly fileName: string;
}
