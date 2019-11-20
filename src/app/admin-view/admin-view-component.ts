import {Component, OnInit} from '@angular/core';
import {Specification, SpecificationCollection} from './Specification';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {AdminViewService} from './admin-view-component.service';
import {Requirement, RequirementCollection} from './Requirement';


@Component({
  selector: 'app-admin-view',
  templateUrl: 'admin-view-component.html',
  styleUrls: ['admin-view-component.less'],
})
export class AdminViewComponent implements OnInit {

  displayedColumns = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Specification>();
  dataSourceRequirement = new MatTableDataSource<Requirement>();
  displayedColumnsRequirement = ['id', 'text', 'typeId', 'actions'];
  showRequirement = false;

  constructor(private service: AdminViewService) {
  }


  ngOnInit() {
  this.getSpecificationList();
  }

  getSpecificationList() {
    this.dataSource.data = this.service.getAllSpecifications().content;
  }

  create() {

  }

  edit(row: any) {
    // this.service.updateSpecification();
  }

  delete(row: any) {
    this.service.deleteSpecification(row.id);
  }

  expandRow(row: any) {
    this.showRequirement = true;
    let c  = new RequirementCollection();
    c.content = [{ id: 12, text: 'fs', typeId: 12}, { id: 13, text: 'fsdgd', typeId: 0}];
    c.content.map(a => a.typeId = row.id);
    this.dataSourceRequirement.data = c.content;
  }

  closeRequirements() {
    this.showRequirement = false;
  }

  editRequirement(row: any) {

  }

  createRequirement() {

  }

  deleteRequirement(row: any) {

  }

}
