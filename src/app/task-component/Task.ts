export class TaskElement {
  id: number;
  requirements: [];
}

export class RequirementType {
  title: string;
  value: number;
  requirements: Requirement[];
}

export class Requirement {
  id: number;
  text: string;
}
