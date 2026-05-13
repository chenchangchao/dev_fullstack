import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    
    constructor(private readonly usersService:UsersService){}
    @Get()//GET users or /users?role=value
    findAll(@Query('role') role?: 'INTERN'|'ENGINEER'|'ADMIN'){
        return this.usersService.findAll(role)
    }

    @Get(':id') //GET users/:id
    findOne(@Param('id')id:string){
        // return this.usersService.findOne(parseInt(id))
        return this.usersService.findOne(+id) //unary plus,convert a non-number type into a number 
    }

    @Post() //POST /users
    createOne(@Body()user:{name:string,email:string,role: 'INTERN'|'ENGINEER'|'ADMIN'}){
        return this.usersService.createOne(user)
    }

    @Put(':id') //PATCH users/:id
    updateGlobally(@Param('id')id:string,@Body()userUpdate:
        {name:string,email:string,role: 'INTERN'|'ENGINEER'|'ADMIN'}){
        return this.usersService.updateGlobally(+id,userUpdate)
    }

    @Patch(':id') //PATCH users/:id
    updatePartially(@Param('id')id:string,@Body()userUpdate:
        {name?:string,email?:string,role?: 'INTERN'|'ENGINEER'|'ADMIN'}){
        return this.usersService.updatePartially(+id,userUpdate)
    }

    @Delete(':id') //DELETE users/:id
    deleteOne(@Param('id')id:string){
        return this.usersService.deleteOne(+id)
    }
}
