const express = require('express');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        AlignmentType, WidthType, BorderStyle, ShadingType, HeadingLevel } = require('docx');

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// API endpoint to generate curriculum
app.get('/api/generate', async (req, res) => {
    try {
        const document = await createCurriculum();
        
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

// Function to create the curriculum document
async function createCurriculum() {
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

                // Placeholder para mais conteúdo
                new Paragraph({
                    text: "Curriculum Generated Successfully",
                    spacing: { after: 200 }
                })
            ]
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
