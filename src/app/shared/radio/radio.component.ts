import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioOption } from './radio.model';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  providers:[
    {
      provide: NG_VALUE_ACCESSOR, // para registra o nosso componente como um value acessor para ser usado com ngmodel e reactive forms
      useExisting: forwardRef(()=>RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  @Input() options: RadioOption[];

  value: any;

  onChange: any;

  constructor() { }

  /** vai ser chamado quando a diretiva passar o valor ao componente*/
  writeValue(obj: any): void {
    this.value = obj;
    if(this.onChange) {
      this.onChange(this.value);
    }
  }

  /**função chamada quando o valor do componente mudar */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    console.log('Entrou no componente')
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('Campo disabled')
  }

  ngOnInit() {
  }

  setValue(value) {
    this.value = value;
    this.onChange(this.value)
  }

}
