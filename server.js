const express = require('express');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        AlignmentType, WidthType, BorderStyle, ShadingType, HeadingLevel } = require('docx');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API endpoint to generate curriculum
app.post('/api/generate', async (req, res) => {
    try {
        const data = req.body;
        const document = createCurriculum(data);
        
        // Convert document to buffer
        const buffer = await Packer.toBuffer(document);
        
        res.json({
            success: true,
            document: buffer.toString('base64')
        });
    } catch (error) {
        console.error('Error generating curriculum:', error);
        res.json({
            success: false,
            error: error.message
        });
    }
});

// GET endpoint (sem dados) - para compatibilidade com chamadas antigas
app.get('/api/generate', async (req, res) => {
    try {
        const defaultData = {
            fullName: 'JAMES GABRIEL BES FONTANA',
            location: 'Cafelândia - PR',
            phone: '(45) 99933-3520',
            email: 'jamesbesfontana@outlook.com',
            linkedin: 'linkedin.com/in/james-gabriel-bes-fontana',
            github: 'github.com/jamesgabriel8917',
            summary: 'Desenvolvedor Python especializado em RPA com mais de 4 anos de experiência.',
            languages: 'Python, Java, JavaScript, TypeScript, SQL',
            frameworks: 'Spring Boot, Django, Node.js/Express, React',
            databases: 'MySQL, MongoDB, PostgreSQL',
            tools: 'Docker, Git, GitLab Pipelines, GitHub Actions'
        };

        const document = createCurriculum(defaultData);
        const buffer = await Packer.toBuffer(document);
        
        res.json({
            success: true,
            document: buffer.toString('base64')
        });
    } catch (error) {
        console.error('Error generating curriculum:', error);
        res.json({
            success: false,
            error: error.message
        });
    }
});

// Function to create the curriculum document
function createCurriculum(data) {
    // Configuração de bordas para tabelas
    const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
    const borders = { top: border, bottom: border, left: border, right: border };

    const children = [];

    // Cabeçalho com nome
    children.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [
                new TextRun({
                    text: data.fullName || "SEU NOME",
                    bold: true,
                    size: 36,
                    font: "Arial",
                    color: "1F4E78"
                })
            ]
        })
    );

    // Linha decorativa
    children.push(
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
        })
    );

    // Informações de Contato
    const contactInfo = [];
    if (data.location) contactInfo.push(`📍 ${data.location}`);
    if (data.phone) contactInfo.push(`📱 ${data.phone}`);
    if (data.email) contactInfo.push(`✉️ ${data.email}`);

    if (contactInfo.length > 0) {
        children.push(
            new Paragraph({
                spacing: { after: 50 },
                children: [
                    new TextRun({
                        text: contactInfo.join("  |  "),
                        size: 22
                    })
                ]
            })
        );
    }

    // Links
    const links = [];
    if (data.linkedin) links.push(`💼 ${data.linkedin}`);
    if (data.github) links.push(`💻 ${data.github}`);

    if (links.length > 0) {
        children.push(
            new Paragraph({
                spacing: { after: 300 },
                children: [
                    new TextRun({
                        text: links.join("  |  "),
                        size: 22,
                        color: "0563C1"
                    })
                ]
            })
        );
    }

    // Resumo Profissional
    if (data.summary) {
        children.push(
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
            })
        );

        children.push(
            new Paragraph({
                spacing: { after: 300 },
                children: [
                    new TextRun({
                        text: data.summary,
                        size: 22
                    })
                ]
            })
        );
    }

    // Stack Tecnológico
    const hasTechStack = data.languages || data.frameworks || data.databases || data.tools;
    if (hasTechStack) {
        children.push(
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
            })
        );

        const techRows = [];
        techRows.push(
            new TableRow({
                children: [
                    new TableCell({
                        borders,
                        shading: { fill: "1F4E78", type: ShadingType.CLEAR },
                        width: { size: 2800, type: WidthType.DXA },
                        margins: { top: 100, bottom: 100, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun({ text: "Nível", bold: true, color: "FFFFFF", size: 22 })] })]
                    }),
                    new TableCell({
                        borders,
                        shading: { fill: "1F4E78", type: ShadingType.CLEAR },
                        width: { size: 6560, type: WidthType.DXA },
                        margins: { top: 100, bottom: 100, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun({ text: "Tecnologias", bold: true, color: "FFFFFF", size: 22 })] })]
                    })
                ]
            })
        );

        const techData = [
            { level: "Linguagens", tech: data.languages },
            { level: "Frameworks", tech: data.frameworks },
            { level: "Bancos de Dados", tech: data.databases },
            { level: "DevOps/Ferramentas", tech: data.tools }
        ];

        techData.forEach((item, index) => {
            if (item.tech) {
                techRows.push(
                    new TableRow({
                        children: [
                            new TableCell({
                                borders,
                                shading: { fill: index % 2 === 0 ? "E8EEF7" : "FFFFFF", type: ShadingType.CLEAR },
                                width: { size: 2800, type: WidthType.DXA },
                                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                                children: [new Paragraph({ children: [new TextRun({ text: item.level, bold: true, size: 22 })] })]
                            }),
                            new TableCell({
                                borders,
                                shading: { fill: index % 2 === 0 ? "E8EEF7" : "FFFFFF", type: ShadingType.CLEAR },
                                width: { size: 6560, type: WidthType.DXA },
                                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                                children: [new Paragraph({ children: [new TextRun({ text: item.tech, size: 22 })] })]
                            })
                        ]
                    })
                );
            }
        });

        if (techRows.length > 1) {
            children.push(
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    columnWidths: [2800, 6560],
                    rows: techRows
                })
            );
        }
    }

    // Experiência Profissional
    if (data.experiences && data.experiences.length > 0 && data.experiences.some(e => e.title)) {
        children.push(
            new Paragraph({
                spacing: { before: 200, after: 120 },
                children: [new TextRun({ text: "EXPERIÊNCIA PROFISSIONAL", bold: true, size: 28, color: "1F4E78" })]
            })
        );

        data.experiences.forEach((exp, idx) => {
            if (exp.title) {
                const titleText = `${exp.title}${exp.company ? ' - ' + exp.company : ''}${exp.period ? ' (' + exp.period + ')' : ''}`;
                
                children.push(
                    new Paragraph({
                        spacing: { before: 100, after: 80 },
                        children: [new TextRun({ text: titleText, bold: true, size: 24, color: "2E5C8A" })]
                    })
                );

                if (exp.description) {
                    children.push(
                        new Paragraph({
                            spacing: { after: 200 },
                            children: [new TextRun({ text: exp.description, size: 22 })]
                        })
                    );
                }
            }
        });
    }

    // Formação Acadêmica
    if (data.education && data.education.length > 0 && data.education.some(e => e.course)) {
        children.push(
            new Paragraph({
                spacing: { before: 200, after: 120 },
                children: [new TextRun({ text: "FORMAÇÃO ACADÊMICA", bold: true, size: 28, color: "1F4E78" })]
            })
        );

        data.education.forEach((edu) => {
            if (edu.course) {
                const titleText = `${edu.course}${edu.institution ? ' - ' + edu.institution : ''}${edu.period ? ' (' + edu.period + ')' : ''}`;
                
                children.push(
                    new Paragraph({
                        spacing: { after: 200 },
                        children: [new TextRun({ text: titleText, bold: true, size: 24, color: "2E5C8A" })]
                    })
                );
            }
        });
    }

    // Projetos
    if (data.projects && data.projects.length > 0 && data.projects.some(p => p.name)) {
        children.push(
            new Paragraph({
                spacing: { before: 200, after: 120 },
                children: [new TextRun({ text: "PROJETOS", bold: true, size: 28, color: "1F4E78" })]
            })
        );

        data.projects.forEach((proj) => {
            if (proj.name) {
                children.push(
                    new Paragraph({
                        spacing: { before: 100, after: 80 },
                        children: [new TextRun({ text: proj.name, bold: true, size: 24, color: "2E5C8A" })]
                    })
                );

                if (proj.description) {
                    children.push(
                        new Paragraph({
                            spacing: { after: 80 },
                            children: [new TextRun({ text: proj.description, size: 22 })]
                        })
                    );
                }

                if (proj.technologies) {
                    children.push(
                        new Paragraph({
                            spacing: { after: 200 },
                            children: [new TextRun({ text: "Tecnologias: " + proj.technologies, bold: true, size: 22, color: "666666" })]
                        })
                    );
                }
            }
        });
    }

    // Idiomas
    if (data.languages_list && data.languages_list.length > 0 && data.languages_list.some(l => l.language)) {
        children.push(
            new Paragraph({
                spacing: { before: 200, after: 120 },
                children: [new TextRun({ text: "IDIOMAS", bold: true, size: 28, color: "1F4E78" })]
            })
        );

        data.languages_list.forEach((lang) => {
            if (lang.language) {
                const langText = `${lang.language}${lang.proficiency ? ' - ' + lang.proficiency : ''}`;
                children.push(
                    new Paragraph({
                        spacing: { after: 100 },
                        children: [new TextRun({ text: langText, size: 22 })]
                    })
                );
            }
        });
    }

    // Certificações
    if (data.certifications && data.certifications.length > 0 && data.certifications.some(c => c.name)) {
        children.push(
            new Paragraph({
                spacing: { before: 200, after: 120 },
                children: [new TextRun({ text: "CERTIFICAÇÕES", bold: true, size: 28, color: "1F4E78" })]
            })
        );

        data.certifications.forEach((cert) => {
            if (cert.name) {
                const certText = `${cert.name}${cert.issuer ? ' - ' + cert.issuer : ''}${cert.year ? ' (' + cert.year + ')' : ''}`;
                children.push(
                    new Paragraph({
                        spacing: { after: 100 },
                        children: [new TextRun({ text: certText, size: 22 })]
                    })
                );
            }
        });
    }

    const doc = new Document({
        styles: {
            default: { 
                document: { 
                    run: { font: "Arial", size: 22 }
                } 
            }
        },
        sections: [{
            properties: {
                page: {
                    size: {
                        width: 12240,
                        height: 15840
                    },
                    margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
                }
            },
            children: children
        }]
    });

    return doc;
}

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════╗
║   Curriculum Server Started       ║
║   http://localhost:${PORT}           ║
║                                    ║
║   Press Ctrl+C to stop            ║
╚════════════════════════════════════╝
    `);
});
