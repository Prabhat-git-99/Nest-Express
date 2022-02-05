import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";

import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify( _scrypt );

@Injectable( )
export class AuthService {

    constructor( private usersService: UsersService ) {

    }

    async signup( email: string, password: string ) {

        // See if email is in use
        const users =  await this.usersService.find( email );
        if ( users.length ) {
            throw new BadRequestException( 'Email in use' );
        }

        // Hash the users password
        const salt = randomBytes( 8 ).toString( 'hex' );
        const hash = (await scrypt( password, salt, 32 )) as Buffer;
        const result = salt + '.' + hash.toString( 'hex' ); 

        // create a user & save it

        // return the user

    }

    signin( ) {

    }

}