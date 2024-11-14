import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {User} from "./user.model";
import { Message } from './message.model';

@Entity()
export class Chat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];

    @OneToMany(() => Message, (message) => message.chat) // Проверьте, что это поле добавлено
    messages: Message[];

    @Column()
    createdAt: Date;
}