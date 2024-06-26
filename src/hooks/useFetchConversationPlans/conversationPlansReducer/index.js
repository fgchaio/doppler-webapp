export const INITIAL_STATE_CONVERSATION_PLANS = {
  conversationPlans: [],
  conversationPlansValues: [],
  selectedPlanIndex: 0,
  selectedPlan: null,
  loading: true,
  hasError: false,
};

export const CONVERSATION_PLANS_ACTIONS = {
  FETCHING_STARTED: 'FETCHING_STARTED',
  RECEIVE_CONVERSATION_PLANS: 'RECEIVE_CONVERSATION_PLANS',
  SELECT_PLAN: 'SELECT_PLAN',
  FETCH_FAILED: 'FETCH_FAILED',
};

export const conversationPlansReducer = (state, action) => {
  switch (action.type) {
    case CONVERSATION_PLANS_ACTIONS.FETCHING_STARTED:
      return {
        ...state,
        loading: true,
        hasError: false,
      };
    case CONVERSATION_PLANS_ACTIONS.RECEIVE_CONVERSATION_PLANS:
      const { payload: conversationPlans } = action;
      return {
        ...state,
        loading: false,
        conversationPlans,
        conversationPlansValues: conversationPlans.map((cp) => cp.conversationsQty),
        selectedPlan: conversationPlans[0],
      };
    case CONVERSATION_PLANS_ACTIONS.SELECT_PLAN:
      const { payload: selectedPlanIndex } = action;

      return {
        ...state,
        selectedPlanIndex,
        selectedPlan: state.conversationPlans[selectedPlanIndex],
      };
    case CONVERSATION_PLANS_ACTIONS.FETCH_FAILED:
      return {
        ...state,
        loading: false,
        hasError: true,
      };
    default:
      return state;
  }
};
