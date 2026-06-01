import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body.prompt || '';
    const stream = body.stream || false;
    let responseText = '';

    if (prompt.includes('expert ATS resume analyzer')) {
      responseText = JSON.stringify({
        atsScore: 85,
        keywords: ["React", "TypeScript", "Node.js"],
        missingSkills: ["Docker", "GraphQL"],
        suggestions: ["Add more quantitative metrics to your experience bullet points.", "Include a link to your portfolio."],
        formatScore: 90,
        contentScore: 80,
        overallFeedback: "This is a solid resume! To improve it further, try to focus on the impact of your work rather than just listing responsibilities."
      });
    } else if (prompt.includes('expert interviewer. Generate 3')) {
      responseText = JSON.stringify([
        {
          id: "q1",
          question: "Can you explain the difference between REST and GraphQL?",
          category: "technical",
          difficulty: "medium",
          expectedKeywords: ["endpoints", "over-fetching", "under-fetching", "queries", "mutations"]
        },
        {
          id: "q2",
          question: "How do you handle state management in a large React application?",
          category: "technical",
          difficulty: "hard",
          expectedKeywords: ["redux", "context", "zustand", "prop drilling"]
        },
        {
          id: "q3",
          question: "Describe a time when you had to optimize the performance of an application.",
          category: "behavioral",
          difficulty: "medium",
          expectedKeywords: ["bottleneck", "profiling", "caching", "lazy loading"]
        }
      ]);
    } else if (prompt.includes('Evaluate this interview answer')) {
      responseText = JSON.stringify({
        score: 80,
        comment: "Good answer, you covered most of the expected points. Consider providing a real-world example next time.",
        keywordsFound: ["state", "effect"],
        keywordsMissed: ["memoization"]
      });
    } else if (prompt.includes('provide comprehensive feedback on this interview')) {
      responseText = JSON.stringify({
        score: 82,
        strengths: ["Clear communication", "Good foundational technical grasp"],
        weaknesses: ["Missed some edge cases", "Hesitant on advanced topics"],
        suggestions: ["Practice more system design questions", "Review advanced React patterns"],
        technicalAccuracy: 80,
        communicationScore: 85,
        overallFeedback: "Overall a solid performance. You have good potential, just keep practicing!"
      });
    } else if (prompt.includes('Analyze the skill gap')) {
      responseText = JSON.stringify({
        currentSkills: ["JavaScript", "React"],
        requiredSkills: ["JavaScript", "React", "Node.js", "Docker", "AWS"],
        missingSkills: ["Node.js", "Docker", "AWS"],
        recommendations: ["Learn backend development with Node.js", "Understand containerization with Docker"],
        resources: [
          {
            title: "Node.js Crash Course",
            type: "video",
            url: "search:Node.js tutorial",
            platform: "YouTube",
            duration: "2 hours"
          },
          {
            title: "Docker for Beginners",
            type: "course",
            url: "search:Docker course",
            platform: "Udemy",
            duration: "5 hours"
          }
        ],
        matchPercentage: 40
      });
    } else if (prompt.includes('career roadmap')) {
      responseText = JSON.stringify({
        weeks: Array.from({ length: 12 }, (_, i) => ({
          week: i + 1,
          focus: `Focus for Week ${i + 1}`,
          topics: ["Core Topic", "Advanced Topic"],
          tasks: ["Complete tutorial", "Build mini project"],
          resources: ["Documentation", "Video Course"]
        })),
        totalDuration: "12 weeks",
        milestones: [
          {
            title: "Fundamentals Complete",
            week: 4,
            description: "Mastered the basics of the target role",
            completed: false
          },
          {
            title: "Advanced Topics",
            week: 8,
            description: "Understand advanced concepts and architectures",
            completed: false
          },
          {
            title: "Interview Ready",
            week: 12,
            description: "Ready to start interviewing",
            completed: false
          }
        ]
      });
    } else if (prompt.includes('AI Career Counselor')) {
      responseText = "Hello! I am your AI Career Counselor. It looks like you're asking a great question. As a mock server, I'm here to say that you should definitely focus on building real-world projects and preparing for interviews. What specific role are you aiming for?";
    } else {
      responseText = JSON.stringify({ message: "Mock response generated for unknown prompt." });
    }

    if (stream) {
      const encoder = new TextEncoder();
      const streamData = new ReadableStream({
        start(controller) {
          const chunk = JSON.stringify({
            model: body.model || 'mock-model',
            response: responseText,
            done: true
          });
          controller.enqueue(encoder.encode(chunk + '\\n'));
          controller.close();
        }
      });
      return new NextResponse(streamData, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    return NextResponse.json({
      model: body.model || 'mock-model',
      response: responseText,
      done: true
    });
  } catch (error) {
    console.error('Mock Ollama generate error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
