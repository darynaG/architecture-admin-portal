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

export class Session {
  content: number;
}

export class SpecificationDetails {
  id: number;
  name: string;
  description: string;
  attempts: number;
  score: number;
}

export class SpecificationDetailsCollection {
  content: SpecificationDetails;
}

export class TestResult {
  score: number;
  passed: boolean;
  passingScore: number;
  percentage: number;
}
export class TestAnswer {
  requirementsUnselected: Requirement[];
  requirements: RequirementType[];
}
