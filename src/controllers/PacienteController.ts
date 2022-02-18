import { Request, Response } from "express";
import PacienteDAO from "../DAO/PacienteDAO";
import EnderecoDAO from "../DAO/EnderecoDAO";

class ProfissionalDeSaudeController {
  async index(request: Request, response: Response): Promise<void> {
    const pacienteDAO = new PacienteDAO();

    const pacientes = await pacienteDAO.read();

    response.render('paciente-list.html', { pacientes });
  }

  async create(request: Request, response: Response): Promise<Response> {
    const enderecoDAO = new EnderecoDAO();

    const enderecos = await enderecoDAO.read();

    if (request.method == 'GET') {
      response.render('paciente-details.html', { enderecos });
      return;
    }

    const { 
      nome="",
      sobrenome="",
      cpf="",
      email="",
      rg="",
      telefone="",
      endereco_id
    } = request.body;

    const endereco = await enderecoDAO.readById(Number(endereco_id));

    const pacienteDAO = new PacienteDAO();

    await pacienteDAO.create({
      nome,
      sobrenome,
      cpf,
      rg,
      email,
      telefone,
      endereco
    });

    response.redirect('/pacientes/');
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const pacienteDAO = new PacienteDAO();
    const enderecoDAO = new EnderecoDAO();

    const paciente = await pacienteDAO.readById(parseInt(id));

    if (!paciente) {
      throw new Error("Profissional da saúde não encontrado");
    }

    const enderecos = await enderecoDAO.read();

    if (request.method == 'GET') {
      response.render('paciente-details.html', { paciente, update: true, enderecos });
      return;
    }

    const { 
      nome="",
      sobrenome="",
      cpf="",
      email="",
      rg="",
      telefone="",
      endereco_id
    } = request.body;

    const endereco = await enderecoDAO.readById(Number(endereco_id));

    paciente.nome = nome;
    paciente.sobrenome = sobrenome;
    paciente.cpf = cpf;
    paciente.rg = rg;
    paciente.email = email;
    paciente.telefone = telefone;
    paciente.endereco = endereco;
    
    await pacienteDAO.update(paciente);

    response.redirect('/pacientes/');
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const pacienteDAO = new PacienteDAO();

    await pacienteDAO.delete(parseInt(id));

    response.redirect('/pacientes/');
  }
}

export default ProfissionalDeSaudeController;