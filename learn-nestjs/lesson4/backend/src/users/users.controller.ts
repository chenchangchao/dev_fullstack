import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, ValidationPipe,  } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    
    constructor(private readonly usersService:UsersService){}
    @Get()//GET users or /users?role=value
    findAll(@Query('role') role?: 'INTERN'|'ENGINEER'|'ADMIN'){
        return this.usersService.findAll(role)
    }

    @Get(':id') //GET users/:id
    findOne(@Param('id',ParseIntPipe )id:number){
        // return this.usersService.findOne(parseInt(id))
        return this.usersService.findOne(id) //unary plus,convert a non-number type into a number 
    }

    @Post() //POST /users
    createOne(@Body(ValidationPipe)createUserDto:CreateUserDto){
        return this.usersService.createOne(createUserDto)
    }

    @Put(':id') //PUT users/:id
    updateGlobally(@Param('id',ParseIntPipe)id:number,@Body(ValidationPipe)userUpdate:
        CreateUserDto){
        return this.usersService.updateGlobally(id,userUpdate)
    }

    @Patch(':id') //PATCH users/:id
    updatePartially(@Param('id',ParseIntPipe)id:number,@Body(ValidationPipe)userUpdate:
        UpdateUserDto){
        return this.usersService.updatePartially(id,userUpdate)
    }

    @Delete(':id') //DELETE users/:id
    deleteOne(@Param('id',ParseIntPipe)id:number){
        return this.usersService.deleteOne(id)
    }
}
