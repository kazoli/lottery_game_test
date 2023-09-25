import ListPaginator from './ListPaginator';
import ListTotalResults from './ListTotalResults';

function ListFooter() {
  return (
    <section className="list-control-footer">
      <ListTotalResults />
      <ListPaginator />
    </section>
  );
}

export default ListFooter;
