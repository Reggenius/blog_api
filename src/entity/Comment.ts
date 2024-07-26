import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import User from "./User";
import Post from "./Post";

@Entity()
export default class Comment {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => Post, (post) => post.comments, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: 'postId' })
    post!: Post

    @ManyToOne(() => User, (user) => user.comments, { nullable: false })
    @JoinColumn({ name: 'authorId' })
    user!: User

    @Column({ 
        type: "text"
    })
    content!: string;

    @CreateDateColumn()
    createdAt!: Date;
    
    @UpdateDateColumn()
    updatedAt?: Date;
}
