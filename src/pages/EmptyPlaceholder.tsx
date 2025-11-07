import { FaBoxOpen, FaSpinner } from 'react-icons/fa'; // using react-icons for icon

const EmptyPlaceholder = ({ isLoading }: { isLoading: boolean}) => {
    
  return (
    <div className="empty-placeholder">
      {
        isLoading ? <FaSpinner /> : <>
            <FaBoxOpen className="empty-icon" />
            <p className="empty-message">No data to display</p>
        </>
      }
    </div>
  );
};

export default EmptyPlaceholder;
