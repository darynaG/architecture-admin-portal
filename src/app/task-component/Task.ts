export class TaskElement {
  requirements: Array<string>;
  requirementsTypes: Array<string>;
}

export class RequirementType {
  title: string;
  id: number;
  requirements: Array<string>;
}
