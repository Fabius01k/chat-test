import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import {Chat} from "./chat.model";
import {User} from "./user.model";

@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Chat)
    chat: Chat;

    @ManyToOne(() => User)
    author: User;

    @Column()
    text: string;

    @Column()
    created_at: Date;
}