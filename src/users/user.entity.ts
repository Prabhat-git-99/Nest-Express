// import { Exclude } from "class-transformer";
import { Report } from "src/reports/report.entity";
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, OneToMany } from "typeorm";

@Entity( )
export class User {

    @PrimaryGeneratedColumn( )
    id: number;

    @Column( )
    email: string;

    @Column( )
    // @Exclude( )
    password: string;

    @OneToMany( ( ) => Report, ( report ) => report.user )
    reports: Report[ ];

    @AfterInsert( )
    logInsert( ) {
//         console.log( 'Inserted User with id ', this.id );
    }

    @AfterUpdate( )
    logUpdate( ) {
//         console.log( 'Update User with id ', this.id );
    }

    @AfterRemove( )
    logRemove( ) {
//         console.log( 'Removed User with id ', this.id );
    }

}
