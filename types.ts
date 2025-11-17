import type * as React from 'react';

export interface NavLink {
  path: string;
  label: string;
  // Fix: Qualify JSX.Element with React.JSX.Element to resolve "Cannot find namespace 'JSX'" error.
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

export interface WaitTime {
  checkpointId: string;
  currentWaitTime: number;
  threshold: number;
  thresholdAlert: boolean;
  trend: 'up' | 'down' | 'stable';
}

export interface EquipmentStatus {
  equipmentId: string;
  type: string;
  location: string;
  status: 'Operational' | 'Maintenance Required' | 'Offline' | 'Faulty';
}

export interface SecurityAlert {
  alertId: string;
  type: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'New' | 'Investigating' | 'Resolved';
  timestamp: string;
  location: string;
  description: string;
}

export interface Incident {
  incidentId: string;
  type: string;
  severityLevel: 'Level 1 - Minor' | 'Level 2 - Moderate' | 'Level 3 - Major' | 'Level 4 - Critical';
  status: 'Open' | 'Active' | 'Under Control' | 'Resolved';
  location: string;
  startTimestamp: string;
}

export interface Passenger {
  id: string;
  name: string;
  nationality: string;
  dob: string;
  riskScore: number;
  photoUrl: string;
  travelHistory: Flight[];
  apiData: Record<string, any>;
  pnrData: Record<string, any>;
}

export interface Flight {
  flightNumber: string;
  from: string;
  to: string;
  date: string;
}

export interface FlightAlert {
  id:string;
  flightNumber: string;
  origin: string;
  destination: string;
  alertType: 'Security' | 'Delay' | 'Cancellation' | 'Gate Change';
  description: string;
  timestamp: string;
}

export interface PassengerAlert {
  alertId: string;
  passengerName: string;
  flightNumber: string;
  alertType: 'High Risk Score' | 'Watchlist Match' | 'No-Fly List Match' | 'Irregular Travel Pattern';
  severity: 'Critical' | 'High' | 'Medium';
  timestamp: string;
  description: string;
}

export interface FlightMapPassenger {
  gender: 'Male' | 'Female' | 'Other';
  nationality: string;
}

export interface FlightJourney {
  id: string;
  flightNumber: string;
  origin: string; // IATA code
  destination: string; // IATA code
  date: string; // YYYY-MM-DD
  status: 'On Time' | 'Alert';
  departureTime: string; // HH:MM
  arrivalTime: string; // HH:MM
  alertCount: number;
  passengers: FlightMapPassenger[];
}


export interface XAIExplanation {
  humanReadable: string;
  contributingFactors: {
    name: string;
    value: string;
    impact: 'High' | 'Medium' | 'Low';
  }[];
}

export enum DataIngestionSourceType {
  Database = 'Database',
  API = 'API',
  File = 'File System',
  Streaming = 'Streaming Service',
}

export interface IngestionSchedule {
  type: 'Hourly' | 'Daily' | 'Weekly' | 'Continuous' | 'Manual';
  nextRun: string;
}

export interface DataIngestionSource {
  id: string;
  name: string;
  type: DataIngestionSourceType;
  status: 'Success' | 'Failure' | 'In Progress';
  lastIngestion: string;
  schedule: IngestionSchedule;
  errorCount: number;
}

export interface AuditEvent {
  timestamp: string;
  action: string;
  user: string;
}

export interface ValidationRule {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
}

export interface ApiSubmissionDetail {
  transactionId: string;
  status: 'Processed' | 'Pending' | 'Rejected';
  timestamp: string;
  manifest: {
    airlineCode: string; // IATA
    flightNumber: string;
    departureAirport: string; // IATA Code
    arrivalAirport: string; // IATA Code
    scheduledDepartureDate: string;
    scheduledDepartureTime: string;
    manifestType: 'Batch API' | 'Interactive API';
    apiMessageFormat: 'UN/EDIFACT PAXLST';
  };
  passenger: {
    givenName: string;
    surname: string;
    middleName?: string;
    dob: string;
    gender: 'Male' | 'Female' | 'Other' | 'Not Specified';
    nationality: string; // ISO 3166-1 alpha-3
  };
  document: {
    type: 'Passport' | 'Visa' | 'ID Card' | 'Refugee Travel Document';
    number: string;
    issuingCountry: string; // ISO 3166-1 alpha-3
    expiryDate: string;
  };
  additionalInfo?: {
    placeOfBirth?: string;
    destinationAddress?: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    contact?: {
      email: string;
      phone: string;
    };
    visa?: {
      number: string;
      type: string;
      issuingCountry: string;
      issueDate: string;
      expiryDate: string;
    };
    transitStatus?: 'Transiting' | 'Final Destination';
  };
  system: {
    processedBy: string;
    processingTimestamp: string;
    validationErrors?: string;
    auditTrail: AuditEvent[];
  };
}

// PNR (Passenger Name Record) Data Structures
export interface PnrItinerarySegment {
  departureAirportCode: string;
  arrivalAirportCode: string;
  flightNumber: string;
  scheduledDepartureDateTime: string;
  scheduledArrivalDateTime: string;
  airlineCode: string;
  classOfTravel: string;
}

export interface PnrPaymentDetails {
  formOfPayment: 'Credit Card' | 'Debit Card' | 'Cash' | 'Bank Transfer' | 'Voucher' | 'Other';
  partialCardNumber?: string;
  cardHolderName?: string;
  billingAddress?: string;
}

export interface PnrContactInfo {
  phone: string;
  email: string;
}

export interface PnrBaggageInfo {
  numberOfCheckedBags: number;
  totalWeightKg?: number;
}

export interface PnrPassengerDetails {
  fullName: string;
  dob?: string;
  gender?: 'Male' | 'Female' | 'Other';
  nationality?: string; // ISO 3166-1 alpha-3
}

export interface PnrTicketingInfo {
  ticketNumber: string;
  issuingAirline: string;
  dateOfIssuance: string;
  pointOfSale: string;
}

export interface PnrServiceRequestInfo {
  ssrCodes?: string[];
  osiMessages?: string[];
}

export interface PnrSystemInfo {
  sourceAirline: string;
  receivedTimestamp: string;
  processingStatus: 'Processing' | 'Processed' | 'Error';
  riskScore: number | null;
  processedBy?: string;
  processingTimestamp?: string;
  auditTrail?: AuditEvent[];
  bookingChannel?: 'Online Travel Agent' | 'Airline Direct' | 'In-person Travel Agent' | 'Airport Counter';
  passengerHistoryNotes?: string;
}

export interface PnrAdditionalInfo {
    placeOfBirth?: string;
    destinationAddress?: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    visa?: {
      number: string;
      type: string;
      issuingCountry: string;
      issueDate: string;
      expiryDate: string;
    };
    transitStatus?: 'Transiting' | 'Final Destination';
}

export interface PnrDetail {
  pnrRecordLocator: string;
  dateOfReservation: string;
  system: PnrSystemInfo;
  passengerDetails: PnrPassengerDetails[];
  fullTravelItinerary: PnrItinerarySegment[];
  paymentDetails: PnrPaymentDetails;
  contactInfo: PnrContactInfo;
  baggageInfo?: PnrBaggageInfo;
  ticketingInfo: PnrTicketingInfo;
  specialServiceRequests?: PnrServiceRequestInfo;
  remarks?: string;
  knownTravelerNumber?: string;
  numberOfChanges?: number;
  additionalInfo?: PnrAdditionalInfo;
}

// Types for Traveler Module
export interface ProcessingMessage {
    id: string;
    type: 'API' | 'PNR';
    sourceId: string;
    timestamp: string;
    status: 'Processing' | 'Validated' | 'Failed';
}

export interface AssociatedDataSubmission {
    type: 'API' | 'PNR';
    id: string; // e.g., Transaction ID or PNR Locator
    timestamp: string;
    status: 'Processed' | 'Rejected' | 'Pending';
}

export interface AssociatedJourney {
    flightNumber: string;
    origin: string;
    destination: string;
    date: string;
    status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface ConsolidatedTravelerRecord {
    puid: string; // Permanent Unique Identifier
    name: string;
    dob: string;
    nationality: string;
    photoUrl: string;
    riskIndicator: 'Low' | 'Medium' | 'High' | 'Critical';
    journeys: AssociatedJourney[];
    dataSubmissions: AssociatedDataSubmission[];
}

export interface FlightProcessRecord {
    id: string;
    operator: string;
    journeyReference: string;
    departurePort: string;
    departureTime: string;
    arrivalPort: string;
    arrivalTime: string;
    status: 'Scheduled' | 'Departed' | 'Arrived' | 'Delayed' | 'Cancelled';
    passengerCount: number;
    crewCount: number;
    transitCount: number;
    processedPercentage: number;
    notProcessedCount: number;
    alertCount: number;
    updateAlertCount: number;
    processedHoldCount: number;
    direction: 'Inbound' | 'Outbound';
    date: string;
}


// Fix: Removed redundant export of `PnrItinerarySegment` which was already exported as an interface.
// export type { PnrItinerarySegment };