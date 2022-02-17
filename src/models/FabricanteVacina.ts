import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('vaccine_manufacturers')
class FabricanteVacina {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  descricao: string;

  @Column()
  lote: string;

  @Column('text')
  validade: Date;

  @Column('integer')
  quantidade: number;
}

export default FabricanteVacina;