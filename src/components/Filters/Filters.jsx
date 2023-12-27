import FilterDeveloper from './FilterDeveloper';
import FilterGenre from './FilterGenre';
import FilterPlatform from './FilterPlatform';
import FilterPublisher from './FilterPublisher';
import FilterStore from './FilterStore';

function Filters() {
  return (
    <>
      <FilterGenre />
      <FilterPlatform />
      <FilterDeveloper />
      <FilterPublisher />
      <FilterStore />
    </>
  );
}

export default Filters;
