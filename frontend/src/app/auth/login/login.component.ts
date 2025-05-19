import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email = '';
  password = '';

  registerEmail = '';
  registerPassword = '';
  registerName = '';

  @ViewChild('containerRef') containerRef!: ElementRef;

  constructor(private renderer: Renderer2) {}

  switchToSignUp() {
    this.renderer.addClass(this.containerRef.nativeElement, 'right-panel-active');
  }

  switchToSignIn() {
    this.renderer.removeClass(this.containerRef.nativeElement, 'right-panel-active');
  }

  login() {
    // Call AuthService.login()
    console.log('Login:', this.email, this.password);
  }

  register() {
    // Call AuthService.register()
    console.log('Register:', this.registerName, this.registerEmail, this.registerPassword);
  }
}
