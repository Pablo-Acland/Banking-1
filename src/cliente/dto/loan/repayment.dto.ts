

export interface RepaymentDto {
    amount: number;
    transactionDetails: TransactionDetails;
    notes: string;
    externalId: string;
    bookingDate: string;
    prepaymentRecalculationMethod: string;
    valueDate: string;
    originalCurrencyCode: string;
    installmentEncodedKey: string;
}

export interface TransactionDetails {
    transactionChannelKey: string;
}
