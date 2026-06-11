import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-lesson-detail',
  template: `
    <div class="max-w-3xl mx-auto space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <header class="space-y-4 text-center">
        <span class="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full">Programming</span>
        <h1 class="text-4xl font-bold text-gray-900 leading-tight">Introduction to Java Polymorphism</h1>
        <div class="flex items-center justify-center gap-4 text-gray-500 text-sm font-medium">
          <span class="flex items-center gap-1"><span class="material-icons text-base">schedule</span> 15 min read</span>
          <span class="flex items-center gap-1"><span class="material-icons text-base">signal_cellular_alt</span> Intermediate</span>
        </div>
      </header>

      <div class="prose prose-blue max-w-none text-gray-700">
        <p class="text-lg leading-relaxed">Polymorphism in Java is a concept by which we can perform a single action in different ways. Polymorphism is derived from 2 Greek words: poly and morphs. The word "poly" means many and "morphs" means forms.</p>
        
        <h2>There are two types of polymorphism in Java:</h2>
        <ul>
          <li>Compile-time polymorphism</li>
          <li>Runtime polymorphism</li>
        </ul>

        <div class="bg-blue-50 p-6 rounded-2xl border border-blue-100 my-8">
          <h3 class="flex items-center gap-2 text-blue-900 font-bold mt-0"><span class="material-icons text-blue-600">lightbulb</span> Important Note</h3>
          <p class="text-blue-800 mb-0">We can perform polymorphism in java by method overloading and method overriding.</p>
        </div>

        <p>If you overload a static method in Java, it is the example of compile-time polymorphism.</p>
      </div>

      <div class="pt-8 border-t border-gray-100 flex justify-between items-center">
        <button class="px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2">
          <span class="material-icons">arrow_back</span>
          Previous Lesson
        </button>
        <button class="px-6 py-2.5 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-colors flex items-center gap-2">
          Take Quiz
          <span class="material-icons">quiz</span>
        </button>
      </div>
    </div>
  `
})
export class LessonDetailComponent {}
