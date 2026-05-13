import { Body, Controller, Delete, Get, Param, Post,Patch, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    
    @Get()//GET users or /users?role=value
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findAll(@Query('role') role?: 'INTERN'|'ENGINEER'|'ADMIN'){
        return []
    }

    @Get(':id') //GET users/:id
    findOne(@Param('id')id:string){
        return { id }
    }

    @Post() //POST /users
    createOne(@Body()user:object){
        return user
    }

    @Patch(':id') //PATCH users/:id
    updateOne(@Param('id')id:string,@Body()userUpdate:object){
        return {id,...userUpdate}
    }

    @Delete(':id') //DELETE users/:id
    deleteOne(@Param('id')id:string){
        return { id }
    }
}
