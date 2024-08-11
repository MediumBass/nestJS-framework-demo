import {Body, Injectable} from '@nestjs/common';
import {PrismaService} from "@prisma/prisma.service";
import {genSaltSync, hashSync} from "bcrypt";
import {RegisterDTO} from "../auth/dto";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    save(@Body() dto: RegisterDTO){
        const hashedPassword = this.hashPassword(dto.password)
        return this.prismaService.user.create({
            data:{
                email: dto.email,
                password: hashedPassword,
                roles: ["USER"],
                phone: dto.phone,  // Добавьте обязательное свойство phone
                updateTime: new Date(),
            }
        })
    }

    findOne(idOrMail:string){

      return this.prismaService.user.findFirst({
          where:{
                email:idOrMail
            }
      })
    }

    findAll(){
        return this.prismaService.user.findMany()
    }

    delete(phone:string) {
        return this.prismaService.user.deleteMany({
            where: { phone:phone },
        });
    }
    private hashPassword(password:string){
        return hashSync(password, genSaltSync(10))
    }
}
