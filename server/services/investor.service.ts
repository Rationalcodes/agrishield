import { store } from '../data/store';
import { InvestorCalculatorInputs, InvestorBriefingLead } from '../types';

export class InvestorService {
  public getInputs(): InvestorCalculatorInputs {
    return store.getInvestorInputs();
  }

  public updateInputs(inputs: Partial<InvestorCalculatorInputs>): {
    inputs: InvestorCalculatorInputs;
    metrics: any;
  } {
    const updated = store.updateInvestorInputs(inputs);
    const metrics = this.computeMetrics(updated);
    return { inputs: updated, metrics };
  }

  public computeMetrics(inputs: InvestorCalculatorInputs = store.getInvestorInputs()) {
    const {
      payingCustomers,
      annualContractValue,
      assessmentFee,
      annualOperatingExpenses,
    } = inputs;

    const recurringRevenue = payingCustomers * annualContractValue;
    const assessmentRevenue = payingCustomers * 1.5 * assessmentFee;
    const totalRevenue = recurringRevenue + assessmentRevenue;
    const grossMarginPercent = 82;
    const grossProfit = totalRevenue * (grossMarginPercent / 100);
    const netOperatingIncome = grossProfit - annualOperatingExpenses;
    const isProfitable = netOperatingIncome > 0;
    const paybackMonths = Math.max(1, Math.round((annualOperatingExpenses / Math.max(totalRevenue, 1)) * 12));

    return {
      recurringRevenue,
      assessmentRevenue,
      totalRevenue,
      grossProfit,
      grossMarginPercent,
      netOperatingIncome,
      isProfitable,
      paybackMonths,
      targetSeedRound: 75000000, // ₹7.5 Crore
      tamInrCrores: inputs.tamBillion,
      samInrCrores: inputs.samBillion,
      somInrCrores: inputs.somMillion,
    };
  }

  public recordLead(lead: {
    name: string;
    firm: string;
    role: string;
    focusArea: string;
    message: string;
  }): InvestorBriefingLead {
    return store.addInvestorLead(lead);
  }

  public getLeads(): InvestorBriefingLead[] {
    return store.getInvestorLeads();
  }
}

export const investorService = new InvestorService();
