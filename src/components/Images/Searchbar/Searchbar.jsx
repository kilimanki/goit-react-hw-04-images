import { useState } from 'react';
import css from 'Shared/styles.module.css';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
const Searchbar = ({ submit }) => {
  const [state, setState] = useState({
    search: '',
  });

  const onSubmit = e => {
    e.preventDefault();
    if (!state.search.trim()) {
      Notiflix.Notify.warning('Pls, type something');
      return;
    }
    submit({ ...state });

    reset();
  };
  const handleChange = e => {
    const { value, name } = e.target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };
  const reset = () => {
    setState({ search: '' });
  };
  const { search } = state;
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={[css.button]}>
          Search
        </button>

        <input
          name="search"
          onChange={handleChange}
          value={search}
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
export default Searchbar;
Searchbar.propTypes = {
  submit: PropTypes.func.isRequired,
};
