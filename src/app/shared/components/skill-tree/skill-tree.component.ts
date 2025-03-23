import { Component, OnInit } from '@angular/core';
import { Node, Edge, NgxGraphModule } from '@swimlane/ngx-graph';

interface Habilidade {
  id: number;
  campanhaId: number;
  nome: string;
  descricaoCurta: string;
  descricaoCompleta: string;
  tipo: number;
  icone?: string;
  nivel: number;
  habilidadeDependenciaId?: number;
  dataCriacao: string;
}

@Component({
  selector: 'skill-tree',
  standalone: true,
  imports: [
    NgxGraphModule
  ],
  templateUrl: './skill-tree.component.html',
  styleUrl: './skill-tree.component.scss'
})
export class SkillTreeComponent implements OnInit {

  nodes: Node[] = [];
  links: Edge[] = [];
  layoutSettings = {
    orientation: 'TB' // Top to Bottom
  };

  // Simulação dos dados vindos do backend
  habilidades: Habilidade[] = [
    { id: 1, campanhaId: 1, nome: 'Ataque Básico', descricaoCurta: 'Um ataque simples', descricaoCompleta: 'Descrição completa...', tipo: 1, nivel: 0, dataCriacao: '2023-01-01' },
    { id: 2, campanhaId: 1, nome: 'Ataque Forte', descricaoCurta: 'Ataque com força extra', descricaoCompleta: 'Descrição completa...', tipo: 1, nivel: 1, habilidadeDependenciaId: 1, dataCriacao: '2023-01-02' },
    { id: 3, campanhaId: 1, nome: 'Defesa', descricaoCurta: 'Aumenta a defesa', descricaoCompleta: 'Descrição completa...', tipo: 2, nivel: 0, dataCriacao: '2023-01-03' }
  ];


  ngOnInit(): void {
    this.buildGraph();
  }


  buildGraph(): void {
    // Para cada habilidade, crie um nó
    this.nodes = this.habilidades.map(hab => ({
      id: hab.id.toString(),
      label: hab.nome,
      data: hab // opcional: dados completos para usar em templates ou eventos
    }));

    // Para as habilidades que têm dependência, crie uma aresta de dependência
    this.links = this.habilidades
      .filter(hab => hab.habilidadeDependenciaId)
      .map(hab => ({
        id: `edge-${hab.habilidadeDependenciaId}-${hab.id}`,
        source: hab.habilidadeDependenciaId?.toString() ?? "",
        target: hab.id.toString(),
        label: 'depende de'
      }));
  }

  // Exemplo de evento de clique no nó (para exibir detalhes ou acionar desbloqueio)
  onNodeClick(node: any): void {
    console.log('Nó clicado:', node);
    // Aqui você pode abrir um modal ou exibir os detalhes da habilidade,
    // inclusive verificando o status em "HabilidadePersonagem"
  }

}
