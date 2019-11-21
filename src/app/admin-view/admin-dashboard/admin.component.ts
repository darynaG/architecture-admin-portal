import {Component, OnInit} from '@angular/core';
import {Specification} from '../Specification';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {AdminViewService} from '../admin-view-component.service';
import {Requirement} from '../Requirement';
import {AddSpecificationModalComponent} from '../add-specification-modal/add-specification-modal.component';
import {AddRequirementModalComponent} from '../add-requirement-modal/add-requirement-modal.component';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.less'],
})
export class AdminComponent implements OnInit {

  displayedColumns = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Specification>();
  dataSourceRequirement = new MatTableDataSource<Requirement>();
  displayedColumnsRequirement = ['id', 'text', 'typeId', 'actions'];
  showRequirement = false;
  specificationId: number;

  sessionId: Observable<string>;
  token: Observable<string>;

  types = [
    {title: 'Type1', value: 1},
    {title: 'Type2', value: 2},
    {title: 'Type3', value: 3},
    {title: 'Type4', value: 4},
    {title: 'Type5', value: 5}
  ];

  constructor(private service: AdminViewService,
              private dialog: MatDialog,
              private route: ActivatedRoute) {
  }


  ngOnInit() {
    // Capture the session ID if available
    this.sessionId = this.route
      .queryParamMap
      .pipe(map(params => params.get('session_id') || 'None'));

    // Capture the fragment if available
    this.token = this.route
      .fragment
      .pipe(map(fragment => fragment || 'None'));

    this.getSpecificationList();
  }

  getType(value: number): string {
    return this.types.find(x => x.value === value).title;
  }

  getSpecificationList() {
    this.service.getAllSpecifications().subscribe(data =>
    this.dataSource.data = data.content);
  }

  create() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    const component = AddSpecificationModalComponent;
    this.dialog.open(component, dialogConfig).afterClosed().subscribe(() => {
      this.getSpecificationList();
    });
  }

  edit(specification: Specification) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {specification};
    this.dialog.open(AddSpecificationModalComponent, dialogConfig).afterClosed().subscribe(() => {
      this.getSpecificationList();
    });
  }

  delete(specification: Specification) {
    const c = specification;
    const message = `Are you sure you want to delete Specification #${c.id} for ${c.description} ?`;

    if (confirm(message)) {
      this.service.deleteSpecification(c.id).subscribe(() => {
        this.getSpecificationList();
      });
    }
  }

  expandRow(row: any) {
    this.showRequirement = true;
    this.specificationId = row.id;
    this.getRequirementList();
  }

  getRequirementList() {
    this.service.getAllRequirements().subscribe(data =>
    this.dataSourceRequirement.data = data.content);
  }

  closeRequirements() {
    this.showRequirement = false;
  }

  editRequirement(requirement: Requirement) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      requirement,
      specificationId: this.specificationId};
    this.dialog.open(AddRequirementModalComponent, dialogConfig).afterClosed().subscribe(() => {
      this.getRequirementList();
    });
  }

  createRequirement() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      specificationId: this.specificationId
    };
    const component = AddRequirementModalComponent;
    this.dialog.open(component, dialogConfig).afterClosed().subscribe(() => {
      this.getRequirementList();
    });
  }

  deleteRequirement(requirement: Requirement) {
    const c = requirement;
    const message = `Are you sure you want to delete requirement #${c.id} for ${c.text}, ${c.typeId} ?`;

    if (confirm(message)) {
      this.service.deleteRequirement(this.specificationId, c.id).subscribe(() => {
        this.getRequirementList();
      });
    }
  }

}
