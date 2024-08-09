import {Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {LoginDTO, RegisterDTO} from "./dto";
import {UserService} from "../user/user.service";
import {Tokens} from "./interfacesToken";
import {compareSync} from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {Token} from "@prisma/client";
import {PrismaService} from "@prisma/prisma.service";
import {v4} from "uuid";
import {add} from "date-fns";


@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(private readonly userService: UserService,
                private readonly jwtService: JwtService,
                private readonly prismaService: PrismaService) {}
   async register(dto:RegisterDTO){
        return this.userService.save(dto).catch(err =>{
            this.logger.error(err)
            return null
        })
    }
    async login(dto: LoginDTO):Promise<Tokens>{
        const user = await this.userService.findOne(dto.email).catch( err =>{
            this.logger.error(err)
            return null
        });if(!user || !compareSync(dto.password,user.password)){
            throw new UnauthorizedException("Wrong login or password");
        }
        const accessToken= this.jwtService.sign({
            id: user.id,
            email: user.email,
            roles: user.roles
        })
        const refreshToken = await this.getRefreshToken(user.id)
        return {accessToken,refreshToken}
    }
    private async getRefreshToken(userId: string):Promise<Token>{
        return this.prismaService.token.create({
            data:{
                token: v4(),
                exp: add(new Date(), {months:1}),
                userId,
            }
        })
    }

}
