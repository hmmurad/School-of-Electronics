import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionService, Question } from '../../core/services/question.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-bank',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Question Bank</h1>
          <p class="text-gray-500 mt-1">Manage and view the extracted MCQ questions.</p>
        </div>
        <button (click)="seedDb()" [disabled]="seeding" class="px-5 py-2.5 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50">
          {{ seeding ? 'Seeding...' : 'Seed Initial Questions' }}
        </button>
      </div>

      <div *ngIf="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        <p class="mt-4 text-gray-500 font-medium">Loading questions...</p>
      </div>

      <div *ngIf="!loading && questions.length === 0" class="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
           <span class="material-icons text-gray-400 text-3xl">inbox</span>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-1">No Questions Found</h3>
        <p class="text-gray-500 mb-6 max-w-sm mx-auto">The question bank is empty. You can seed the initial set of extracted questions by clicking the button above.</p>
      </div>

      <div *ngIf="!loading && questions.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div *ngFor="let q of questions; let i = index" class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
           <div class="flex justify-between items-start mb-4 gap-4">
             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 whitespace-nowrap">
               Question {{ i + 1 }}
             </span>
             <span *ngIf="q.category" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 text-right">
               {{ q.category }}
             </span>
           </div>
           
           <h3 class="text-lg font-semibold text-gray-900 leading-snug mb-4">{{ q.text }}</h3>
           
           <div class="space-y-2">
             <div *ngFor="let opt of q.options; let optIndex = index" 
                  [class.bg-green-50]="optIndex === q.correctOptionIndex"
                  [class.border-green-200]="optIndex === q.correctOptionIndex"
                  [class.text-green-800]="optIndex === q.correctOptionIndex"
                  class="p-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-700 text-sm flex gap-3">
               <span class="font-bold flex-shrink-0" [class.text-green-700]="optIndex === q.correctOptionIndex">
                 {{ ['A', 'B', 'C', 'D'][optIndex] }}.
               </span>
               {{ opt }}
               
               <span *ngIf="optIndex === q.correctOptionIndex" class="material-icons ml-auto text-green-600 text-sm">check_circle</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  `
})
export class QuestionBankComponent implements OnInit {
  questionService = inject(QuestionService);
  
  questions: Question[] = [];
  loading = true;
  seeding = false;

  async ngOnInit() {
    await this.loadQuestions();
  }

  async loadQuestions() {
    this.loading = true;
    try {
      this.questions = await this.questionService.getQuestions();
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  async seedDb() {
    this.seeding = true;
    try {
      const seeded = await this.questionService.seedQuestionsIfEmpty();
      if (seeded) {
        await this.loadQuestions();
      } else {
        alert("Database already contains questions.");
      }
    } catch (e) {
      console.error(e);
      alert("Error seeding database.");
    } finally {
      this.seeding = false;
    }
  }
}
