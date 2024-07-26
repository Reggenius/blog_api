import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn
} from "typeorm";
import User from "./User";
import Comment from "./Comment";

@Entity()
export default class Post {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({
        length: 30,
        unique: true
    })
    title!: string;

    @Column({ 
        type: "text"
    })
    content!: string;

    @ManyToOne(() => User, (user) => user.posts, { nullable: false })
    @JoinColumn({ name: 'authorId' })
    user!: User

    @OneToMany(() => Comment, (comment) => comment.post, { nullable: false })
    comments!: Comment[]

    @CreateDateColumn()
    createdAt!: Date;
    
    @UpdateDateColumn()
    updatedAt?: Date;
}
