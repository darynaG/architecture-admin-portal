import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Requirement, RequirementType, TaskElement} from './Task';
import {TaskService} from './task-view-component.service';
import {ActivatedRoute} from '@angular/router';


/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'app-cdk-drag-drop-connected-sorting-example',
  templateUrl: 'task-view-component.html',
  styleUrls: ['task-view-component.less'],
})

export class CdkDragDropConnectedSortingExampleComponent implements OnInit {
  constructor(private service: TaskService,
              private route: ActivatedRoute) {}

  types: RequirementType[] = [
    {title: 'Функціональні вимоги', value: 1, requirements: []},
    {title: 'Вимоги до інтерфейсів', value: 2, requirements: []},
    {title: 'Вимоги до продуктивності', value: 3, requirements: []},
    {title: 'Вимоги безпеки', value: 4, requirements: []},
    {title: 'Вимоги надійності', value: 5, requirements: []},
    {title: 'Інші вимоги', value: 6, requirements: []}
  ];

  requirements: Requirement[];
  taskId: number;
  sessionId: number;


  ngOnInit() {
    this.sessionId = this.route.snapshot.queryParams.sessionId;
    this.getTask();
  }

  drop(event: CdkDragDrop<Requirement[]>) {
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
    this.service.getTask(this.sessionId).subscribe(content => {
      this.requirements = content.content.requirements;
      this.taskId = content.content.id;
    });
  }

  onClick() {
    this.service.completeTask(this.sessionId, this.taskId, this.types)
      .subscribe(() => console.log(this.taskId, this.types));
  }

  cancelTask() {
    this.service.cancelTask(this.sessionId, this.taskId, this.types)
      .subscribe(() => console.log(this.taskId, this.types));
  }
}
