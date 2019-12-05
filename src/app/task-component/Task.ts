export class TaskElement {
  id: number;
  requirements: Requirement[];
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

export class TaskEl  {
  content: TaskElement;
}
