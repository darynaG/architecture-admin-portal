import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {RequirementType} from './Task';
import {TaskService} from './task-view-component.service';

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'app-cdk-drag-drop-connected-sorting-example',
  templateUrl: 'task-view-component.html',
  styleUrls: ['task-view-component.css'],
})

export class CdkDragDropConnectedSortingExampleComponent {
  constructor(private service: TaskService) {}

  types: RequirementType[] = [
    {title: 'Type1', id: 1, requirements: []},
    {title: 'Type2', id: 2, requirements: []},
    {title: 'Type3', id: 3, requirements: []},
    {title: 'Type4', id: 4, requirements: []},
    {title: 'Type5', id: 5, requirements: []}
  ];

  requirements = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep',
    'do smth',
    'do smth else'
  ];


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
