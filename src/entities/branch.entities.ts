import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'branch'})

export class branch{
    @PrimaryGeneratedColumn()
    id:number;
}