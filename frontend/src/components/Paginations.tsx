interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    sortBy: string;
    sortDir: string;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
    onSortByChange: (newSortBy: string) => void;
    onSortDirChange: (newSortDirChange: string) => void;

}

const Pagination = ({ currentPage, totalPages, pageSize, sortBy, sortDir, onPageChange, onPageSizeChange, onSortByChange, onSortDirChange }: PaginationProps) => {
    return (
        <>
            <div className="d-flex justify-content-center my-3">
                <nav aria-label="Book pagination">
                    <ul className="pagination mb-0">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => onPageChange(currentPage - 1)}
                            >
                                Previous
                            </button>
                        </li>

                        {[...Array(totalPages)].map((_, i) => (
                            <li
                                className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                                key={i + 1}
                            >
                                <button className="page-link" onClick={() => onPageChange(i + 1)}>
                                    {i + 1}
                                </button>
                            </li>
                        ))}

                        <li
                            className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => onPageChange(currentPage + 1)}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="row g-3 justify-content-center align-items-end mt-1">
                <div className="col-12 col-md-4">
                    <label className="form-label mb-1">Results per page</label>
                    <select
                        className="form-select"
                        value={pageSize}
                        onChange={(p) => {
                            onPageSizeChange(Number(p.target.value));
                            onPageChange(1);
                        }}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>

                <div className="col-12 col-md-4">
                    <label className="form-label mb-1">Sort</label>
                    <select
                        className="form-select"
                        value={sortBy}
                        onChange={(e) => {
                            onSortByChange(e.target.value);
                            onPageChange(1);
                        }}
                    >
                        <option value="none">None</option>
                        <option value="title">Title</option>
                    </select>
                </div>

                {sortBy === 'title' && (
                    <div className="col-12 col-md-4">
                        <label className="form-label mb-1">Direction</label>
                        <select
                            className="form-select"
                            value={sortDir}
                            onChange={(e) => {
                                onSortDirChange(e.target.value);
                                onPageChange(1);
                            }}
                        >
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </select>
                    </div>
                )}</div>
            <br />
        </>
    )
}

export default Pagination;