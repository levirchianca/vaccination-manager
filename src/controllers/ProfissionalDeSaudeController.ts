import { Request, Response } from "express";
import ProfissionalDeSaudeDAO from "../DAO/ProfissionalDeSaudeDAO";

class ProfissionalDeSaudeController {
  async index(request: Request, response: Response): Promise<void> {
    const profSaudeDAO = new ProfissionalDeSaudeDAO();

    const profsSaude = await profSaudeDAO.read();

    response.render('profsaude-list.html', { profsSaude });
  }

  async create(request: Request, response: Response): Promise<Response> {
    if (request.method == 'GET') {
      response.render('profsaude-details.html');
      return;
    }

    const { 
      nome="",
      sobrenome="",
      cpf="",
      email="",
      telefone="",
      profissao
    } = request.body;

    const profSaudeDAO = new ProfissionalDeSaudeDAO();

    const profSaude = await profSaudeDAO.create({
      nome,
      sobrenome,
      cpf,
      email,
      telefone,
      profissao
    });

    response.redirect('/profissionais-saude/');
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const profSaudeDAO = new ProfissionalDeSaudeDAO();

    const profSaude = await profSaudeDAO.readById(parseInt(id));

    if (!profSaude) {
      throw new Error("Profissional da saúde não encontrado");
    }

    if (request.method == 'GET') {
      response.render('profsaude-details.html', { profSaude, update: true });
      return;
    }

    const { 
      nome="",
      sobrenome="",
      cpf="",
      email="",
      telefone="",
      profissao
    } = request.body;

    profSaude.nome = nome;
    profSaude.sobrenome = sobrenome;
    profSaude.cpf = cpf;
    profSaude.email = email;
    profSaude.telefone = telefone;
    profSaude.profissao = profissao;

    await profSaudeDAO.update(profSaude);

    response.redirect('/profissionais-saude/');
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const profSaudeDAO = new ProfissionalDeSaudeDAO();

    await profSaudeDAO.delete(parseInt(id));

    response.redirect('/profissionais-saude/');
  }
}

export default ProfissionalDeSaudeController;