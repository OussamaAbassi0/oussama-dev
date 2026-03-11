export type IssueType = "critical" | "warning" | "info";

export interface Lead {
  company: string;
  phone: string;        // formatted_phone_number (Google Maps)
  website: string;      // website (Google Maps)
  rating: number;       // rating 0–5 (Google Maps)
  score: number;        // score visuel 0–100 dérivé du rating
  signal: string;       // signal d'intent généré dynamiquement
  address: string;      // formatted_address
  mapsUrl: string;      // url Google Maps
}

export interface AuditIssue {
  type: IssueType;
  label: string;
  detail: string;
}

export interface AuditReport {
  company: string;
  url: string;
  score: number;
  issues: AuditIssue[];
  roi: string;
}

export type PipelineStepStatus = "idle" | "active" | "done";

export interface PipelineStep {
  id: string;
  icon: string;
  label: string;
  sub: string;
}
