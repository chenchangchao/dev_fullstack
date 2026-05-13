import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {

    private users = [
        {
            "id": 1,
            "name": "Leanne Graham",
            "email": "Sincere@april.biz",
            "role": "INTERN",
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "email": "Shanna@melissa.tv",
            "role": "INTERN",
        },
        {
            "id": 3,
            "name": "Clementine Bauch",
            "email": "Nathan@yesenia.net",
            "role": "ENGINEER",
        },
        {
            "id": 4,
            "name": "Patricia Lebsack",
            "email": "Julianne.OConner@kory.org",
            "role": "ENGINEER",
        },
        {
            "id": 5,
            "name": "Chelsey Dietrich",
            "email": "Lucio_Hettinger@annie.ca",
            "role": "ADMIN",
        }
    ]

    findAll(role?: 'INTERN'|'ENGINEER'|'ADMIN'){
        if(role){ 
            const rolesArray = this.users.filter(user => user.role === role)
            // 不能使用!rolesArray
            if (rolesArray.length === 0) throw new NotFoundException('User Role Not Found')
            return rolesArray
        }
        return this.users
    }
    
    findOne(id:number){
        const user = this.users.find(user => user.id === id)
        if(!user) throw new NotFoundException('User Not Found!')
        return user
    }

    createOne(createUserDto:CreateUserDto){

        const usersByHigiestId = [...this.users].sort((a,b)=>b.id = a.id)
        const newUser = {
            id: usersByHigiestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser

    }

    // error handling,当局部更新，字段不足时，给出提示报错信息
    updateGlobally(id:number,updatedUser: CreateUserDto){
        this.users = this.users.map( user =>{
            if(user.id === id) {
                return {...user,...updatedUser}
            }
            return user
        }
       )
    }


    updatePartially(id:number,updatedUser: UpdateUserDto){
        this.users = this.users.map( user =>{
            if(user.id === id) {
                return {...user,...updatedUser}
            }
            return user
        }
       )
       return this.findOne(id)
    }

    deleteOne(id:number){
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id != id)
        return  removedUser
    }

}
