import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="space-y-6">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Welcome back, Student!</h1>
        <p class="text-gray-500 mt-2">Ready to continue your learning journey?</p>
      </header>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
            <span class="material-icons">menu_book</span>
          </div>
          <div>
            <p class="text-sm text-gray-500 font-medium">Lessons Completed</p>
            <p class="text-2xl font-bold text-gray-900">12</p>
          </div>
        </div>
        
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div class="w-12 h-12 bg-accent-100 text-accent-600 rounded-xl flex items-center justify-center">
            <span class="material-icons">school</span>
          </div>
          <div>
            <p class="text-sm text-gray-500 font-medium">Exams Taken</p>
            <p class="text-2xl font-bold text-gray-900">5</p>
          </div>
        </div>
        
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div class="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
            <span class="material-icons">trending_up</span>
          </div>
          <div>
            <p class="text-sm text-gray-500 font-medium">Average Score</p>
            <p class="text-2xl font-bold text-gray-900">85%</p>
          </div>
        </div>
        
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div class="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
            <span class="material-icons">schedule</span>
          </div>
          <div>
            <p class="text-sm text-gray-500 font-medium">Study Hours</p>
            <p class="text-2xl font-bold text-gray-900">24h</p>
          </div>
        </div>
      </div>
      
      <div class="grid lg:grid-cols-3 gap-6 mt-8">
        <div class="lg:col-span-2 space-y-6">
          <h2 class="text-xl font-bold text-gray-900">Continue Learning</h2>
          
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-6 items-center">
            <img src="https://picsum.photos/seed/java/200/200" referrerpolicy="no-referrer" class="w-24 h-24 rounded-xl object-cover" />
            <div class="flex-1">
              <span class="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md">Programming</span>
              <h3 class="text-lg font-bold text-gray-900 mt-2">Java Polymorphism</h3>
              <div class="mt-4 w-full bg-gray-100 rounded-full h-2">
                <div class="bg-primary-500 h-2 rounded-full" style="width: 75%"></div>
              </div>
            </div>
            <button class="w-12 h-12 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors flex items-center justify-center">
              <span class="material-icons">play_arrow</span>
            </button>
          </div>
        </div>
        
        <div class="space-y-6">
          <h2 class="text-xl font-bold text-gray-900">Recent Exams</h2>
          
          <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div class="flex justify-between items-center mb-2">
              <h4 class="font-bold text-gray-900">Java Programming</h4>
              <span class="text-sm font-bold text-green-600">75/100</span>
            </div>
            <p class="text-xs text-gray-500">2 days ago</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {}
