import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { ConsultationModal } from './components/consultation-modal/consultation-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, ConsultationModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('prime_space_interior');
}
