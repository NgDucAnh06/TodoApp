import style from './Filter.module.scss';

function Filter({ filters = {}, onFilterChange, onResetFilter }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (onFilterChange) {
            onFilterChange(name, value);
        }
    };

    return (
        <div className={style.filterWrapper}>
            <div className={style.searchBox}>
                <span className={style.searchIcon}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </span>
                <input
                    name="title"
                    className={style.searchInput}
                    type="text"
                    placeholder="Search todos..."
                    value={filters.title || ''}
                    onChange={handleChange}
                />
            </div>

            <div className={style.filterControls}>
                <div className={style.filterItem}>
                    <label htmlFor="status">Status</label>
                    <select
                        name="status"
                        id="status"
                        value={filters.status || 'all'}
                        onChange={handleChange}
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className={style.filterItem}>
                    <label htmlFor="priorityOrder">Priority</label>
                    <select
                        name="priorityOrder"
                        id="priorityOrder"
                        value={filters.priorityOrder || 'none'}
                        onChange={handleChange}
                    >
                        <option value="none">None</option>
                        <option value="asc">Ascending (Low → High)</option>
                        <option value="desc">Descending (High → Low)</option>
                    </select>
                </div>

                <div className={style.filterItem}>
                    <label htmlFor="dueDateOrder">Due date</label>
                    <select
                        name="dueDateOrder"
                        id="dueDateOrder"
                        value={filters.dueDateOrder || 'none'}
                        onChange={handleChange}
                    >
                        <option value="none">None</option>
                        <option value="asc">Ascending (Earliest)</option>
                        <option value="desc">Descending (Latest)</option>
                    </select>
                </div>

                {onResetFilter && (
                    <button
                        type="button"
                        className={style.resetBtn}
                        onClick={onResetFilter}
                    >
                        Reset Filter
                    </button>
                )}
            </div>
        </div>
    );
}

export default Filter;
