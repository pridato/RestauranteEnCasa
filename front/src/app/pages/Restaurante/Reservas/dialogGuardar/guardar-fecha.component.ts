import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-guardar-fecha',
  standalone: true,
  imports: [],
  templateUrl: './guardar-fecha.component.html',
  styleUrl: './guardar-fecha.component.css'
})
export class GuardarFechaComponent implements OnInit{

  @Input() fecha!:Date

  constructor() {}

  ngOnInit(): void {
    console.log(this.fecha)
  }
}
