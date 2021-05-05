import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
    @ApiProperty({
        name: '用户名',
        description: '注册系统使用的用户名'
    })
    readonly name: string;
    @ApiProperty({
        name: '密码',
        description: '注册系统使用的密码'
    })
    readonly password: string;
}