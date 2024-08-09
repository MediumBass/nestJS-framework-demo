import {JwtModuleAsyncOptions} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

const jwtModuleOptions = (config:ConfigService)=> ({
    signOptions: { expiresIn: '60s' }, // пример структуры JwtModuleOptions
    secret: config.get('JWT_SECRET'),
})
export const options =():JwtModuleAsyncOptions  =>({
    useFactory: (config: ConfigService) => jwtModuleOptions(config),
    inject: [ConfigService]
})