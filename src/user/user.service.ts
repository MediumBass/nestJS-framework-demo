import { Injectable } from '@nestjs/common';
import {PrismaService} from "@prisma/prisma.service";
import {User} from "@prisma/client";
import {genSaltSync, hashSync} from "bcrypt";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    save(user: Partial<User>){
        const hashedPassword = this.hashPassword(user.password)
        return this.prismaService.user.create({
            data:{
                email: user.email,
                password: hashedPassword,
                roles: ["USER"],
                phone: user.phone,  // Добавьте обязательное свойство phone
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
