import { JwtModuleOptions } from "@nestjs/jwt";

export class jwtSupportUtils {
    static async getUserIdFromToken(token: string): Promise<string | null> {
        try {
          const jwtOptions: JwtModuleOptions = {
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '2h' },
          }
    
          const jwtService = new JwtService(jwtOptions);
          const decodedToken = jwtService.verify(token);
          console.log(decodedToken);
    
          return decodedToken.sub;
        } catch (error) {
          console.log(error);
          return null;
        }
      }
}