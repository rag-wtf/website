"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  BookOpen, 
  Cpu, 
  Database, 
  Globe, 
  Lock, 
  Zap, 
  ArrowRight, 
  Github, 
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Download,
  Settings,
  Code,
  Shield,
  Rocket,
  Layers,
  Network,
  FileText,
  Folder,
  MessageSquare,
  Cloud,
  Terminal,
  Copy,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Menu,
  X,
  Search,
  ChevronUp,
  Star,
  Users,
  Eye,
  Fork,
  Share2,
  Heart,
  Code2,
  Braces,
  Server,
  Palette,
  Smartphone,
  Monitor,
  Zap as Bolt,
  Target,
  TrendingUp,
  Award,
  Lightbulb,
  HelpCircle,
  Mail,
  Twitter,
  MessageCircle,
  Linkedin,
  Youtube,
  Book,
  FileCode,
  Image as ImageIcon,
  Video,
  BarChart3,
  GitBranch,
  Package,
  Database as DatabaseIcon,
  CloudDownload,
  Settings2,
  TerminalSquare,
  TestTube,
  Bug,
  Check,
  Clock,
  Users2,
  ThumbsUp
} from "lucide-react";

export default function RAGWTFLanding() {
  const [activeSection, setActiveSection] = useState("overview");
  const [setupProgress, setSetupProgress] = useState(0);
  const [selectedSetup, setSelectedSetup] = useState("browser");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState("");
  const [activeFeature, setActiveFeature] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [progress, setProgress] = useState(0);

  const sectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (window.scrollY / scrollHeight) * 100;
      
      setProgress(scrollProgress);
      setShowScrollTop(window.scrollY > 300);
      
      Object.entries(sectionRefs.current).forEach(([section, ref]) => {
        if (ref && scrollPosition >= ref.offsetTop) {
          setActiveSection(section);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((section: string) => {
    const element = sectionRefs.current[section];
    if (element) {
      const navHeight = 80; // Approximate height of the navigation bar
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const simulateSetup = () => {
    setSetupProgress(0);
    const interval = setInterval(() => {
      setSetupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCommand(text);
      setTimeout(() => setCopiedCommand(""), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const handleFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback) {
      // Here you would typically send feedback to a server
      setFeedback("");
      alert("Thank you for your feedback!");
    }
  };

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Client-Side RAG",
      description: "Runs entirely in the browser using SurrealDB WASM for a secure, serverless-optional experience",
      tech: ["SurrealDB WASM", "IndexedDB", "Browser APIs"],
      demo: "Drag and drop documents directly in your browser - no server required!"
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Modular Monorepo",
      description: "Built with Melos, separating concerns into distinct packages (chat, document, settings, etc.)",
      tech: ["Melos", "Dart Packages", "Clean Architecture"],
      demo: "Easily extend or modify individual packages without affecting others"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Multi-Provider LLM Support",
      description: "Pre-configured for various local and cloud-based LLM providers including Ollama, OpenAI, Anthropic, Gemini",
      tech: ["Ollama", "OpenAI", "Anthropic", "Gemini", "Local Models"],
      demo: "Switch between LLM providers with a single configuration change"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Comprehensive RAG Settings",
      description: "Dedicated UI to configure every aspect of the RAG pipeline",
      tech: ["Chunking", "Embeddings", "Retrieval", "Generation"],
      demo: "Fine-tune your RAG pipeline with granular control over each component"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Clean State Management",
      description: "Utilizes Stacked architecture with ViewModel pattern for clear separation",
      tech: ["Stacked", "ViewModel", "Reactive Programming"],
      demo: "Maintainable and testable code with clear separation of concerns"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "CI/CD Ready",
      description: "Includes GitHub Actions workflows for automated testing and deployment",
      tech: ["GitHub Actions", "Netlify", "Automated Testing"],
      demo: "Automated deployments with full test coverage and quality checks"
    }
  ];

  const technologies = [
    { 
      name: "Flutter", 
      icon: <Code className="w-5 h-5" />, 
      description: "Cross-platform framework",
      version: "3.x",
      website: "https://flutter.dev",
      category: "Framework"
    },
    { 
      name: "Dart", 
      icon: <Cpu className="w-5 h-5" />, 
      description: "Programming language",
      version: ">=3.8.1",
      website: "https://dart.dev",
      category: "Language"
    },
    { 
      name: "Melos", 
      icon: <Layers className="w-5 h-5" />, 
      description: "Monorepo management",
      version: "Latest",
      website: "https://melos.invertase.dev",
      category: "Tooling"
    },
    { 
      name: "Stacked", 
      icon: <Database className="w-5 h-5" />, 
      description: "State management",
      version: "Latest",
      website: "https://stacked.filledstacks.com",
      category: "Architecture"
    },
    { 
      name: "SurrealDB", 
      icon: <DatabaseIcon className="w-5 h-5" />, 
      description: "Database",
      version: "Latest",
      website: "https://surrealdb.com",
      category: "Database"
    },
    { 
      name: "Firebase", 
      icon: <Cloud className="w-5 h-5" />, 
      description: "Backend services",
      version: "Latest",
      website: "https://firebase.google.com",
      category: "Backend"
    },
    { 
      name: "GitHub Actions", 
      icon: <Network className="w-5 h-5" />, 
      description: "CI/CD",
      version: "Latest",
      website: "https://github.com/features/actions",
      category: "DevOps"
    },
    { 
      name: "Netlify", 
      icon: <Globe className="w-5 h-5" />, 
      description: "Deployment",
      version: "Latest",
      website: "https://netlify.com",
      category: "Deployment"
    }
  ];

  const setupSteps = {
    browser: [
      { 
        title: "Clone and Bootstrap", 
        description: "git clone https://github.com/limcheekin/rag.git && cd rag && melos bootstrap",
        details: "This command clones the repository and installs all dependencies across the monorepo packages.",
        prerequisites: ["Git", "Flutter SDK", "Dart SDK", "Melos"]
      },
      { 
        title: "Run the App", 
        description: "melos run",
        details: "Starts the Flutter application in development flavor using the .env.dev configuration.",
        prerequisites: ["Completed previous step"]
      }
    ],
    local: [
      { 
        title: "Clone and Bootstrap", 
        description: "git clone https://github.com/limcheekin/rag.git && cd rag && melos bootstrap",
        details: "This command clones the repository and installs all dependencies across the monorepo packages.",
        prerequisites: ["Git", "Flutter SDK", "Dart SDK", "Melos"]
      },
      { 
        title: "Set up Ollama", 
        description: "Install Ollama and pull default models: ollama pull llama3.2 && ollama pull nomic-embed-text",
        details: "Ollama provides local LLM inference. These models are used for embeddings and chat completions.",
        prerequisites: ["Docker", "8GB+ RAM"]
      },
      { 
        title: "Start SurrealDB", 
        description: "melos start_surreal",
        details: "Starts a local SurrealDB instance in a Docker container with data persistence.",
        prerequisites: ["Docker", "Completed previous step"]
      },
      { 
        title: "Configure Environment", 
        description: "Copy .env.example to .env.dev",
        details: "Environment variables configure API endpoints and service URLs for the local setup.",
        prerequisites: ["Completed previous step"]
      },
      { 
        title: "Run the App", 
        description: "melos run",
        details: "Starts the Flutter application connected to your local Ollama and SurrealDB instances.",
        prerequisites: ["Completed previous step"]
      }
    ]
  };

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "AI Engineer",
      company: "TechCorp",
      content: "RAG.WTF revolutionized how we build RAG applications. The client-side approach gives us complete control over data privacy.",
      avatar: "SC"
    },
    {
      name: "Mike Rodriguez",
      role: "Full Stack Developer",
      company: "StartupXYZ",
      content: "The modular architecture makes it incredibly easy to customize and extend. We built our production RAG system in days, not months.",
      avatar: "MR"
    },
    {
      name: "Emily Johnson",
      role: "Data Scientist",
      company: "DataLabs",
      content: "Being able to run everything locally with Ollama has been a game-changer for our sensitive data projects.",
      avatar: "EJ"
    }
  ];

  const roadmap = [
    {
      phase: "Q1 2024",
      status: "completed",
      features: ["Core RAG Pipeline", "Multi-LLM Support", "Browser-based Storage", "CI/CD Pipeline"]
    },
    {
      phase: "Q2 2024",
      status: "in-progress",
      features: ["Advanced Document Processing", "Image and Table Extraction", "Performance Optimizations"]
    },
    {
      phase: "Q3 2024",
      status: "planned",
      features: ["Enhanced UI/UX", "Mobile App Improvements", "Additional LLM Providers"]
    },
    {
      phase: "Q4 2024",
      status: "planned",
      features: ["Caching Mechanisms", "Advanced Analytics", "Enterprise Features"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/20 z-50">
        <div 
          className="h-full bg-gradient-to-r from-white via-white/90 to-white/80 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="sticky top-1 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">RAG.WTF</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {["overview", "features", "architecture", "setup", "tech", "community"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-all duration-200 ${
                    activeSection === section
                      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                      : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="hidden sm:flex text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-300 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {/* GitHub Link */}
              <Button variant="outline" size="sm" className="hidden sm:flex bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 shadow-sm hover:shadow-md transition-all duration-200">
                <Github className="w-4 h-4 mr-2" />
                <div className="hidden md:flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>1.2k</span>
                </div>
              </Button>

              {/* Getting Started CTA Button */}
              <Button 
                variant="default" 
                size="sm" 
                className="hidden sm:flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-0"
              >
                <Rocket className="w-4 h-4 mr-2" />
                <span>Getting Started</span>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-slate-700 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-300 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-200 dark:border-white/20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-b-xl shadow-lg">
              <div className="flex flex-col space-y-2 mt-4 p-2">
                {["overview", "features", "architecture", "setup", "tech", "community"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                      activeSection === section
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shadow-sm border border-blue-200 dark:border-blue-800"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
                <div className="px-4 py-2">
                  <Button variant="outline" size="sm" className="w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 shadow-sm hover:shadow-md transition-all duration-200">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </div>
                <div className="px-4 py-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-0"
                  >
                    <Rocket className="w-4 h-4 mr-2" />
                    Getting Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={(el) => sectionRefs.current.overview = el} className="py-12 px-4 relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 scroll-mt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="mb-6">
            <div className="flex justify-center space-x-4 mb-4">
              <Badge variant="secondary" className="animate-pulse">
                <BookOpen className="w-4 h-4 mr-2" />
                Open Source
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Users className="w-4 h-4 mr-2" />
                Community Driven
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Shield className="w-4 h-4 mr-2" />
                Privacy First
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              RAG.WTF
            </h1>
            <div className="mb-6">
              <p className="text-lg md:text-xl text-blue-100 mb-3 max-w-3xl mx-auto">
                An Open-Source, Modular RAG Application built with Flutter
              </p>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg max-w-2xl mx-auto border border-white/20">
                <p className="text-md font-semibold text-white mb-1">
                  What's The File? 
                </p>
                <p className="text-blue-100">
                  Wow, That's Fast!
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Button size="lg" onClick={() => scrollToSection("setup")} className="group bg-white text-blue-600 hover:bg-blue-50">
              <CloudDownload className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Install Locally
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollToSection("features")} className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
              <Zap className="w-5 h-5 mr-2" />
              Explore Features
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-2xl font-bold text-white mb-1">1.2k+</div>
              <div className="text-xs text-blue-100">GitHub Stars</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-2xl font-bold text-white mb-1">50+</div>
              <div className="text-xs text-blue-100">Contributors</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-2xl font-bold text-white mb-1">10k+</div>
              <div className="text-xs text-blue-100">Downloads</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-2xl font-bold text-white mb-1">99.9%</div>
              <div className="text-xs text-blue-100">Uptime</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-4">
                <Lock className="w-10 h-10 mx-auto mb-3 text-green-600" />
                <h3 className="font-semibold mb-1">Enhanced Privacy</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  User data remains on the client machine, never sent to a server
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-4">
                <Zap className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold mb-1">Cost-Effective</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Reduces need for server-side infrastructure by up to 90%
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-4">
                <Globe className="w-10 h-10 mx-auto mb-3 text-purple-600" />
                <h3 className="font-semibold mb-1">Cross-Platform</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Seamless deployment across web, mobile, and desktop
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={(el) => sectionRefs.current.features = el} className="py-12 px-4 bg-slate-50 dark:bg-slate-900/50 scroll-mt-20">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Key Features
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Everything you need to build powerful RAG applications
            </p>
          </div>

          {/* Interactive Feature Showcase */}
          <div className="mb-12">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-lg">
                        {features[activeFeature].icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {features[activeFeature].title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          {features[activeFeature].description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold text-slate-900 dark:text-white">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {features[activeFeature].tech.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Demo:</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {features[activeFeature].demo}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-full flex items-center justify-center">
                        <Code2 className="w-16 h-16 text-white" />
                      </div>
                      <div className="flex justify-center space-x-2 mb-4">
                        {features.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveFeature(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === activeFeature
                                ? "bg-blue-600 dark:bg-blue-400"
                                : "bg-slate-300 dark:bg-slate-600"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Feature {activeFeature + 1} of {features.length}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`h-full hover:shadow-lg transition-all duration-300 cursor-pointer border-slate-200 dark:border-slate-700 ${
                  index === activeFeature ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                  <div className="mt-4 flex flex-wrap gap-1">
                    {feature.tech.slice(0, 2).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {feature.tech.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{feature.tech.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section ref={(el) => sectionRefs.current.architecture = el} className="py-12 px-4 bg-slate-50 dark:bg-slate-900/50 scroll-mt-20">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Architecture Overview
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Understanding the RAG pipeline flow
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="h-full">
              <Card className="h-full flex flex-col border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Network className="w-6 h-6 text-blue-600" />
                    <span className="text-lg font-semibold">RAG Pipeline Flow</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-4">
                    {[
                      {
                        step: 1,
                        title: "Document Ingestion",
                        description: "Upload documents through UI, send to text-splitting service",
                        icon: <FileText className="w-5 h-5" />,
                        color: "blue"
                      },
                      {
                        step: 2,
                        title: "Processing & Storage",
                        description: "Generate embeddings and store in SurrealDB",
                        icon: <DatabaseIcon className="w-5 h-5" />,
                        color: "green"
                      },
                      {
                        step: 3,
                        title: "Retrieval & Generation",
                        description: "Query vectorization, similarity search, and LLM response",
                        icon: <Cpu className="w-5 h-5" />,
                        color: "purple"
                      }
                    ].map((item, index) => (
                      <div key={item.step} className="flex items-start space-x-3">
                        <div className={`w-8 h-8 bg-${item.color}-100 dark:bg-${item.color}-900 rounded-full flex items-center justify-center flex-shrink-0`}>
                          <span className="text-sm font-semibold">{item.step}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold">{item.title}</h4>
                            <div className={`text-${item.color}-600 dark:text-${item.color}-400`}>
                              {item.icon}
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {item.description}
                          </p>
                        </div>
                        {index < 2 && (
                          <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="h-full">
              <Card className="h-full flex flex-col border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <Layers className="w-6 h-6 text-purple-600" />
                    <span className="text-lg font-semibold">Project Structure</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className="font-mono text-sm font-semibold">packages/</span>
                    </div>
                    <div className="ml-6 space-y-2">
                      {[
                        { name: "analytics/", icon: <BarChart3 className="w-3 h-3 text-green-600" /> },
                        { name: "chat/", icon: <MessageSquare className="w-3 h-3 text-blue-600" /> },
                        { name: "database/", icon: <DatabaseIcon className="w-3 h-3 text-purple-600" /> },
                        { name: "document/", icon: <FileText className="w-3 h-3 text-orange-600" /> },
                        { name: "settings/", icon: <Settings className="w-3 h-3 text-red-600" /> },
                        { name: "ui/", icon: <Palette className="w-3 h-3 text-pink-600" /> }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 group cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 p-1 rounded">
                          {item.icon}
                          <span className="font-mono text-xs text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Setup Section */}
      <section ref={(el) => sectionRefs.current.setup = el} className="py-12 px-4 bg-slate-50 dark:bg-slate-900/50 scroll-mt-20">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Installation
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Choose your setup method and follow the interactive guide
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs value={selectedSetup} onValueChange={setSelectedSetup} className="mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="browser" className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>Browser-Only</span>
                  <Badge variant="secondary" className="ml-2">Quick</Badge>
                </TabsTrigger>
                <TabsTrigger value="local" className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4" />
                  <span>Full Local Setup</span>
                  <Badge variant="secondary" className="ml-2">Complete</Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="browser" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Globe className="w-6 h-6 text-green-600" />
                      <span className="text-lg font-semibold">Install Locally (Browser-Only)</span>
                    </CardTitle>
                    <CardDescription>
                      Run the application using SurrealDB's in-browser storage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert className="mb-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Perfect for quick demos, testing UI, and using with cloud LLMs. No external database or LLM setup required.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-6">
                      {setupSteps.browser.map((step, index) => (
                        <div key={index} className="relative">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-semibold">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1">{step.title}</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                {step.details}
                              </p>
                              <div className="relative">
                                <code className="block bg-slate-100 dark:bg-slate-800 p-3 rounded text-sm font-mono">
                                  {step.description}
                                </code>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute top-2 right-2 p-1 h-8 w-8"
                                  onClick={() => copyToClipboard(step.description)}
                                >
                                  <Copy className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="mt-2">
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Prerequisites:</p>
                                <div className="flex flex-wrap gap-1">
                                  {step.prerequisites.map((req, reqIndex) => (
                                    <Badge key={reqIndex} variant="outline" className="text-xs">
                                      {req}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          {index < setupSteps.browser.length - 1 && (
                            <div className="absolute left-4 top-12 w-px h-16 bg-slate-300 dark:bg-slate-600"></div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h4 className="font-semibold text-green-800 dark:text-green-200">Expected Time: 5-10 minutes</h4>
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        This setup is perfect for quickly getting started and testing the application functionality.
                      </p>
                    </div>

                    <div className="mt-6">
                      <Button onClick={simulateSetup} className="w-full" size="lg">
                        <Rocket className="w-4 h-4 mr-2" />
                        Simulate Setup Process
                      </Button>
                      {setupProgress > 0 && (
                        <div className="mt-4">
                          <Progress value={Math.min(setupProgress, 100)} className="w-full" />
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            {setupProgress >= 100 ? "Setup Complete! 🎉" : `Setting up... ${Math.round(Math.min(setupProgress, 100))}%`}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="local" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <Terminal className="w-6 h-6 text-orange-600" />
                      <span className="text-lg font-semibold">Full Local Setup (with Ollama)</span>
                    </CardTitle>
                    <CardDescription>
                      Complete offline RAG experience using local models
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert className="mb-6">
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        Maximum data privacy with offline development. Data never leaves your machine.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-6">
                      {setupSteps.local.map((step, index) => (
                        <div key={index} className="relative">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-semibold">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1">{step.title}</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                {step.details}
                              </p>
                              <div className="relative">
                                <code className="block bg-slate-100 dark:bg-slate-800 p-3 rounded text-sm font-mono">
                                  {step.description}
                                </code>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute top-2 right-2 p-1 h-8 w-8"
                                  onClick={() => copyToClipboard(step.description)}
                                >
                                  <Copy className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="mt-2">
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Prerequisites:</p>
                                <div className="flex flex-wrap gap-1">
                                  {step.prerequisites.map((req, reqIndex) => (
                                    <Badge key={reqIndex} variant="outline" className="text-xs">
                                      {req}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          {index < setupSteps.local.length - 1 && (
                            <div className="absolute left-4 top-12 w-px h-16 bg-slate-300 dark:bg-slate-600"></div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-4 bg-orange-50 dark:bg-orange-900 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-5 h-5 text-orange-600" />
                        <h4 className="font-semibold text-orange-800 dark:text-orange-200">Expected Time: 15-30 minutes</h4>
                      </div>
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                        This setup provides complete offline functionality but requires additional dependencies.
                      </p>
                    </div>

                    <div className="mt-6">
                      <Button onClick={simulateSetup} className="w-full" size="lg">
                        <Terminal className="w-4 h-4 mr-2" />
                        Start Local Setup
                      </Button>
                      {setupProgress > 0 && (
                        <div className="mt-4">
                          <Progress value={Math.min(setupProgress, 100)} className="w-full" />
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            {setupProgress >= 100 ? "Local Setup Complete! 🎉" : `Setting up... ${Math.round(Math.min(setupProgress, 100))}%`}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section ref={(el) => sectionRefs.current.tech = el} className="py-12 px-4 bg-slate-50 dark:bg-slate-900/50 scroll-mt-20">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Technologies Used
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Built with modern, scalable technologies
            </p>
          </div>

          {/* Technology Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {technologies.map((tech, index) => (
              <Card key={index} className="text-center group relative overflow-hidden border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                <CardContent className="pt-6 relative z-10">
                  <div className="mb-4 w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <div className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      {tech.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{tech.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                    {tech.description}
                  </p>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                      {tech.version}
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                      {tech.category}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-300 group-hover:scale-105"
                    onClick={() => window.open(tech.website, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 mr-1 group-hover:translate-x-0.5 transition-transform" />
                    Visit Site
                  </Button>
                </CardContent>
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Card>
            ))}
          </div>

          {/* Technology Stack Visualization */}
          <Card className="max-w-6xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                Technology Stack Overview
              </CardTitle>
              <CardDescription>
                How technologies work together in RAG.WTF
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Connection Lines */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="hidden lg:flex items-center justify-center w-full">
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-200 via-green-200 to-purple-200 dark:from-blue-800 dark:via-green-800 dark:to-purple-800"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                  {/* Frontend Layer */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 rounded-2xl p-6 border border-blue-200 dark:border-blue-700/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="text-center mb-4">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                          <Code className="w-10 h-10 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">Frontend</h4>
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 mb-3">
                          Flutter
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Cross-platform UI framework</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Hot reload & development</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Rich widget library</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Backend Layer */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-800/50 rounded-2xl p-6 border border-green-200 dark:border-green-700/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="text-center mb-4">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
                          <DatabaseIcon className="w-10 h-10 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">Backend</h4>
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 mb-3">
                          SurrealDB
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>Vector database & storage</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>WASM support</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>Real-time data sync</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI/ML Layer */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50 rounded-2xl p-6 border border-purple-200 dark:border-purple-700/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="text-center mb-4">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                          <Cpu className="w-10 h-10 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-2">AI/ML</h4>
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-200 mb-3">
                          Multi-LLM
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Embeddings generation</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Text completion</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Multiple providers</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Integration Flow */}
                <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                      <span>User Interface</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Data Processing</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                      <span>AI Generation</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Community Section */}
      <section ref={(el) => sectionRefs.current.community = el} className="py-12 px-4 bg-slate-50 dark:bg-slate-900/50 scroll-mt-20">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Community & Roadmap
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Join our growing community and see what's coming next
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Testimonials */}
            <div>
              <h3 className="text-2xl font-bold mb-6">What People Say</h3>
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="border-slate-200 dark:border-slate-700">
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {testimonial.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{testimonial.name}</h4>
                            <span className="text-sm text-slate-500">•</span>
                            <span className="text-sm text-slate-500">{testimonial.role}</span>
                            <span className="text-sm text-slate-500">•</span>
                            <span className="text-sm text-slate-500">{testimonial.company}</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 italic">
                            "{testimonial.content}"
                          </p>
                          <div className="flex items-center space-x-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Roadmap */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Product Roadmap</h3>
              <div className="space-y-4">
                {roadmap.map((item, index) => (
                  <Card key={index} className="border-slate-200 dark:border-slate-700">
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-3 h-3 rounded-full mt-2 ${
                          item.status === 'completed' ? 'bg-green-500' :
                          item.status === 'in-progress' ? 'bg-yellow-500' :
                          'bg-slate-300'
                        }`}></div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold">{item.phase}</h4>
                            <Badge variant={
                              item.status === 'completed' ? 'default' :
                              item.status === 'in-progress' ? 'secondary' :
                              'outline'
                            }>
                              {item.status === 'completed' ? 'Completed' :
                               item.status === 'in-progress' ? 'In Progress' :
                               'Planned'}
                            </Badge>
                          </div>
                          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                            {item.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center space-x-2">
                                <Check className="w-3 h-3 text-green-500" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 max-w-2xl mx-auto">
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader className="text-center">
                <CardTitle>Stay Updated</CardTitle>
                <CardDescription>
                  Get the latest updates, features, and community news
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubscribe} className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button type="submit">
                    {isSubscribed ? <Check className="w-4 h-4 mr-2" /> : <Mail className="w-4 h-4 mr-2" />}
                    {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-slate-50 dark:bg-slate-900/50 scroll-mt-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Common questions about RAG.WTF
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What makes RAG.WTF different from other RAG solutions?</AccordionTrigger>
              <AccordionContent>
                RAG.WTF is unique because it runs entirely in the browser using SurrealDB WASM, providing enhanced data privacy and reducing server infrastructure costs. It's also built as a modular monorepo with Flutter, making it cross-platform and highly customizable. The client-side approach means your data never leaves your machine, and the modular architecture allows for easy extension and customization.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Do I need to set up a database?</AccordionTrigger>
              <AccordionContent>
                No! For the browser-only setup, RAG.WTF uses SurrealDB's in-browser storage (IndexedDB). However, if you want a full local setup with offline capabilities, you can set up a local SurrealDB instance using Docker. The browser-only approach is perfect for quick demos and testing, while the local setup provides more robust functionality for production use.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Which LLM providers are supported?</AccordionTrigger>
              <AccordionContent>
                RAG.WTF supports multiple LLM providers including Ollama (for local models), OpenAI, Anthropic, Gemini, and more. The settings UI is dynamically populated from a JSON configuration file, making it easy to add or modify providers. You can switch between providers seamlessly and even use different providers for embeddings vs. chat completions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Is RAG.WTF suitable for production use?</AccordionTrigger>
              <AccordionContent>
                Yes! RAG.WTF is production-ready with CI/CD pipelines, comprehensive testing, and deployment configurations. It includes GitHub Actions workflows for automated testing and deployment to Netlify. The modular architecture ensures maintainability, and the comprehensive documentation makes it easy to deploy and manage in production environments.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How can I contribute to the project?</AccordionTrigger>
              <AccordionContent>
                We welcome contributions! The project uses a fork-and-pull-request workflow. You can contribute by fixing bugs, adding features, improving documentation, or creating examples. Check out our GitHub repository for contribution guidelines, issue templates, and development setup instructions. We also have a community where you can connect with other contributors.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-12 px-4 bg-slate-50 dark:bg-slate-900/50 scroll-mt-20">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Share Your Feedback
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Help us improve RAG.WTF
            </p>
          </div>

          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="pt-6">
              <form onSubmit={handleFeedback} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Feedback</label>
                  <Textarea
                    placeholder="What do you think about RAG.WTF? How can we make it better?"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the growing community of developers building powerful RAG applications with RAG.WTF
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" variant="secondary">
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
              <Rocket className="w-5 h-5 mr-2" />
              Getting Started
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
              <MessageCircle className="w-5 h-5 mr-2" />
              Join Community
            </Button>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Twitter className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Linkedin className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Youtube className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MessageSquare className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-semibold">RAG.WTF</h3>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                An Open-Source, Modular RAG Application
              </p>
              <div className="flex space-x-2">
                <Badge variant="secondary" className="text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  MIT License
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Examples</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-slate-400 mb-4 md:mb-0">
                © 2024 RAG.WTF. Built with ❤️ by the community.
              </p>
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <span>Made with</span>
                <div className="flex space-x-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>and</span>
                  <Code className="w-4 h-4 text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          variant="default"
          size="sm"
          className="fixed bottom-8 right-8 z-50 rounded-full w-12 h-12 p-0 shadow-lg"
          onClick={scrollToTop}
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
      )}

      {/* Copy Notification */}
      {copiedCommand && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4" />
            <span>Copied to clipboard!</span>
          </div>
        </div>
      )}
    </div>
  );
}