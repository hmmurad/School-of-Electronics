import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      <!-- Curved Header Background -->
      <div class="absolute top-0 left-1/2 w-[150%] md:w-[120%] -translate-x-1/2 h-[55vh] md:h-[50vh] bg-primary-600 rounded-b-[50%] z-0 shadow-lg"
           style="background: linear-gradient(135deg, #4a6df5 0%, #3b82f6 100%);">
      </div>

      <!-- Content Container -->
      <div class="w-full max-w-sm sm:max-w-md md:max-w-lg px-6 relative z-10 flex flex-col items-center mt-[-5vh] md:mt-0">
        
        <!-- Logo Circle -->
        <div class="w-48 h-48 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center mb-12 border-4 border-transparent bg-clip-padding relative">
          <div class="flex flex-col text-center">
            <div class="relative">
              <span class="text-5xl leading-none font-extrabold text-[#2a4e9b] tracking-tight font-display">Quiz</span>
              <span class="absolute -bottom-3 right-0 text-sm font-bold text-[#2a4e9b] tracking-[0.2em] font-display">ME</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="w-full flex flex-col gap-4">
          <button type="button"
                  class="w-full py-4 bg-[#4a6df5] text-white rounded-xl font-bold text-base tracking-wide hover:bg-primary-700 transition shadow-md">
            Parent
          </button>

          <button type="button" routerLink="/login" 
                  class="w-full py-4 bg-white border-2 border-[#4a6df5] text-[#4a6df5] rounded-xl font-bold text-base tracking-wide hover:bg-primary-50 transition">
            Get Start
          </button>
        </div>
      </div>
    </div>
  `
})
export class LandingComponent {}
