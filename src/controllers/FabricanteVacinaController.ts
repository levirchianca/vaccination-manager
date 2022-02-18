import { Request, Response } from "express";
import FabricanteVacinaDAO from "../DAO/FabricanteVacinaDAO";

class FabricanteVacinaController {
  async index(request: Request, response: Response): Promise<void> {
    const fabVacinaDAO = new FabricanteVacinaDAO();

    const fabVacinas = await fabVacinaDAO.read();

    response.render('fabvacina-list.html', { fabVacinas });
  }

  async create(request: Request, response: Response): Promise<Response> {
    if (request.method == 'GET') {
      response.render('fabvacina-details.html');
      return;
    }

    const { 
      lote="",
      quantidade="",
      validade="",
      descricao="",
    } = request.body;

    const fabVacinaDAO = new FabricanteVacinaDAO();

    const fabVacina = await fabVacinaDAO.create({
      lote,
      descricao,
      quantidade: Number(quantidade),
      validade,
    });

    response.redirect('/fabricante-vacinas/');
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const fabVacinaDAO = new FabricanteVacinaDAO();

    const fabVacina = await fabVacinaDAO.readById(parseInt(id));

    if (!fabVacina) {
      throw new Error("Endereço não encontrado");
    }

    if (request.method == 'GET') {
      response.render('fabvacina-details.html', { fabVacina, update: true });
      return;
    }

    const { 
      lote=fabVacina.lote,
      quantidade=fabVacina.quantidade,
      validade=fabVacina.validade,
      descricao=fabVacina.descricao,
    } = request.body;

    fabVacina.lote = lote;
    fabVacina.quantidade = Number(quantidade);
    fabVacina.validade = validade;
    fabVacina.descricao = descricao;

    await fabVacinaDAO.update(fabVacina);

    response.redirect('/fabricante-vacinas/');
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const fabVacinaDAO = new FabricanteVacinaDAO();

    await fabVacinaDAO.delete(parseInt(id));

    response.redirect('/fabricante-vacinas/');
  }
}

export default FabricanteVacinaController;