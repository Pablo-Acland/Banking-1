

export class LoanDto {
    accountHolderKey: string;
    accountHolderType: string;
    loanAmount: number;
    productTypeKey: string;
    interestSettings: InterestSettings;
    scheduleSettings: ScheduleSettings;
    disbursementDetails: DisbursementDetails;
    _Informacion_Adicional: InformacionAdicional;
}

export interface InformacionAdicional {
    Codigo_Promotor: string;
}

export interface DisbursementDetails {
    expectedDisbursementDate: string;
    firstRepaymentDate: string;
}

export interface InterestSettings {
    interestRate: number;
}

export interface ScheduleSettings {
    gracePeriod: number;
    repaymentInstallments: number;
    repaymentPeriodCount: number;
    repaymentPeriodUnit: string;
    repaymentScheduleMethod: string;
    scheduleDueDatesMethod: string;
}
