import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {

  @Input() label: string = ""
  @Input() fieldName: string = ""
  @Input() type: string = "text"
  @Input() errorMessage: string = ""
  @Input() disabled: boolean = false
  @Input() autofocus: boolean = false
  @Input() maxLength: number | null= null
  @Input() initialValue: string = ""
  @Input() textCase: "uppercase" | "lowercase" | null = null

  value: string = this.initialValue

  @Output() change: EventEmitter<string> = new EventEmitter<string>()

  constructor() {
    setTimeout(() => this.value = this.initialValue, 10)
  }

  ngOnInit() {}
}
