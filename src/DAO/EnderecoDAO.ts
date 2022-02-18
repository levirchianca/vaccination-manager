import Endereco from "../models/Endereco";
import { getRepository, Repository } from "typeorm";

interface IEnderecoProps {
  rua: string;
  cidade: string;
  estado: string;
  cep: string;
  comentario: string;
}

class EnderecoDAO {
  private ormRepository: Repository<Endereco>;

  constructor () {
    this.ormRepository = getRepository(Endereco);
  }

  async create(data: IEnderecoProps) {
    const endereco = this.ormRepository.create(data);

    await this.ormRepository.save(endereco);

    return endereco;
  }

  async read(): Promise<Endereco[]> {
    const enderecos = await this.ormRepository.find();

    return enderecos;
  }

  async readById(id: number): Promise<Endereco | undefined> {
    const endereco = await this.ormRepository.findOne(id);

    return endereco;
  }

  async update(endereco: Endereco) {
    return await this.ormRepository.save(endereco);
  }

  async delete(id: number) {
    await this.ormRepository.delete(id);
  }
}

export default EnderecoDAO;