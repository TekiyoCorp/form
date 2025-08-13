import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { FormConfig, FormData } from './types';

interface PDFOptions {
  title?: string;
  includeMetadata?: boolean;
  theme?: 'light' | 'dark';
}

/**
 * Génère un PDF à partir des données du formulaire
 */
export async function generateFormPDF(
  formConfig: FormConfig,
  formData: FormData,
  options: PDFOptions = {}
): Promise<Blob> {
  const { title = formConfig.title, includeMetadata = true, theme = 'light' } = options;
  
  // Créer le document PDF
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  // Configuration des styles
  const titleFontSize = 24;
  const subtitleFontSize = 16;
  const bodyFontSize = 12;
  const lineHeight = 8;
  
  let currentY = margin;
  
  // Titre principal
  pdf.setFontSize(titleFontSize);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(theme === 'dark' ? 255 : 0);
  pdf.text(title, margin, currentY);
  currentY += lineHeight * 2;
  
  // Métadonnées
  if (includeMetadata) {
    pdf.setFontSize(subtitleFontSize);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Informations du projet', margin, currentY);
    currentY += lineHeight;
    
    pdf.setFontSize(bodyFontSize);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, margin, currentY);
    currentY += lineHeight;
    pdf.text(`Total des questions: ${formConfig.slides.length}`, margin, currentY);
    currentY += lineHeight * 1.5;
  }
  
  // Contenu des réponses
  formConfig.slides.forEach((slide, index) => {
    const answer = formData[slide.id];
    
    // Vérifier si on doit passer à la page suivante
    if (currentY > pageHeight - margin - 50) {
      pdf.addPage();
      currentY = margin;
    }
    
    // Question
    pdf.setFontSize(subtitleFontSize);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(theme === 'dark' ? 255 : 0);
    pdf.text(`${index + 1}. ${slide.label}`, margin, currentY);
    currentY += lineHeight;
    
    // Réponse
    pdf.setFontSize(bodyFontSize);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(theme === 'dark' ? 200 : 50);
    
    if (answer !== undefined && answer !== null && answer !== '') {
      let answerText = '';
      
      if (Array.isArray(answer)) {
        answerText = answer.join(', ');
      } else if (typeof answer === 'boolean') {
        answerText = answer ? 'Oui' : 'Non';
      } else if (typeof answer === 'number') {
        answerText = answer.toString();
      } else {
        answerText = String(answer);
      }
      
      // Gérer le retour à la ligne automatique
      const lines = pdf.splitTextToSize(answerText, contentWidth);
      lines.forEach((line: string) => {
        pdf.text(line, margin, currentY);
        currentY += lineHeight * 0.8;
      });
    } else {
      pdf.text('Non renseigné', margin, currentY);
      currentY += lineHeight * 0.8;
    }
    
    currentY += lineHeight;
  });
  
  // Pied de page
  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(theme === 'dark' ? 150 : 100);
    pdf.text(
      `Page ${i} sur ${totalPages}`,
      pageWidth - margin - 30,
      pageHeight - 10
    );
  }
  
  return pdf.output('blob');
}

/**
 * Génère un PDF à partir d'un élément HTML
 */
export async function generateHTMLPDF(
  element: HTMLElement,
  options: PDFOptions = {}
): Promise<Blob> {
  const { title = 'Export PDF', theme = 'light' } = options;
  
  try {
    // Capturer l'élément HTML
    const canvas = await html2canvas(element, {
      scale: 2, // Haute résolution
      useCORS: true,
      allowTaint: true,
      backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
    });
    
    // Créer le PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Calculer les dimensions de l'image
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Ajouter l'image au PDF
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
    // Si l'image est plus haute qu'une page, ajouter des pages
    let heightLeft = imgHeight;
    let position = 0;
    
    while (heightLeft >= pageHeight) {
      position = heightLeft - pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    return pdf.output('blob');
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    throw new Error('Impossible de générer le PDF');
  }
}

/**
 * Télécharge un blob comme fichier
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Génère un nom de fichier pour l'export
 */
export function generateFilename(prefix: string = 'formulaire', format: 'pdf' | 'json' = 'pdf'): string {
  const date = new Date().toISOString().split('T')[0];
  const time = new Date().toTimeString().split(' ')[0].replace(/:/g, '-');
  return `${prefix}_${date}_${time}.${format}`;
}
