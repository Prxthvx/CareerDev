import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  dangerouslyAllowBrowser: true,
});

export interface ConversationState {
  step: number;
  studentInfo: {
    name: string;
    dateOfBirth: string;
    gender: string;
    stream: string;
    subjects: string[];
  };
}

const courseList = `
Science Courses (3 Years):
Bsc Physics, Bsc Chemistry, Bsc Botany, Bsc Zoology, Bsc Computer science, Bsc Mathematics, Bsc PCM, Bsc CBZ, Bsc Forestry, Bsc Dietician & Nutritionist, Bsc Home Science, Bsc Agriculture Science, Bsc Horticulture, Bsc Sericulture, Bsc Oceanography, Bsc Melsorology, Bsc Arthopology, Bsc Forensic Science, Bsc Food technology, Bsc Diary Technology, Bsc Hotel Management, Bsc Fashion Design, Bsc Mass Communication, Bsc Electronic Media, Bsc Multimedia, Bsc 3D Animation

Commerce Courses:
CA Chartered Account, CMA Cost Management Account, CS Company Secretary (Foundation), B.Com Regular, B.Com Taxation &Tax Procedure, B.Com Travel & Tourism, B.Com Bank Management, B.Com Professional, BBA / BBM Regular, BFM Bachelor of Financial Management, BMS, BAF

Humanities Courses:
Advertising, BS General, Criminology, Economics, Fine Arts, Foreign languages, Home Science, Interior Design, Journalism, Library Science, Physical Education, Political Science, Psychology, Social Work, Sociology, Travel and Tourism

Management Courses:
Business Management, Bank Management, Event Management, Hospital Management, Hotel Management, Human Resources Management, Logistics Management

Law Courses (3/5 Years):
LLB, BA+LLB, B.Com + LLB, BBM+LLB, BBA. +LLB

MEDICAL COURSES:
MBBS, BUMS Unani, BHMS Homeopathy, BAMS Ayurveda, BSMS Sidha, BNYS Naturopathy, BDS Dental, BVSc Veterinary, BPT Physiotherapy

PARAMEDICAL COURSES:
Nursing, Pharm D, B.Pharm, D.Pharm, M. Pharm, Anesthesia technical, Cardiac Care technical, Perfusion technology, Cathllab technology, Clinical Optometry, Dental Hygiene, Dental Mechanic, Dental Technician, Health Inspector, Medical imaging & Tech, Medical Lab technician, Medical Records tech, Medical X Ray Technician, Nuclear Medicine Tech, Occupational Therapist, Operation theater Tech, Ophthalmic Assistant, Radiographic Assistant, Radiotherapy Technician, Rehabilitation Therapy, Respiratory Therapy Tech, Blood Transfusion Tech, Bsc Renal Dialysis

B.Tech Engineering (4year):
Petro chemical Engineering, Petroleum Engineering, Civil Engineering, Mechanical Engineering, Aeronautical Engineering, Aerospace Engineering, Agricultural Engineering, Architecture Engineering, Automobile Engineering, Automation & Robotics Eng., Avionics Engineering, Biomedical Engineering, Bio technological Eng., Chemical Engineering, Ceramics Engineering, Computer Science Engi., Electronics &Comm.Engi., Electrical & Electronics Engi., Environmental Science Engi., Information Science Engi, Industrial Engineering, Industrial Production Engi., Instrumental Technology, Marine Engineering, Medical Electronics Engi., Mining Engineering, Manufacturing Science Engi., Naval Architecture Engi., Nanotechnology Engi., Polymer Technology Engi., Silk Polymar Engi., Carpet Technology Engi., Textile engineering, Robotics, Genetic

POLYTECHNIC (10 th class):
Civil engineering, Mechanical engineering, Automobile engineering, Computer science engi., Electronics and communication Engineering, Electrical engineering, Petro chemical engineering

Management (new job opportunity Courses 2/3/5Years Duration):
BBA /BBM, BBA Aviation, BBA Air Cargo Management, BBA Aeronautical, BBA Retail Marketing, BBA Customer Care Management, BBA Airline & Airport Management, BBA Cargo Management, BBA Office Management, BBA Store Management, BBA Mall Management, BBA Logistics, BCA SAP, BCA Cloud Computing, MBA Logistics, Aviation, HR, Management

Architecture (5 years +2):
B.Arch (NATAis Compulsory), M.Arch .
`;

const systemPrompt = `You are a friendly and helpful career guidance assistant for students after 12th grade. 
Your job is to ask ONLY the following questions, one at a time, and then suggest relevant courses from the list below:
1. What is your name?
2. What is your age or date of birth?
3. What is your gender?
4. What was your stream in 12th standard? (Science, Commerce, or Arts/Humanities)
5. What subject(s) are you most interested in for further studies?

After collecting these, use the student's stream and interests to suggest the most relevant options from the following list. Do not ask any more questions after making your suggestions. Be concise, friendly, and clear. Here is the list of possible courses:
${courseList}
`;

export async function getNextQuestion(state: ConversationState, userResponse: string): Promise<string> {
  try {
    const messages: any[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Current state: ${JSON.stringify(state)}\nUser response: ${userResponse}` },
    ];

    const response = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 300,
    });

    return response.choices[0].message.content || 'I apologize, but I need more information to help you better.';
  } catch (error) {
    console.error('Error getting AI response:', error);
    return 'I apologize, but I encountered an error. Please try again.';
  }
}

export function getInitialQuestion(): string {
  return "Hello! I'm your career guidance assistant. Let's start by getting to know you. What's your name?";
}

export async function getSkillAssessmentFeedback(skillCategories: any[]): Promise<string> {
  const prompt = `You are a career development AI. Analyze the following user's self-assessed skill levels (1-5 stars, 5 is expert) in various categories. Identify their strengths, weaknesses, and suggest next steps or learning paths to improve their career prospects. Be specific and encouraging. Here is the data:
${JSON.stringify(skillCategories, null, 2)}
`;
  try {
    const response = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an expert career coach and skill development advisor.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 400,
    });
    return response.choices[0].message.content || 'No feedback available.';
  } catch (error) {
    console.error('Error getting skill assessment feedback:', error);
    return 'Sorry, there was a problem generating your feedback.';
  }
} 