import { RiseLoader } from 'react-spinners';
import './loading-screen.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className="user-page">
      <span className="loader">
        <RiseLoader
          color="#279DEA"
          loading
          margin={10}
          size={20}
          speedMultiplier={1}
        />
      </span>
    </div>
  );
}

export default LoadingScreen;
