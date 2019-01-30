import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterControllerComponent } from './footer-controller.component';
@NgModule({
  declarations: [FooterControllerComponent],
  imports: [CommonModule],
  exports: [CommonModule, FooterControllerComponent]
})
export class FooterControllerModule {}
