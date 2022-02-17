import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('health_professionals')
class ProfissionalDeSaude {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  profissao: string;
}

export default ProfissionalDeSaude;