export function renderQuantities() {
  const LG_ROW_CARD_COUNT = 3;
  const MD_ROW_CARD_COUNT = 2;
  const SM_ROW_CARD_COUNT = 1;

  const LG_INITIAL_CARD_COUNT = 12;
  const MD_INITIAL_CARD_COUNT = 8;
  const SM_INITIAL_CARD_COUNT = 5;

  const desktop = "(min-width: 1200px)";
  const tablet = "(min-width: 746px)";

  return {
    LG_ROW_CARD_COUNT,
    MD_ROW_CARD_COUNT,
    SM_ROW_CARD_COUNT,
    LG_INITIAL_CARD_COUNT,
    MD_INITIAL_CARD_COUNT,
    SM_INITIAL_CARD_COUNT,
    desktop,
    tablet,
  };
}

export function movieLength() {
  const shortMovie = 40;

  return { shortMovie };
}
