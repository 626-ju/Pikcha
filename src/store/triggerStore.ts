import { create } from 'zustand';

type TriggerState = {
  trigger: boolean;
  setTrigger: () => void;
};

export const useTriggerStore = create<TriggerState>((set) => ({
  trigger: false,
  setTrigger: () => set((state) => ({ trigger: !state.trigger })),
}));
