import { Component, EventEmitter, Output, output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-edit-menu',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule,MatIcon],
  templateUrl: './edit-menu.component.html',
  styleUrl: './edit-menu.component.css',

  
})
export class EditMenuComponent {
  
  @Output() dataEmitter = new EventEmitter<string>();

  sendData(event:Event) {
    this.dataEmitter.emit();
  }
}
