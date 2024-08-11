import {BadRequestException, Body, Controller, Get, HttpStatus, Post, Res, UnauthorizedException} from '@nestjs/common';
import {LoginDTO, RegisterDTO} from "./dto";
import {AuthService} from "./auth.service";
import {Tokens} from "./interfacesToken";
import { Response } from 'express';
import {ConfigService} from "@nestjs/config";
import {Cookie} from "@common/common";
import {IsString} from "class-validator";

const REFRESH_TOKEN ="refreshtoken"
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly configService: ConfigService ) {}
    @Post('register')
    async register(@Body() dto: RegisterDTO){
        const user = await this.authService.register(dto);
        if(!user){
            throw new BadRequestException("Cant register")
        }
    }

    @Post('login')
    async login(@Body() dto: LoginDTO, @Res() res:Response){
        const tokens = await this.authService.login(dto);
        if(!tokens){
            throw new BadRequestException("Cant login")
        }
        this.setRefreshTokenCookies(tokens, res)

    }
    @Get("refresh-tokens")
    async refreshTokens(@Cookie(REFRESH_TOKEN) refreshToken:string, @Res() res: Response){
        if( typeof refreshToken!=="string"){
            throw new UnauthorizedException()
        }
        const tokens = await this.authService.refreshTokens(refreshToken)
        this.setRefreshTokenCookies(tokens, res)
        if(!tokens){
            throw new UnauthorizedException()
        }
    }
    private setRefreshTokenCookies(tokens:Tokens, res: Response){
        if(!tokens){
            throw new UnauthorizedException()
        }
    res.cookie(REFRESH_TOKEN,tokens.refreshToken.value,{
        httpOnly:true,
        sameSite: "lax",
        expires: new Date(tokens.refreshToken.exp),
        secure: this.configService.get("NODE_ENV", "development")==="production",
        path: "/"
    });
        res.status(HttpStatus.CREATED).json({accessToken:tokens.accessToken}
    )
}
}
