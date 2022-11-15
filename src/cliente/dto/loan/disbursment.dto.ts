export class DisbursmentDto {
    transactionDetails: TransactionDetails;
    notes: string;
    firstRepaymentDate: string;
    externalId: string;
    bookingDate: string;
    shiftAdjustableInterestPeriods: boolean;
    valueDate: string;
    originalCurrencyCode: string;
  }
  
  export interface TransactionDetails {
    transactionChannelId: string;
  }