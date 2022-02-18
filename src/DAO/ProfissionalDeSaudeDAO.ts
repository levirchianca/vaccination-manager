import ProfissionalDeSaude from "../models/ProfissionalDeSaude";
import { getRepository, Repository } from "typeorm";

interface IProfissionalDeSaudeProps {
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  telefone: string;
  profissao: string;
}

class ProfissionalDeSaudeDAO {
  private ormRepository: Repository<ProfissionalDeSaude>;

  constructor () {
    this.ormRepository = getRepository(ProfissionalDeSaude);
  }

  async create(data: IProfissionalDeSaudeProps) {
    const profSaude = this.ormRepository.create(data);

    await this.ormRepository.save(profSaude);

    return profSaude;
  }

  async read(): Promise<ProfissionalDeSaude[]> {
    const ProfsSaude = await this.ormRepository.find();

    return ProfsSaude;
  }

  async readById(id: number): Promise<ProfissionalDeSaude | undefined> {
    const ProfSaude = await this.ormRepository.findOne(id);

    return ProfSaude;
  }

  async update(profSaude: ProfissionalDeSaude) {
    return await this.ormRepository.save(profSaude);
  }

  async delete(id: number) {
    await this.ormRepository.delete(id);
  }
}

export default ProfissionalDeSaudeDAO;