const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        AlignmentType, WidthType, BorderStyle, ShadingType, HeadingLevel } = require('docx');
const fs = require('fs');

// Configuração de bordas para tabelas
const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };

const doc = new Document({
  styles: {
    default: { 
      document: { 
        run: { font: "Arial", size: 22 } // 11pt default
      } 
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "1F4E78" },
        paragraph: { 
          spacing: { before: 240, after: 120 },
          outlineLevel: 0
        }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "2E5C8A" },
        paragraph: { 
          spacing: { before: 180, after: 100 },
          outlineLevel: 1
        }
      },
      {
        id: "SectionTitle",
        name: "Section Title",
        basedOn: "Normal",
        run: { size: 24, bold: true, font: "Arial", color: "1F4E78" },
        paragraph: { 
          spacing: { before: 200, after: 80 }
        }
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: {
          width: 12240,   // US Letter width
          height: 15840   // US Letter height
        },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } // 1 inch margins
      }
    },
    
    children: [
      // Cabeçalho com nome
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "JAMES GABRIEL BES FONTANA",
            bold: true,
            size: 36,
            font: "Arial",
            color: "1F4E78"
          })
        ]
      }),

      // Linha decorativa
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            color: "2E5C8A",
            size: 16
          })
        ]
      }),

      // Informações de Contato
      new Paragraph({
        spacing: { after: 50 },
        children: [
          new TextRun({
            text: "📍 Cafelândia - PR  |  ",
            size: 22
          }),
          new TextRun({
            text: "📱 (45) 99933-3520  |  ",
            size: 22
          }),
          new TextRun({
            text: "✉️ jamesbesfontana@outlook.com",
            size: 22
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 300 },
        children: [
          new TextRun({
            text: "💼 LinkedIn: ",
            size: 22
          }),
          new TextRun({
            text: "linkedin.com/in/james-gabriel-bes-fontana  |  ",
            size: 22,
            color: "0563C1"
          }),
          new TextRun({
            text: "💻 GitHub: ",
            size: 22
          }),
          new TextRun({
            text: "github.com/jamesgabriel8917",
            size: 22,
            color: "0563C1"
          })
        ]
      }),

      // Resumo Profissional
      new Paragraph({
        spacing: { before: 200, after: 120 },
        children: [
          new TextRun({
            text: "RESUMO PROFISSIONAL",
            bold: true,
            size: 28,
            color: "1F4E78"
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 300 },
        children: [
          new TextRun({
            text: "Desenvolvedor Python especializado em RPA com mais de 4 anos de experiência, tendo desenvolvido mais de 40 automações em produção. Experiência sólida em desenvolvimento backend com Java/Spring Boot, Node.js e tecnologias modernas. Forte vivência em desenvolvimento de APIs REST, integração com sistemas legados e bancos de dados relacionais (MySQL) e não relacionais (MongoDB). Experiência com metodologias ágeis (Scrum), CI/CD (GitLab Pipelines, GitHub Actions) e containerização com Docker.",
            size: 22
          })
        ]
      }),

      // Stack Tecnológico
      new Paragraph({
        spacing: { before: 200, after: 120 },
        children: [
          new TextRun({
            text: "STACK TECNOLÓGICO",
            bold: true,
            size: 28,
            color: "1F4E78"
          })
        ]
      }),

      // Tabela de tecnologias
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [2800, 6560],
        rows: [
          // Header
          new TableRow({
            children: [
              new TableCell({
                borders,
                shading: { fill: "1F4E78", type: ShadingType.CLEAR },
                width: { size: 2800, type: WidthType.DXA },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Nível",
                        bold: true,
                        color: "FFFFFF",
                        size: 22
                      })
                    ]
                  })
                ]
              }),
              new TableCell({
                borders,
                shading: { fill: "1F4E78", type: ShadingType.CLEAR },
                width: { size: 6560, type: WidthType.DXA },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Tecnologias",
                        bold: true,
                        color: "FFFFFF",
                        size: 22
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          // Avançado
          new TableRow({
            children: [
              new TableCell({
                borders,
                shading: { fill: "E7F3FF", type: ShadingType.CLEAR },
                width: { size: 2800, type: WidthType.DXA },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Avançado",
                        bold: true,
                        size: 22
                      })
                    ]
                  })
                ]
              }),
              new TableCell({
                borders,
                width: { size: 6560, type: WidthType.DXA },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Python, JavaScript, Flask, React, MySQL, UiPath, Git/GitHub/GitLab",
                        size: 22
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          // Intermediário
          new TableRow({
            children: [
              new TableCell({
                borders,
                shading: { fill: "E7F3FF", type: ShadingType.CLEAR },
                width: { size: 2800, type: WidthType.DXA },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Intermediário",
                        bold: true,
                        size: 22
                      })
                    ]
                  })
                ]
              }),
              new TableCell({
                borders,
                width: { size: 6560, type: WidthType.DXA },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Java, Spring Boot, Node.js, Next.js, MongoDB, Selenium, C#, JUnit, CI/CD (GitLab Pipelines, GitHub Actions)",
                        size: 22
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          // Básico
          new TableRow({
            children: [
              new TableCell({
                borders,
                shading: { fill: "E7F3FF", type: ShadingType.CLEAR },
                width: { size: 2800, type: WidthType.DXA },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Básico",
                        bold: true,
                        size: 22
                      })
                    ]
                  })
                ]
              }),
              new TableCell({
                borders,
                width: { size: 6560, type: WidthType.DXA },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Docker, Kubernetes",
                        size: 22
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }),

      new Paragraph({ spacing: { after: 50 }, children: [new TextRun("")] }),

      // Adicionar idiomas
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: "Idiomas: ",
            bold: true,
            size: 22
          }),
          new TextRun({
            text: "Português (Nativo), Inglês (Conversacional e leitura técnica)",
            size: 22
          })
        ]
      }),

      // Experiência Profissional
      new Paragraph({
        spacing: { before: 300, after: 120 },
        children: [
          new TextRun({
            text: "EXPERIÊNCIA PROFISSIONAL",
            bold: true,
            size: 28,
            color: "1F4E78"
          })
        ]
      }),

      // Sicredi
      new Paragraph({
        spacing: { after: 50 },
        children: [
          new TextRun({
            text: "Analista de Desenvolvimento de Sistemas",
            bold: true,
            size: 24,
            color: "2E5C8A"
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 50 },
        children: [
          new TextRun({
            text: "Sicredi  |  Jun/2021 - Atual",
            size: 22,
            italics: true
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 150 },
        children: [
          new TextRun({
            text: "Principais Responsabilidades e Conquistas:",
            bold: true,
            size: 22
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 80, left: 360 },
        children: [
          new TextRun({
            text: "• Desenvolveu e mantém mais de 40 automações de processos (RPA) utilizando UiPath e Python, impactando positivamente mais de 4 departamentos",
            size: 22
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 80, left: 360 },
        children: [
          new TextRun({
            text: "• Automatizou processos críticos de solicitação de crédito e contratação de produtos e serviços, liberando em média mais de 3 horas de trabalho manual por colaborador",
            size: 22
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 80, left: 360 },
        children: [
          new TextRun({
            text: "• Responsável pelo desenvolvimento de APIs REST em Java utilizando Spring Boot framework, garantindo integração eficiente entre sistemas",
            size: 22
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 80, left: 360 },
        children: [
          new TextRun({
            text: "• Gerenciamento de bases de dados MySQL e aplicações em larga escala, assegurando performance e disponibilidade dos serviços automatizados",
            size: 22
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 300, left: 360 },
        children: [
          new TextRun({
            text: "• Produziu e mantém documentação técnica completa, garantindo a operação contínua dos serviços críticos de negócio",
            size: 22
          })
        ]
      }),

      // Formação Acadêmica
      new Paragraph({
        spacing: { before: 200, after: 120 },
        children: [
          new TextRun({
            text: "FORMAÇÃO ACADÊMICA",
            bold: true,
            size: 28,
            color: "1F4E78"
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 50 },
        children: [
          new TextRun({
            text: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
            bold: true,
            size: 24
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 300 },
        children: [
          new TextRun({
            text: "Unip (Universidade Paulista) - Polo Cascavel  |  Concluído em 2020",
            size: 22,
            italics: true
          })
        ]
      }),

      // Projetos Relevantes
      new Paragraph({
        spacing: { before: 200, after: 120 },
        children: [
          new TextRun({
            text: "PROJETOS RELEVANTES",
            bold: true,
            size: 28,
            color: "1F4E78"
          })
        ]
      }),

      // DataBridge
      new Paragraph({
        spacing: { after: 50 },
        children: [
          new TextRun({
            text: "DataBridge - API REST para Armazenamento de Dados",
            bold: true,
            size: 24,
            color: "2E5C8A"
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 50 },
        children: [
          new TextRun({
            text: "GitHub: ",
            size: 22
          }),
          new TextRun({
            text: "github.com/jamesgabriel8917/FluidDataProvider",
            size: 22,
            color: "0563C1"
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 80, left: 360 },
        children: [
          new TextRun({
            text: "• Serviço backend desenvolvido em Java com Spring Boot para armazenamento e consumo de dados via API REST",
            size: 22
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 80, left: 360 },
        children: [
          new TextRun({
            text: "• Implementa autenticação JWT para segurança de endpoints",
            size: 22
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 80, left: 360 },
        children: [
          new TextRun({
            text: "• Utiliza PostgreSQL como banco de dados e Docker para containerização",
            size: 22
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 300, left: 360 },
        children: [
          new TextRun({
            text: "• Fornece interface padronizada para integração com múltiplos sistemas",
            size: 22
          })
        ]
      }),

      // Interesses e Habilidades Complementares
      new Paragraph({
        spacing: { before: 200, after: 120 },
        children: [
          new TextRun({
            text: "INTERESSES E HABILIDADES COMPLEMENTARES",
            bold: true,
            size: 28,
            color: "1F4E78"
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 80, left: 360 },
        children: [
          new TextRun({
            text: "• Hardware e IoT: Experiência com programação para Raspberry Pi e Arduino",
            size: 22
          })
        ]
      }),

      new Paragraph({
        spacing: { after: 80, left: 360 },
        children: [
          new TextRun({
            text: "• Metodologias Ágeis: Vivência prática com Scrum em ambiente corporativo",
            size: 22
          })
        ]
      }),

      new Paragraph({
        spacing: { left: 360 },
        children: [
          new TextRun({
            text: "• DevOps: Experiência com integração e entrega contínua usando GitLab Pipelines e GitHub Actions",
            size: 22
          })
        ]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/mnt/user-data/outputs/Curriculo_James_Gabriel_Fontana_Atualizado.docx", buffer);
  console.log("Currículo criado com sucesso!");
});
