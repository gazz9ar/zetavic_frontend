import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { SsrService } from '@buffetly/data-access';
import { GooglePayload } from '@buffetly/utils';
declare const google: any;


@Component({
  selector: 'ui-google-sso',
  imports: [],
  templateUrl: './google-sso.component.html',
  styleUrl: './google-sso.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleSsoComponent {
  SSRservice = inject(SsrService);
  document = inject(DOCUMENT);

  onSuccess = output<GooglePayload>();
  onErrorPopupFedCM = output();
  isSignUp = input(false);

  ngOnInit(): void {
    if (!this.SSRservice.isSSR()) {
      this.initializeGoogleSignIn();
    }
  }

  private initializeGoogleSignIn(): void {
    try {
      google.accounts.id.initialize({
        client_id: "127439604840-7np0cir3ccqb2718bgdcso39uddsvl7d.apps.googleusercontent.com",
        callback: (response: any) => this.handleGoogleResponse(response),
        use_fedcm_for_prompt: true,
        auto_select: false,
        cancel_on_tap_outside: true,
        context: this.isSignUp() ? 'signup' : 'signin', // 'signin', 'signup', or 'use'
        ux_mode: 'popup'
      });

      // Manejar el prompt con manejo de errores
      this.showGooglePrompt();

    } catch (error) {
      console.error('Error inicializando Google Sign-In:', error);
      this.handleFedCMError(error);
    }
  }

  private showGooglePrompt(): void {
    google.accounts.id.prompt((notification: any) => {
      console.log('Prompt notification:', notification);
      if (notification.i !== "credential_returned") {
        this.onErrorPopupFedCM.emit();
        this.renderSignInButton();
      }
    });
  }

  private renderSignInButton(): void {
    const buttonDiv = this.document.getElementById("google-signin-button");
    if (buttonDiv) {
      google.accounts.id.renderButton(buttonDiv, {
        theme: "outline",
        size: "large",
        text: this.isSignUp() ? "signup_with" : "signin_with",
        shape: "rectangular",
        logo_alignment: "left"
      });
    }

  }

  private handleFedCMError(error: any): void {
    console.log('FedCM Error:', error);
    this.onErrorPopupFedCM.emit();

    // Diferentes estrategias según el error
    if (error.message && error.message.includes('FedCM')) {
      // Error específico de FedCM
      this.showFedCMFallback();
    } else {
      // Otros errores
      this.renderSignInButton();
    }
  }

  private showFedCMFallback(): void {
    // Mostrar mensaje al usuario sobre FedCM
    console.log('FedCM no está disponible, usando método alternativo');

    // Reinicializar con configuración de fallback
    google.accounts.id.initialize({
      client_id: "127439604840-7np0cir3ccqb2718bgdcso39uddsvl7d.apps.googleusercontent.com",
      callback: (response: any) => this.handleGoogleResponse(response),
      use_fedcm_for_prompt: false, // Fallback sin FedCM temporalmente
      auto_select: false,
      cancel_on_tap_outside: true,
      context: this.isSignUp() ? 'signup' : 'signin', // 'signin', 'signup', or 'use'
    });

    this.renderSignInButton();
  }

  handleGoogleResponse(response: any): void {

    // const userInfo = this.decodeJWT(response.credential);
    console.log(response.credential);

    this.onSuccess.emit(response.credential);
  }

  private decodeJWT(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error al decodificar JWT:', error);
      return null;
    }
  }
}
