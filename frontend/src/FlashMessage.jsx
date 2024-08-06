export default function FlashMessage({ message, type }) {
    if (!message) return null;

    return (
        <div className={`alert ${type === 'success' ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
            {message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
};


