import FabricanteVacina from "../models/FabricanteVacina";
import { getRepository, Repository } from "typeorm";

interface IFabricanteVacinaProps {
  descricao: string;
  lote: string;
  validade: Date;
  quantidade: number;
}

class FabricanteVacinaDAO {
  private ormRepository: Repository<FabricanteVacina>;

  constructor () {
    this.ormRepository = getRepository(FabricanteVacina);
  }

  async create(data: IFabricanteVacinaProps) {
    const fabVacina = this.ormRepository.create(data);

    await this.ormRepository.save(fabVacina);

    return fabVacina;
  }

  async read(): Promise<FabricanteVacina[]> {
    const fabricanteVacinas = await this.ormRepository.find();

    return fabricanteVacinas;
  }

  async readById(id: number): Promise<FabricanteVacina | undefined> {
    const fabricanteVacinas = await this.ormRepository.findOne(id);

    return fabricanteVacinas;
  }

  async update(fabricanteVacina: FabricanteVacina) {
    return await this.ormRepository.save(fabricanteVacina);
  }

  async delete(id: number) {
    await this.ormRepository.delete(id);
  }
}

export default FabricanteVacinaDAO;