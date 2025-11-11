import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  PoButtonModule,
  PoDynamicFormComponent,
  PoDynamicFormField,
  PoDynamicModule,
  PoLinkModule,
} from '@po-ui/ng-components';
import { PoPageLoginModule } from '@po-ui/ng-templates';

@Component({
  selector: 'app-dynamic-form',
  imports: [
    CommonModule,
    PoDynamicModule,
    PoButtonModule,
    PoPageLoginModule,
    PoLinkModule,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.less',
})
export class DynamicFormComponent {
  @Input() fields: Array<PoDynamicFormField> = [];
  @Input() model: any = {};
  @Input() buttonLabel = 'Enviar';
  @Input() secondaryText = '';
  @Input() linkLabel = '';
  @Input() linkAction!: () => void;

  @Output() formSubmit = new EventEmitter<any>();

  @ViewChild(PoDynamicFormComponent) dynamicForm!: PoDynamicFormComponent;

  onSubmit() {
    if (this.dynamicForm.form.valid) {
      this.formSubmit.emit(this.model);
      this.dynamicForm.form.reset();
    }
  }
}
