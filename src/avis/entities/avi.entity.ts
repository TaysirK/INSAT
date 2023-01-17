import { OneToMany,Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { timestampsEntity } from "../Generics/timestamps.entity";
import { SuperUserEntity } from '../../super-users/entities/super-user.entity';
import {CommentEntity} from '../../comments/entities/comment.entity'

@Entity('avis')
export class AvisEntity extends timestampsEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    Description: string;
    @Column()
    content: string;

    @OneToMany(
        (Type) => CommentEntity,
        (comment: CommentEntity) => comment.avis,
        {
            /*on charge l'entité avec ses relation*/
            eager :true , 
            /*on supprime l'entité avec ses relation*/
            onDelete : 'CASCADE'

        } 
      )
      comments: CommentEntity [];
    @OneToOne(
        (Type) => SuperUserEntity,
        (SuperUser: SuperUserEntity) => SuperUser.avis,
        {
            eager :true , 
            
        } 
      )
      SuperUser: SuperUserEntity [];
    
}
