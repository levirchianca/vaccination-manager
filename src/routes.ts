import { Router } from "express";
import EnderecoController from "./controllers/EnderecoController";
import FabricanteVacinaController from "./controllers/FabricanteVacinaController";
import ProfissionalDeSaudeController from "./controllers/ProfissionalDeSaudeController";
import PacienteController from "./controllers/PacienteController";
import VacinacaoController from "./controllers/VacinacaoController";

const router = Router();
const enderecoController = new EnderecoController();
const fabricanteVacinaController = new FabricanteVacinaController();
const profissionalDeSaudeController = new ProfissionalDeSaudeController();
const pacienteController = new PacienteController();
const vacinacaoController = new VacinacaoController();

router.route('/')
  .get(vacinacaoController.paciente_atestado)
  .post(vacinacaoController.paciente_atestado);

// Endereço
router.get('/enderecos/', enderecoController.index);

router.route('/enderecos/novo')
  .get(enderecoController.create)
  .post(enderecoController.create);

router.route('/enderecos/:id/editar')
  .get(enderecoController.update)
  .post(enderecoController.update)

router.route('/enderecos/:id/deletar')
  .get(enderecoController.delete);


// FabricanteVacina
router.get('/fabricante-vacinas/', fabricanteVacinaController.index);

router.route('/fabricante-vacinas/novo')
  .get(fabricanteVacinaController.create)
  .post(fabricanteVacinaController.create);

router.route('/fabricante-vacinas/:id/editar')
  .get(fabricanteVacinaController.update)
  .post(fabricanteVacinaController.update)

router.route('/fabricante-vacinas/:id/deletar')
  .get(fabricanteVacinaController.delete);


// ProfissionalDeSaude
router.get('/profissionais-saude/', profissionalDeSaudeController.index);

router.route('/profissionais-saude/novo')
  .get(profissionalDeSaudeController.create)
  .post(profissionalDeSaudeController.create);

router.route('/profissionais-saude/:id/editar')
  .get(profissionalDeSaudeController.update)
  .post(profissionalDeSaudeController.update)

router.route('/profissionais-saude/:id/deletar')
  .get(profissionalDeSaudeController.delete);


// Pacientes
router.get('/pacientes/', pacienteController.index);

router.route('/pacientes/novo')
  .get(pacienteController.create)
  .post(pacienteController.create);

router.route('/pacientes/:id/editar')
  .get(pacienteController.update)
  .post(pacienteController.update)

router.route('/pacientes/:id/deletar')
  .get(pacienteController.delete);


// Vacinacoes
router.get('/vacinacoes/', vacinacaoController.index);

router.route('/vacinacoes/novo')
  .get(vacinacaoController.create)
  .post(vacinacaoController.create);

router.route('/vacinacoes/:id/editar')
  .get(vacinacaoController.update)
  .post(vacinacaoController.update)

router.route('/vacinacoes/:id/deletar')
  .get(vacinacaoController.delete);

    
export default router;