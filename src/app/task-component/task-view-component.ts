import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {RequirementType} from './Task';

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'app-cdk-drag-drop-connected-sorting-example',
  templateUrl: 'task-view-component.html',
  styleUrls: ['task-view-component.css'],
})
export class CdkDragDropConnectedSortingExampleComponent {
  requirements = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep',
    'do smth',
    'do smth else'
  ];
  types: RequirementType[];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getTask() {

  }

  onClick() {
    console.log(this.types);
  }
}
