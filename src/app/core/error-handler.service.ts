import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof HttpErrorResponse
        && errorResponse.status >= 400 && errorResponse.status <= 499) {
      msg = 'There was an error processing your request';

      try {
        msg = errorResponse.error[0].mensagemUsuario;
      } catch (e) { }

      console.error('An error has occurred', errorResponse);

    } else {
      msg = 'Error processing remote service. Try again.';
      console.error('An error has occurred', errorResponse);
    }

    if (msg) {
      this.messageService.add({ severity: 'error', detail: msg, life: 10000 });
    }
  }

}
