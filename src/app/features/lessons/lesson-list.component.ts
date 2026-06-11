import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-lesson-list',
  template: `
    <div class="space-y-6">
      <header class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Explore Lessons</h1>
          <p class="text-gray-500 mt-2">Discover new topics and start learning</p>
        </div>
        <div class="relative">
          <input type="text" placeholder="Search lessons..." class="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500" />
          <span class="material-icons absolute left-3 top-2.5 text-gray-400">search</span>
        </div>
      </header>

      <div class="flex gap-2 overflow-x-auto pb-4">
        <button class="px-4 py-2 rounded-full bg-primary-600 text-white font-medium text-sm whitespace-nowrap">All Topics</button>
        <button class="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 font-medium text-sm whitespace-nowrap hover:bg-gray-50">Programming</button>
        <button class="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 font-medium text-sm whitespace-nowrap hover:bg-gray-50">Mathematics</button>
        <button class="px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 font-medium text-sm whitespace-nowrap hover:bg-gray-50">Science</button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (item of [1,2,3,4,5,6]; track item) {
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
            <img src="https://picsum.photos/seed/lesson{{item}}/400/200" alt="Thumbnail" referrerpolicy="no-referrer" class="w-full h-48 object-cover" />
            <div class="p-5">
              <div class="flex justify-between items-start mb-2">
                <span class="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md">Programming</span>
                <span class="text-gray-500 text-xs font-medium flex items-center gap-1"><span class="material-icons text-sm">schedule</span> 15 min</span>
              </div>
              <h3 class="text-lg font-bold text-gray-900 leading-tight">Introduction to Java Polymorphism</h3>
              <p class="text-gray-500 text-sm mt-2 line-clamp-2">Learn about compile-time and runtime polymorphism in Java with practical examples.</p>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class LessonListComponent {}
