import {Repository, getRepository} from "typeorm";
import Paciente from "../models/Paciente";
import Endereco from "../models/Endereco";

interface IPacienteProps {
  nome: string;
  sobrenome: string;
  cpf: string;
  rg: string;
  email: string;
  telefone: string;
  endereco: Endereco;
}

class PacienteDAO {
  private ormRepository: Repository<Paciente>;

  constructor () {
    this.ormRepository = getRepository(Paciente);
  }

  async create(data: IPacienteProps) {
    const paciente = this.ormRepository.create(data);

    await this.ormRepository.save(paciente);

    return paciente;
  }

  async read(): Promise<Paciente[]> {
    const pacientes = await this.ormRepository.find({
      relations: ['endereco']
    });

    return pacientes;
  }

  async readById(id: number): Promise<Paciente | undefined> {
    const paciente = await this.ormRepository.findOne(id, {
      relations: ['endereco']
    });

    return paciente;
  }

  async readByCPF(cpf: string): Promise<Paciente | undefined> {
    const paciente = await this.ormRepository.findOne({
      where: {
        cpf
      },
      relations: ['endereco']
    });

    return paciente;
  }

  async update(paciente: Paciente) {
    return await this.ormRepository.save(paciente);
  }

  async delete(id: number) {
    await this.ormRepository.delete(id);
  }
}

export default PacienteDAO;