import { Request, Response } from "express";
import EnderecoDAO from "../DAO/EnderecoDAO";

class EnderecoController {
  async index(request: Request, response: Response): Promise<void> {
    const enderecoDAO = new EnderecoDAO();

    const enderecos = await enderecoDAO.read();

    response.render('endereco-list.html', { enderecos });
  }

  async create(request: Request, response: Response): Promise<Response> {
    if (request.method == 'GET') {
      response.render('endereco-details.html');
      return;
    }

    const { 
      rua="",
      cidade="",
      estado="",
      cep="",
      comentario="" 
    } = request.body;

    const enderecoDAO = new EnderecoDAO();

    const endereco = await enderecoDAO.create({
      rua,
      cep,
      cidade,
      estado,
      comentario
    });

    response.redirect('/enderecos/');
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const enderecoDAO = new EnderecoDAO();

    const endereco = await enderecoDAO.readById(parseInt(id));

    if (!endereco) {
      throw new Error("Endereço não encontrado");
    }

    if (request.method == 'GET') {
      response.render('endereco-details.html', { endereco, update: true });
      return;
    }

    const { 
      rua=endereco.rua,
      cidade=endereco.cidade,
      estado=endereco.estado,
      cep=endereco.cep,
      comentario=endereco.comentario
    } = request.body;

    endereco.rua = rua;
    endereco.cidade = cidade;
    endereco.estado = estado;
    endereco.cep = cep;
    endereco.comentario = comentario;

    await enderecoDAO.update(endereco);

    response.redirect('/enderecos/');
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const enderecoDAO = new EnderecoDAO();

    await enderecoDAO.delete(parseInt(id));

    response.redirect('/enderecos/');
  }
}

export default EnderecoController;