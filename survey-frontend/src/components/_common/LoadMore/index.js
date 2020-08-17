import React from 'react';
import { connect } from 'react-redux';
import './LoadMore.scss';

const LoadMore = props => {
  const { onClick, requestKey, ui, className } = props;
  const { filter } = ui;
  const params = (requestKey && filter[requestKey]) || {};
  const pagination = ui.pagination[requestKey] || {};
  const { total_count, current } = pagination;
  const per_page = pagination.per_page || 20;
  const canLoadMore = total_count && current && Number(total_count) > (Number(current) * Number(per_page));
  if (canLoadMore) {
    params.page = Number(current) + 1;
  }
  return canLoadMore ? (
    <p className="text-center"><button className={`load-more ${className || ''}`.trim()} onClick={() => onClick(params, requestKey)}>
      Load More
    </button></p>
  ) : null;
};
const mapDispatchToProps = {};
// export the connected class
function mapStateToProps(state) {
  return {
    ui: state.ui,
  };
}
export default connect(mapStateToProps)(LoadMore);
