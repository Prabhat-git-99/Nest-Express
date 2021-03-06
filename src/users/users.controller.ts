import { Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException, UseInterceptors, ClassSerializerInterceptor, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
// import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.intersceptors';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller( 'auth' )
@Serialize( UserDto )
// @UseInterceptors( CurrentUserInterceptor )
export class UsersController {

    constructor( private usersService: UsersService, private authService: AuthService ) {

    }

    // @Get( '/colors/:color' )
    // setColor( @Param( 'color' ) color: string, @Session( ) session: any ) {

    //     session.color = color;

    // }

    // @Get( '/colors' )
    // getColor( @Session( ) session: any ) {
        
    //     return session.color;

    // }

    // @Get( '/whoami' )
    // whoAmI( @Session( ) session: any ) {

    //     return this.usersService.findOne( session.userId );

    // }

    @UseGuards( AuthGuard )
    @Get( '/whoami' )
    whoAmI( @CurrentUser( ) user: User ) {

        return user;
    }


    @Post( '/signout' )
    singOut( @Session( ) session: any ) {
        
        session.userId = null;
    
    }

    @Post( '/signup' )
    async createUser( @Body( ) body: CreateUserDto, @Session( ) session: any ) {

        // console.log( body );
        const user = await this.authService.signup( body.email, body.password );
        session.userId = user.id;
        return user;
    
    }

    @Post( '/signin' )
    async signin( @Body( ) body: CreateUserDto, @Session( ) session: any ) {
        
        const user = await this.authService.signin( body.email, body.password );
        session.userId = user.id;
        return user;
    
    }

    // @UseInterceptors( ClassSerializerInterceptor )
    // @UseInterceptors( new SerializeInterceptor( UserDto ) )
    @Get( '/:id' )
    async findUser( @Param( 'id' ) id: string ) {
        console.log( 'handler is running..' );
        const user = await this.usersService.findOne( parseInt( id ) );
        console.log( 'user ', user );
        if ( !user ) {
            throw new NotFoundException( 'user not found' );
        }
        return user;
    }

    @Get( ) 
    findAllUsers( @Query( 'email' ) email: string ) {
        return this.usersService.find( email );
    }
    
    @Delete( '/:id' )
    removeUser( @Param( 'id' ) id: string ) {
        return this.usersService.remove( parseInt( id ) );
    }

    @Patch( '/:id' )
    updateUser( @Param( 'id' ) id: string, @Body( ) body: UpdateUserDto ) {
        return this.usersService.update( parseInt( id ), body );
    }

}
