import {NgModule} from '@angular/core';
import {ButtonComponent} from './button.component';
import {MatButtonModule} from '@angular/material';

@NgModule({declarations: [ButtonComponent],
  exports: [ButtonComponent],
  imports: [MatButtonModule]
  })

export class ButtonModule {

}
