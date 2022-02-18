import { Request, Response } from "express";
import VacinacaoDAO from "../DAO/VacinacaoDAO";
import PacienteDAO from "../DAO/PacienteDAO";
import ProfissionalDeSaudeDAO from "../DAO/ProfissionalDeSaudeDAO";
import FabricanteVacinaDAO from "../DAO/FabricanteVacinaDAO";

class VacinacaoController {

  async paciente_atestado(request: Request, response: Response) {
    if (request.method == 'GET') {
      response.render('atestado-paciente-home.html', { });
      return;
    }

    const { cpf } = request.body;

    const vacinacaoDAO = new VacinacaoDAO();
    const pacienteDAO = new PacienteDAO();

    const paciente = await pacienteDAO.readByCPF(cpf);
    
    if (!paciente) {
      response.redirect('/pacientes/novo');
      return;
    }

    const vacinacao = await vacinacaoDAO.readByPacienteID(paciente.id);

    if (vacinacao) {
      response.render('atestado-paciente.html', { vacinacao, paciente });
      return;
    }
    
    response.redirect('/vacinacoes/novo');
  }

  async index(request: Request, response: Response): Promise<void> {
    const vacinacaoDAO = new VacinacaoDAO();

    const vacinacoes = await vacinacaoDAO.read();

    response.render('vacinacao-list.html', { vacinacoes });
  }

  async create(request: Request, response: Response) {
    const vacinasDAO = new FabricanteVacinaDAO();
    const profSaudeDAO = new ProfissionalDeSaudeDAO();
    const pacienteDAO = new PacienteDAO();

    const vacinas = await vacinasDAO.read();
    const profsSaude = await profSaudeDAO.read();
    const pacientes = await pacienteDAO.read();

    if (request.method == 'GET') {
      response.render('vacinacao-details.html', { vacinas, profsSaude, pacientes });
      return;
    }

    const { 
      vacina_id="",
      paciente_id="",
      profSaude_id="",
      data_aplicacao="",
      local="",
    } = request.body;

    const vacina = await vacinasDAO.readById(Number(vacina_id));
    const paciente = await pacienteDAO.readById(Number(paciente_id));
    const ps = await profSaudeDAO.readById(Number(profSaude_id));

    const vacinacaoDAO = new VacinacaoDAO();

    await vacinacaoDAO.create({
      vacina,
      paciente,
      ps,
      data_aplicacao,
      local,
    });

    vacina.quantidade -= 1;

    await vacinasDAO.update(vacina);

    response.redirect('/vacinacoes/');
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const vacinasDAO = new FabricanteVacinaDAO();
    const profSaudeDAO = new ProfissionalDeSaudeDAO();
    const pacienteDAO = new PacienteDAO();
    const vacicaoDAO = new VacinacaoDAO();

    const vacinas = await vacinasDAO.read();
    const profsSaude = await profSaudeDAO.read();
    const pacientes = await pacienteDAO.read();

    const vacinacao = await vacicaoDAO.readById(Number(id));

    if (!vacinacao) {
      throw new Error("Vacinação não encontrado");
    }

    if (request.method == 'GET') {
      response.render('vacinacao-details.html', { vacinas, profsSaude, pacientes, update: true, vacinacao });
      return;
    }

    const { vacina_id: vacina_pre = ""} = request.body;

    const { 
      vacina_id=vacinacao.vacina.id,
      paciente_id=vacinacao.paciente.id,
      profSaude_id=vacinacao.ps.id,
      data_aplicacao=vacinacao.data_aplicacao,
      local=vacinacao.local,
    } = request.body;

    const vacina = await vacinasDAO.readById(Number(vacina_id));
    const paciente = await pacienteDAO.readById(Number(paciente_id));
    const ps = await profSaudeDAO.readById(Number(profSaude_id));

    if (vacina_pre && vacina_pre != vacinacao.vacina.id) {
      vacina.quantidade -= 1;
      vacinacao.vacina.quantidade += 1;

      await vacinasDAO.update(vacina);
      await vacinasDAO.update(vacinacao.vacina);
    }

    vacinacao.vacina = vacina;
    vacinacao.paciente = paciente;
    vacinacao.ps = ps;
    vacinacao.data_aplicacao = data_aplicacao;
    vacinacao.local = local;

    await vacicaoDAO.update(vacinacao);

    response.redirect('/vacinacoes/');
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const vacinacaoDAO = new VacinacaoDAO();

    await vacinacaoDAO.delete(parseInt(id));

    response.redirect('/vacinacoes/');
  }
}

export default VacinacaoController;