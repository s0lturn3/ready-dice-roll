import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';

import cytoscape, { Core, EventObject } from 'cytoscape';
import { SkillsService } from './skills.service';

@Component({
    selector: 'skill-tree',
    imports: [

    ],
    templateUrl: './skill-tree.component.html',
    styleUrl: './skill-tree.component.scss'
})
export class SkillTreeComponent implements OnInit, AfterViewInit, OnDestroy {

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  private _skillsService: SkillsService = inject(SkillsService);

  @ViewChild('cytoscapeContainer', { static: true }) 
  private container!: ElementRef<HTMLDivElement>;

  private cy!: Core;
  // #endregion PRIVATE

  // #region PUBLIC
  // [...]
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initializeTree();
    this.setupEventHandlers();
  }

  ngOnDestroy(): void {
    if (this.cy) {
      this.cy.destroy();
    }
  }


  // #region ==========> API METHODS <==========

  // #region GET
  // [...]
  // #endregion GET

  // #region POST
  // [...]
  // #endregion POST

  // #region PUT
  // [...]
  // #endregion PUT

  // #region DELETE
  // [...]
  // #endregion DELETE

  // #endregion ==========> API METHODS <==========


  // #region ==========> UTILS <==========
  
  // #region Inicialização
  public initializeTree() {
    this.cy = cytoscape({
      container: this.container.nativeElement,

      elements: {
        nodes: [
          // #region Passiva Inicial
          {
            data: {
              id: 'skill-1',
              label: 'Afinidade Arcana',
              originalId: 1,
              nome: 'Afinidade Arcana',
              descricaoCurta: 'Aprimora a conexão do mago com as energias arcanas.',
              descricaoCompleta: 'O mago sente as energias arcanas fluírem com mais facilidade, reduzindo custos de mana para habilidades básicas.',
              tipo: 'Passiva',
              level: 1,
              isRoot: true,
              unlockStatus: 'unlocked', // unlocked, available, locked
              campanhaId: 1,
              exclusivaClasseId: 1,
              skillCategory: 'passiva-inicial'
            }
          },
          // #endregion Passiva Inicial
          
          // #region Habilidades Principais
          {
            data: {
              id: 'skill-2',
              label: 'Orbe Arcano',
              originalId: 2,
              nome: 'Orbe Arcano',
              descricaoCurta: 'Dispara um projétil de energia arcana.',
              descricaoCompleta: 'O mago dispara um orbe de energia pura que causa dano ao atingir o inimigo.',
              tipo: 'Habilidade',
              level: 2,
              unlockStatus: 'available',
              campanhaId: 1,
              exclusivaClasseId: 1,
              skillCategory: 'habilidade-principal'
            }
          },
          {
            data: {
              id: 'skill-3',
              label: 'Chamas Místicas',
              originalId: 3,
              nome: 'Chamas Místicas',
              descricaoCurta: 'Invoca chamas arcanas que queimam o inimigo.',
              descricaoCompleta: 'O mago invoca chamas místicas que queimam o inimigo ao longo do tempo.',
              tipo: 'Habilidade',
              level: 3,
              unlockStatus: 'locked',
              campanhaId: 1,
              exclusivaClasseId: 1,
              skillCategory: 'habilidade-principal'
            }
          },
          {
            data: {
              id: 'skill-4',
              label: 'Explosão Arcana',
              originalId: 4,
              nome: 'Explosão Arcana',
              descricaoCurta: 'Libera uma explosão mágica ao redor do mago.',
              descricaoCompleta: 'O mago canaliza sua energia arcana para liberar uma explosão destrutiva em área.',
              tipo: 'Habilidade',
              level: 4,
              unlockStatus: 'locked',
              campanhaId: 1,
              exclusivaClasseId: 1,
              skillCategory: 'habilidade-principal'
            }
          },
          // #endregion Habilidades Principais
          
          // #region Melhorias
          {
            data: {
              id: 'skill-5',
              label: 'Orbe Arcano Aprimorado',
              originalId: 5,
              nome: 'Orbe Arcano Aprimorado',
              descricaoCurta: 'Aumenta o dano e a velocidade do Orbe Arcano.',
              descricaoCompleta: 'O orbe arcano se move mais rápido e causa mais dano ao atingir seu alvo.',
              tipo: 'Melhoria',
              level: 3,
              unlockStatus: 'locked',
              campanhaId: 1,
              exclusivaClasseId: 1,
              skillCategory: 'melhoria'
            }
          },
          {
            data: {
              id: 'skill-6',
              label: 'Intensificação Mística',
              originalId: 6,
              nome: 'Intensificação Mística',
              descricaoCurta: 'As Chamas Místicas agora duram mais tempo.',
              descricaoCompleta: 'O mago aprimora suas chamas, fazendo com que queimem o inimigo por mais tempo.',
              tipo: 'Melhoria',
              level: 4,
              unlockStatus: 'locked',
              campanhaId: 1,
              exclusivaClasseId: 1,
              skillCategory: 'melhoria'
            }
          },
          {
            data: {
              id: 'skill-7',
              label: 'Explosão Potencializada',
              originalId: 7,
              nome: 'Explosão Potencializada',
              descricaoCurta: 'A Explosão Arcana causa um impacto maior.',
              descricaoCompleta: 'O mago amplifica sua explosão arcana, aumentando seu raio e dano.',
              tipo: 'Melhoria',
              level: 5,
              unlockStatus: 'locked',
              campanhaId: 1,
              exclusivaClasseId: 1,
              skillCategory: 'melhoria'
            }
          },
          // #endregion Melhorias
          
          // #region Passivas Intermediárias
          {
            data: {
              id: 'skill-8',
              label: 'Foco Arcano',
              originalId: 8,
              nome: 'Foco Arcano',
              descricaoCurta: 'Aumenta a regeneração de mana do mago.',
              descricaoCompleta: 'O mago aprende a canalizar melhor sua energia, aumentando sua regeneração de mana.',
              tipo: 'Passiva',
              level: 3,
              unlockStatus: 'locked',
              campanhaId: 1,
              exclusivaClasseId: 1,
              skillCategory: 'passiva-intermediaria'
            }
          },
          {
            data: {
              id: 'skill-9',
              label: 'Poder das Chamas',
              originalId: 9,
              nome: 'Poder das Chamas',
              descricaoCurta: 'Aumenta o dano de todas as habilidades de fogo.',
              descricaoCompleta: 'O mago fortalece suas habilidades de fogo, aumentando seu dano.',
              tipo: 'Passiva',
              level: 4,
              unlockStatus: 'locked',
              campanhaId: 1,
              exclusivaClasseId: 1,
              skillCategory: 'passiva-intermediaria'
            }
          },
          {
            data: {
              id: 'skill-10',
              label: 'Impacto Arcano',
              originalId: 10,
              nome: 'Impacto Arcano',
              descricaoCurta: 'A Explosão Arcana pode atordoar inimigos.',
              descricaoCompleta: 'Com um controle aprimorado, o mago pode usar sua explosão arcana para atordoar inimigos por um curto período.',
              tipo: 'Passiva',
              level: 5,
              unlockStatus: 'locked',
              campanhaId: 1,
              exclusivaClasseId: 1,
              skillCategory: 'passiva-intermediaria'
            }
          },
          // #endregion assivas Intermediárias
          
          // #region Evolução Final
          {
            data: {
              id: 'skill-11',
              label: 'Tempestade Arcana',
              originalId: 11,
              nome: 'Tempestade Arcana',
              descricaoCurta: 'Uma fúria mágica devasta a área ao redor do mago.',
              descricaoCompleta: 'O mago libera uma tempestade mágica que causa dano massivo a todos ao seu redor.',
              tipo: 'Evolução',
              level: 6,
              unlockStatus: 'locked',
              campanhaId: 1,
              exclusivaClasseId: 1,
              skillCategory: 'evolucao-final',
              isUltimate: true
            }
          }
          // #endregion Evolução Final
        ],
        
        edges: [
          // #region Conexões principais (baseadas em habilidadeDependenciaId)
          {
            data: {
              id: 'edge-1-2',
              source: 'skill-1', // Afinidade Arcana -> Orbe Arcano
              target: 'skill-2',
              edgeType: 'prerequisito'
            }
          },
          {
            data: {
              id: 'edge-2-3',
              source: 'skill-2', // Orbe Arcano -> Chamas Místicas
              target: 'skill-3',
              edgeType: 'prerequisito'
            }
          },
          {
            data: {
              id: 'edge-3-4',
              source: 'skill-3', // Chamas Místicas -> Explosão Arcana
              target: 'skill-4',
              edgeType: 'prerequisito'
            }
          },
          // #endregion Conexões principais (baseadas em habilidadeDependenciaId)
          
          // #region Conexões para melhorias
          {
            data: {
              id: 'edge-2-5',
              source: 'skill-2', // Orbe Arcano -> Orbe Arcano Aprimorado
              target: 'skill-5',
              edgeType: 'melhoria'
            }
          },
          {
            data: {
              id: 'edge-3-6',
              source: 'skill-3', // Chamas Místicas -> Intensificação Mística
              target: 'skill-6',
              edgeType: 'melhoria'
            }
          },
          {
            data: {
              id: 'edge-4-7',
              source: 'skill-4', // Explosão Arcana -> Explosão Potencializada
              target: 'skill-7',
              edgeType: 'melhoria'
            }
          },
          // #endregion Conexões para melhorias
          
          // #region Conexões para passivas intermediárias
          {
            data: {
              id: 'edge-2-8',
              source: 'skill-2', // Orbe Arcano -> Foco Arcano
              target: 'skill-8',
              edgeType: 'passiva'
            }
          },
          {
            data: {
              id: 'edge-3-9',
              source: 'skill-3', // Chamas Místicas -> Poder das Chamas
              target: 'skill-9',
              edgeType: 'passiva'
            }
          },
          {
            data: {
              id: 'edge-4-10',
              source: 'skill-4', // Explosão Arcana -> Impacto Arcano
              target: 'skill-10',
              edgeType: 'passiva'
            }
          },
          // #endregion Conexões para passivas intermediárias
          
          // #region Conexões para evolução final (múltiplas dependências)
          {
            data: {
              id: 'edge-4-11',
              source: 'skill-4', // Explosão Arcana -> Tempestade Arcana
              target: 'skill-11',
              edgeType: 'evolucao'
            }
          },
          {
            data: {
              id: 'edge-7-11',
              source: 'skill-7', // Explosão Potencializada -> Tempestade Arcana
              target: 'skill-11',
              edgeType: 'evolucao'
            }
          },
          {
            data: {
              id: 'edge-10-11',
              source: 'skill-10', // Impacto Arcano -> Tempestade Arcana
              target: 'skill-11',
              edgeType: 'evolucao'
            }
          }
          // #endregion Conexões para evolução final (múltiplas dependências)
        ]
      },

      style: this.getStylesheet(),

      layout: {
        name: 'breadthfirst', // Ao invés de 'cose-bilkent'
        fit: true,
        padding: 30,
        animationDuration: 1000
      }
    });
  }

  private getStylesheet() {
    return [
      // Estilos para nodes
      {
        selector: 'node',
        style: {
          'width': 60,
          'height': 60,
          'label': 'data(label)',

          // TEXTO E FONTE
          'text-margin-y': 10,
          'font-family': '"Segoe UI", Arial, sans-serif',
          'color': '#FFFFFF',
          'font-size': '12px',

          'border-width': 3,
          'border-opacity': 0.8,
          'transition-property': 'background-color, border-color, opacity',
        }
      },
      
      // Skills desbloqueadas
      {
        selector: 'node[type="unlocked"]',
        style: {
          'background-color': '#4CAF50',
          'border-color': '#2E7D32',
          'opacity': 1,
          'cursor': 'grab'
        }
      },
      
      // Skills disponíveis para unlock
      {
        selector: 'node[type="available"]',
        style: {
          'background-color': '#FFC107',
          'border-color': '#F57F17',
          'opacity': 1,
          'cursor': 'pointer'
        }
      },
      
      // Skills bloqueadas
      {
        selector: 'node[type="locked"]',
        style: {
          'background-color': '#9E9E9E',
          'border-color': '#424242',
          'opacity': 0.6,
          'cursor': 'not-allowed'
        }
      },
      
      // Node selecionado
      {
        selector: 'node:selected',
        style: {
          'border-width': 5,
          'border-color': '#E91E63',
          'box-shadow': '0 0 20px #E91E63'
        }
      },
      
      // Estilos para edges
      {
        selector: 'edge',
        style: {
          'width': 3,
          'line-color': '#666',
          'target-arrow-color': '#666',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier',
          'opacity': 0.7,
          'transition-property': 'line-color, target-arrow-color, opacity',
          //'transition-duration': '0.3s'
        }
      },
      
      // Edge hover
      {
        selector: 'edge:hover',
        style: {
          'line-color': '#E91E63',
          'target-arrow-color': '#E91E63',
          'opacity': 1,
          'width': 4
        }
      }
    ];
  }
  // #endregion Inicialização

  // #region Eventos
  private setupEventHandlers(): void {
    // Click em node
    this.cy.on('tap', 'node', (event: EventObject) => {
      const node = event.target;
      const nodeData = node.data();
      
      console.log('Node clicado:', nodeData);
      this.onNodeClick(nodeData);
    });

    // Hover em node - mostrar tooltip
    this.cy.on('mouseover', 'node', (event: EventObject) => {
      const node = event.target;
      this.showTooltip(node);
    });

    this.cy.on('mouseout', 'node', () => {
      this.hideTooltip();
    });

    // Drag events
    this.cy.on('drag', 'node', (event: EventObject) => {
      const node = event.target;
      if (node.data('type') === 'locked') {
        // Cancelar drag para nodes bloqueados
        event.preventDefault();
        return false;
      }
      return true;
    });

    // Double click para unlock (se disponível)
    this.cy.on('dbltap', 'node', (event: EventObject) => {
      const node = event.target;
      const nodeUnlockStatus = node.data('unlockStatus');
      
      if (nodeUnlockStatus === 'available' || nodeUnlockStatus === 'unlocked') {
        this.unlockSkill(node);
      }
    });
  }

  // Métodos de interação
  private onNodeClick(nodeData: any): void {
    switch (nodeData.type) {
      case 'unlocked':
        console.log(`Skill ${nodeData.label} já está desbloqueada`);
        break;
      case 'available':
        console.log(`Skill ${nodeData.label} pode ser desbloqueada`);
        // Aqui você pode mostrar um modal de confirmação
        break;
      case 'locked':
        console.log(`Skill ${nodeData.label} está bloqueada`);
        break;
    }
  }

  private unlockSkill(node: any): void {
    // Atualizar dados do node
    node.data('type', 'unlocked');
    
    // Opcional: verificar e atualizar dependências
    this.checkAndUpdateDependencies(node);
    
    console.log(`Skill ${node.data('label')} desbloqueada!`);
  }

  private checkAndUpdateDependencies(unlockedNode: any): void {
    // Encontrar nodes conectados
    const connectedNodes = unlockedNode.outgoers('node');
    
    connectedNodes.forEach((node: any) => {
      // Verificar se todas as dependências estão desbloqueadas
      const predecessors = node.incomers('node');
      const allUnlocked = predecessors.every((pred: any) => 
        pred.data('type') === 'unlocked'
      );
      
      if (allUnlocked && node.data('type') === 'locked') {
        node.data('type', 'available');
      }
    });
  }


  private currentTooltip: any = null;

  private showTooltip(node: any): void {
    // Remover tooltip anterior se existir
    this.hideTooltip();
    
    const nodeData = node.data();
    
    // Criar elemento do tooltip
    let statusToShow: string = "";
    switch(nodeData.unlockStatus) {
      case 'locked':
        statusToShow = 'Bloqueada'
        break;
      case 'unlocked':
        statusToShow = 'Desbloqueada'
        break;
      case 'available':
        if (nodeData.type === 'unlocked') statusToShow = 'Desbloqueada'
        else statusToShow = 'Disponível'
        break;
    }

    const tooltipDiv = document.createElement('div');
    tooltipDiv.className = 'skill-tooltip';
    tooltipDiv.innerHTML = `
      <h4>${nodeData.label}</h4>
      <p><strong>Tipo:</strong> ${nodeData.tipo || nodeData.type || 'N/A'}</p>
      <p><strong>Level:</strong> ${nodeData.level}</p>
      <p><strong>Status:</strong> ${statusToShow}</p>
      <p><strong>Descrição:</strong> ${nodeData.descricaoCurta || 'Sem descrição'}</p>
      ${nodeData.unlockStatus === 'available' ? '<p><em>Clique duplo para desbloquear</em></p>' : ''}
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(tooltipDiv);
    
    // Usar posicionamento manual (mais confiável no Angular)
    this.positionTooltipManually(node, tooltipDiv);
    this.currentTooltip = tooltipDiv;
  }

  private positionTooltipManually(node: any, tooltipDiv: HTMLElement): void {
    const nodePosition = node.renderedPosition();
    const containerRect = this.container.nativeElement.getBoundingClientRect();
    
    // Calcular posição do tooltip
    const tooltipX = containerRect.left + nodePosition.x - tooltipDiv.offsetWidth / 3;
    const tooltipY = containerRect.top + nodePosition.y - tooltipDiv.offsetHeight - 10;
    
    // Aplicar posicionamento
    tooltipDiv.style.position = 'fixed';
    tooltipDiv.style.left = `${Math.max(5, tooltipX)}px`;
    tooltipDiv.style.top = `${Math.max(5, tooltipY)}px`;
    tooltipDiv.style.zIndex = '1001';
    tooltipDiv.style.pointerEvents = 'none';

    // Aplica estilização
    tooltipDiv.style.backgroundColor = '#999999';
    tooltipDiv.style.padding = '1rem';
    tooltipDiv.style.borderRadius = '16px';

  }

  private hideTooltip(): void {
    if (this.currentTooltip && this.currentTooltip.parentElement) {
      this.currentTooltip.parentElement.removeChild(this.currentTooltip);
      this.currentTooltip = null;
    }
    
    // Cleanup adicional - remover todos os tooltips órfãos
    document.querySelectorAll('.skill-tooltip').forEach(el => {
      el.parentElement?.removeChild(el);
    });
  }
  // #endregion Eventos


  // #region Métodos públicos para controles
  public resetZoom(): void {
    this.cy.zoom(1);
    this.cy.center();
  }

  public fitToContent(): void {
    this.cy.fit();
  }

  // public toggleLock(): void {
  //   this.isLocked = !this.isLocked;
    
  //   if (this.isLocked) {
  //     this.cy.nodes().ungrabify();
  //   } else {
  //     this.cy.nodes('[type!="locked"]').grabify();
  //   }
  // }

  // Método para adicionar nova skill
  public addSkill(skillData: any): void {
    this.cy.add({
      data: skillData
    });
    
    // Rerun layout
    this.cy.layout({ name: 'cose-bilkent' }).run();
  }

  // Método para remover skill
  public removeSkill(skillId: string): void {
    this.cy.remove(`#${skillId}`);
  }
  // #endregion Métodos públicos para controles

  // #endregion ==========> UTILS <==========

}
