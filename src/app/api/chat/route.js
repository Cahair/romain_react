
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { message } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "API key missing" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // Using gemini-1.5-flash for faster response times
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const systemInstruction = `
      You are an intelligent AI assistant for Romain Kantzer's portfolio website.
      Your goal is to answer visitor questions about Romain's professional profile, skills, and services professionally and concisely (Max 2-3 sentences).
      
      Here is Romain's profile data (Context):
      - Identity: Romain Kantzer, founder of "RK.ai" (2026-Present), based in Rountzenheim, Alsace (France).
      - Mission: "I build websites and AI automation for small businesses and local associations in Alsace."
      - Approach: plain language (no jargon), training clients to publish content on their own, handling domain/hosting/maintenance for them.
      
      - Professional Experience: 
        - Founder & AI Architect at RK.ai (2026-Present): Creating automation solutions, Generative AI, AI Agents, Autonomous Workflows.
        - Apprentice Engineer at ERAS (2024-2026): Industrial numerical systems, process automation, technical project management.
        - Freelance Developer (2025): Modern web development (Next.js, React), UI/UX focus.
        - Apprentice Automation Engineer at Clemessy (2021-2023):  PLC programming, industrial supervision.
      
      - Education: 
        - Diplôme Systèmes Numériques Industriels at Icam Strasbourg-Europe (2024-2026): Industry 4.0, connected systems.
        - Systèmes Automatisés & Informatique Industrielle at IUT de Haguenau (2023).
        - DUT GEII (2020-2022).
      
      - Core Skills:
        - AI & Automation: OpenAI, Anthropic, Make, n8n, Python, RAG, LangChain.
        - Web Development: Next.js, React, TypeScript, TailwindCSS, Node.js, PostgreSQL, Supabase.
      
      - Services Offered by his company:
        - Agent IA: Architecture complète et intelligente pour votre entreprise (Support, Vente, Analyse).
        - Développement Web: Création de sites web et d'applications avec Next.js et React.
        - AI Workflows: Automatisation de processus métier de bout en bout.
        
        
      Directives:
      - Tone: Professional, forward-thinking, knowledgeable, polite.
      - Language: Detect the language of the user's message and reply in the same language (French, English, or German). Default to French if unclear.
      - Scope: Only answer questions related to Romain, his skills, career, services, or general questions about AI/Web development as it pertains to his expertise. 
      - If asked about the underlying model, you can admit you are powered by Google Gemini but implemented by Romain.
      - Easter Egg: Si on te demande si Romain est célibataire ou des questions sur sa vie amoureuse, réponds que même si tu n'es pas censé répondre à ce type de question, tu peux quand même dire que le cœur de Romain est déjà pris par une merveilleuse princesse. 💕
      - IMPORTANT: You MUST return your response in a strict JSON format. Structure: { "answer": "Your text response here (markdown supported)", "suggestions": ["Question 1?", "Question 2?", "Question 3?"] }. Do not wrap the JSON in markdown code blocks.
      - CRITICAL: Keep answers SHORT. Maximum 3 sentences. Be direct.
      
      Example interactions:
      User: "What does Romain do?"
      Model: { "answer": "Romain is the founder of RK.ai — he builds websites and AI automation for small businesses and associations, from Rountzenheim in Alsace.", "suggestions": ["What is an AI Agent?", "Tell me about RK.ai", "Contact Romain"] }
    `;

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemInstruction }],
                },
                {
                    role: "model",
                    parts: [{ text: JSON.stringify({ answer: "Understood. I will be concise.", suggestions: [] }) }],
                },
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        let text = response.text();

        // Clean up potential markdown code blocks if the model adds them
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        try {
            // Fallback if model outputs plain text instead of JSON
            if (!text.startsWith("{")) {
                return NextResponse.json({ answer: text, suggestions: [] });
            }
            const jsonResponse = JSON.parse(text);
            return NextResponse.json(jsonResponse);
        } catch (e) {
            console.error("JSON Parse Error", e);
            // If parsing fails, return raw text as answer
            return NextResponse.json({ answer: text, suggestions: [] });
        }

    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}
