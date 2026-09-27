import SEOManager from '../SEOManager';

/**
 * PageTitle Component
 * Backwards-compatible wrapper delegating to SEOManager.
 */
const PageTitle = (props) => {
    return <SEOManager {...props} />;
};

export default PageTitle;


