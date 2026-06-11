import { Injectable, inject } from '@angular/core';
import { collection, doc, getDocs, addDoc, Firestore, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export interface Question {
  id?: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  category?: string;
}

const SEED_QUESTIONS: Question[] = [
  {
    text: "What is the gaseous envelope surrounding the Earth called?",
    options: ["Stratosphere", "Atmosphere", "Troposphere", "Mesosphere"],
    correctOptionIndex: 1,
    category: "Basic Aerodynamics"
  },
  {
    text: "What percentage of the atmosphere is composed of Nitrogen (by volume)?",
    options: ["21%", "1%", "78%", "50%"],
    correctOptionIndex: 2,
    category: "Basic Aerodynamics"
  },
  {
    text: "What type of displays does a glass cockpit use instead of traditional analog dials?",
    options: ["Electromechanical gauges", "Electronic (digital) LCD/CRT screens", "Pneumatic indicators", "Synchro mechanisms"],
    correctOptionIndex: 1,
    category: "Digital Glass Cockpit & Data Link"
  },
  {
    text: "What is the traditional analog cockpit nicknamed in aviation circles?",
    options: ["Iron cockpit", "Classic cockpit", "Steam cockpit", "Hard cockpit"],
    correctOptionIndex: 2,
    category: "Digital Glass Cockpit & Data Link"
  },
  {
    text: "Who first demonstrated the use of radio echoes to detect ships in public in 1904?",
    options: ["Heinrich Hertz", "Guglielmo Marconi", "Christian Hülsmeyer", "Nikola Tesla"],
    correctOptionIndex: 2,
    category: "Introduction to Radar"
  },
  {
    text: "The term RADAR was coined in 1940 by which organization?",
    options: ["Royal Air Force", "United States Navy", "German Wehrmacht", "British Air Ministry"],
    correctOptionIndex: 1,
    category: "Introduction to Radar"
  },
  {
    text: "What is the primary purpose of a pulsed radar transmitter?",
    options: ["Generate continuous wave RF signals", "Generate equally spaced high-power RF pulses of short duration", "Receive and amplify echo signals", "Convert RF to video signals"],
    correctOptionIndex: 1,
    category: "Radar Transmitter"
  },
  {
    text: "What is the proper technical term for glass cockpits?",
    options: ["Digital Instrument Cockpits", "Technically Enhanced Cockpits", "Electronic Navigation Cockpits", "Advanced Avionics Cockpits"],
    correctOptionIndex: 1,
    category: "Digital Glass Cockpit & Data Link"
  },
  {
    text: "Which aircraft became the first light aircraft equipped with glass cockpits in 2003?",
    options: ["Cessna 172 and 182", "Piper PA-28 and PA-32", "Beechcraft Bonanza and Baron", "Cirrus SR20 and SR22"],
    correctOptionIndex: 3,
    category: "Digital Glass Cockpit & Data Link"
  },
  {
    text: "What does GPS stand for?",
    options: ["Ground Positioning Satellite", "Global Positioning System", "General Purpose Satellite", "Geo-Positioning Survey System"],
    correctOptionIndex: 1,
    category: "Satellite Communication and Navigation Systems"
  }
];

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  
  async getQuestions(): Promise<Question[]> {
    const querySnapshot = await getDocs(collection(db, "stc_mcq_questions"));
    const questions: Question[] = [];
    querySnapshot.forEach((doc) => {
      questions.push({ id: doc.id, ...doc.data() } as Question);
    });
    return questions;
  }

  async seedQuestionsIfEmpty(): Promise<boolean> {
    const existing = await this.getQuestions();
    if (existing.length > 0) {
      return false; // Already seeded
    }
    
    const batch = writeBatch(db);
    const collectionRef = collection(db, "stc_mcq_questions");
    
    SEED_QUESTIONS.forEach(q => {
      const docRef = doc(collectionRef);
      batch.set(docRef, q);
    });
    
    await batch.commit();
    return true; // Seeded successfully
  }
}
