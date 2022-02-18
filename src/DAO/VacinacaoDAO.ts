import {Repository, getRepository} from "typeorm";
import Vacinacao from "../models/Vacinacao";
import Paciente from "../models/Paciente";
import FabricanteVacina from "../models/FabricanteVacina";
import ProfissionalDeSaude from "../models/ProfissionalDeSaude";

interface IVacinacaoProps {
  vacina: FabricanteVacina;
  paciente: Paciente;
  ps: ProfissionalDeSaude;
  data_aplicacao: Date;
  local: string; // Ver se é do tipo endereço
}

class VacinacaoDAO {
  private ormRepository: Repository<Vacinacao>;

  constructor () {
    this.ormRepository = getRepository(Vacinacao);
  }

  async create(data: IVacinacaoProps) {
    const vacinacao = this.ormRepository.create(data);

    await this.ormRepository.save(vacinacao);

    return vacinacao;
  }

  async read(): Promise<Vacinacao[]> {
    const vacinacaos = await this.ormRepository.find({
      relations: ['paciente', 'ps', 'vacina']
    });

    return vacinacaos;
  }

  async readById(id: number): Promise<Vacinacao | undefined> {
    const vacinacao = await this.ormRepository.findOne(id, {
      relations: ['paciente', 'ps', 'vacina']
    });

    return vacinacao;
  }

  async readByPacienteID(id: number): Promise<Vacinacao | undefined> {
    const vacinacao = await this.ormRepository.findOne({
      where: {
        paciente_id: id
      },
      relations: ['paciente', 'ps', 'vacina']
    });

    return vacinacao;
  }

  async update(vacinacao: Vacinacao) {
    return await this.ormRepository.save(vacinacao);
  }

  async delete(id: number) {
    await this.ormRepository.delete(id);
  }
}

export default VacinacaoDAO;