import { ApiProperty } from "@nestjs/swagger";

export class UpdateUsersDTO {
    @ApiProperty({
        name: '用户名',
        description: '希望更新成的用户名'
    })
    readonly name: string;
}