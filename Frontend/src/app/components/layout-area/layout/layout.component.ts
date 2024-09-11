import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from "../../data-area/menu/menu.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatMenuModule, MatIconModule, MenuComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  
})
export class LayoutComponent {

}
