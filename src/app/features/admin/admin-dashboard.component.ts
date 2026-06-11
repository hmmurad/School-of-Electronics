import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="space-y-8">
      <header>
        <h1 class="text-3xl font-bold text-gray-900">Admin Overview</h1>
        <p class="text-gray-500 mt-2">Manage platform content and users</p>
      </header>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500 font-medium">Total Users</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">1,245</p>
            </div>
            <div class="w-10 h-10 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center">
              <span class="material-icons text-xl">people</span>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500 font-medium">Active Lessons</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">48</p>
            </div>
            <div class="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
              <span class="material-icons text-xl">menu_book</span>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500 font-medium">Total Questions</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">850</p>
            </div>
            <div class="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
              <span class="material-icons text-xl">help</span>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500 font-medium">Exams Taken</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">3,492</p>
            </div>
            <div class="w-10 h-10 bg-accent-50 text-accent-600 rounded-lg flex items-center justify-center">
              <span class="material-icons text-xl">quiz</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div class="space-y-4">
          <div class="flex gap-4 items-center p-3 hover:bg-gray-50 rounded-xl transition-colors">
            <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <span class="material-icons text-sm">person_add</span>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">New user registered: <strong>John Doe</strong></p>
              <p class="text-xs text-gray-500">2 minutes ago</p>
            </div>
          </div>
          <div class="flex gap-4 items-center p-3 hover:bg-gray-50 rounded-xl transition-colors">
            <div class="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <span class="material-icons text-sm">done_all</span>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900"><strong>Sarah</strong> completed exam <strong>Java Basics</strong></p>
              <p class="text-xs text-gray-500">15 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent {}
