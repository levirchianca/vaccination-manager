import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('adresss')
class Endereco {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  rua: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  cep: string;

  @Column()
  comentario: string;
}

export default Endereco;