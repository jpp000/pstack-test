# Issues

Cada arquivo é uma unidade de trabalho que termina num estado verificável. Execute na ordem numérica (dependências em [roadmap.md](../roadmap.md#ordem-e-dependências)).

Formato de cada issue:

- **Objetivo**: o que fica possível depois dela.
- **Specs**: a fonte das regras. Em conflito, a spec vence a issue.
- **Tarefas**: checklist do que precisa existir. Descreve comportamento, não estrutura de arquivos.
- **Aceite**: condições observáveis que provam que acabou. Uma issue só está pronta quando todas passam e os testes da issue rodam verdes.

Para executar com pstack:

```
/pstack:poteto-mode implemente docs/issues/NN-<nome>.md. leia as specs citadas antes. prove cada critério de aceite.
```
