import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Node, Edge, NgxGraphModule } from '@swimlane/ngx-graph';

interface Habilidade {
  id: number;
  campanhaId: number;
  nome: string;
  descricaoCurta: string;
  descricaoCompleta: string;
  tipo: 'Passiva' | 'Habilidade' | 'Melhoria' | 'Evolução';
  icone?: string;
  nivel: number;
  habilidadeDependenciaId?: number;
  exclusivaClasseId?: number;
  exclusivaRacaId?: number;
  dataCriacao: string;
}

@Component({
  selector: 'skill-tree',
  standalone: true,
  imports: [
    NgIf,
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
  public habilidadesMago: Habilidade[] = [
    // Passiva Inicial
    {
      id: 1,
      campanhaId: 1,
      nome: "Afinidade Arcana",
      descricaoCurta: "Aprimora a conexão do mago com as energias arcanas.",
      descricaoCompleta: "O mago sente as energias arcanas fluírem com mais facilidade, reduzindo custos de mana para habilidades básicas.",
      tipo: "Passiva",
      nivel: 1,
      dataCriacao: "2025-03-23",
      exclusivaClasseId: 1,
    },
    
    // Habilidades Principais
    {
      id: 2,
      campanhaId: 1,
      nome: "Orbe Arcano",
      descricaoCurta: "Dispara um projétil de energia arcana.",
      descricaoCompleta: "O mago dispara um orbe de energia pura que causa dano ao atingir o inimigo.",
      tipo: "Habilidade",
      nivel: 2,
      habilidadeDependenciaId: 1,
      dataCriacao: "2025-03-23",
      exclusivaClasseId: 1,
    },
    {
      id: 3,
      campanhaId: 1,
      nome: "Chamas Místicas",
      descricaoCurta: "Invoca chamas arcanas que queimam o inimigo.",
      descricaoCompleta: "O mago invoca chamas místicas que queimam o inimigo ao longo do tempo.",
      tipo: "Habilidade",
      nivel: 3,
      habilidadeDependenciaId: 2,
      dataCriacao: "2025-03-23",
      exclusivaClasseId: 1,
    },
    {
      id: 4,
      campanhaId: 1,
      nome: "Explosão Arcana",
      descricaoCurta: "Libera uma explosão mágica ao redor do mago.",
      descricaoCompleta: "O mago canaliza sua energia arcana para liberar uma explosão destrutiva em área.",
      tipo: "Habilidade",
      nivel: 4,
      habilidadeDependenciaId: 3,
      dataCriacao: "2025-03-23",
      exclusivaClasseId: 1,
    },
    
    // Melhorias para cada Habilidade
    {
      id: 5,
      campanhaId: 1,
      nome: "Orbe Arcano Aprimorado",
      descricaoCurta: "Aumenta o dano e a velocidade do Orbe Arcano.",
      descricaoCompleta: "O orbe arcano se move mais rápido e causa mais dano ao atingir seu alvo.",
      tipo: "Melhoria",
      nivel: 3,
      habilidadeDependenciaId: 2,
      dataCriacao: "2025-03-23",
      exclusivaClasseId: 1,
    },
    {
      id: 6,
      campanhaId: 1,
      nome: "Intensificação Mística",
      descricaoCurta: "As Chamas Místicas agora duram mais tempo.",
      descricaoCompleta: "O mago aprimora suas chamas, fazendo com que queimem o inimigo por mais tempo.",
      tipo: "Melhoria",
      nivel: 4,
      habilidadeDependenciaId: 3,
      dataCriacao: "2025-03-23",
      exclusivaClasseId: 1,
    },
    {
      id: 7,
      campanhaId: 1,
      nome: "Explosão Potencializada",
      descricaoCurta: "A Explosão Arcana causa um impacto maior.",
      descricaoCompleta: "O mago amplifica sua explosão arcana, aumentando seu raio e dano.",
      tipo: "Melhoria",
      nivel: 5,
      habilidadeDependenciaId: 4,
      dataCriacao: "2025-03-23",
      exclusivaClasseId: 1,
    },
    
    // Passivas intermediárias
    {
      id: 8,
      campanhaId: 1,
      nome: "Foco Arcano",
      descricaoCurta: "Aumenta a regeneração de mana do mago.",
      descricaoCompleta: "O mago aprende a canalizar melhor sua energia, aumentando sua regeneração de mana.",
      tipo: "Passiva",
      nivel: 3,
      habilidadeDependenciaId: 2,
      dataCriacao: "2025-03-23",
      exclusivaClasseId: 1,
    },
    {
      id: 9,
      campanhaId: 1,
      nome: "Poder das Chamas",
      descricaoCurta: "Aumenta o dano de todas as habilidades de fogo.",
      descricaoCompleta: "O mago fortalece suas habilidades de fogo, aumentando seu dano.",
      tipo: "Passiva",
      nivel: 4,
      habilidadeDependenciaId: 3,
      dataCriacao: "2025-03-23",
      exclusivaClasseId: 1,
    },
    {
      id: 10,
      campanhaId: 1,
      nome: "Impacto Arcano",
      descricaoCurta: "A Explosão Arcana pode atordoar inimigos.",
      descricaoCompleta: "Com um controle aprimorado, o mago pode usar sua explosão arcana para atordoar inimigos por um curto período.",
      tipo: "Passiva",
      nivel: 5,
      habilidadeDependenciaId: 4,
      dataCriacao: "2025-03-23",
      exclusivaClasseId: 1,
    },
    
    // Evolução Final
    {
      id: 11,
      campanhaId: 1,
      nome: "Tempestade Arcana",
      descricaoCurta: "Uma fúria mágica devasta a área ao redor do mago.",
      descricaoCompleta: "O mago libera uma tempestade mágica que causa dano massivo a todos ao seu redor.",
      tipo: "Evolução",
      nivel: 6,
      habilidadeDependenciaId: 4,
      dataCriacao: "2025-03-23",
      exclusivaClasseId: 1,
    }
  ];


  ngOnInit(): void {
    this.buildGraph();
  }


  buildGraph(): void {
    // Para cada habilidade, crie um nó
    this.nodes = this.habilidadesMago.map(hab => ({
      id: hab.id.toString(),
      label: hab.nome,
      data: hab // opcional: dados completos para usar em templates ou eventos
    }));

    // Para as habilidades que têm dependência, crie uma aresta de dependência
    this.links = this.habilidadesMago
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
