import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { User } from './user.entity';

@Injectable()
export class JwtAuthService {
    constructor(private readonly jwtService: NestJwtService) { }

    generateToken(user: User): string {
        const payload = {
            sub: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        };
        return this.jwtService.sign(payload);
    }

    verifyToken(token: string): any {
        return this.jwtService.verify(token);
    }
} 