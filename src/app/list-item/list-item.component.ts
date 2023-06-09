import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() tarefa:any
  @Input() index:Number|any
  @Output() onRemoveEvent = new EventEmitter<number>()

}
