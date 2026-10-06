import abaIntroduction from "@/assets/images/articles/aba-introduction.jpg";
import cbtChildren from "@/assets/images/articles/cbt-children.jpg";
import specialEducation from "@/assets/images/articles/special-education.jpg";
import type { Article } from "@/types/content";

/** English versions of the articles in src/content/articles.ts (same slugs, dates and images). UK terminology. */
export const articlesEn: Article[] = [
  {
    slug: "special-education-empowering-children",
    title: "How special education empowers children with special educational needs",
    excerpt:
      "Special education is one of the most important branches of modern education. It aims to provide a complete learning environment that takes individual differences into account.",
    publishedAt: "2025-11-02",
    image: { src: specialEducation, alt: "A teacher with children in a classroom" },
    body: [
      {
        type: "paragraph",
        text: "Special education is one of the most important branches of modern education. It aims to **provide a complete learning environment** that respects individual differences and meets the needs of children with disabilities or learning difficulties. It is not just a different curriculum: it is a **whole educational approach** that helps each child reach their full potential in every area of life.",
      },
      { type: "heading", level: 2, text: "What is special education?" },
      {
        type: "paragraph",
        text: "Special education is a set of educational programmes and services designed for people who face challenges with learning, communication, behaviour or movement. It supports their **academic, social and emotional development** in a safe, supportive environment.",
      },
      { type: "heading", level: 2, text: "The aims of special education" },
      {
        type: "list",
        ordered: false,
        items: [
          "Developing children's academic and behavioural skills in line with their abilities.",
          "Developing communication and social interaction skills.",
          "Building self-confidence and independence in daily life.",
          "Giving parents and teachers effective support strategies.",
          "Reducing social isolation and encouraging inclusion with their peers.",
        ],
      },
      { type: "heading", level: 2, text: "The core elements of special education programmes" },
      {
        type: "list",
        ordered: true,
        items: [
          "**Individual assessment:** identifying each child's needs accurately with specialist assessment tools.",
          "**Individual Education Plan (IEP):** a plan with clear targets and teaching strategies tailored to the child.",
          "**Early intervention:** spotting behavioural or developmental difficulties early greatly improves outcomes.",
          "**Working with families:** involving the family in learning, so that skills are practised consistently at home.",
        ],
      },
      { type: "heading", level: 2, text: "The role of teachers and specialists" },
      {
        type: "paragraph",
        text: "Teachers and specialists play a central role in achieving the aims of special education. Together, they:",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Use flexible teaching strategies that suit each pupil's level.",
          "Use positive reinforcement to encourage appropriate behaviour.",
          "Use visual supports and assistive technology to improve focus and attention.",
          "Monitor progress regularly and adjust plans when needed.",
        ],
      },
      { type: "heading", level: 2, text: "Inclusive education and building confidence" },
      {
        type: "paragraph",
        text: "One of the main trends in special education today is **inclusive education**, where pupils with special educational needs learn alongside their peers in mainstream classrooms. Inclusion builds self-esteem, develops communication skills and breaks down social barriers.",
      },
      { type: "heading", level: 2, text: "Supporting emotional and social development" },
      {
        type: "paragraph",
        text: "Special education is not limited to academic learning. It also supports **the child's emotional and social development**. Therapeutic and training programmes help children build a balanced personality and adapt to different situations with confidence and independence.",
      },
      { type: "heading", level: 2, text: "Conclusion" },
      {
        type: "paragraph",
        text: "Special education is more than teaching: it is **a humane mission** to build a fair society that values difference and embraces diversity. When specialists and families work together, children with special educational needs can become active, creative members of their communities.",
      },
    ],
  },
  {
    slug: "cbt-for-children-with-special-needs",
    title: "How cognitive behavioural therapy (CBT) supports children with special educational needs",
    excerpt:
      "Cognitive behavioural therapy is one of the most effective approaches to the emotional and behavioural difficulties that many children with special educational needs face.",
    publishedAt: "2025-11-02",
    image: { src: cbtChildren, alt: "A specialist talking with two children" },
    body: [
      {
        type: "paragraph",
        text: "Many children with special educational needs face emotional and behavioural difficulties that affect their ability to learn, communicate and adapt to the world around them. One of the most effective approaches to these difficulties is **cognitive behavioural therapy (CBT)**, which works on both thinking and behaviour to improve quality of life and learning.",
      },
      { type: "heading", level: 2, text: "What is cognitive behavioural therapy (CBT)?" },
      {
        type: "paragraph",
        text: "CBT is a talking therapy based on the link between **thoughts, feelings and behaviour**. It helps children notice negative or unhelpful thoughts and replace them with more realistic, balanced ways of thinking that lead to better behaviour.",
      },
      { type: "heading", level: 2, text: "The goals of CBT for children with special educational needs" },
      {
        type: "list",
        ordered: false,
        items: [
          "Helping children express their feelings in appropriate, safe ways.",
          "Reducing behaviours such as aggression and social withdrawal.",
          "Strengthening social communication and cooperation.",
          "Building self-confidence and a sense of self-efficacy.",
          "Helping children manage the anxiety and stress that daily challenges cause.",
        ],
      },
      { type: "heading", level: 2, text: "How is CBT used in practice?" },
      {
        type: "paragraph",
        text: "The specialist follows a series of gradual steps, adapted to the child's age and cognitive ability:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "**Cognitive and behavioural assessment:** identifying the situations that cause distress and the thoughts that go with them.",
          "**Cognitive restructuring:** teaching the child to tell realistic thoughts from unrealistic ones.",
          "**Behavioural skills training:** practical strategies such as relaxation, deep breathing and problem-solving.",
          "**Positive reinforcement:** rewarding appropriate behaviour so that it continues.",
        ],
      },
      { type: "heading", level: 2, text: "The role of the family and school" },
      {
        type: "paragraph",
        text: "Success does not depend on therapy sessions alone. It relies heavily on **cooperation between families and teachers**. Building CBT principles into the child's daily routine helps positive behaviours take hold faster and last longer.",
      },
      { type: "heading", level: 2, text: "Results in practice" },
      {
        type: "paragraph",
        text: "Recent studies suggest that children who had regular CBT sessions showed **improvements in communication and self-regulation** of more than 60%, along with a clear reduction in disruptive behaviour and social anxiety.",
      },
      { type: "heading", level: 2, text: "Summary" },
      {
        type: "paragraph",
        text: "CBT is more than a set of techniques: it is **a new way of thinking and relating to others** that helps children understand themselves and manage their feelings and behaviour. Combined with Applied Behaviour Analysis (ABA) and rehabilitation programmes, it becomes a powerful tool for well-rounded development.",
      },
    ],
  },
  {
    slug: "applied-behavior-analysis-introduction",
    title: "A practical introduction to Applied Behaviour Analysis (ABA) in education and rehabilitation",
    excerpt:
      "A clear framework for starting to use Applied Behaviour Analysis at school, at home and in the clinic, with examples and steps you can use straight away.",
    publishedAt: "2025-11-02",
    image: { src: abaIntroduction, alt: "A lecture on Applied Behaviour Analysis" },
    body: [
      {
        type: "paragraph",
        text: "Applied Behaviour Analysis (ABA) is a scientific, data-based approach to increasing desired behaviours and reducing behaviours that interfere with learning and adaptation. In this practical article, we set out a clear framework for using ABA at school, at home and in the clinic, with examples and steps you can put into practice straight away.",
      },
      { type: "heading", level: 2, text: "Why ABA now?" },
      {
        type: "paragraph",
        text: "Demand for evidence-based programmes in special education and rehabilitation has grown, especially for people with autism spectrum disorder and specific learning difficulties. ABA offers precise tools to measure behaviour, design interventions and track progress objectively, helping teachers, specialists and parents make informed decisions.",
      },
      { type: "heading", level: 2, text: "The foundations: measure before you intervene" },
      { type: "heading", level: 3, text: "1) Define the target behaviour" },
      {
        type: "paragraph",
        text: "Describe the behaviour objectively and in measurable terms: ‘raises their hand before answering’ rather than ‘behaves nicely’. The more precise the definition, the more reliable the measurement.",
      },
      { type: "heading", level: 3, text: "2) Take a baseline" },
      {
        type: "paragraph",
        text: "Collect initial data over at least 3–5 sessions: frequency, duration, intensity or inter-response time. This lets you compare behaviour before and after the intervention scientifically.",
      },
      { type: "heading", level: 2, text: "Core tools for behaviour change" },
      {
        type: "list",
        ordered: false,
        items: [
          "**Reinforcement:** deliver a preferred consequence straight after the desired behaviour to make it more likely to happen again. Use a variable schedule, then thin it gradually.",
          "**Shaping:** reinforce successive approximations of the target behaviour when the final behaviour is too hard to reach in one step.",
          "**Chaining:** break a skill into small steps (task analysis) and teach it with forward or backward chaining.",
          "**Prompting and fading:** give temporary help (verbal, physical or visual prompts), then fade it gradually to build independence.",
          "**Generalisation:** practise the skill in different settings, with different people and materials, so that it carries over into daily life.",
        ],
      },
      { type: "heading", level: 2, text: "Summary" },
      {
        type: "paragraph",
        text: "ABA offers a practical, scientific framework for lasting behaviour change. Combined with psychological and behavioural rehabilitation, it supports individual plans that increase opportunities for learning and independence. The right start: **a clear goal, accurate measurement and well-timed reinforcement**.",
      },
    ],
  },
];
