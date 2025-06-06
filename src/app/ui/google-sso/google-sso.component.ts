import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { SsrService } from '../../data-access/ssr/ssr.service';
import { log } from 'console';
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

  onLoadGoogleService = output();
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

      if (notification.isNotDisplayed()) {
        console.log('Prompt no se mostró:', notification.getNotDisplayedReason());

        // Si el prompt no se muestra, usar botón manual
        this.renderSignInButton();
      } else if (notification.isSkippedMoment()) {
        console.log('Prompt fue saltado:', notification.getSkippedReason());
        this.renderSignInButton();
      } else if (notification.isDismissedMoment()) {
        console.log('Prompt fue cerrado:', notification.getDismissedReason());
      }
    });
  }

  private renderSignInButton(): void {
    const buttonDiv = document.getElementById("google-signin-button");
    if (buttonDiv) {
      google.accounts.id.renderButton(buttonDiv, {
        theme: "outline",
        size: "large",
        text: "signup_with",
        shape: "rectangular",
        logo_alignment: "left"
      });
    }

    this.onLoadGoogleService.emit();
  }

  private handleFedCMError(error: any): void {
    console.log('FedCM Error:', error);

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

  // Tu método del controlador que manejará la respuesta
  handleGoogleResponse(response: any): void {
    this.onLoadGoogleService.emit();
    console.log('Respuesta de Google:', response);

    // Decodificar el JWT token para obtener la información del usuario
    const userInfo = this.decodeJWT(response.credential);
    console.log('Información del usuario:', userInfo);

    // Aquí puedes procesar la información del usuario
    this.processUserLogin(userInfo);
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

  private processUserLogin(userInfo: any): void {
    if (userInfo) {
      // Procesar la información del usuario
      console.log('Nombre:', userInfo.name);
      console.log('Email:', userInfo.email);
      console.log('Imagen:', userInfo.picture);

      // Aquí puedes hacer lo que necesites con la información:
      // - Guardar en localStorage/sessionStorage
      // - Enviar a tu backend
      // - Actualizar el estado de autenticación
      // - Navegar a otra ruta

      // Ejemplo: guardar en localStorage
      localStorage.setItem('user', JSON.stringify(userInfo));

      // Ejemplo: emitir evento o actualizar servicio
      // this.authService.setUser(userInfo);
    }
  }
}
