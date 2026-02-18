export type ActionType = 'set' | 'adjust' | 'add';

export interface AmountAction {
  label: string;
  value: number;
  type: ActionType;
  modifier?: string;
}

export const AMOUNT_CONTROLS: AmountAction[] = [
  { label: '−', value: -0.5, type: 'add' },
  { label: '+', value: 0.5, type: 'add' },
  { label: '5.00', value: 5, type: 'set' },
  { label: '25.00', value: 25, type: 'set' },
  { label: '100.00', value: 100, type: 'set' },
  { label: 'x2', value: 2, type: 'adjust', modifier: 'double' },
  { label: '½', value: 0.5, type: 'adjust', modifier: 'remove' },
  { label: 'MAX', value: 0, type: 'set' },
];

export const STEP_BUTTONS = AMOUNT_CONTROLS.filter((a) => a.type === 'add');
export const QUICK_BETS = AMOUNT_CONTROLS.filter(
  (a) => a.type === 'set' && !['MAX'].includes(a.label),
);
export const BET_ACTIONS = AMOUNT_CONTROLS.filter(
  (a) => a.type === 'adjust' || a.label === 'MAX',
);
