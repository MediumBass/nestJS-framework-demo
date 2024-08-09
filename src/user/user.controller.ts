import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {UserService} from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('all')
    findAll(){
        return this.userService.findAll()
    }
    @Post("save")
    CreateUser(@Body() dto){
        return this.userService.save(dto)
    }
    @Get("one:idOrEmail")
    FindOneUser(@Param("IdOrEmail") IdOrEmail:string){
        return this.userService.findOne(IdOrEmail)
    }
    @Delete("delete:id")
    DeleteUser(@Param("IdOrEmail") IdOrEmail:string){
        return this.userService.delete(IdOrEmail)
    }
}
