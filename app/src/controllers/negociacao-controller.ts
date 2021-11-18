import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js"
import { DiasDaSemana } from "../enums/dias-da-semana.js"
import { Negociacao } from "../models/negociacao.js"
import { Negociacoes } from "../models/negociacoes.js"
import { MensagemView } from "../views/mensagem-view.js"
import { NegociacoesView } from "../views/negociacoes-view.js"

export class NegociacaoController {
    private inputData: HTMLInputElement
    private inputQuantidade: HTMLInputElement
    private inputValor: HTMLInputElement
    private negociacoes = new Negociacoes()
    private negociacoesView = new NegociacoesView("#negociacoesView", true)
    private mensagemView = new MensagemView("#mensagemView")


    constructor() {
        this.inputData = document.querySelector("#data") as HTMLInputElement //casting explícito da forma recomendável
        this.inputQuantidade = document.querySelector("#quantidade") as HTMLInputElement
        this.inputValor = <HTMLInputElement>document.querySelector("#valor") //casting explícito de forma menos recomendável
        this.negociacoesView.update(this.negociacoes)
    }

    @logarTempoDeExecucao()
    public adiciona(): void {
        /*
            Comentário de teste
        */
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        )


        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update("Apenas negociações em dias úteis são aceitas")
            return
        }

        this.negociacoes.adiciona(negociacao)
        this.limparFormulario()
        this.atualizaView()
    }

    private ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO
    }

    private limparFormulario(): void {
        this.inputData.value = ""
        this.inputQuantidade.value = "1"
        this.inputValor.value = "0.0"
        this.inputData.focus()
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes)
        this.mensagemView.update("Negociação adicionada com sucesso!")
    }
}