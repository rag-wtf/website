"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  Github,
  Star,
  Shield,
  Zap,
  Database,
  Brain,
  Lock,
  Smartphone,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Users,
  Download,
  Play,
  BookOpen,
  Sparkles,
  TrendingUp,
  Globe,
  Cpu,
} from "lucide-react"

export default function RAGWTFLanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.3, 0.1, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const features = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Client-Side RAG",
      description: "Runs entirely in the browser using SurrealDB WASM for a secure, serverless-optional experience.",
      highlight: "100% Private",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Modular Monorepo",
      description: "Built with Melos, separating concerns into distinct packages for better maintainability.",
      highlight: "Easy to Extend",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Multi-Provider LLM Support",
      description: "Pre-configured for Ollama, OpenAI, Anthropic, Gemini, and more LLM providers.",
      highlight: "5+ Providers",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enhanced Data Privacy",
      description: "User data can remain on the client machine, never being sent to a server.",
      highlight: "Zero Leaks",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Cost-Effective",
      description: "Reduces server-side infrastructure needs, making it economical for personal use.",
      highlight: "Save 90%",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Cross-Platform",
      description: "Built with Flutter for seamless deployment across web, mobile, and desktop.",
      highlight: "All Platforms",
    },
  ]

  const techStack = [
    { name: "Flutter", color: "bg-blue-500" },
    { name: "Dart", color: "bg-cyan-500" },
    { name: "SurrealDB", color: "bg-purple-500" },
    { name: "Firebase", color: "bg-orange-500" },
    { name: "Melos", color: "bg-green-500" },
  ]

  const stats = [
    { icon: <Star className="w-5 h-5" />, value: "2.1k", label: "GitHub Stars" },
    { icon: <Download className="w-5 h-5" />, value: "15k+", label: "Downloads" },
    { icon: <Users className="w-5 h-5" />, value: "500+", label: "Developers" },
    { icon: <Globe className="w-5 h-5" />, value: "50+", label: "Countries" },
  ]

  const codeExample = `// Simple RAG query example
import { RAGClient } from 'rag-wtf';

const client = new RAGClient({
  provider: 'ollama',
  model: 'llama2',
  storage: 'local'
});

const result = await client.query(
  "What are the key features of Flutter?"
);

console.log(result.answer);
// "Flutter is Google's UI toolkit for building 
// natively compiled applications..."`

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Enhanced Animated Background */}
      <motion.div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{ y: backgroundY, opacity: backgroundOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div
          className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </motion.div>

      {/* Enhanced Header */}
      <motion.header
        className="relative z-10 px-6 py-4 border-b border-border/50 backdrop-blur-sm bg-background/80"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
            <div className="w-8 h-8 flex items-center justify-center">
              <Image src="/logo.svg" alt="RAG.WTF Logo" width={32} height={32} className="w-full h-full" />
            </div>
            <span className="font-montserrat font-bold text-xl">
              RAG.<span className="text-accent">WTF</span>
            </span>
          </motion.div>
          {/* {["Features", "Architecture", "Getting Started", "Docs"] */}
          <nav className="hidden md:flex items-center gap-8">
            {["Features", "Architecture", "Getting Started"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="font-open-sans text-muted-foreground hover:text-foreground transition-colors relative group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </nav>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button variant="outline" size="sm" className="gap-2 bg-transparent hover:bg-primary/10" asChild>
              <a href="https://github.com/rag-wtf/app" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg"
              asChild
            >
              <a href="https://github.com/rag-wtf/app" target="_blank" rel="noopener noreferrer">
                <Star className="w-4 h-4" />
                <span className="hidden sm:inline">Star</span>
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Enhanced Hero Section */}
      <section className="relative z-10 px-6 py-20 md:py-32">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
              <Sparkles className="w-3 h-3 mr-1" />
              Open Source • Privacy-First • Modular
            </Badge>

            <h1 className="font-montserrat font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Private,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Modular</span>
              <br />
              <span className="font-open-sans font-normal text-3xl md:text-5xl lg:text-6xl">RAG Application</span>
            </h1>

            <p className="font-open-sans text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              A comprehensive, <span className="font-montserrat font-semibold text-foreground">Flutter-based</span>{" "}
              Retrieval-Augmented Generation application built to be{" "}
              <span className="font-montserrat font-semibold text-accent">open-source</span>, modular, and easy to
              deploy. Full control over your{" "}
              <span className="font-montserrat font-semibold text-primary">data and infrastructure</span>.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <a href="#getting-started"> 
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 font-montserrat shadow-lg hover:shadow-xl transition-all"
            >
              <Play className="w-4 h-4" />
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
            </a>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 font-open-sans bg-transparent hover:bg-primary/5"
              asChild
            >
              <a href="https://app.rag.wtf" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                Try for FREE
              </a>
            </Button>
          </motion.div>

        {/* Comment out stats
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="text-primary">{stat.icon}</div>
                  <span className="font-montserrat font-bold text-2xl">{stat.value}</span>
                </div>
                <span className="font-open-sans text-sm text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        */}
          {/* Tech Stack Pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className={`px-4 py-2 rounded-full ${tech.color} text-white text-sm font-open-sans font-medium shadow-lg`}
                whileHover={{ scale: 1.1, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                {tech.name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="relative z-10 px-6 py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">
              Why Choose <span className="text-accent">RAG.WTF</span>?
            </h2>
            <p className="font-open-sans text-lg text-muted-foreground max-w-2xl mx-auto">
              We named it <span className="font-montserrat font-semibold text-foreground">RAG.WTF</span> because we
              wanted to answer "WTF is the RAG?" with unprecedented simplicity—and make setup so simple you'll say
              <span className="font-montserrat font-semibold text-primary"> "Wow, That's Fast!"</span>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                          {feature.icon}
                        </div>
                        <h3 className="font-montserrat font-semibold text-lg">{feature.title}</h3>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-accent/10 text-accent border-accent/20">
                        {feature.highlight}
                      </Badge>
                    </div>
                    <p className="font-open-sans text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="relative z-10 px-6 py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">
              <span className="text-primary">Architectural</span> Overview
            </h2>
            <p className="font-open-sans text-lg text-muted-foreground max-w-3xl mx-auto">
              The application follows a standard{" "}
              <span className="font-montserrat font-semibold text-foreground">RAG pipeline</span>, orchestrated across
              its modular packages for maximum flexibility and maintainability.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Document Ingestion",
                description:
                  "Upload documents through the UI, send to text-splitting service, chunk, and generate vector embeddings.",
                color: "from-blue-500 to-cyan-500",
                icon: <BookOpen className="w-5 h-5" />,
              },
              {
                step: "02",
                title: "Storage & Indexing",
                description:
                  "Text chunks and vector embeddings are stored locally or remotely in SurrealDB for fast retrieval.",
                color: "from-purple-500 to-pink-500",
                icon: <Database className="w-5 h-5" />,
              },
              {
                step: "03",
                title: "Retrieval & Generation",
                description:
                  "Query vectorization, similarity search, and context-aware answer generation using your chosen LLM.",
                color: "from-orange-500 to-red-500",
                icon: <Cpu className="w-5 h-5" />,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden hover:bg-card/80 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}
                      >
                        <span className="font-montserrat font-bold text-white">{item.step}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="font-montserrat font-semibold text-xl mb-3">{item.title}</h3>
                    <p className="font-open-sans text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
                {index < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Getting Started Section */}
      <section id="getting-started" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">
              Get Started in <span className="text-accent">Minutes</span>
            </h2>
            <p className="font-open-sans text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your setup based on your needs. From{" "}
              <span className="font-montserrat font-semibold text-foreground">web application</span> to{" "} 
              <span className="font-montserrat font-semibold text-primary">full local deployment</span>.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: "Web Application",
                subtitle: "Production-ready Single-Page Application",
                features: [
                  "Full-featured SPA deployment",
                  "Cloud LLM integration",
                  "Persistent browser storage",
                  "Zero server requirements",
                ],
                cta: "Launch App",
                popular: true,
                icon: <Globe className="w-5 h-5" />,
              },
              {
                title: "Local Setup",
                subtitle: "Maximum privacy & control",
                features: ["Complete offline experience", "Local Ollama models", "Docker SurrealDB", "Zero API costs"],
                // cta: "Download & Install",
                cta: "Coming Soon",
                popular: false,
                icon: <Download className="w-5 h-5" />,
              },
            ].map((setup, index) => (
              <motion.div
                key={setup.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="relative"
              >
                {setup.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-accent text-accent-foreground px-3 py-1 shadow-lg">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <Card
                  className={`h-full border-border/50 bg-card/50 backdrop-blur-sm ${setup.popular ? "ring-2 ring-accent/20" : ""}`}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">{setup.icon}</div>
                      <h3 className="font-montserrat font-bold text-2xl">{setup.title}</h3>
                    </div>
                    <p className="font-open-sans text-muted-foreground mb-6">{setup.subtitle}</p>

                    <div className="space-y-3 mb-8">
                      {setup.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="font-open-sans text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className={`w-full gap-2 ${setup.popular ? "bg-gradient-to-r from-primary to-accent" : "bg-primary"} hover:opacity-90 shadow-lg`}
                      asChild={setup.title === "Web Application"}
                    >
                      {setup.title === "Web Application" ? (
                        <a href="https://app.rag.wtf" target="_blank" rel="noopener noreferrer">
                          {setup.cta} <ArrowRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <>
                          {setup.cta} {/*<ArrowRight className="w-4 h-4" />*/}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="relative z-10 px-6 py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">
              Join the <span className="text-accent">Community</span>
            </h2>
            <p className="font-open-sans text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Connect with developers, share your projects, and get help from the RAG.WTF community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: <Github className="w-6 h-6" />,
                title: "GitHub Discussions",
                description: "Ask questions, share ideas, and collaborate on features",
                cta: "Join Discussion",
                color: "from-gray-600 to-gray-800",
              },
              {
                icon: <BookOpen className="w-6 h-6" />,
                title: "Documentation",
                description: "Comprehensive guides, tutorials, and API reference - Coming Soon!",
                cta: "Coming Soon",
                color: "from-blue-500 to-cyan-500",
                disabled: true,
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group">
                  <CardContent className="p-6 text-center flex flex-col h-full">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <div className="text-white">{item.icon}</div>
                    </div>
                    <h3 className="font-montserrat font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="font-open-sans text-muted-foreground text-sm mb-4 flex-grow">{item.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`group-hover:bg-primary/10 bg-transparent ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={item.disabled}
                      asChild={!item.disabled}
                    >
                      {item.disabled ? (
                        <span>{item.cta}</span>
                      ) : (
                        <a href="https://github.com/rag-wtf/app/discussions" target="_blank" rel="noopener noreferrer">
                          {item.cta}
                        </a>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-border/50 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image src="/logo.svg" alt="RAG.WTF Logo" width={32} height={32} className="w-full h-full" />
              </div>
              <span className="font-montserrat font-bold text-xl">
                RAG.<span className="text-accent">WTF</span>
              </span>
            </div>
            <div className="flex items-center gap-6 order-3 md:order-2">  
              {/*
              <a
                href="https://github.com/rag-wtf/app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-open-sans text-muted-foreground hover:text-foreground transition-colors hover:underline"
              >
                Documentation
              </a>
            
              <a
                href="https://github.com/rag-wtf/app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-open-sans text-muted-foreground hover:text-foreground transition-colors hover:underline"
              >
                GitHub
              </a>
              <a
                href="https://github.com/rag-wtf/app/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="font-open-sans text-muted-foreground hover:text-foreground transition-colors hover:underline"
              >
                Community
              </a>
            */}
            © 2025 RAG.WTF. All rights reserved.   
            </div>      
            <p className="font-open-sans text-sm text-muted-foreground text-center md:text-right order-2 md:order-3">
              MIT License • Built with ❤️ for developers
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
