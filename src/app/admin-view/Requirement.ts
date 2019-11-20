export class Requirement {
  id: number;
  text: string;
  typeId: number;
}

export class RequirementCollection {
  content: Array<Requirement>;
}
