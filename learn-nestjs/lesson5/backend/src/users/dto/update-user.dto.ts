import { CreateUserDto } from "./create-user.dto";
import { PartialType } from "@nestjs/mapped-types";

// The PartialType() function returns a type (class) 
// with all the properties of the input type set to optional. 
export class UpdateUserDto extends PartialType(CreateUserDto){}