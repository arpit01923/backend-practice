import { Controller, Post, Body, HttpException, HttpStatus, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthService } from './jwt.service';
import { GetUsersDto } from './dto/get-users.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtAuthService: JwtAuthService
    ) { }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        const existingUser = await this.usersService.findByEmail(createUserDto.email);

        if (existingUser) {
            throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
        }

        const user = await this.usersService.create(createUserDto);
        return {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isActive: user.isActive,
            createdAt: user.createdAt
        };
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        const user = await this.usersService.validateUser(loginUserDto);
        const token = this.jwtAuthService.generateToken(user);

        return {
            access_token: token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        };
    }

    @Get('allUsers')
    async getAllUser(@Query() query: GetUsersDto) {
        const { users, total } = await this.usersService.findAll(query);

        return {
            data: users.map(user => ({
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isActive: user.isActive,
                createdAt: user.createdAt
            })),
            meta: {
                total,
                page: query.page,
                limit: query.limit,
                totalPages: Math.ceil(total / (query.limit || 10))
            }
        };
    }
} 