import React from "react";
import MySelect from "./UI/select/MySelect";
import MyInput from "./UI/input/myInput";
const PostFilter = ({filter,setFilter}) => {
    return (
        <div>
            <MyInput value={filter.query}
                onChange={e => setFilter({...filter, query : e.target.value})}
                placeholder="Search" />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter,sort : selectedSort})}
                defaultValue="Sort by"
                options={[
                    { value: 'title', name: 'title' },
                    { value: 'body', name: 'description' }
                ]}
            />
        </div>
    );
};

export default PostFilter;