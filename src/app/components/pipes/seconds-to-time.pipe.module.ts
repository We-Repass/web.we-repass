import { NgModule } from '@angular/core';
import { SecondsToTimePipe } from './SecondsToTimePipe'; 
@NgModule({
  declarations: [SecondsToTimePipe],
  exports: [SecondsToTimePipe]  // Asegúrate de exportarlo para usarlo en otros componentes
})
export class SecondsToTimePipeModule {}
