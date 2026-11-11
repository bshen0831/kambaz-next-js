export default function ActionsMenu() {
    return (
        <details className="wd-pazza-actions">
            <summary className="wd-pazza-actions-btn">Actions ▾</summary>
            <div className="wd-pazza-actions-menu">
                <button type="button" className="wd-pazza-actions-item">
                    Edit
                </button>
                <button type="button" className="wd-pazza-actions-item wd-danger">
                    Delete
                </button>
            </div>
        </details>
    );
}
