// The four recovery articles, kept word for word from the live blog.
export type Block =
  | { type: "p" | "h2" | "h3"; text: string }
  | { type: "ul" | "ol"; items: string[] };

export type Article = { slug: string; title: string; date: string | null; excerpt: string; blocks: Block[] };

export const articles: Article[] = [
 {
  "slug": "mindfulness-in-eating-disorder-recovery",
  "title": "Mindfulness in Eating Disorder Recovery: Noticing Without Needing to Fix",
  "date": null,
  "blocks": [
   {
    "type": "p",
    "text": "Mindfulness is often described as calming, grounding, or peaceful — which can make it feel confusing when you try it and feel anything but calm."
   },
   {
    "type": "p",
    "text": "At Peace is Possible, we talk about mindfulness in eating disorder recovery in a different way."
   },
   {
    "type": "p",
    "text": "Mindfulness isn’t about clearing your mind. It’s not about controlling thoughts or emotions. And it’s not another thing to “do perfectly.”"
   },
   {
    "type": "p",
    "text": "Mindfulness is simply noticing what’s happening, with less judgment and more kindness."
   },
   {
    "type": "h3",
    "text": "What mindfulness means in eating disorder recovery"
   },
   {
    "type": "p",
    "text": "When you’re healing your relationship with food, your body, or yourself, mindful awareness can feel intense at first. You may notice urges, thoughts, body sensations, or emotions that you’ve learned to suppress or push away."
   },
   {
    "type": "p",
    "text": "This doesn’t mean mindfulness isn’t working. It means your awareness is growing."
   },
   {
    "type": "p",
    "text": "Mindfulness in recovery creates a pause — a small space between what you notice and how you respond. In that space, new options can emerge."
   },
   {
    "type": "p",
    "text": "Instead of:"
   },
   {
    "type": "ul",
    "items": [
     "“I shouldn’t feel this way”",
     "“I need to make this stop”",
     "“What’s wrong with me?”"
    ]
   },
   {
    "type": "p",
    "text": "Mindful awareness invites:"
   },
   {
    "type": "ul",
    "items": [
     "“This is here right now”",
     "“This makes sense given what I’ve been through”",
     "“I don’t have to fix this immediately”"
    ]
   },
   {
    "type": "h3",
    "text": "What mindfulness is not (especially in recovery)"
   },
   {
    "type": "p",
    "text": "Mindfulness is sometimes misunderstood — especially in eating disorder recovery and trauma-informed care."
   },
   {
    "type": "p",
    "text": "Mindfulness is not:"
   },
   {
    "type": "ul",
    "items": [
     "Ignoring hunger or body cues",
     "Using breathing techniques to override emotions",
     "Forcing calm or positivity",
     "Sitting still for long periods if that feels unsafe"
    ]
   },
   {
    "type": "p",
    "text": "If a mindfulness practice starts to feel like another rule, another way to perform, or another expectation you’re failing to meet — that’s a sign to slow down or adjust."
   },
   {
    "type": "p",
    "text": "Recovery-centered mindfulness should feel supportive, not controlling."
   },
   {
    "type": "h3",
    "text": "Mindfulness as a relationship, not a technique"
   },
   {
    "type": "p",
    "text": "Rather than thinking of mindfulness as something you do, it can be helpful to think of it as a relationship — with your body, your nervous system, and your inner experience."
   },
   {
    "type": "p",
    "text": "That relationship grows through honesty, patience, and repetition."
   },
   {
    "type": "p",
    "text": "Sometimes mindfulness practice looks like:"
   },
   {
    "type": "ul",
    "items": [
     "Noticing disconnection and naming it gently",
     "Feeling tension in your body without forcing it to relax",
     "Observing a difficult thought without arguing with it",
     "Drinking a cup of coffee and actually tasting it"
    ]
   },
   {
    "type": "p",
    "text": "These moments matter. Small moments count."
   },
   {
    "type": "h3",
    "text": "A simple mindfulness practice to try today"
   },
   {
    "type": "p",
    "text": "If you’re new to mindfulness or feeling overwhelmed, start here:"
   },
   {
    "type": "p",
    "text": "Once today, pause and finish this sentence:"
   },
   {
    "type": "p",
    "text": "“Right now, I’m noticing ______.”"
   },
   {
    "type": "p",
    "text": "That’s it."
   },
   {
    "type": "p",
    "text": "No fixing. No judging. No need to change what you notice."
   },
   {
    "type": "p",
    "text": "You can practice mindful awareness while eating, walking, resting, or feeling stuck. Mindfulness doesn’t require special conditions — only willingness."
   },
   {
    "type": "h3",
    "text": "Peace is possible — even here"
   },
   {
    "type": "p",
    "text": "Mindfulness doesn’t promise that everything will feel good. But it does offer a way to stay present with your experience, rather than fighting yourself for having one."
   },
   {
    "type": "p",
    "text": "Often, peace begins not when things are resolved — but when we stop trying to force ourselves into a different state."
   },
   {
    "type": "p",
    "text": "If you’d like to explore mindfulness in eating disorder recovery in a supported, compassionate way, I offer coaching and workshops through Peace is Possible. You are welcome exactly as you are."
   }
  ],
  "excerpt": "Mindfulness is simply noticing what’s happening, with less judgment and more kindness."
 },
 {
  "slug": "self-compassion-in-recovery-meeting-yourself-with-kindness",
  "title": "Self-Compassion in Eating Disorder Recovery: Meeting Yourself With Kindness",
  "date": "2026-01-14",
  "blocks": [
   {
    "type": "p",
    "text": "Self-compassion is often misunderstood as self-indulgence, weakness, or “letting yourself off the hook.” I like to remind my clients that self-compassion is one of the most powerful tools we have for healing and it does not mean making excuses for ourselves."
   },
   {
    "type": "p",
    "text": "At Peace Is Possible, we talk about self-compassion as a practice of meeting yourself as you are, not as you think you should be. It’s about learning how to stay present with your experience — even the uncomfortable parts — with care rather than criticism."
   },
   {
    "type": "p",
    "text": "This understanding is deeply influenced by the work of psychologist and meditation teacher Tara Brach, whose teachings on radical acceptance and compassion have helped many people re-learn how to relate to themselves with kindness. Tara's teachings have been particularly helpful for my own recovery from eating disorders."
   },
   {
    "type": "h2",
    "text": "What is self-compassion?"
   },
   {
    "type": "p",
    "text": "Self-compassion means responding to your own pain, mistakes, or struggles the way you might respond to a close friend — with warmth, understanding, and patience."
   },
   {
    "type": "p",
    "text": "According to Tara Brach’s work, compassion begins when we stop turning away from our pain and instead allow it to be seen and met. Not fixed. Not judged. Just acknowledged."
   },
   {
    "type": "p",
    "text": "Self-compassion includes three key elements:"
   },
   {
    "type": "ul",
    "items": [
     "Awareness: noticing what you’re feeling",
     "Kindness: offering care rather than criticism",
     "Connection: remembering that suffering is part of being human"
    ]
   },
   {
    "type": "p",
    "text": "This matters deeply when healing from disordered eating, where shame and self-judgment often feel automatic."
   },
   {
    "type": "h2",
    "text": "Why self-compassion is essential in eating disorder recovery"
   },
   {
    "type": "p",
    "text": "Many people come to recovery with a long history of being hard on themselves. You may have learned to motivate change through control, punishment, or harsh self-talk. Even when those strategies no longer work, they can be hard to let go of."
   },
   {
    "type": "p",
    "text": "Self-compassion offers a different path."
   },
   {
    "type": "p",
    "text": "Rather than asking, “What’s wrong with me?”, self-compassion asks:"
   },
   {
    "type": "ul",
    "items": [
     "“What’s hurting right now?”",
     "“What do I need in this moment?”",
     "“How can I stay present without abandoning myself?”"
    ]
   },
   {
    "type": "p",
    "text": "Research shows that self-compassion supports emotional regulation, resilience, and long-term behavior change. But beyond the science, many people in recovery find that compassion is what makes healing feel possible — and sustainable."
   },
   {
    "type": "h2",
    "text": "Compassion is not the same as self-improvement"
   },
   {
    "type": "p",
    "text": "One of the most important ideas in Tara Brach’s teachings is that compassion doesn’t require you to become someone else first."
   },
   {
    "type": "p",
    "text": "You don’t have to:"
   },
   {
    "type": "ul",
    "items": [
     "Be calmer",
     "Be more disciplined",
     "Be further along in recovery"
    ]
   },
   {
    "type": "p",
    "text": "Compassion meets you here, not at some imagined future version of yourself."
   },
   {
    "type": "p",
    "text": "This can feel uncomfortable at first. If you’ve relied on self-criticism to survive, kindness may feel unfamiliar or even unsafe. That doesn’t mean you’re doing it wrong. It means you’re learning something new."
   },
   {
    "type": "h2",
    "text": "The role of mindfulness in self-compassion"
   },
   {
    "type": "p",
    "text": "Self-compassion begins with mindfulness — the ability to notice what’s happening without immediately trying to change it."
   },
   {
    "type": "p",
    "text": "Tara Brach often emphasizes that we can’t offer compassion to what we refuse to feel. In recovery, this might look like gently acknowledging:"
   },
   {
    "type": "ul",
    "items": [
     "Urges",
     "Shame",
     "Fear",
     "Exhaustion",
     "Grief"
    ]
   },
   {
    "type": "p",
    "text": "Mindfulness creates the space for compassion by allowing us to say: “This is here right now.” From there, compassion responds with: “And I can be kind to myself while it’s here.”"
   },
   {
    "type": "h2",
    "text": "A simple self-compassion practice"
   },
   {
    "type": "p",
    "text": "If you’re new to self-compassion, start small. You don’t need to force loving feelings or positive affirmations."
   },
   {
    "type": "p",
    "text": "Try this gentle practice:"
   },
   {
    "type": "p",
    "text": "1. Pause and noticeName what’s present: “This is hard,” or “I’m feeling overwhelmed.”"
   },
   {
    "type": "p",
    "text": "2. Acknowledge shared humanitySilently remind yourself: “I’m not alone in this. Other people feel this too.”"
   },
   {
    "type": "p",
    "text": "3. Offer a kind responseAsk: “What would feel supportive right now?” This might be a softer tone, a deep breath, or simply permission to rest."
   },
   {
    "type": "p",
    "text": "Even brief moments of self-compassion can begin to soften the inner environment."
   },
   {
    "type": "h2",
    "text": "Self-compassion doesn’t mean you won’t struggle"
   },
   {
    "type": "p",
    "text": "Being compassionate with yourself doesn’t mean recovery suddenly becomes easy. You will still have difficult days. You may still feel stuck, frustrated, or unsure."
   },
   {
    "type": "p",
    "text": "What changes is how you relate to those moments."
   },
   {
    "type": "p",
    "text": "Instead of layering shame on top of pain, self-compassion allows pain to move through with less resistance. Over time, this can reduce the intensity and duration of struggle — not because you’re forcing change, but because you’re no longer fighting yourself."
   },
   {
    "type": "h2",
    "text": "Compassion as a practice, not a personality trait"
   },
   {
    "type": "p",
    "text": "Self-compassion isn’t something you either have or don’t have. It’s a practice — one that grows through repetition and patience."
   },
   {
    "type": "p",
    "text": "Some days compassion may feel accessible. Other days it may feel distant. Both are part of the process."
   },
   {
    "type": "p",
    "text": "As Tara Brach teaches, compassion deepens when we keep returning — again and again — to presence and kindness, even when we forget."
   },
   {
    "type": "h2",
    "text": "Peace is possible — through compassion"
   },
   {
    "type": "p",
    "text": "Self-compassion is not a quick fix. It’s a way of relating to yourself that makes healing more spacious, more honest, and more humane."
   },
   {
    "type": "p",
    "text": "In recovery, compassion helps you stay connected to yourself — not just when things are going well, but especially when they aren’t."
   },
   {
    "type": "p",
    "text": "And often, peace begins not when everything is resolved, but when you stop abandoning yourself in moments of pain."
   },
   {
    "type": "p",
    "text": "If you’d like support cultivating self-compassion in your recovery, I offer coaching and workshops through Peace Is Possible. You’re welcome exactly as you are."
   }
  ],
  "excerpt": "Self-compassion is a practice of meeting yourself as you are, not as you think you should be."
 },
 {
  "slug": "intention-in-eating-disorder-recovery-awareness-first-then-choice",
  "title": "Intention in Eating Disorder Recovery: Awareness First, Then Choice",
  "date": "2026-01-22",
  "blocks": [
   {
    "type": "p",
    "text": "In eating disorder recovery, we often focus on changing behaviors like what we eat, how we move, or what habits we’re trying to let go of. But lasting recovery isn’t built on behavior alone. It’s built on intention."
   },
   {
    "type": "p",
    "text": "Understanding why we do what we do — and learning how to set intentions that support healing — can help us distinguish between behaviors that quietly maintain the eating disorder and those that genuinely promote recovery."
   },
   {
    "type": "p",
    "text": "My clients and I often discuss how two people can make the same choice and experience very different outcomes. The difference is often intention."
   },
   {
    "type": "h2",
    "text": "Part 1: Awareness of Intention — Using the Why as Information"
   },
   {
    "type": "p",
    "text": "Before we try to change behavior, recovery asks us to build awareness."
   },
   {
    "type": "p",
    "text": "Eating disorders are often driven by automatic, fear-based motivations: control, avoidance, punishment, or numbing. Many of these motivations operate below conscious awareness, which is why recovery work begins with noticing — not fixing."
   },
   {
    "type": "h3",
    "text": "Why Awareness of Intention Matters"
   },
   {
    "type": "p",
    "text": "When we pause to ask, “What’s driving this behavior?”, we create space between ourselves and the eating disorder voice. That space allows for choice, self-compassion, and flexibility — all essential components of recovery."
   },
   {
    "type": "p",
    "text": "Without awareness of intention, behaviors can appear “healthy” while still being driven by eating disorder logic."
   },
   {
    "type": "h3",
    "text": "The Same Behavior, Different Intentions"
   },
   {
    "type": "p",
    "text": "Exercise"
   },
   {
    "type": "ul",
    "items": [
     "Recovery-supportive intention:“I want to move my body because it helps my mood and helps me feel grounded.”",
     "Eating disorder-driven intention:“I need to burn calories or compensate for eating.”"
    ]
   },
   {
    "type": "p",
    "text": "Food Choices"
   },
   {
    "type": "ul",
    "items": [
     "Recovery-supportive intention:“This food sounds satisfying and meets my needs.”",
     "Eating disorder-driven intention:“This feels safer, less scary, or more controlled.”"
    ]
   },
   {
    "type": "p",
    "text": "The behavior itself doesn’t define recovery — the intention behind it does."
   },
   {
    "type": "h3",
    "text": "Awareness Is Not the Same as Judgment"
   },
   {
    "type": "p",
    "text": "Noticing that a behavior is driven by eating disorder intentions does not mean you’ve failed. Awareness is data."
   },
   {
    "type": "p",
    "text": "In fact, being able to identify fear-based or control-based motivation is a sign that recovery is already happening. You can’t change what you can’t see — and seeing it clearly is progress."
   },
   {
    "type": "p",
    "text": "Helpful awareness questions include:"
   },
   {
    "type": "ul",
    "items": [
     "Would I still do this if weight or calories weren’t part of the equation?",
     "Is this coming from care or control?",
     "Does this move me toward freedom or reinforce rules?",
     "Will doing this cultivate connection and long-term joy?"
    ]
   },
   {
    "type": "p",
    "text": "You don’t need perfect answers. Honest ones are enough."
   },
   {
    "type": "h2",
    "text": "Part 2: Setting Intentions That Actively Support Recovery"
   },
   {
    "type": "p",
    "text": "Once awareness is present, recovery invites a second step: choosing intentions that align with healing, even when discomfort is present."
   },
   {
    "type": "p",
    "text": "This doesn’t mean forcing “positive” intentions or ignoring fear. It means gently orienting behavior toward your values instead of the eating disorder’s demands."
   },
   {
    "type": "h3",
    "text": "What Recovery-Aligned Intentions Look Like"
   },
   {
    "type": "p",
    "text": "Recovery-supportive intentions are often rooted in:"
   },
   {
    "type": "ul",
    "items": [
     "nourishment rather than restriction",
     "curiosity rather than judgment",
     "flexibility rather than rigidity",
     "self-compassion rather than self-control"
    ]
   },
   {
    "type": "p",
    "text": "Examples:"
   },
   {
    "type": "ul",
    "items": [
     "“I’m eating regularly to support my brain, mood, and energy.”",
     "“I’m resting today because recovery requires repair, not punishment.”",
     "“I’m practicing consistency, not perfection.”",
     "“I’m choosing discomfort now to build long-term freedom.”"
    ]
   },
   {
    "type": "p",
    "text": "These intentions don’t eliminate fear — but they change who’s in charge."
   },
   {
    "type": "h3",
    "text": "Intention Setting as a Tool for Behavior Change"
   },
   {
    "type": "p",
    "text": "Research on behavior change consistently shows that values-based intentions are more sustainable than fear-based ones. In eating disorder recovery, this matters deeply."
   },
   {
    "type": "p",
    "text": "When behaviors are driven by:"
   },
   {
    "type": "ul",
    "items": [
     "guilt",
     "anxiety",
     "control",
     "body dissatisfaction"
    ]
   },
   {
    "type": "p",
    "text": "They tend to escalate, morph, or rebound."
   },
   {
    "type": "p",
    "text": "When behaviors are guided by intentional recovery goals — such as stability, nourishment, emotional regulation, or connection — they’re more likely to support long-term healing."
   },
   {
    "type": "h3",
    "text": "Small, Repeatable Intentions Matter Most"
   },
   {
    "type": "p",
    "text": "Intentions don’t need to be grand or inspirational. In fact, the most effective ones are simple and repeatable:"
   },
   {
    "type": "ul",
    "items": [
     "“Today, I intend to eat enough.”",
     "“I intend to respond to urges with curiosity.”",
     "“I intend to practice consistency over compensation.”"
    ]
   },
   {
    "type": "p",
    "text": "Over time, these intentions help retrain the nervous system and weaken the eating disorder’s influence."
   },
   {
    "type": "h2",
    "text": "Recovery Is Direction, Not Perfection"
   },
   {
    "type": "p",
    "text": "You won’t always act from recovery-aligned intentions — and that’s okay."
   },
   {
    "type": "p",
    "text": "What matters is:"
   },
   {
    "type": "ul",
    "items": [
     "noticing when the eating disorder is driving",
     "gently re-orienting when possible",
     "continuing to practice awareness and choice"
    ]
   },
   {
    "type": "p",
    "text": "Recovery isn’t about eliminating certain behaviors overnight. It’s about shifting the underlying motivation again and again."
   },
   {
    "type": "h3",
    "text": "Final Thought"
   },
   {
    "type": "p",
    "text": "In eating disorder recovery, the most important question isn’t just “What am I doing?” It’s “What intention is guiding this choice — and is it helping me heal?”"
   },
   {
    "type": "p",
    "text": "When intention is rooted in compassion and clarity, healthy behavior change becomes not only possible, but sustainable."
   }
  ],
  "excerpt": "Two people can make the same choice and experience very different outcomes. The difference is often intention."
 },
 {
  "slug": "the-power-of-authenticity-in-eating-disorder-recovery",
  "title": "The Power of Authenticity in Eating Disorder Recovery",
  "date": "2026-01-29",
  "blocks": [
   {
    "type": "p",
    "text": "Eating disorder recovery is not just about changing behaviors around food, exercise, or body image. At its core, recovery is about coming home to yourself — your truth, your values, and your lived experience. One of the most overlooked yet transformative elements of eating disorder recovery is authenticity."
   },
   {
    "type": "p",
    "text": "In recovery coaching, authenticity isn’t a buzzword. It’s a practice. And it’s often the difference between feeling stuck in recovery and feeling genuinely free."
   },
   {
    "type": "h2",
    "text": "What Authenticity Really Means in Eating Disorder Recovery"
   },
   {
    "type": "p",
    "text": "Authenticity means being truthful to your own experience — even when that truth feels uncomfortable, messy, or unfinished. It means acknowledging, and when appropriate expressing, what you actually feel, need, want, or fear, rather than what you think you should feel."
   },
   {
    "type": "p",
    "text": "For many people struggling with eating disorders, inauthenticity becomes a survival strategy:"
   },
   {
    "type": "ul",
    "items": [
     "Hiding behaviors",
     "Minimizing struggles",
     "Performing “being fine”",
     "Saying yes when you mean no",
     "Disconnecting from your body’s signals"
    ]
   },
   {
    "type": "p",
    "text": "These patterns often developed for understandable reasons — protection, control, belonging. But over time, they can quietly maintain the eating disorder."
   },
   {
    "type": "p",
    "text": "Authenticity in eating disorder recovery invites a different question: What is true for me right now? Not what’s ideal. Not what looks “recovered.” Just what’s real."
   },
   {
    "type": "h2",
    "text": "Authenticity Aligns Actions With Values — and That Feels Freeing"
   },
   {
    "type": "p",
    "text": "A core goal of recovery coaching is helping people reconnect with their values — things like connection, honesty, health, creativity, freedom, or compassion. When we are authentic, our actions begin to align with those values."
   },
   {
    "type": "p",
    "text": "For example:"
   },
   {
    "type": "ul",
    "items": [
     "Eating enough because you value vitality and presence",
     "Resting because you value sustainability, not punishment",
     "Speaking up because you value honesty over approval",
     "Asking for support because you value connection over control"
    ]
   },
   {
    "type": "p",
    "text": "This alignment feels relieving. There’s less internal friction. Less mental negotiation. Less shame. In eating disorder recovery, authenticity reduces the exhausting inner split between who you are, who you pretend to be and who the eating disorder wants you to be. When your behavior matches your values, life feels lighter — even when recovery is still hard."
   },
   {
    "type": "h2",
    "text": "The Emotional Weight of Inauthenticity"
   },
   {
    "type": "p",
    "text": "Being inauthentic is heavy."
   },
   {
    "type": "p",
    "text": "It requires constant monitoring:"
   },
   {
    "type": "ul",
    "items": [
     "“Did I say too much?”",
     "“What if they really knew?”",
     "“I can’t let this show.”",
     "“I’ll deal with it later.”"
    ]
   },
   {
    "type": "p",
    "text": "This internal pressure drains energy and reinforces isolation. Many people in eating disorder recovery describe feeling lonely even when surrounded by others — not because no one cares, but because no one is meeting the real version of them."
   },
   {
    "type": "p",
    "text": "Inauthenticity blocks connection. You can’t feel truly seen if you’re hiding parts of yourself. And connection is one of the most powerful healing forces in recovery."
   },
   {
    "type": "h2",
    "text": "Authenticity Builds Real Connection and Support"
   },
   {
    "type": "p",
    "text": "Authenticity allows others — coaches, therapists, friends, partners — to actually support you. When you share what’s true, you create space for empathy instead of assumptions."
   },
   {
    "type": "p",
    "text": "In recovery coaching, this might look like:"
   },
   {
    "type": "ul",
    "items": [
     "Admitting you’re struggling even if you “shouldn’t be”",
     "Naming urges instead of acting on them silently",
     "Expressing anger, grief, or ambivalence about recovery",
     "Letting your coach see the parts of you that feel contradictory"
    ]
   },
   {
    "type": "p",
    "text": "Authenticity doesn’t mean oversharing or forcing vulnerability. It means accepting your current experience and allowing yourself to share it when it is safe and helpful to do so. And when authenticity is met with compassion, something powerful happens: shame loosens its grip."
   },
   {
    "type": "h2",
    "text": "Authenticity Is a Practice, Not a Personality Trait"
   },
   {
    "type": "p",
    "text": "Many people believe they’re “bad at authenticity” or that they need to be braver before they can be real. In reality, authenticity is a skill — one that can be practiced gently over time."
   },
   {
    "type": "p",
    "text": "Recovery coaching often focuses on:"
   },
   {
    "type": "ul",
    "items": [
     "Increasing awareness of internal experiences",
     "Noticing when you’re abandoning yourself to please or perform",
     "Practicing small acts of honesty",
     "Learning to tolerate discomfort without self-betrayal"
    ]
   },
   {
    "type": "p",
    "text": "You don’t have to be fully authentic all at once. Even tiny moments of truth — with yourself or others — can create momentum in eating disorder recovery."
   },
   {
    "type": "h2",
    "text": "Why Authenticity Matters for Long-Term Recovery"
   },
   {
    "type": "p",
    "text": "Behavior change without authenticity often leads to burnout or relapse. When recovery is driven by external rules or expectations, it can feel rigid and fragile."
   },
   {
    "type": "p",
    "text": "Authentic recovery is different:"
   },
   {
    "type": "ul",
    "items": [
     "It’s flexible",
     "It’s values-driven",
     "It adapts as you grow",
     "It feels like yours"
    ]
   },
   {
    "type": "p",
    "text": "This is why recovery coaching places such an emphasis on self-trust and lived experience. Sustainable eating disorder recovery isn’t about becoming someone else — it’s about reclaiming who you already are."
   },
   {
    "type": "h2",
    "text": "Final Thoughts"
   },
   {
    "type": "p",
    "text": "Authenticity doesn’t make recovery easy — but it makes it real. And real recovery is what creates freedom."
   },
   {
    "type": "p",
    "text": "When you stop hiding, stop performing, and stop abandoning your truth, you create space for healing, connection, and alignment. That space is where eating disorder recovery can truly take root."
   },
   {
    "type": "p",
    "text": "If you’re navigating recovery and craving something more honest, supportive, and values-based, recovery coaching can help you practice authenticity in a way that feels safe and empowering."
   },
   {
    "type": "p",
    "text": "Because you don’t need to become more worthy to recover — you need to become more you."
   }
  ],
  "excerpt": "Recovery is about coming home to yourself: your truth, your values, and your lived experience."
 }
];
