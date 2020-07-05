// @flow

function formatNumber(aNumber: number) {
  return aNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export {formatNumber};
