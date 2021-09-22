import React from "react";

const Pagination = ({pagesArray, page, callback}) => {
    return (<div className="page__wrapper">
        {pagesArray.map(item =>
            <span
                onClick={() => callback(item)}
                className={page === item ? 'page page__current' : 'page'}
                key={item}>
                {item}</span>)}
    </div>);
};

export default Pagination