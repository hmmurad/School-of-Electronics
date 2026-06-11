import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-exam-runner',
  template: `
    @if(finished()) {
      <div class="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
        <div class="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <span class="material-icons text-4xl">emoji_events</span>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h2>
        <p class="text-gray-500 mb-8">You have completed the exam.</p>
        
        <div class="relative w-48 h-48 mx-auto mb-8">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="8" fill="transparent" class="text-gray-100" />
            <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="8" fill="transparent" stroke-dasharray="251.2" stroke-dashoffset="62.8" class="text-primary-500 transition-all duration-1000" />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="text-4xl font-bold text-gray-900">75%</span>
            <span class="text-sm text-gray-500 font-medium">Score</span>
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors">Review Answers</button>
          <button class="px-8 py-3 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-colors">Go Home</button>
        </div>
      </div>
    } @else {
      <div class="max-w-4xl mx-auto">
        <header class="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 gap-4">
          <h1 class="text-xl font-bold text-gray-900">Java Programming</h1>
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2 text-gray-900 font-bold bg-primary-50 px-4 py-2 rounded-xl">
              <span class="material-icons text-primary-600">timer</span>
              14:59
            </div>
            <button (click)="submit()" class="px-6 py-2 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-colors">Submit</button>
          </div>
        </header>
        
        <div class="grid lg:grid-cols-4 gap-6">
          <div class="lg:col-span-3 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div class="mb-8">
              <span class="text-sm font-bold text-gray-500 tracking-wider uppercase">Question 1 of 10</span>
              <h2 class="text-2xl font-bold text-gray-900 mt-2 leading-snug">Which of the following is a type of polymorphism in Java?</h2>
            </div>
            
            <div class="space-y-4">
              @for(opt of ['Compile-time polymorphism', 'Execution-time polymorphism', 'Multiple polymorphism', 'Multilevel polymorphism']; track opt; let i = $index) {
                <label class="flex items-center gap-4 p-4 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors" [class.border-primary-500]="selected() === i" [class.bg-primary-50]="selected() === i">
                  <input type="radio" name="answer" class="w-5 h-5 text-primary-600 focus:ring-primary-500 border-gray-300" (change)="selected.set(i)" [checked]="selected() === i" />
                  <span class="text-gray-700 font-medium text-lg">{{opt}}</span>
                </label>
              }
            </div>
            
            <div class="mt-8 flex justify-end">
              <button class="px-8 py-3 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-colors flex items-center gap-2">
                Next
                <span class="material-icons">arrow_forward</span>
              </button>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4 h-fit">
            <h3 class="font-bold text-gray-900">Question Palette</h3>
            <div class="grid grid-cols-5 gap-2">
              @for(q of [1,2,3,4,5,6,7,8,9,10]; track q) {
                <button class="w-10 h-10 rounded-xl font-bold flex items-center justify-center transition-colors"
                  [class]="q === 1 ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'">
                  {{q}}
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class ExamRunnerComponent {
  selected = signal<number | null>(null);
  finished = signal(false);
  
  submit() {
    this.finished.set(true);
  }
}
