import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import Post from "./Post";
import Comment from "./Comment";

@Entity()
export default class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({
        length: 15,
        unique: true
    })
    username!: string;

    @Column()
    password!: string;

    @Column({
        length: 30,
        unique: true
    })
    email!: string;

    @OneToMany(() => Post, (post) => post.user)
    posts!: Post[]

    @OneToMany(() => Comment, (comment) => comment.user)
    comments!: Comment[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}
