import {NgModule} from '@angular/core';
import {JumbotronComponent} from './jumbotron.component';
import {ButtonModule} from '../button';

@NgModule({declarations: [JumbotronComponent],
  exports: [JumbotronComponent],
  imports: [ButtonModule]
  })

export class JumbotronModule {

}
