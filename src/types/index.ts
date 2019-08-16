export interface AuditData {
  req: ForecastRequest;
  res: ForecastResponse;
}

interface ForecastRequest {
  url: string;
  headers: any;
  query: any;
  params: any;
}

interface ForecastResponse {
  data?: any;
  status: string;
  message: string;
  error: boolean;
}
