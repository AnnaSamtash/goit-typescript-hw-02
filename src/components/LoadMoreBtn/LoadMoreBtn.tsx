import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <button className={css.Loadmore_btn} type="submit" onClick={onClick}>
      Load more
    </button>
  );
};
export default LoadMoreBtn;
