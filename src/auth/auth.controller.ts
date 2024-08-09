import {BadRequestException, Body, Controller, Get, Post} from '@nestjs/common';
import {LoginDTO, RegisterDTO} from "./dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('register')
    async register(@Body() dto: RegisterDTO){
        const user = await this.authService.register(dto);
        if(!user){
            throw new BadRequestException("Cant register")
        }
    }
    @Post('login')
    async login(@Body() dto: LoginDTO){
        const tokens = await this.authService.login(dto);
        if(!tokens){
            throw new BadRequestException("Cant login")
        }
    }
    @Get("refresh")
    refreshTokens(){

    }
}
