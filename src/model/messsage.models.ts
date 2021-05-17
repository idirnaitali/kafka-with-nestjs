import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface Message {
  id: number;
  pseudo: string;
  content: string;
}

@Entity()
export class MessageEntity implements Message {
  @PrimaryGeneratedColumn()
  readonly id: number;
  @Column()
  pseudo: string;
  @Column()
  content: string;

  constructor(id: number, pseudo: string, content: string) {
    this.id = id;
    this.pseudo = pseudo;
    this.content = content;
  }
}
