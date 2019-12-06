import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Requirement, RequirementType, TaskElement, TestAnswer} from './Task';
import {TaskService} from './task-view-component.service';
import {ActivatedRoute, Router} from '@angular/router';


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
              private router: Router,
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
    const model: TestAnswer = {
      requirementsUnselected: this.requirements,
      requirements: this.types
    }

    // TODO!
    this.service.completeTask(this.sessionId,  model)
      .subscribe(() =>
        this.router.navigate(['/test', 'result'],
          {queryParams: {sessionId: this.sessionId}}));

    /*this.router.navigate(['/test', 'result'],
      {queryParams: {sessionId: this.sessionId}});*/
  }

  cancelTask() {
    const model: TestAnswer = {
      requirementsUnselected: this.requirements,
      requirements: this.types
    }
    this.service.cancelTask(this.sessionId, this.taskId, model)
      .subscribe(() => console.log(this.taskId, model));
  }
}
