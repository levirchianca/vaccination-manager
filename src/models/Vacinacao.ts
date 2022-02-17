import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import FabricanteVacina from "./FabricanteVacina";
import Paciente from "./Paciente";
import ProfissionalDeSaude from "./ProfissionalDeSaude";

@Entity('vaccinations')
class Vacinacao {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => FabricanteVacina)
  @JoinColumn({ name: 'vacina_id' })
  vacina: FabricanteVacina;

  @OneToOne(() => Paciente)
  // @JoinColumn({ name: 'paciente_id' })
  @JoinColumn()
  paciente: Paciente;

  @OneToOne(() => ProfissionalDeSaude)
  @JoinColumn({ name: 'profissionaldesaude_id' })
  ps: ProfissionalDeSaude;

  @Column('text')
  data_aplicacao: Date;

  @Column()
  local: string; // Ver se é do tipo endereço

  @Column('int')
  paciente_id: number;
}

export default Vacinacao;