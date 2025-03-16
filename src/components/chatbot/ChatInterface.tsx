import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RefreshCw, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Mental health knowledge base - this would be expanded with more comprehensive information
const mentalHealthKnowledgeBase = [
  {
    id: 'stress-general',
    topic: 'stress',
    content: 'Stress is the body\'s response to pressure. Common symptoms include tension, irritability, inability to concentrate, and sleep problems. Coping strategies include deep breathing, regular exercise, and time management.',
    tags: ['stress', 'anxiety', 'coping', 'symptoms']
  },
  {
    id: 'stress-techniques',
    topic: 'stress',
    content: 'Effective stress management techniques include progressive muscle relaxation, guided imagery, and the 4-7-8 breathing technique (inhale for 4 counts, hold for 7, exhale for 8).',
    tags: ['stress', 'relaxation', 'breathing', 'techniques']
  },
  {
    id: 'anxiety-general',
    topic: 'anxiety',
    content: 'Anxiety is characterized by persistent worry and fear. It can manifest physically as increased heart rate, rapid breathing, and restlessness. Grounding techniques can help manage acute anxiety symptoms.',
    tags: ['anxiety', 'symptoms', 'worry', 'fear']
  },
  {
    id: 'anxiety-techniques',
    topic: 'anxiety',
    content: 'Grounding techniques for anxiety include the 5-4-3-2-1 method (acknowledge 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste).',
    tags: ['anxiety', 'grounding', 'techniques', 'coping']
  },
  {
    id: 'depression-general',
    topic: 'depression',
    content: 'Depression is more than just feeling sad; it involves persistent feelings of sadness, hopelessness, and loss of interest in activities. Physical symptoms may include changes in appetite, sleep problems, and fatigue.',
    tags: ['depression', 'sadness', 'symptoms', 'mood']
  },
  {
    id: 'depression-help',
    topic: 'depression',
    content: 'Depression is treatable. Professional help, such as therapy and sometimes medication, can be very effective. Self-care strategies include regular physical activity, maintaining social connections, and establishing routines.',
    tags: ['depression', 'treatment', 'therapy', 'self-care']
  },
  {
    id: 'sleep-general',
    topic: 'sleep',
    content: 'Quality sleep is essential for mental health. Poor sleep can worsen anxiety and depression symptoms. Adults typically need 7-9 hours of sleep per night.',
    tags: ['sleep', 'insomnia', 'rest', 'health']
  },
  {
    id: 'sleep-hygiene',
    topic: 'sleep',
    content: 'Good sleep hygiene includes maintaining a consistent sleep schedule, creating a restful environment, limiting screen time before bed, and avoiding caffeine and alcohol close to bedtime.',
    tags: ['sleep', 'hygiene', 'habits', 'routine']
  },
  {
    id: 'disaster-coping',
    topic: 'disaster',
    content: 'During and after disasters, it\'s normal to experience strong emotions. Focus on basic needs first (safety, food, shelter). Establish routines when possible and connect with support systems.',
    tags: ['disaster', 'trauma', 'crisis', 'coping']
  },
  {
    id: 'grief-process',
    topic: 'grief',
    content: 'Grief is a natural response to loss. It can involve a range of emotions including sadness, anger, guilt, and eventually acceptance. There\'s no "right" way to grieve or timeline for healing.',
    tags: ['grief', 'loss', 'bereavement', 'emotions']
  },
  {
    id: 'mindfulness-basics',
    topic: 'mindfulness',
    content: 'Mindfulness involves paying attention to the present moment without judgment. Regular practice can reduce stress, anxiety, and depression symptoms. Start with just a few minutes of focused breathing daily.',
    tags: ['mindfulness', 'meditation', 'awareness', 'present']
  },
  {
    id: 'self-care-importance',
    topic: 'self-care',
    content: 'Self-care isn\'t selfish; it\'s necessary for mental health. Basic self-care includes adequate sleep, nutrition, hydration, physical activity, and social connection.',
    tags: ['self-care', 'wellness', 'health', 'balance']
  },
  {
    id: 'crisis-help',
    topic: 'crisis',
    content: 'If you\'re experiencing thoughts of suicide or severe distress, please contact a crisis hotline immediately. Help is available 24/7, and reaching out is a sign of strength, not weakness.',
    tags: ['crisis', 'suicide', 'emergency', 'hotline']
  },
  {
    id: 'therapy-types',
    topic: 'therapy',
    content: 'Common therapy types include Cognitive Behavioral Therapy (CBT), which helps identify and change negative thought patterns, and Dialectical Behavior Therapy (DBT), which focuses on emotional regulation and mindfulness.',
    tags: ['therapy', 'treatment', 'CBT', 'DBT']
  },
  {
    id: 'medication-info',
    topic: 'medication',
    content: 'Mental health medications can be an important part of treatment for many conditions. They work best when combined with therapy. It\'s important to take them as prescribed and discuss any concerns with your healthcare provider.',
    tags: ['medication', 'treatment', 'psychiatry', 'antidepressants']
  }
];

// Emergency resources
const emergencyResources = {
  suicide: {
    message: "If you're having thoughts of suicide, please reach out for immediate help:",
    resources: [
      "National Suicide Prevention Lifeline: 1-800-273-8255",
      "Crisis Text Line: Text HOME to 741741",
      "Call 911 or go to your nearest emergency room"
    ]
  },
  crisis: {
    message: "For immediate crisis support:",
    resources: [
      "Crisis Text Line: Text HOME to 741741",
      "Disaster Distress Helpline: 1-800-985-5990",
      "Call your local emergency services: 911"
    ]
  }
};

// Function to detect emergency situations
const detectEmergency = (text: string): string | null => {
  const suicideKeywords = ['kill myself', 'suicide', 'end my life', 'don\'t want to live', 'better off dead'];
  const crisisKeywords = ['emergency', 'immediate danger', 'crisis', 'hurt myself', 'hurt someone'];
  
  text = text.toLowerCase();
  
  for (const keyword of suicideKeywords) {
    if (text.includes(keyword)) return 'suicide';
  }
  
  for (const keyword of crisisKeywords) {
    if (text.includes(keyword)) return 'crisis';
  }
  
  return null;
};

// Function to retrieve relevant information based on user input
const retrieveRelevantInfo = (query: string): string => {
  query = query.toLowerCase();
  
  // Check for emergency situations first
  const emergency = detectEmergency(query);
  if (emergency) {
    const resource = emergencyResources[emergency];
    return `${resource.message}\n${resource.resources.join('\n')}`;
  }
  
  // Extract keywords from query
  const keywords = query.split(' ')
    .filter(word => word.length > 3)
    .map(word => word.replace(/[.,?!;:]/g, ''));
  
  // Score each knowledge base entry
  const scoredEntries = mentalHealthKnowledgeBase.map(entry => {
    let score = 0;
    // Check if topic is directly mentioned
    if (query.includes(entry.topic)) {
      score += 5;
    }
    
    // Check for keyword matches
    keywords.forEach(keyword => {
      if (entry.content.toLowerCase().includes(keyword)) {
        score += 2;
      }
      if (entry.tags.some(tag => tag.includes(keyword) || keyword.includes(tag))) {
        score += 3;
      }
    });
    
    return { entry, score };
  });
  
  // Sort by score and get top results
  const topResults = scoredEntries
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);
  
  if (topResults.length === 0) {
    return "I understand you're reaching out for support. Could you tell me more about what you're experiencing? I'm here to listen and help.";
  }
  
  // Combine relevant information
  return topResults.map(result => result.entry.content).join('\n\n');
};

// Function to generate personalized response
const generateResponse = (query: string, userHistory: Message[]): string => {
  const relevantInfo = retrieveRelevantInfo(query);
  
  // Personalize the response based on user history
  let personalization = "";
  const userMessages = userHistory.filter(msg => msg.sender === 'user').map(msg => msg.text.toLowerCase());
  
  // Check if this is a follow-up question
  if (userMessages.length > 1) {
    const previousTopics = [];
    
    if (userMessages.some(msg => msg.includes('stress'))) previousTopics.push('stress');
    if (userMessages.some(msg => msg.includes('anxiety'))) previousTopics.push('anxiety');
    if (userMessages.some(msg => msg.includes('depress'))) previousTopics.push('depression');
    if (userMessages.some(msg => msg.includes('sleep'))) previousTopics.push('sleep');
    
    if (previousTopics.length > 0) {
      personalization = `I see you've mentioned ${previousTopics.join(' and ')} before. `;
    }
  }
  
  // Add a supportive opener
  const supportiveOpeners = [
    "I'm here to support you. ",
    "Thank you for sharing that with me. ",
    "I appreciate you opening up. ",
    "I'm listening and here to help. "
  ];
  
  const opener = supportiveOpeners[Math.floor(Math.random() * supportiveOpeners.length)];
  
  // Add a question to encourage further conversation
  const followUpQuestions = [
    "How have you been coping with this?",
    "Is there anything specific that triggered these feelings?",
    "What strategies have worked for you in the past?",
    "Would you like to know more about any particular aspect?",
    "How can I best support you right now?"
  ];
  
  const followUp = followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)];
  
  return opener + personalization + relevantInfo + "\n\n" + followUp;
};

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your mental health assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState([
    "I'm feeling stressed",
    "I'm having trouble sleeping",
    "I'm feeling anxious",
    "I need someone to talk to",
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Store conversation context
  const [conversationContext, setConversationContext] = useState<{
    topics: string[];
    sentiments: string[];
    urgency: 'low' | 'medium' | 'high';
  }>({
    topics: [],
    sentiments: [],
    urgency: 'low',
  });

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to update conversation context based on user input
  const updateConversationContext = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    // Update topics
    const topicKeywords = {
      stress: ['stress', 'overwhelm', 'pressure', 'burnout'],
      anxiety: ['anxiety', 'worry', 'nervous', 'panic', 'fear'],
      depression: ['depress', 'sad', 'hopeless', 'empty', 'worthless'],
      sleep: ['sleep', 'insomnia', 'tired', 'exhausted', 'rest'],
      grief: ['grief', 'loss', 'death', 'died', 'funeral'],
      trauma: ['trauma', 'ptsd', 'abuse', 'assault', 'accident'],
      disaster: ['disaster', 'earthquake', 'flood', 'hurricane', 'fire']
    };
    
    const newTopics = [];
    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      if (keywords.some(keyword => lowerInput.includes(keyword))) {
        newTopics.push(topic);
      }
    }
    
    // Update sentiments
    const sentimentKeywords = {
      negative: ['sad', 'angry', 'upset', 'hurt', 'afraid', 'scared', 'lonely', 'hopeless'],
      positive: ['better', 'good', 'happy', 'hopeful', 'grateful', 'calm', 'peaceful'],
      neutral: ['okay', 'fine', 'alright', 'normal', 'so-so']
    };
    
    const newSentiments = [];
    for (const [sentiment, keywords] of Object.entries(sentimentKeywords)) {
      if (keywords.some(keyword => lowerInput.includes(keyword))) {
        newSentiments.push(sentiment);
      }
    }
    
    // Update urgency
    let newUrgency: 'low' | 'medium' | 'high' = 'low';
    if (detectEmergency(input)) {
      newUrgency = 'high';
    } else if (
      lowerInput.includes('need help') || 
      lowerInput.includes('urgent') || 
      lowerInput.includes('right now') ||
      lowerInput.includes('bad')
    ) {
      newUrgency = 'medium';
    }
    
    setConversationContext(prev => ({
      topics: [...new Set([...prev.topics, ...newTopics])],
      sentiments: [...new Set([...prev.sentiments, ...newSentiments])],
      urgency: newUrgency === 'high' ? 'high' : prev.urgency === 'high' ? 'high' : newUrgency
    }));
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      text: input.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    // Update conversation context
    updateConversationContext(input);
    
    // Generate response using the enhanced response system
    setTimeout(() => {
      const responseText = generateResponse(input, messages);
      
      const botMessage: Message = {
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsProcessing(false);
      
      // Update suggested prompts based on context
      const newPrompts = generateContextualPrompts(conversationContext);
      if (newPrompts.length > 0) {
        setSuggestedPrompts(newPrompts);
      }
    }, 1000);
  };

  const generateContextualPrompts = (context: typeof conversationContext) => {
    const prompts = [];
    
    if (context.urgency === 'high') {
      prompts.push(
        "I need immediate help",
        "Can you connect me with professional help?"
      );
    }
    
    if (context.topics.includes('stress')) {
      prompts.push("Tell me some stress relief techniques");
    }
    
    if (context.topics.includes('anxiety')) {
      prompts.push("How can I manage anxiety attacks?");
    }
    
    if (context.topics.includes('sleep')) {
      prompts.push("What are good sleep habits?");
    }
    
    return prompts.length > 0 ? prompts : [
      "I'm feeling stressed",
      "I'm having trouble sleeping",
      "I'm feeling anxious",
      "I need someone to talk to",
    ];
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const handleClearChat = () => {
    setMessages([
      {
        text: "Hello! I'm your mental health assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
    
    toast({
      title: "Chat Cleared",
      description: "Your conversation history has been reset.",
    });
  };

  const handleCallHelpline = () => {
    toast({
      title: "Connecting to Helpline",
      description: "You'll be connected to a mental health professional shortly.",
    });
    
    // In a real app, this would initiate a call
    setTimeout(() => {
      window.location.href = "tel:18001213721";
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto h-full max-h-[calc(100vh-6rem)] bg-background rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-medium dark:text-gray-100">Mental Health Assistant</h2>
            <p className="text-xs text-muted-foreground">AI-powered support</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-xs"
            onClick={handleClearChat}
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            Clear Chat
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="h-8 text-xs"
            onClick={handleCallHelpline}
          >
            <Phone className="h-3.5 w-3.5 mr-1" />
            Call Helpline
          </Button>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 px-6 py-4 overflow-y-auto space-y-6 bg-secondary/5 dark:bg-gray-900/50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div 
                className={`h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground ml-2' 
                    : 'bg-secondary/20 dark:bg-gray-800 text-foreground mr-2'
                }`}
              >
                {message.sender === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card dark:bg-gray-800 shadow-sm border border-border dark:border-gray-700'
                }`}
              >
                <div className="text-sm whitespace-pre-line">{message.text}</div>
                <div 
                  className={`text-xs mt-1 ${
                    message.sender === 'user' 
                      ? 'text-primary-foreground/70' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex justify-start">
            <div className="flex">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
                <Bot className="h-4 w-4 text-foreground" />
              </div>
              <div className="rounded-lg px-4 py-2 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-75"></div>
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Suggested Prompts */}
      <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex flex-wrap gap-2 mb-2">
          {suggestedPrompts.map((prompt, index) => (
            <Badge 
              key={index} 
              variant="outline"
              className="cursor-pointer hover:bg-secondary transition-colors"
              onClick={() => handleSuggestedPrompt(prompt)}
            >
              {prompt}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Input Area */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-background">
        <div className="flex space-x-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!input.trim() || isProcessing}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-3 text-xs text-center text-muted-foreground">
          For immediate professional help, call our Mental Health Helpline: 1800-121-3721
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;