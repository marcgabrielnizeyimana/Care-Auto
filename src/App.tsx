import { useState, useEffect, ChangeEvent, DragEvent, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  Mail,
  ArrowRight,
  Clock,
  Shield,
  Check,
  AlertTriangle,
  Wrench,
  Truck,
  FileText,
  Users,
  Award,
  MapPin,
  Calendar,
  ChevronRight,
  Info,
  ExternalLink,
  Briefcase,
  ShieldCheck,
  Settings,
  X,
  Plus,
  Compass,
  MessageSquare,
  MessageCircle,
  Sparkles,
  TrendingUp,
  FileSpreadsheet,
  Instagram,
  Facebook,
  Linkedin,
  Menu
} from 'lucide-react';
import {
  navBrand,
  heroSection,
  doresSection,
  solucaoSection,
  comoFuncionaSection,
  paraQuemSection,
  diferenciaisSection,
  ctaSection,
  rodapeSection
} from './data';
import logoSigCareAuto from "./assets/logo-sig-care-auto.png";
import reboque1 from "./assets/reboque1.jpeg";
import reboque2 from "./assets/reboque2.jpeg";

// Custom Scroll Animation Section to apply dynamic blur to above/below sections
function ScrollAnimateSection({ 
  children, 
  id, 
  className = "",
  as = "section"
}: { 
  children: ReactNode; 
  id?: string; 
  className?: string; 
  as?: "section" | "footer";
}) {
  const Component = as === "footer" ? motion.footer : motion.section;
  return (
    <Component
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.12 }}
      variants={{
        hidden: { 
          opacity: 0.25, 
          filter: "blur(8px)",
          scale: 0.98,
          transition: {
            duration: 0.5,
            ease: "easeInOut"
          }
        },
        visible: {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.12
          }
        }
      }}
    >
      {children}
    </Component>
  );
}

// Child animation variants for staggered entrances within sections
const itemFadeUpVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 80, 
      damping: 16 
    } 
  }
};

const itemSlideLeftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 80, 
      damping: 16 
    } 
  }
};

const itemSlideRightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring", 
      stiffness: 80, 
      damping: 16 
    } 
  }
};

export default function App() {
  // Active reboque image index for the slideshow
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const reboqueImages = [reboque1, reboque2];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev === 0 ? 1 : 0));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Demonstration config states (to allow real-time custom testing of links and numbers)
  const [whatsappNum, setWhatsappNum] = useState("258829445678");
  const [emailAddress, setEmailAddress] = useState("careauto@opssig.com");
  const [responseTime, setResponseTime] = useState("menos de 2 horas");
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<string | null>(null);
  
  // Custom alerts for demo feedback
  const [alertMsg, setAlertMsg] = useState<string | null>(null);
  const [modalType, setModalType] = useState<'terms' | 'privacy' | null>(null);

  // Interactive Multi-Step Onboarding Form States
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Nome, setStep1Nome] = useState("");
  const [step1Empresa, setStep1Empresa] = useState("");
  const [step1Cargo, setStep1Cargo] = useState("");
  const [step1Telefone, setStep1Telefone] = useState("");
  const [step1Email, setStep1Email] = useState("");

  const [step2Perfil, setStep2Perfil] = useState("");
  const [step2QtdViaturas, setStep2QtdViaturas] = useState("");
  const [step2Composicao, setStep2Composicao] = useState("");

  const [step3Localizacao, setStep3Localizacao] = useState("");
  const [step3Operacao, setStep3Operacao] = useState("");

  const [step4Ajuda, setStep4Ajuda] = useState("");
  const [step4Desafio, setStep4Desafio] = useState("");
  const [step4Duracao, setStep4Duracao] = useState("");

  const [step5Detalhes, setStep5Detalhes] = useState("");
  const [step5Urgencia, setStep5Urgencia] = useState("");
  const [step5PossuiOrcamento, setStep5PossuiOrcamento] = useState("");

  const [step6Files, setStep6Files] = useState<Array<{ name: string; size: number }>>([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});

  const triggerAlert = (message: string) => {
    setAlertMsg(message);
    setTimeout(() => setAlertMsg(null), 4000);
  };

  const handleProfileClick = (perfilTitle: string) => {
    let formValue = "";
    const titleLower = perfilTitle.toLowerCase();
    if (titleLower.includes("família") || titleLower.includes("familias")) {
      formValue = "Família (Múltiplas Viaturas)";
    } else if (titleLower.includes("pme") || titleLower.includes("empresas")) {
      formValue = "PME (Frota Leve)";
    } else if (titleLower.includes("ong") || titleLower.includes("projectos") || titleLower.includes("ong/projectos") || titleLower.includes("ongs")) {
      formValue = "ONG / Organização";
    } else if (titleLower.includes("profissional") || titleLower.includes("empresário") || titleLower.includes("empresas")) {
      formValue = "Empresário / Profissional";
    } else {
      formValue = "Particular";
    }
    
    setStep2Perfil(formValue);
    setCurrentStep(2);
    triggerAlert(`Perfil "${formValue}" selecionado! Preencha os campos do Passo 2 e prossiga.`);
    
    // Smooth scroll to form section
    document.getElementById("form-onboarding")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const validateStep = (stepNum: number) => {
    const errors: Record<string, boolean> = {};
    if (stepNum === 1) {
      if (!step1Nome.trim()) errors.step1Nome = true;
      if (!step1Empresa.trim()) errors.step1Empresa = true;
      if (!step1Telefone.trim()) errors.step1Telefone = true;
      if (!step1Email.trim()) errors.step1Email = true;
    } else if (stepNum === 2) {
      if (!step2Perfil || step2Perfil === "Selecionar opção") errors.step2Perfil = true;
      if (step2Perfil === "PME (Frota Leve)" || step2Perfil === "ONG / Organização") {
        if (!step2QtdViaturas || step2QtdViaturas === "Selecionar opção") errors.step2QtdViaturas = true;
        if (!step2Composicao || step2Composicao === "Selecionar opção") errors.step2Composicao = true;
      }
    } else if (stepNum === 3) {
      if (!step3Localizacao || step3Localizacao === "Selecionar opção") errors.step3Localizacao = true;
      if (!step3Operacao || step3Operacao === "Selecionar opção") errors.step3Operacao = true;
    } else if (stepNum === 4) {
      if (!step4Ajuda || step4Ajuda === "Selecionar opção") errors.step4Ajuda = true;
      if (!step4Desafio || step4Desafio === "Selecionar opção") errors.step4Desafio = true;
      if (!step4Duracao || step4Duracao === "Selecionar opção") errors.step4Duracao = true;
    } else if (stepNum === 5) {
      if (!step5Detalhes.trim()) errors.step5Detalhes = true;
      if (!step5Urgencia || step5Urgencia === "Selecionar opção") errors.step5Urgencia = true;
      if (!step5PossuiOrcamento || step5PossuiOrcamento === "Selecionar opção") errors.step5PossuiOrcamento = true;
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
      // Smooth scroll back to form container header when changing step
      document.getElementById("form-onboarding")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      triggerAlert("Por favor preencha todos os campos obrigatórios marcados a vermelho antes de avançar.");
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    document.getElementById("form-onboarding")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const allowedExtensions = ["pdf", "jpg", "jpeg", "png", "docx"];
      const newFiles: Array<{ name: string; size: number }> = [];
      const filesArray = Array.from(e.target.files) as File[];
      
      for (const file of filesArray) {
        const extension = file.name.split(".").pop()?.toLowerCase();
        if (!extension || !allowedExtensions.includes(extension)) {
          triggerAlert(`Extensão do ficheiro ${file.name} não é permitida. Apenas PDF, JPG, JPEG, PNG, DOCX.`);
          continue;
        }
        if (file.size > 15 * 1024 * 1024) {
          triggerAlert(`Ficheiro ${file.name} ultrapassa o limite de 15 MB.`);
          continue;
        }
        newFiles.push({ name: file.name, size: file.size });
      }
      
      if (newFiles.length > 0) {
        setStep6Files((prev) => [...prev, ...newFiles]);
        triggerAlert(`${newFiles.length} ficheiro(s) adicionado(s) com sucesso.`);
      }
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const allowedExtensions = ["pdf", "jpg", "jpeg", "png", "docx"];
      const newFiles: Array<{ name: string; size: number }> = [];
      const filesArray = Array.from(e.dataTransfer.files) as File[];
      
      for (const file of filesArray) {
        const extension = file.name.split(".").pop()?.toLowerCase();
        if (!extension || !allowedExtensions.includes(extension)) {
          triggerAlert(`Extensão do ficheiro ${file.name} não é permitida. Apenas PDF, JPG, JPEG, PNG, DOCX.`);
          continue;
        }
        if (file.size > 15 * 1024 * 1024) {
          triggerAlert(`Ficheiro ${file.name} ultrapassa o limite de 15 MB.`);
          continue;
        }
        newFiles.push({ name: file.name, size: file.size });
      }
      
      if (newFiles.length > 0) {
        setStep6Files((prev) => [...prev, ...newFiles]);
        triggerAlert(`${newFiles.length} ficheiro(s) adicionado(s) com sucesso.`);
      }
    }
  };

  const handleFormSubmission = (method: "whatsapp" | "email") => {
    const fileList = step6Files.map((f) => f.name).join(", ") || "Nenhum";
    
    const details = `📋 FORMULÁRIO DE GESTÃO AUTOMÓVEL - SIG CARE AUTO 📋\n\n` +
      `*PASSO 1: IDENTIFICAÇÃO E CONTACTO*\n` +
      `- Nome Completo: ${step1Nome}\n` +
      `- Empresa / Organização: ${step1Empresa}\n` +
      `- Cargo: ${step1Cargo || "Não especificado"}\n` +
      `- Telefone: ${step1Telefone}\n` +
      `- Email Corporativo: ${step1Email}\n\n` +
      `*PASSO 2: PERFIL E DIMENSÃO DA FROTA*\n` +
      `- Perfil de utilizaçao: ${step2Perfil}\n` +
      (step2Perfil === "PME (Frota Leve)" || step2Perfil === "ONG / Organização" ? 
        `- Quantidade de viaturas: ${step2QtdViaturas}\n- Composição predominante: ${step2Composicao}\n` : "") + `\n` +
      `*PASSO 3: LOCALIZAÇÃO E OPERAÇÃO*\n` +
      `- Localização principal: ${step3Localizacao}\n` +
      `- Ambiente de operação: ${step3Operacao}\n\n` +
      `*PASSO 4: NECESSIDADES E DESAFIOS*\n` +
      `- Principal necessidade: ${step4Ajuda}\n` +
      `- Maior desafio enfrentado: ${step4Desafio}\n` +
      `- Tipo de parceria: ${step4Duracao}\n\n` +
      `*PASSO 5: INFORMAÇÕES TÉCNICAS*\n` +
      `- Detalhes das viaturas: ${step5Detalhes}\n` +
      `- Grau de urgência: ${step5Urgencia}\n` +
      `- Possui orçamento/diagnóstico anterior: ${step5PossuiOrcamento}\n\n` +
      `*PASSO 6: ANEXOS*\n` +
      `- Ficheiros adicionais: ${fileList}\n\n` +
      `Enviado via Website SIG Care Auto`;

    if (method === "whatsapp") {
      const whatsappLink = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(details)}`;
      window.open(whatsappLink, "_blank");
    } else {
      const subject = `Inscrição SIG Care Auto - ${step1Nome}`;
      const emailLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(details)}`;
      window.open(emailLink, "_blank");
    }

    setIsFormSubmitted(true);
  };

  // Build exact WhatsApp link for a given package
  const getPlanWhatsAppLink = (planName: string) => {
    const formattedText = encodeURIComponent(`Olá, gostaria de saber mais informações sobre os serviços da SIG Care Auto para o pacote: ${planName}.`);
    return `https://wa.me/${whatsappNum}?text=${formattedText}`;
  };

  // Build exact WhatsApp link for general CTA
  const getGeneralWhatsAppLink = () => {
    return `https://wa.me/${whatsappNum}?text=Olá%2C+gostaria+de+saber+mais+sobre+os+serviços+da+SIG+Care+Auto`;
  };

  return (
    <div className="relative min-h-screen bg-white text-brand-dark-navy antialiased selection:bg-brand-electric selection:text-white">
      
      {/* Dynamic Demo Feedback Toast */}
      <AnimatePresence>
        {alertMsg && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-brand-navy border border-brand-electric/30 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md"
          >
            <div className="h-2 w-2 rounded-full bg-brand-success animate-ping" />
            <span className="text-sm font-medium">{alertMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clear Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-150 transition-all font-sans">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="brand-container">
              <img
                src={logoSigCareAuto}
                alt="SIG Care Auto"
                className="sig-logo"
                referrerPolicy="no-referrer"
              />

              <div className="brand-text">
                <span className="brand-title">
                  SIG Care Auto
                </span>

                <span className="brand-subtitle">
                  Gestão Automóvel Profissional
                </span>
              </div>
            </div>
          </a>

          {/* Quick Nav Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-7">
            <a href="#dores" className="text-sm font-medium text-brand-slate hover:text-brand-navy transition-colors">Reconheces-te Aqui?</a>
            <a href="#solucao" className="text-sm font-medium text-brand-slate hover:text-brand-navy transition-colors">Nossos Pilares</a>
            <a href="#ComoFunciona" className="text-sm font-medium text-brand-slate hover:text-brand-navy transition-colors">Como Funciona</a>
            <a href="#paraQuem" className="text-sm font-medium text-brand-slate hover:text-brand-navy transition-colors">Para Quem</a>
            <a href="#diferenciais" className="text-sm font-medium text-brand-slate hover:text-brand-navy transition-colors">Diferenciais</a>
            <a href="#form-onboarding" className="text-sm font-medium text-brand-slate hover:text-brand-navy transition-colors">Contacto</a>
          </nav>

          {/* Right Action Button - Desktop only */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`https://wa.me/${whatsappNum}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-electric text-white hover:bg-brand-navy transition-all px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-brand-electric/15 hover:shadow-none"
            >
              <Phone className="w-4 h-4" />
              <span>Falar Connosco</span>
            </a>
          </div>

          {/* Mobile & Tablet Dropdown Navigation Button */}
          <div className="lg:hidden relative">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-brand-navy hover:text-brand-electric focus:outline-none transition-colors duration-200 cursor-pointer flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7 stroke-[2.5]" />
              ) : (
                <Menu className="w-7 h-7 stroke-[2.5]" />
              )}
            </button>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-150 py-3 z-50 flex flex-col overflow-hidden text-brand-navy"
                >
                  <a
                    href="#dores"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-5 py-3.5 text-sm font-semibold text-brand-slate hover:text-brand-navy hover:bg-gray-50 transition-all flex items-center justify-between"
                  >
                    <span>Reconheces-te Aqui?</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </a>
                  <a
                    href="#solucao"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-5 py-3.5 text-sm font-semibold text-brand-slate hover:text-brand-navy hover:bg-gray-50 transition-all flex items-center justify-between border-t border-gray-100"
                  >
                    <span>Nossos Pilares</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </a>
                  <a
                    href="#ComoFunciona"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-5 py-3.5 text-sm font-semibold text-brand-slate hover:text-brand-navy hover:bg-gray-50 transition-all flex items-center justify-between border-t border-gray-100"
                  >
                    <span>Como Funciona</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </a>
                  <a
                    href="#paraQuem"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-5 py-3.5 text-sm font-semibold text-brand-slate hover:text-brand-navy hover:bg-gray-50 transition-all flex items-center justify-between border-t border-gray-100"
                  >
                    <span>Para Quem</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </a>
                  <a
                    href="#diferenciais"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-5 py-3.5 text-sm font-semibold text-brand-slate hover:text-brand-navy hover:bg-gray-50 transition-all flex items-center justify-between border-t border-gray-100"
                  >
                    <span>Diferenciais</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </a>
                  <a
                    href="#form-onboarding"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-5 py-3.5 text-sm font-semibold text-brand-slate hover:text-brand-navy hover:bg-gray-50 transition-all flex items-center justify-between border-t border-gray-100"
                  >
                    <span>Contacto</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </a>
                  
                  <div className="p-4 border-t border-gray-150 bg-gray-50/50">
                    <a
                      href={`https://wa.me/${whatsappNum}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full bg-brand-electric text-white text-center py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-electric/15 hover:bg-brand-navy transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Falar Connosco</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* HERO SECTION / PRIMEIRA DOBRA */}
      <ScrollAnimateSection className="relative overflow-hidden bg-gradient-to-b from-brand-cold-gray via-white to-white pt-16 pb-24 md:py-32 font-sans border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <motion.div variants={itemSlideLeftVariants} className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-brand-corp/5 border border-brand-corp/10 rounded-full px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-electric animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-corp">{heroSection.eyebrow}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy tracking-tight leading-tight">
              {heroSection.title_part1}
              <span className="text-brand-electric block bg-gradient-to-r from-brand-electric to-brand-corp bg-clip-text text-transparent mt-2">
                {heroSection.title_highlight}
              </span>
            </h1>

            <p className="text-lg text-brand-slate leading-relaxed max-w-xl">
              {heroSection.subtitle}
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <a
                href={getGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-electric hover:bg-brand-navy text-white text-base font-bold px-8 py-4 rounded-xl shadow-xl shadow-brand-electric/25 transition-all flex items-center justify-center gap-3 group text-center"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>{heroSection.ctaWhatsApp}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={`mailto:${emailAddress}`}
                className="bg-white border border-gray-300 hover:border-brand-navy hover:bg-brand-cold-gray text-brand-navy font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-3 text-center"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>{heroSection.ctaEmail}</span>
              </a>
            </div>

            {/* Linhas de Confiança */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 pt-6 border-t border-gray-200/60 mt-8">
              {heroSection.trustLines.map((line, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-brand-success/10 flex items-center justify-center text-brand-success">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-sm font-bold text-brand-dark-navy">{line}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero Right Visual Column - Full Image Slideshow Container */}
          <motion.div variants={itemSlideRightVariants} className="lg:col-span-5 flex items-center justify-center">
            <div className="relative bg-white border border-gray-100 rounded-3xl p-4 shadow-2xl w-full h-[450px]">
              {/* Slideshow of Towing / Reboque Images taking the whole space of the card */}
              <div className="relative w-full h-full overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    src={reboqueImages[activeImageIndex]}
                    alt="Serviço de Reboque SIG Care Auto"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                  />
                </AnimatePresence>

                {/* Subtle Dots Indicator */}
                <div className="absolute bottom-4 right-4 flex gap-1.5 bg-brand-navy/60 backdrop-blur-md px-3 py-2 rounded-full z-10 border border-white/10">
                  <div className={`h-1.5 rounded-full transition-all duration-300 ${activeImageIndex === 0 ? 'bg-brand-electric w-4' : 'bg-white/50 w-1.5'}`} />
                  <div className={`h-1.5 rounded-full transition-all duration-300 ${activeImageIndex === 1 ? 'bg-brand-electric w-4' : 'bg-white/50 w-1.5'}`} />
                </div>

                {/* Operational tag overlay */}
                <div className="absolute top-4 left-4 bg-brand-navy/90 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-2 rounded-lg shadow-sm z-10 flex items-center gap-2 border border-white/10">
                  <span className="h-2 w-2 rounded-full bg-brand-electric animate-pulse" />
                  Operação Ativa
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </ScrollAnimateSection>

      {/* IMPORTANT CLARIFICATION BANNER - POSITIONING SIG AS OPERATIONS AND NOT AN AUTO SHOP */}
      <ScrollAnimateSection className="bg-brand-navy text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-corp/30 opacity-50" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div variants={itemFadeUpVariants} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="p-4 bg-brand-electric/20 text-brand-electric rounded-xl flex-shrink-0 animate-pulse">
              <Info className="w-8 h-8 stroke-[2.5]" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#00E5FF] font-mono">POSICIONAMENTO DE MARCA</span>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight">A SIG Care Auto NÃO é uma oficina mecânica.</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Somos um <strong>serviço independente de gestão operacional e concierge automóvel</strong>. Nós defendemos os teus interesses: coordenamos oficinas certificadas, gerimos o procurement de peças originais, auditamos orçamentos de fornecedores e gerimos todo o processo administrativo e logístico em teu nome. A nossa lealdade é exclusivamente contigo.
              </p>
            </div>
          </motion.div>
        </div>
      </ScrollAnimateSection>

      {/* 02 DORES - "Já passou por alguma destas situações?" */}
      <ScrollAnimateSection id="dores" className="py-24 bg-brand-cold-gray space-y-16 font-sans">
        <motion.div variants={itemFadeUpVariants} className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-electric font-mono">RECONHECES-TE AQUI?</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            {doresSection.title}
          </h2>
          <p className="text-lg text-brand-slate max-w-2xl mx-auto leading-relaxed">
            {doresSection.subtitle}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doresSection.items.map((dor, i) => (
            <motion.div 
              key={dor.id}
              variants={itemFadeUpVariants}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-12 w-12 rounded-xl bg-brand-corp/5 text-brand-electric flex items-center justify-center">
                    {dor.icon === 'Clock' && <Clock className="w-6 h-6 stroke-[1.75] flex-shrink-0" />}
                    {dor.icon === 'MapPin' && <MapPin className="w-6 h-6 stroke-[1.75] flex-shrink-0" />}
                    {dor.icon === 'Users' && <Users className="w-6 h-6 stroke-[1.75] flex-shrink-0" />}
                    {dor.icon === 'Shield' && <Shield className="w-6 h-6 stroke-[1.75] flex-shrink-0" />}
                    {dor.icon === 'FileText' && <FileText className="w-6 h-6 stroke-[1.75] flex-shrink-0" />}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-brand-navy leading-snug group-hover:text-brand-electric transition-colors min-h-[56px] flex items-center">
                  {dor.title}
                </h3>
                <p className="text-sm text-brand-slate leading-relaxed">
                  {dor.text}
                </p>
              </div>
              {dor.footerText && (
                <div className="pt-4 border-t border-gray-100 mt-6 flex items-center text-xs font-bold text-brand-corp group-hover:text-brand-electric transition-colors tracking-wider uppercase font-mono">
                  <span>{dor.footerText}</span>
                </div>
              )}
            </motion.div>
          ))}


        </div>
      </ScrollAnimateSection>

      {/* 03 SOLUÇÃO - "Foca-te no que só tu podes fazer" */}
      <ScrollAnimateSection 
        id="solucao" 
        className="py-24 bg-white font-sans border-b border-gray-100"
      >
        <motion.div variants={itemFadeUpVariants} className="max-w-4xl mx-auto px-6 text-center space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-electric font-mono">OS NOSSOS PILARES</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            {solucaoSection.title}
          </h2>
          <p className="text-lg text-brand-slate max-w-2xl mx-auto leading-relaxed">
            {solucaoSection.subtitle}
          </p>
        </motion.div>

        {/* Content of Solucoes Section (Quote + Pillars) */}
        <div className="block">
          {/* Corporate Quote block */}
          <motion.div variants={itemFadeUpVariants} className="max-w-4xl mx-auto px-6 mb-20">
            <div className="relative bg-brand-cold-gray/70 border border-gray-200 rounded-3xl p-8 sm:p-12 text-center shadow-md">
              <span className="absolute top-4 left-6 text-7xl text-brand-electric/15 font-serif select-none pointer-events-none">“</span>
              <p className="text-lg sm:text-xl font-medium text-brand-navy leading-relaxed relative z-10 italic">
                {solucaoSection.citacao}
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="h-0.5 w-6 bg-brand-electric" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">{solucaoSection.signature}</span>
                <div className="h-0.5 w-6 bg-brand-electric" />
              </div>
            </div>
          </motion.div>

          {/* Solution Pillars Blocks Grid */}
          <div className="max-w-7xl mx-auto px-6 space-y-8">
            <motion.div variants={itemFadeUpVariants} className="text-center">
              <h3 className="text-2xl font-bold text-brand-navy mb-2">Os Quatro Pilares Operacionais da SIG</h3>
              <p className="text-sm text-brand-slate">Garantimos supervisão constante e rastreabilidade processual</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {solucaoSection.pilares.map((pilar, index) => {
                // Determine proper icon based on index
                const icons = [Clock, Shield, FileText, Truck];
                const PilarIcon = icons[index % icons.length];

                return (
                  <motion.div 
                    key={pilar.id}
                    variants={itemFadeUpVariants}
                    className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="h-12 w-12 rounded-xl bg-brand-corp/5 text-brand-electric flex items-center justify-center">
                        <PilarIcon className="w-6 h-6 stroke-[1.75]" />
                      </div>
                      <h4 className="text-base font-bold text-brand-navy">
                        {pilar.title}
                      </h4>
                      <p className="text-sm text-brand-slate leading-relaxed">
                        {pilar.text}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-gray-100 mt-6 flex items-center justify-between text-xs font-bold text-brand-corp">
                      <span>{pilar.footerText || "PILAR ESTÁVEL"}</span>
                      <span className="text-brand-electric font-mono">0{index + 1}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollAnimateSection>

      {/* 04 COMO FUNCIONA - 4 PASSO PROGRESSÃO VISUAL */}
      <ScrollAnimateSection id="ComoFunciona" className="py-24 bg-brand-cold-gray/40 font-sans border-b border-gray-100">
        <motion.div variants={itemFadeUpVariants} className="max-w-4xl mx-auto px-6 text-center space-y-4 mb-20">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-electric font-mono">O PROCESSO</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            {comoFuncionaSection.title}
          </h2>
          <p className="text-lg text-brand-slate max-w-2xl mx-auto leading-relaxed">
            {comoFuncionaSection.subtitle}
          </p>
        </motion.div>

        {/* Technical Process Timelines cards */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {comoFuncionaSection.steps.map((p, i) => (
              <motion.div 
                key={p.step} 
                variants={itemFadeUpVariants}
                className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-brand-electric group"
              >
                {/* Visual Step Number Badge */}
                <div className="absolute -top-5 left-6 bg-brand-electric text-white font-mono font-bold text-sm tracking-widest rounded-full h-10 w-10 flex items-center justify-center shadow-lg shadow-brand-electric/25">
                  0{p.step}
                </div>

                <div className="pt-4 space-y-3">
                  <h3 className="text-lg font-bold text-brand-navy">{p.title}</h3>
                  <p className="text-xs text-brand-slate leading-relaxed">{p.text}</p>
                </div>

                {/* Card Indicator Footer */}
                <div className="pt-4 border-t border-gray-50 mt-4 flex items-center justify-end text-[10px] uppercase font-bold tracking-widest text-brand-corp">
                  <span className="h-2 w-2 rounded-full bg-brand-success" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Info Box beneath working */}
          <motion.div variants={itemFadeUpVariants} className="max-w-3xl mx-auto mt-12 bg-white border border-gray-200/60 p-4 rounded-xl flex items-center gap-3 shadow-sm justify-center">
            <Info className="w-5 h-5 text-brand-electric flex-shrink-0" />
            <p className="text-xs font-medium text-brand-slate">
              Não tomas decisões às cegas. Cada relatório, cotação e avanço é comunicado via WhatsApp ou Email corporativo.
            </p>
          </motion.div>
        </div>
      </ScrollAnimateSection>

      {/* 05 PARA QUEM - PERFIS DE CLIENTES */}
      <ScrollAnimateSection id="paraQuem" className="py-24 bg-white font-sans border-b border-gray-100">
        <motion.div variants={itemFadeUpVariants} className="max-w-4xl mx-auto px-6 text-center space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-electric font-mono">PÚBLICO-ALVO</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            {paraQuemSection.title}
          </h2>
          <p className="text-lg text-brand-slate max-w-2xl mx-auto leading-relaxed">
            {paraQuemSection.subtitle}
          </p>
        </motion.div>

        {/* 4 Segmented customer profile cards */}
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {paraQuemSection.perfis.map((perfil) => (
            <motion.button 
              key={perfil.id}
              variants={itemFadeUpVariants}
              onClick={() => handleProfileClick(perfil.title)}
              className={`text-left border rounded-3xl p-8 shadow-sm transition-all duration-300 relative overflow-hidden flex flex-col justify-between cursor-pointer w-full group ${
                perfil.isMain 
                  ? 'bg-brand-navy text-white border-brand-corp shadow-2xl shadow-brand-navy/10 md:scale-[1.02] z-10 hover:shadow-brand-navy/30 hover:-translate-y-1 hover:border-brand-electric hover:brightness-110' 
                  : 'bg-brand-cold-gray text-brand-dark-navy border-gray-200 hover:shadow-xl hover:-translate-y-1 hover:border-brand-electric hover:bg-white'
              }`}
            >
              <div className="space-y-4 relative z-10 w-full">
                {/* Visual Premium Tag Badge */}
                <div className="flex items-center justify-between w-full">
                  <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                    perfil.isMain 
                      ? 'bg-brand-electric text-white' 
                      : 'bg-brand-navy/10 text-brand-navy'
                  }`}>
                    {perfil.tag}
                  </span>
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${perfil.isMain ? 'bg-white/10 text-brand-electric' : 'bg-brand-navy/5 text-brand-slate'}`}>
                    <Users className="w-4 h-4" />
                  </div>
                </div>

                <h3 className={`text-xl font-bold tracking-tight ${perfil.isMain ? 'text-white' : 'text-brand-navy group-hover:text-brand-electric transition-colors'}`}>
                  {perfil.title}
                </h3>
                <p className={`text-sm leading-relaxed ${perfil.isMain ? 'text-gray-300' : 'text-brand-slate'}`}>
                  {perfil.text}
                </p>
              </div>

              <div className={`mt-8 pt-4 border-t w-full flex items-center justify-between text-xs ${perfil.isMain ? 'border-white/10' : 'border-gray-200'}`}>
                <span className={perfil.isMain ? 'text-gray-400 font-mono' : 'text-gray-500 font-mono'}>SEGMENTAÇÃO ESTABELECIDA</span>
                <span className="flex items-center gap-1 font-semibold text-brand-electric">
                  Fazer Consulta
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </ScrollAnimateSection>

      {/* 07 PORQUÊ A SIG - DIFERENCIAIS */}
      <ScrollAnimateSection id="diferenciais" className="py-24 bg-white font-sans border-b border-gray-100">
        <motion.div variants={itemFadeUpVariants} className="max-w-4xl mx-auto px-6 text-center space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-electric font-mono">DIFERENCIAL</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            {diferenciaisSection.title}
          </h2>
          <p className="text-lg text-brand-slate max-w-2xl mx-auto leading-relaxed">
            {diferenciaisSection.subtitle}
          </p>
        </motion.div>

        {/* 6 differentiators container */}
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diferenciaisSection.items.map((dif, idx) => (
            <motion.div 
              key={dif.id} 
              variants={itemFadeUpVariants}
              className="relative bg-brand-cold-gray border border-gray-200 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-brand-electric hover:bg-white group"
            >
              <div className="space-y-4">
                <div className="h-10 w-10 bg-brand-navy/5 text-brand-electric rounded-xl flex items-center justify-center font-bold text-sm">
                  D0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-brand-navy">{dif.title}</h3>
                <p className="text-xs text-brand-slate leading-relaxed">{dif.text}</p>
              </div>
              
              <div className="mt-6 pt-3 border-t border-gray-200/60 text-[9px] font-mono tracking-widest uppercase text-brand-slate block">
                VALOR GARANTIDO
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollAnimateSection>

      {/* 08 FORM ONBOARDING - "Inicie a Gestão do seu Carro em 1 Minuto" */}
      <ScrollAnimateSection id="form-onboarding" className="py-24 bg-brand-navy text-white relative overflow-hidden font-sans border-b border-brand-corp/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,102,255,0.1),transparent_50%)]" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-12 animate-fade-in">
          
          {/* Header */}
          <motion.div variants={itemFadeUpVariants} className="text-center space-y-4">
            <h2 className="text-3.5xl sm:text-4.5xl font-extrabold tracking-tight">
              Inicie a Gestão do seu Carro em 1 Minuto
            </h2>
            <p className="text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Responda às perguntas rápidas e o nosso Gestor dedicado entrará em contacto com uma auditoria e proposta sob medida para si ou para a sua frota.
            </p>
          </motion.div>

          {!isFormSubmitted ? (
            <motion.div variants={itemFadeUpVariants} className="bg-brand-dark-navy/95 border border-brand-corp/50 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 backdrop-blur-md">
              
              {/* PROGRESS BAR WITH STEP INDICATORS */}
              <div className="space-y-4">
                {/* Horizontal Progress bar */}
                <div className="relative w-full h-2 bg-brand-corp/30 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-brand-electric rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(currentStep / 6) * 100}%` }}
                  />
                </div>

                {/* Desktop Step Badges */}
                <div className="hidden md:grid grid-cols-6 gap-2 text-center text-xs">
                  {[
                    { number: 1, label: "Identificação" },
                    { number: 2, label: "Perfil & Frota" },
                    { number: 3, label: "Localização" },
                    { number: 4, label: "Necessidades" },
                    { number: 5, label: "Informações" },
                    { number: 6, label: "Anexos" }
                  ].map((s) => {
                    const isActive = currentStep === s.number;
                    const isCompleted = currentStep > s.number;
                    return (
                      <div 
                        key={s.number} 
                        onClick={() => {
                          // Allow navigation back to completed steps
                          if (isCompleted || s.number === 1) {
                            setCurrentStep(s.number);
                          }
                        }}
                        className={`space-y-2 cursor-pointer transition-colors ${isCompleted ? 'text-brand-electric' : isActive ? 'text-white' : 'text-gray-500'}`}
                      >
                        <div className="flex items-center justify-center">
                          <span className={`h-7 w-7 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                            isCompleted 
                              ? 'bg-brand-electric border-brand-electric text-white' 
                              : isActive 
                                ? 'border-brand-electric bg-brand-navy shadow-lg shadow-brand-electric/35 scale-110 text-white' 
                                : 'border-gray-600 bg-transparent text-gray-500'
                          }`}>
                            {isCompleted ? "✓" : s.number}
                          </span>
                        </div>
                        <p className={`font-mono text-[11px] uppercase tracking-wider font-semibold`}>
                          {s.label}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile progress label */}
                <div className="md:hidden flex items-center justify-between text-xs font-mono text-gray-400">
                  <span className="font-bold text-brand-electric uppercase">Passo {currentStep} de 6</span>
                  <span className="font-medium">
                    {currentStep === 1 && "Identificação e Contacto"}
                    {currentStep === 2 && "Perfil e Dimensão da Frota"}
                    {currentStep === 3 && "Localização e Operação"}
                    {currentStep === 4 && "Necessidades e Desafios"}
                    {currentStep === 5 && "Informações Técnicas"}
                    {currentStep === 6 && "Anexos Opcionais"}
                  </span>
                </div>
              </div>

              {/* STEP CONTENT PANELS */}
              <div className="pt-2 min-h-[300px]">
                
                {/* PASSO 1 – IDENTIFICAÇÃO E CONTACTO */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">Passo 1: Identificação e Contacto</h3>
                      <p className="text-xs text-gray-400">Insira os seus dados básicos corporativos ou particulares para início de registo.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Nome Completo */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                          Nome Completo <span className="text-brand-electric">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={step1Nome}
                          onChange={(e) => {
                            setStep1Nome(e.target.value);
                            if (formErrors.step1Nome) setFormErrors(prev => ({ ...prev, step1Nome: false }));
                          }}
                          className={`w-full bg-brand-navy/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-electric transition-colors ${
                            formErrors.step1Nome ? "border-red-500 focus:border-red-500 bg-red-500/5 shadow-inner" : "border-brand-corp/50"
                          }`}
                          placeholder="Ex: João Tembe"
                        />
                      </div>

                      {/* Nome da Empresa / Organização */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                          Nome da Empresa / Organização <span className="text-brand-electric">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={step1Empresa}
                          onChange={(e) => {
                            setStep1Empresa(e.target.value);
                            if (formErrors.step1Empresa) setFormErrors(prev => ({ ...prev, step1Empresa: false }));
                          }}
                          className={`w-full bg-brand-navy/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-electric transition-colors ${
                            formErrors.step1Empresa ? "border-red-500 focus:border-red-500 bg-red-500/5 shadow-inner" : "border-brand-corp/50"
                          }`}
                          placeholder="Ex: ABC Logistics"
                        />
                      </div>

                      {/* Cargo (Opcional) */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                          Cargo (Opcional)
                        </label>
                        <select
                          value={step1Cargo}
                          onChange={(e) => setStep1Cargo(e.target.value)}
                          className="w-full bg-brand-navy border border-brand-corp/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-electric cursor-pointer"
                        >
                          <option value="">Selecionar opção</option>
                          <option value="Director">Director</option>
                          <option value="Gestor de Frota">Gestor de Frota</option>
                          <option value="Administrador">Administrador</option>
                          <option value="Compras">Compras</option>
                          <option value="Outro">Outro</option>
                        </select>
                      </div>

                      {/* Telefone / WhatsApp */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                          Telefone / WhatsApp <span className="text-brand-electric">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={step1Telefone}
                          onChange={(e) => {
                            setStep1Telefone(e.target.value);
                            if (formErrors.step1Telefone) setFormErrors(prev => ({ ...prev, step1Telefone: false }));
                          }}
                          className={`w-full bg-brand-navy/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-electric transition-colors ${
                            formErrors.step1Telefone ? "border-red-500 focus:border-red-500 bg-red-500/5 shadow-inner" : "border-brand-corp/50"
                          }`}
                          placeholder="+258 84 900 0000"
                        />
                      </div>

                      {/* Email Corporativo */}
                      <div className="space-y-2 md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                          Email Corporativo <span className="text-brand-electric">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={step1Email}
                          onChange={(e) => {
                            setStep1Email(e.target.value);
                            if (formErrors.step1Email) setFormErrors(prev => ({ ...prev, step1Email: false }));
                          }}
                          className={`w-full bg-brand-navy/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-electric transition-colors ${
                            formErrors.step1Email ? "border-red-500 focus:border-red-500 bg-red-500/5 shadow-inner" : "border-brand-corp/50"
                          }`}
                          placeholder="joao.tembe@empresa.com"
                        />
                      </div>

                    </div>
                  </div>
                )}

                {/* PASSO 2 – PERFIL E DIMENSÃO DA FROTA */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">Passo 2: Perfil e Dimensão da Frota</h3>
                      <p className="text-xs text-gray-400">Selecione o perfil que melhor enquadra a utilização do seu automóvel.</p>
                    </div>

                    <div className="space-y-6">
                      
                      {/* Perfil de utilização */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                          Qual é o seu perfil de utilização automóvel? <span className="text-brand-electric">*</span>
                        </label>
                        <select
                          required
                          value={step2Perfil}
                          onChange={(e) => {
                            setStep2Perfil(e.target.value);
                            if (formErrors.step2Perfil) setFormErrors(prev => ({ ...prev, step2Perfil: false }));
                          }}
                          className={`w-full bg-brand-navy border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-electric cursor-pointer transition-colors ${
                            formErrors.step2Perfil ? "border-red-500" : "border-brand-corp/50"
                          }`}
                        >
                          <option value="">Selecionar opção</option>
                          <option value="Particular">Particular</option>
                          <option value="Família (Múltiplas Viaturas)">Família (Múltiplas Viaturas)</option>
                          <option value="Empresário / Profissional">Empresário / Profissional</option>
                          <option value="PME (Frota Leve)">PME (Frota Leve)</option>
                          <option value="ONG / Organização">ONG / Organização</option>
                          <option value="Outra">Outra</option>
                        </select>
                      </div>

                      {/* CONDITIONAL SUB-FIELDS FOR PME or ONG */}
                      {(step2Perfil === "PME (Frota Leve)" || step2Perfil === "ONG / Organização") && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-brand-navy border border-brand-electric/25 animate-fade-in">
                          
                          {/* Quantas viaturas */}
                          <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                              Quantas viaturas compõem atualmente a sua frota? <span className="text-brand-electric">*</span>
                            </label>
                            <select
                              required
                              value={step2QtdViaturas}
                              onChange={(e) => {
                                setStep2QtdViaturas(e.target.value);
                                if (formErrors.step2QtdViaturas) setFormErrors(prev => ({ ...prev, step2QtdViaturas: false }));
                              }}
                              className={`w-full bg-brand-dark-navy border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-electric cursor-pointer ${
                                formErrors.step2QtdViaturas ? "border-red-500" : "border-brand-corp/50"
                              }`}
                            >
                              <option value="">Selecionar opção</option>
                              <option value="1 a 3 viaturas">1 a 3 viaturas</option>
                              <option value="4 a 10 viaturas">4 a 10 viaturas</option>
                              <option value="11 a 30 viaturas">11 a 30 viaturas</option>
                              <option value="Mais de 30 viaturas">Mais de 35 viaturas</option>
                            </select>
                          </div>

                          {/* Compras / Composição */}
                          <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                              Qual a composição predominante da frota? <span className="text-brand-electric">*</span>
                            </label>
                            <select
                              required
                              value={step2Composicao}
                              onChange={(e) => {
                                setStep2Composicao(e.target.value);
                                if (formErrors.step2Composicao) setFormErrors(prev => ({ ...prev, step2Composicao: false }));
                              }}
                              className={`w-full bg-brand-dark-navy border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-electric cursor-pointer ${
                                formErrors.step2Composicao ? "border-red-500" : "border-brand-corp/50"
                              }`}
                            >
                              <option value="">Selecionar opção</option>
                              <option value="Viaturas Ligeiras">Viaturas Ligeiras</option>
                              <option value="Pick-ups e Comerciais">Pick-ups e Comerciais</option>
                              <option value="Mista">Mista</option>
                              <option value="Outra">Outra</option>
                            </select>
                          </div>

                        </div>
                      )}

                    </div>
                  </div>
                )}

                {/* PASSO 3 – LOCALIZAÇÃO E OPERAÇÃO */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">Passo 3: Localização e Operação</h3>
                      <p className="text-xs text-gray-400">Por favor indique onde as viaturas transitam e estão localizadas mais frequentemente.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Localização Predominante */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                          Onde se encontram maioritariamente as viaturas? <span className="text-brand-electric">*</span>
                        </label>
                        <select
                          required
                          value={step3Localizacao}
                          onChange={(e) => {
                            setStep3Localizacao(e.target.value);
                            if (formErrors.step3Localizacao) setFormErrors(prev => ({ ...prev, step3Localizacao: false }));
                          }}
                          className={`w-full bg-brand-navy border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-electric cursor-pointer ${
                            formErrors.step3Localizacao ? "border-red-500" : "border-brand-corp/50"
                          }`}
                        >
                          <option value="">Selecionar opção</option>
                          <option value="Maputo Cidade">Maputo Cidade</option>
                          <option value="Matola">Matola</option>
                          <option value="Província de Maputo">Província de Maputo</option>
                          <option value="Gaza">Gaza</option>
                          <option value="Inhambane">Inhambane</option>
                          <option value="Sofala">Sofala</option>
                          <option value="Tete">Tete</option>
                          <option value="Nampula">Nampula</option>
                          <option value="Cabo Delgado">Cabo Delgado</option>
                          <option value="Operação entre Moçambique e África do Sul">Operação entre Moçambique e África do Sul</option>
                        </select>
                      </div>

                      {/* Onde operam principalmente */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                          Onde operam principalmente? <span className="text-brand-electric">*</span>
                        </label>
                        <select
                          required
                          value={step3Operacao}
                          onChange={(e) => {
                            setStep3Operacao(e.target.value);
                            if (formErrors.step3Operacao) setFormErrors(prev => ({ ...prev, step3Operacao: false }));
                          }}
                          className={`w-full bg-brand-navy border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-electric cursor-pointer ${
                            formErrors.step3Operacao ? "border-red-500" : "border-brand-corp/50"
                          }`}
                        >
                          <option value="">Selecionar opção</option>
                          <option value="Ambiente urbano">Ambiente urbano</option>
                          <option value="Rotas interprovinciais">Rotas interprovinciais</option>
                          <option value="Obras e estaleiros">Obras e estaleiros</option>
                          <option value="Operação mineira font-mono">Operação mineira</option>
                          <option value="Operação agrícola">Operação agrícola</option>
                          <option value="Misto">Misto</option>
                        </select>
                      </div>

                    </div>
                  </div>
                )}

                {/* PASSO 4 – NECESSIDADES E DESAFIOS */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">Passo 4: Necessidades e Desafios</h3>
                      <p className="text-xs text-gray-400">Ajude o nosso gestor de conta a mapear as suas prioridades imediatas.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      {/* Como podemos ajudar */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                          Como podemos ajudar? <span className="text-brand-electric">*</span>
                        </label>
                        <select
                          required
                          value={step4Ajuda}
                          onChange={(e) => {
                            setStep4Ajuda(e.target.value);
                            if (formErrors.step4Ajuda) setFormErrors(prev => ({ ...prev, step4Ajuda: false }));
                          }}
                          className={`w-full bg-brand-navy border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-electric cursor-pointer ${
                            formErrors.step4Ajuda ? "border-red-500" : "border-brand-corp/50"
                          }`}
                        >
                          <option value="">Selecionar opção</option>
                          <option value="Revisão periódica">Revisão periódica</option>
                          <option value="Diagnóstico de avaria">Diagnóstico de avaria</option>
                          <option value="Procurement de peças">Procurement de peças</option>
                          <option value="Auditoria de orçamento">Auditoria de orçamento</option>
                          <option value="Gestão integral de frota">Gestão integral de frota</option>
                          <option value="Inspeção pré-compra">Inspeção pré-compra</option>
                          <option value="Outro">Outro</option>
                        </select>
                      </div>

                      {/* Maior desafio */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                          Qual é o maior desafio? <span className="text-brand-electric">*</span>
                        </label>
                        <select
                          required
                          value={step4Desafio}
                          onChange={(e) => {
                            setStep4Desafio(e.target.value);
                            if (formErrors.step4Desafio) setFormErrors(prev => ({ ...prev, step4Desafio: false }));
                          }}
                          className={`w-full bg-brand-navy border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-electric cursor-pointer ${
                            formErrors.step4Desafio ? "border-red-500" : "border-brand-corp/50"
                          }`}
                        >
                          <option value="">Selecionar opção</option>
                          <option value="Falta de tempo para gerir oficinas">Falta de tempo para gerir oficinas</option>
                          <option value="Custos elevados de manutenção">Custos elevados de manutenção</option>
                          <option value="Falta de peças disponíveis">Falta de peças disponíveis</option>
                          <option value="Viaturas frequentemente paradas">Viaturas frequentemente paradas</option>
                          <option value="Falta de histórico de manutenção">Falta de histórico de manutenção</option>
                          <option value="Dificuldade em encontrar oficinas confiáveis">Dificuldade em encontrar oficinas confiáveis</option>
                          <option value="Outro">Outro</option>
                        </select>
                      </div>

                      {/* Tipo de serviço */}
                      <div className="space-y-2 md:col-span-3 lg:col-span-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                          Qual o tipo de parceria? <span className="text-brand-electric">*</span>
                        </label>
                        <select
                          required
                          value={step4Duracao}
                          onChange={(e) => {
                            setStep4Duracao(e.target.value);
                            if (formErrors.step4Duracao) setFormErrors(prev => ({ ...prev, step4Duracao: false }));
                          }}
                          className={`w-full bg-brand-navy border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-electric cursor-pointer ${
                            formErrors.step4Duracao ? "border-red-500" : "border-brand-corp/50"
                          }`}
                        >
                          <option value="">Selecionar opção</option>
                          <option value="Serviço pontual">Serviço pontual</option>
                          <option value="Contrato de manutenção">Contrato de manutenção</option>
                          <option value="Gestão integral da frota">Gestão integral da frota</option>
                          <option value="Ainda estou a avaliar opções">Ainda estou a avaliar opções</option>
                        </select>
                      </div>

                    </div>
                  </div>
                )}

                {/* PASSO 5 – INFORMAÇÕES TÉCNICAS */}
                {currentStep === 5 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">Passo 5: Informações Técnicas</h3>
                      <p className="text-xs text-gray-400">Forneça os detalhes específicos da sua viatura e histórico recente.</p>
                    </div>

                    <div className="space-y-6">
                      
                      {/* Detalhes da(s) viatura(s) */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                          Detalhes da(s) viatura(s) <span className="text-brand-electric">*</span>
                        </label>
                        <textarea
                          required
                          value={step5Detalhes}
                          onChange={(e) => {
                            setStep5Detalhes(e.target.value);
                            if (formErrors.step5Detalhes) setFormErrors(prev => ({ ...prev, step5Detalhes: false }));
                          }}
                          className={`w-full bg-brand-navy/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-electric h-32 resize-none transition-all ${
                            formErrors.step5Detalhes ? "border-red-500 bg-red-500/5" : "border-brand-corp/50"
                          }`}
                          placeholder="Toyota Hilux 2021 – 82.000 km – Próxima revisão aos 85.000 km.&#10;Ford Ranger 2022 – Vibração durante a travagem."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Qual é a urgência */}
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                            Qual é a urgência? <span className="text-brand-electric">*</span>
                          </label>
                          <select
                            required
                            value={step5Urgencia}
                            onChange={(e) => {
                              setStep5Urgencia(e.target.value);
                              if (formErrors.step5Urgencia) setFormErrors(prev => ({ ...prev, step5Urgencia: false }));
                            }}
                            className={`w-full bg-brand-navy border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-electric cursor-pointer ${
                              formErrors.step5Urgencia ? "border-red-500" : "border-brand-corp/50"
                            }`}
                          >
                            <option value="">Selecionar opção</option>
                            <option value="Alta (viatura parada)">Alta (viatura parada)</option>
                            <option value="Média (necessidade nas próximas semanas)">Média (necessidade nas próximas semanas)</option>
                            <option value="Baixa (planeamento futuro)">Baixa (planeamento futuro)</option>
                          </select>
                        </div>

                        {/* Possui orçamento de oficina */}
                        <div className="space-y-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                            Possui orçamento ou diagnóstico de oficina? <span className="text-brand-electric">*</span>
                          </label>
                          <select
                            required
                            value={step5PossuiOrcamento}
                            onChange={(e) => {
                              setStep5PossuiOrcamento(e.target.value);
                              if (formErrors.step5PossuiOrcamento) setFormErrors(prev => ({ ...prev, step5PossuiOrcamento: false }));
                            }}
                            className={`w-full bg-brand-navy border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-electric cursor-pointer ${
                              formErrors.step5PossuiOrcamento ? "border-red-500" : "border-brand-corp/50"
                            }`}
                          >
                            <option value="">Selecionar opção</option>
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                          </select>
                        </div>

                      </div>

                      {/* CONDITIONAL SYSTEM MESSAGE */}
                      {step5PossuiOrcamento === "Sim" && (
                        <div className="flex items-start gap-3 bg-brand-electric/10 border border-brand-electric/30 p-4 rounded-xl text-xs sm:text-sm text-gray-200 animate-slide-up">
                          <Info className="w-5 h-5 text-brand-electric flex-shrink-0 mt-0.5" />
                          <p>
                            <strong>Anexe o orçamento ou diagnóstico</strong> no passo seguinte para que a equipa SIG Care Auto possa realizar uma análise técnica preliminar.
                          </p>
                        </div>
                      )}

                    </div>
                  </div>
                )}

                {/* PASSO 6 – ANEXOS */}
                {currentStep === 6 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">Passo 6: Documentação Adicional (Opcional)</h3>
                      <p className="text-xs text-gray-400">Pode anexar fotografias da viatura, fotografias da avaria, livrete, orçamentos, relatórios técnicos ou histórico de manutenção.</p>
                    </div>

                    <div className="space-y-6">
                      
                      {/* Drag and Drop Container File uploader */}
                      <div 
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className="border-2 border-dashed border-brand-corp/70 hover:border-brand-electric rounded-2xl p-8 text-center transition-all relative cursor-pointer group bg-brand-navy/30"
                      >
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png,.docx"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
                        />
                        <div className="space-y-3">
                          <div className="mx-auto h-12 w-12 rounded-full bg-brand-navy flex items-center justify-center text-brand-electric group-hover:scale-110 transition-transform shadow-md">
                            <Truck className="w-6 h-6 animate-pulse" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">
                              <span className="text-brand-electric underline group-hover:text-white transition-colors">Clique para carregar</span> ou arraste e solte ficheiros aqui
                            </p>
                            <p className="text-[10px] text-gray-400 font-mono mt-1 uppercase">
                              PDF, JPG, JPEG, PNG, DOCX · Tamanho máximo: 15 MB por ficheiro
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Render Files badge with remove action */}
                      {step6Files.length > 0 && (
                        <div className="p-4 bg-brand-dark-navy/60 rounded-xl border border-brand-corp/30 space-y-2">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">Ficheiros Carregados ({step6Files.length}):</p>
                          <div className="flex flex-wrap gap-2">
                            {step6Files.map((file, idx) => (
                              <span 
                                key={idx} 
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-corp/50 rounded-lg text-xs text-white border border-brand-electric/25 shadow-sm"
                              >
                                <Check className="w-3.5 h-3.5 text-brand-success flex-shrink-0" />
                                <span className="max-w-[150px] truncate">{file.name}</span>
                                <span className="text-[10px] text-gray-400 font-mono">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setStep6Files(prev => prev.filter((_, i) => i !== idx));
                                    triggerAlert("Ficheiro removido com sucesso!");
                                  }}
                                  className="hover:text-red-500 font-extrabold ml-1.5 focus:outline-none cursor-pointer h-4 w-4 bg-white/10 rounded-full flex items-center justify-center text-[10px]"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                )}

              </div>

              {/* ACTION BACK/NEXT/SUBMIT BAR */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-brand-corp/30">
                {/* Back Button */}
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-3 rounded-xl text-sm font-bold border border-gray-600 hover:border-white transition-colors cursor-pointer bg-transparent text-gray-200 hover:text-white"
                  >
                    Voltar
                  </button>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {currentStep < 6 ? (
                  /* Next Button */
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-brand-electric hover:bg-white text-white hover:text-brand-navy font-bold px-8 py-3.5 rounded-xl text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Seguinte</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  /* Submit Dual Buttons */
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    {/* WhatsApp */}
                    <button
                      type="button"
                      onClick={() => handleFormSubmission("whatsapp")}
                      className="bg-[#10B981] hover:bg-[#10B981]/90 text-white font-bold px-6 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#10B981]/15 transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Enviar pelo WhatsApp</span>
                    </button>

                    {/* Email */}
                    <button
                      type="button"
                      onClick={() => handleFormSubmission("email")}
                      className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Enviar pelo Email</span>
                    </button>
                  </div>
                )}
              </div>

            </motion.div>
          ) : (
            /* SUBMIT SUCCESS PAGE */
            <div className="bg-brand-dark-navy border border-brand-success/30 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-2xl animate-fade-in relative">
              <div className="h-16 w-16 bg-brand-success/15 rounded-full flex items-center justify-center text-brand-success mx-auto shadow-inner shadow-brand-success/30">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Obrigado pelo seu contacto.
                </h3>
                <p className="text-sm leading-relaxed text-gray-300">
                  A equipa SIG Care Auto irá analisar as informações fornecidas e entrar em contacto consigo em breve para apresentar uma solução adequada às suas necessidades.
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    // Reset all form states
                    setCurrentStep(1);
                    setStep1Nome("");
                    setStep1Empresa("");
                    setStep1Cargo("");
                    setStep1Telefone("");
                    setStep1Email("");
                    setStep2Perfil("");
                    setStep2QtdViaturas("");
                    setStep2Composicao("");
                    setStep3Localizacao("");
                    setStep3Operacao("");
                    setStep4Ajuda("");
                    setStep4Desafio("");
                    setStep4Duracao("");
                    setStep5Detalhes("");
                    setStep5Urgencia("");
                    setStep5PossuiOrcamento("");
                    setStep6Files([]);
                    setIsFormSubmitted(false);
                    setFormErrors({});
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold border border-brand-corp hover:border-brand-electric transition-colors cursor-pointer text-gray-400 hover:text-white"
                >
                  Fazer Nova Simulação
                </button>
              </div>
            </div>
          )}

        </div>
      </ScrollAnimateSection>

      {/* 09 CTA FINAL - CHAMADA À ACÇÃO */}
      <ScrollAnimateSection className="py-24 bg-brand-navy text-white relative overflow-hidden font-sans">
        {/* Abstract dark graphics */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,102,255,0.15),transparent_60%)]" />
        
        <motion.div variants={itemFadeUpVariants} className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 bg-brand-electric/10 border border-brand-electric/25 rounded-full px-4 py-1.5 text-brand-electric">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">ENTRE EM CONTACTO HOJE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {ctaSection.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {ctaSection.subtitle}
          </p>

          {/* Action CTAs inside bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto pt-4">
            <a
              href={`https://wa.me/${whatsappNum}?text=Olá%2C+gostaria+de+saber+mais+sobre+os+serviços+da+SIG+Care+Auto`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-brand-electric hover:bg-white text-white hover:text-brand-navy text-sm font-bold px-8 py-4 rounded-xl shadow-lg shadow-brand-electric/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`mailto:${emailAddress}`}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white text-white text-sm font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>

          {/* Reassurance line with simulated green responsive dot */}
          <div className="pt-6 border-t border-white/10 max-w-md mx-auto flex items-center justify-center gap-2 text-xs text-gray-300">
            <span className="inline-block h-2 w-2 rounded-full bg-brand-success animate-pulse" />
            <span>{ctaSection.reassurance}</span>
          </div>
        </motion.div>
      </ScrollAnimateSection>

      {/* 09 RODAPÉ CORPORATIVO */}
      <ScrollAnimateSection as="footer" className="bg-brand-dark-navy text-white py-16 font-sans border-t border-brand-corp/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Logo brand descriptions */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src={logoSigCareAuto}
                alt="SIG Care Auto"
                className="w-12 h-12 object-contain flex-shrink-0"
                referrerPolicy="no-referrer"
              />
              <span className="text-xl font-bold tracking-tight text-white">{rodapeSection.brand}</span>
            </div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider font-mono">
              {rodapeSection.legalName}
            </p>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Coordenação logística, triagem técnica e procurement especializado para assegurar a máxima disponibilidade operacional do seu veículo em Moçambique.
            </p>
            
            {/* Social Media Links with Official Brand Colors */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://www.instagram.com/sig.oficial0?igsh=ZTV6NWo3MDd0NDZz" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="Instagram (SIG Care Auto)"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 bg-[#E1306C] hover:scale-110 shadow-lg shadow-[#E1306C]/10 hover:shadow-[#E1306C]/30 hover:brightness-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61590807086338" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="Facebook (SIG Care Auto)"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 bg-[#1877F2] hover:scale-110 shadow-lg shadow-[#1877F2]/10 hover:shadow-[#1877F2]/30 hover:brightness-110"
              >
                <Facebook className="w-5 h-5 stroke-[2]" />
              </a>
              <a 
                href="https://www.linkedin.com/company/sigmz" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="LinkedIn (SIG Care Auto)"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 bg-[#0077B5] hover:scale-110 shadow-lg shadow-[#0077B5]/10 hover:shadow-[#0077B5]/30 hover:brightness-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact coordinates list */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-brand-electric uppercase tracking-widest font-mono">Contactos Oficiais</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-brand-electric flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  {rodapeSection.details.telephones.map((t, idx) => (
                    <span key={idx} className="block font-mono">{t}</span>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-electric flex-shrink-0" />
                <span className="font-mono">{emailAddress}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-electric flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{rodapeSection.details.address}</span>
              </li>
            </ul>
          </div>

          {/* Business Schedule list */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-brand-electric uppercase tracking-widest font-mono">Horário de Atendimento</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-xs text-gray-300">
                <Calendar className="w-4 h-4 text-brand-electric flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">{rodapeSection.details.hours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Global legal bar at bottom */}
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} SIG SA. Todos os direitos reservados. Maputo & Matola, Moçambique.</p>
          <div className="flex gap-4">
            <button 
              onClick={() => setModalType('terms')} 
              className="text-gray-400 hover:text-white cursor-pointer transition-colors bg-transparent border-none p-0 focus:outline-none"
            >
              Termos de Serviço
            </button>
            <button 
              onClick={() => setModalType('privacy')} 
              className="text-gray-400 hover:text-white cursor-pointer transition-colors bg-transparent border-none p-0 focus:outline-none"
            >
              Política de Privacidade
            </button>
          </div>
        </div>
      </ScrollAnimateSection>

      {/* Floating WhatsApp button - Mobile & Tablet only, hidden on Desktop */}
      <a
        href={`https://wa.me/${whatsappNum}?text=Olá%2C+gostaria+de+saber+mais+sobre+os+serviços+da+SIG+Care+Auto`}
        target="_blank"
        rel="noopener noreferrer"
        title="Contactar via WhatsApp"
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebd54] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-[#25D366]/30 hover:shadow-[#25D366]/50 animate-bounce"
        style={{ animationDuration: '3s' }}
      >
        <MessageCircle className="w-6 h-6 fill-current text-white" />
      </a>

      {/* Dynamic Modal representing Terms of Service / Privacy Policy */}
      <AnimatePresence>
        {modalType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setModalType(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col border border-gray-150 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 flex-shrink-0">
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-electric font-mono">
                  {modalType === 'terms' ? 'DOCUMENTO DE UTILIZAÇÃO' : 'POLÍTICA DE DADOS'}
                </span>
                <button
                  onClick={() => setModalType(null)}
                  className="p-1 rounded-full hover:bg-gray-100 text-brand-slate hover:text-brand-navy transition-all focus:outline-none"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Content Body */}
              <div className="overflow-y-auto p-8 max-h-[calc(85vh-140px)]">
                {modalType === 'terms' ? (
                  <div className="space-y-6 text-brand-slate text-sm leading-relaxed">
                    <h1 className="text-2xl font-extrabold text-brand-navy border-b border-gray-100 pb-2">TERMOS DE SERVIÇO</h1>
                    <h2 className="text-lg font-bold text-brand-corp">SIG Care Auto</h2>
                    <p className="text-xs font-mono text-gray-400">Última atualização: 13/06/2026</p>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">1. Sobre a SIG Care Auto</h3>
                      <p>A SIG Care Auto é uma unidade de serviço da SIG – Serviços Integrados de Gestão Operacional, SA, especializada na coordenação, supervisão e gestão operacional de processos relacionados com viaturas.</p>
                      <p>A SIG Care Auto não é uma oficina mecânica, concessionária, seguradora, fabricante de peças ou empresa de reboque. A sua função consiste em coordenar serviços prestados por terceiros em nome dos seus clientes.</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">2. Aceitação dos Termos</h3>
                      <p>Ao solicitar ou utilizar os serviços da SIG Care Auto, o cliente concorda com os presentes Termos de Serviço.</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">3. Serviços Prestados</h3>
                      <p>Os serviços podem incluir:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Coordenação de diagnósticos automóveis;</li>
                        <li>Identificação e seleção de oficinas;</li>
                        <li>Solicitação e comparação de cotações;</li>
                        <li>Procurement e aquisição de peças mediante aprovação do cliente;</li>
                        <li>Acompanhamento de reparações;</li>
                        <li>Coordenação de manutenção preventiva;</li>
                        <li>Relatórios de acompanhamento;</li>
                        <li>Coordenação de serviços de reboque;</li>
                        <li>Coordenação de viaturas de substituição quando disponíveis;</li>
                        <li>Apoio administrativo relacionado com a gestão da viatura.</li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">4. Aprovação do Cliente</h3>
                      <p>Nenhuma despesa será realizada sem a aprovação prévia do cliente, salvo situações de emergência previamente autorizadas.</p>
                      <p>O cliente é responsável por analisar e aprovar:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Orçamentos;</li>
                        <li>Cotações;</li>
                        <li>Reparações;</li>
                        <li>Aquisição de peças;</li>
                        <li>Serviços adicionais.</li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">5. Prestadores de Serviços Terceirizados</h3>
                      <p>A SIG Care Auto trabalha com oficinas, fornecedores e prestadores de serviços independentes.</p>
                      <p>A SIG Care Auto não é responsável por:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Defeitos de reparação;</li>
                        <li>Garantias mecânicas;</li>
                        <li>Atrasos causados por terceiros;</li>
                        <li>Disponibilidade de peças;</li>
                        <li>Falhas operacionais de fornecedores externos.</li>
                      </ul>
                      <p>Qualquer garantia relativa a peças ou serviços será da responsabilidade do fornecedor ou oficina executante.</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">6. Limitação de Responsabilidade</h3>
                      <p>A responsabilidade da SIG Care Auto limita-se à coordenação operacional dos processos.</p>
                      <p>A SIG Care Auto não poderá ser responsabilizada por:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Danos mecânicos;</li>
                        <li>Acidentes;</li>
                        <li>Perdas financeiras indiretas;</li>
                        <li>Lucros cessantes;</li>
                        <li>Danos causados por terceiros;</li>
                        <li>Eventos de força maior.</li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">7. Pagamentos</h3>
                      <p>Os honorários da SIG Care Auto serão definidos conforme o plano ou serviço contratado.</p>
                      <p>Os custos relacionados com:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Peças;</li>
                        <li>Reparações;</li>
                        <li>Serviços de terceiros;</li>
                        <li>Transporte;</li>
                        <li>Reboque;</li>
                      </ul>
                      <p>serão cobrados separadamente.</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">8. Cancelamento de Serviços</h3>
                      <p>O cliente pode cancelar o serviço a qualquer momento. A SIG Care Auto reserva-se o direito de cobrar pelos serviços já executados até à data do cancelamento.</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">9. Confidencialidade</h3>
                      <p>Todas as informações fornecidas pelo cliente serão tratadas de forma confidencial, nos termos da Política de Privacidade.</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">10. Alterações aos Termos</h3>
                      <p>A SIG Care Auto poderá atualizar estes Termos de Serviço a qualquer momento. As versões atualizadas serão publicadas no website oficial.</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">11. Lei Aplicável</h3>
                      <p>Os presentes Termos são geridos pelas leis da República de Moçambique.</p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-gray-150">
                      <h3 className="text-base font-bold text-brand-navy">12. Contacto</h3>
                      <p className="font-mono bg-gray-50 p-4 rounded-xl border border-gray-150 text-xs">
                        <strong>SIG Care Auto</strong><br />
                        Email: <a href="mailto:careauto@opssig.com" className="text-brand-electric font-semibold hover:underline">careauto@opssig.com</a><br />
                        Website: <a href="http://www.opssig.com" target="_blank" rel="noopener noreferrer" className="text-brand-electric font-semibold hover:underline">www.sigmz.com</a><br />
                        Telefone: +258878798922
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 text-brand-slate text-sm leading-relaxed">
                    <h1 className="text-2xl font-extrabold text-brand-navy border-b border-gray-100 pb-2">POLÍTICA DE PRIVACIDADE</h1>
                    <h2 className="text-lg font-bold text-brand-corp">SIG Care Auto</h2>
                    <p className="text-xs font-mono text-gray-400">Última atualização: 13/06/2026</p>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">1. Introdução</h3>
                      <p>A SIG Care Auto respeita a privacidade dos seus clientes e compromete-se a proteger os seus dados pessoais.</p>
                      <p>Esta Política de Privacidade explica como recolhemos, utilizamos e protegemos as informações fornecidas pelos utilizadores dos nossos serviços.</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">2. Dados Recolhidos</h3>
                      <p>Podemos recolher:</p>
                      
                      <div className="space-y-4 pl-4 border-l-2 border-brand-electric/20">
                        <div>
                          <h4 className="font-extrabold text-brand-navy text-xs uppercase tracking-wide mb-1">Dados de Identificação</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Nome completo;</li>
                            <li>Número de telefone;</li>
                            <li>Endereço de email;</li>
                            <li>Documento de identificação (quando necessário);</li>
                            <li>Morada.</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-extrabold text-brand-navy text-xs uppercase tracking-wide mb-1">Dados da Viatura</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Matrícula;</li>
                            <li>Marca e modelo;</li>
                            <li>Número de chassis;</li>
                            <li>Histórico de manutenção;</li>
                            <li>Informação sobre avarias e reparações.</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-extrabold text-brand-navy text-xs uppercase tracking-wide mb-1">Dados Financeiros</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Informações necessárias para faturação;</li>
                            <li>Comprovativos de pagamento.</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-extrabold text-brand-navy text-xs uppercase tracking-wide mb-1">Dados de Comunicação</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Mensagens enviadas por email;</li>
                            <li>Conversas por WhatsApp;</li>
                            <li>Pedidos submetidos através do website.</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">3. Finalidade da Utilização dos Dados</h3>
                      <p>Utilizamos os dados para:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Prestar os serviços contratados;</li>
                        <li>Coordenar oficinas e fornecedores;</li>
                        <li>Solicitar cotações;</li>
                        <li>Gerir reparações e manutenção;</li>
                        <li>Emitir faturas;</li>
                        <li>Comunicar com os clientes;</li>
                        <li>Melhorar a qualidade dos serviços.</li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">4. Partilha de Dados</h3>
                      <p>Poderemos partilhar informações estritamente necessárias com:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Oficinas;</li>
                        <li>Fornecedores de peças;</li>
                        <li>Empresas de reboque;</li>
                        <li>Prestadores de serviços associados;</li>
                        <li>Autoridades legais quando exigido por lei.</li>
                      </ul>
                      <p className="font-bold">Nunca venderemos dados pessoais a terceiros.</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">5. Segurança dos Dados</h3>
                      <p>Implementamos medidas técnicas e organizacionais adequadas para proteger os dados contra acesso não autorizado, alteração indevida, divulgação não autorizada e perda de informação.</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">6. Retenção de Dados</h3>
                      <p>Os dados serão mantidos apenas pelo período necessário para cumprimento contratual, obrigações legais, resolução de litígios e registos administrativos.</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">7. Direitos dos Titulares dos Dados</h3>
                      <p>O cliente poderá solicitar:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Acesso aos seus dados;</li>
                        <li>Correção de informações incorretas;</li>
                        <li>Atualização de dados;</li>
                        <li>Eliminação de dados quando legalmente possível;</li>
                        <li>Limitação do tratamento.</li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">8. Cookies</h3>
                      <p>O website poderá utilizar cookies para melhorar a experiência de navegação, medir desempenho e analisar utilização do website. O utilizador poderá configurar o navegador para recusar cookies.</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">9. Ligações Externas</h3>
                      <p>O website poderá conter links para websites de terceiros. A SIG Care Auto não é responsável pelas práticas de privacidade desses websites.</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-base font-bold text-brand-navy">10. Alterações à Política</h3>
                      <p>Esta Política poderá ser atualizada periodicamente. As versões atualizadas serão publicadas no website.</p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-gray-150">
                      <h3 className="text-base font-bold text-brand-navy">11. Contacto</h3>
                      <p className="font-mono bg-gray-50 p-4 rounded-xl border border-gray-150 text-xs">
                        <strong>SIG Care Auto</strong><br />
                        Email: <a href="mailto:careauto@opssig.com" className="text-brand-electric font-semibold hover:underline">careauto@opssig.com</a><br />
                        Website: <a href="http://www.opssig.com" target="_blank" rel="noopener noreferrer" className="text-brand-electric font-semibold hover:underline">www.sigmz.com</a><br />
                        Telefone: +258878798922
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex justify-end flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-6 py-2 bg-brand-navy text-white hover:bg-brand-electric font-bold rounded-xl text-xs transition-all duration-300 pointer"
                >
                  Fechar Documento
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
