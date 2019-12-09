import {NgModule} from '@angular/core';
import {ToolbarComponent} from './toolbar.component';
import {MatToolbarModule} from '@angular/material';

@NgModule({declarations: [ToolbarComponent],
  exports: [ToolbarComponent],
  imports: [MatToolbarModule]
  })

export class ToolbarModule {

}
