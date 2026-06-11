import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-exams',
  imports: [RouterLink],
  template: `
    <div class="space-y-6">
      <header class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Exams</h1>
          <p class="text-gray-500 mt-2">Test your knowledge and track your performance</p>
        </div>
        <button class="px-6 py-2.5 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-colors shadow-sm flex items-center gap-2">
          <span class="material-icons text-sm">add</span>
          Create Custom Exam
        </button>
      </header>
      
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6 border-b border-gray-100">
          <h2 class="text-xl font-bold text-gray-900">Available Exams</h2>
        </div>
        <ul class="divide-y divide-gray-100">
          @for(item of [1,2,3]; track item) {
            <li class="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-accent-100 text-accent-600 rounded-xl flex items-center justify-center shrink-0">
                  <span class="material-icons">description</span>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900">Java Programming Final</h3>
                  <div class="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <span class="flex items-center gap-1"><span class="material-icons text-sm">list</span> 20 Questions</span>
                    <span class="flex items-center gap-1"><span class="material-icons text-sm">schedule</span> 30 Mins</span>
                  </div>
                </div>
              </div>
              <a routerLink="/exams/{{item}}" class="px-6 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold rounded-full transition-colors whitespace-nowrap">Start Exam</a>
            </li>
          }
        </ul>
      </div>
    </div>
  `
})
export class ExamsComponent {}
