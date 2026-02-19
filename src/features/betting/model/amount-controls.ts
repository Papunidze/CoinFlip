export const ActionTypeEnum = {
  SET: 'set',
  ADJUST: 'adjust',
  ADD: 'add',
} as const;

export type ActionType = (typeof ActionTypeEnum)[keyof typeof ActionTypeEnum];

export interface AmountAction {
  label: string;
  value: number;
  type: ActionType;
  modifier?: string;
}

export const AMOUNT_CONTROLS: AmountAction[] = [
  { label: '−', value: -0.5, type: ActionTypeEnum.ADD },
  { label: '+', value: 0.5, type: ActionTypeEnum.ADD },
  { label: '5.00', value: 5, type: ActionTypeEnum.SET },
  { label: '25.00', value: 25, type: ActionTypeEnum.SET },
  { label: '100.00', value: 100, type: ActionTypeEnum.SET },
  { label: 'x2', value: 2, type: ActionTypeEnum.ADJUST, modifier: 'double' },
  { label: '½', value: 0.5, type: ActionTypeEnum.ADJUST, modifier: 'remove' },
  { label: 'MAX', value: 0, type: ActionTypeEnum.SET },
];

export const STEP_BUTTONS = AMOUNT_CONTROLS.filter((a) => a.type === ActionTypeEnum.ADD);
export const QUICK_BETS = AMOUNT_CONTROLS.filter(
  (a) => a.type === ActionTypeEnum.SET && !['MAX'].includes(a.label),
);
export const BET_ACTIONS = AMOUNT_CONTROLS.filter(
  (a) => a.type === ActionTypeEnum.ADJUST || a.label === 'MAX',
);
